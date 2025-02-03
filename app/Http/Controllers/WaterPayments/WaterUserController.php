<?php

namespace App\Http\Controllers\WaterPayments;

use App\Http\Controllers\Controller;
use App\Models\WaterPayments\Group;
use App\Models\WaterPayments\WaterUser;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class WaterUserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {

        //users with pagination
        $pagination = WaterUser::with('group')->paginate(50);
        $groups = Group::all();
        return inertia('Water/Users/Index', [
            'pagination' => $pagination,
            'groups' => $groups,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required',
            'number' => 'required',
        ]);


        $request->request->add(['name' => $this->formatUserName($request->name)]);

        WaterUser::create($request->all());

        //return json response with 201 status code
        return back()->with('success', 'Usuario creado correctamente');
    }

    /**
     * Display the specified resource.
     */
    public function show(WaterUser $waterUser)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(WaterUser $waterUser)
    {
        //
    }


    private function formatUserName($name)
    {
        return trim(strtoupper(str_replace(['á', 'é', 'í', 'ó', 'ú'], ['a', 'e', 'i', 'o', 'u'], strtolower($name))));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, WaterUser $waterUser)
    {
        $request->validate([
            'name' => 'required',
            'number' => 'required',
        ]);


        $request->request->add(['name' => $this->formatUserName($request->name)]);

        $waterUser->update($request->all());

        return back()->with('success', 'Usuario actualizado correctamente');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(WaterUser $waterUser)
    {
        Log::info('Eliminando usuario', ['user' => $waterUser]);
        try {
            $waterUser->delete();

            return back()->with('success', 'Usuario eliminado correctamente');
        } catch (\Throwable $th) {
            Log::channel('stdout')->error('Error al eliminar usuario', ['error' => $th->getMessage()]);
            return back()->with('error', 'Error al eliminar usuario');
        }
    }

    public function destroyAll()
    {
        Log::channel('stdout')->info('Eliminando todos los usuarios');
        try {

            //ids
            $ids = WaterUser::all()->pluck('id')->toArray();

            WaterUser::destroy($ids);

            return back()->with('success', 'Usuarios eliminados correctamente');
        } catch (\Throwable $th) {
            Log::error('Error al eliminar todos los usuarios', ['error' => $th->getMessage()]);
            return back()->with('error', 'Error al eliminar todos los usuarios');
        }
    }

    private function getArrayDataFromFile($file)
    {

        if (($handle = fopen($file->getRealPath(), 'r')) !== false) {
            $headers = fgetcsv($handle, 1000, ',');
            $headers = array_map('trim', $headers);
            $headers = array_map(function ($header) {
                $value =  preg_replace('/[^\p{L}\p{N}\s]+/u', '', $header);
                return strtoupper(str_replace(' ', '_', $value));
            }, $headers);
            $data = [];
            while (($row = fgetcsv($handle, 1000, ',')) !== false) {
                $rowData = array_combine($headers, $row);
                $data[] = $rowData;
            }
            fclose($handle);
        }

        return $data;
    }

    public function upload(Request $request)
    {
        $request->validate([
            'csv_file' => 'required|file|mimes:csv,txt',
            'group_id' => 'required|string',
        ]);
        try {
            $data = $this->getArrayDataFromFile($request->file('csv_file'));

            foreach ($data as $row) {
                $user = new WaterUser();
                $user->name = $this->formatUserName($row['NOMBRE'] ?? "");
                $user->number = $row['NUMERO'] ?? "";
                $user->group_id = $request->group_id;
                $user->save();
            }

            return response()->json(['data' => $data]);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    public function download()
    {

        $groups = Group::with(['users' => function ($query) {
            $query->orderBy('number', 'asc');
        }])->get();

        $months = [
            'F',
            'M',
            'A',
            'M',
            'J',
            'J',
            'A',
            'S',
            'O',
            'N',
            'D',
            'E',
        ];

        $groups->map(function ($group) {
            $total = ceil($group->users->count() / 50) * 50;
            if ($total < 50) {
                $group->rows = 50;
            } else {
                $group->rows = $total;
            }
            return $group;
        });


        $pdf = PDF::loadView('pdf/water/users-template', [
            'groups' => $groups,
            'months' => $months,

        ]);





        return $pdf->stream('lista_de_usuarios_de_agua.pdf');
    }
}
