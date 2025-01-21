<?php

namespace App\Http\Controllers\Web;

use App\Http\Controllers\Controller;
use App\Models\TruthTables\Expression;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TruthTablesController extends Controller
{
    public function index()
    {


        $expressions = Expression::orderBy('counter', 'desc')->paginate(20);
        return Inertia::render('TruthTables/Index', [
            'expressions' => $expressions
        ]);
    }

    public function create()
    {
        return Inertia::render('TruthTables/Create');
    }

    public function store()
    {
        $data = request()->validate([
            'expression' => 'required',
            'type' => 'required',
        ]);

        //check if already exists
        $expression = Expression::where(
            'expression',
            strtolower(request('expression'))
        )->where(
            'type',
            request('type')
        )->first();

        if ($expression) {
            return redirect()->back()->with('error', "La expresión '" . request('expression') . "' ya existe");
        }

        Expression::create($data);

        return redirect()->back()->with('success', "Expresión '" . request('expression') . "' creada correctamente");
    }

    //update
    public function update(Request $request)
    {
        $id = $request->input('id');
        $expression = Expression::find($id);

        if ($expression) {

            $request->validate([
                'expression' => 'required',
                'type' => 'required',
            ]);

            $expression->expression = $request->input('expression');
            $expression->type = $request->input('type');
            $expression->description = $request->input('description');
            $expression->video_link = $request->input('video_link');
            $expression->save();

            return redirect()->back()->with('success', "Expresión actualizada correctamente");
        }

        return redirect()->back()->with('error', "Expresión no encontrada");
    }

    //destroy
    public function destroy($id)
    {
        $expression = Expression::find($id);

        if ($expression) {
            $expression->delete();
            return redirect()->back()->with('success', "Expresión eliminada correctamente");
        }

        return redirect()->back()->with('error', "Expresión no encontrada");
    }
}
