<?php

namespace App\Http\Controllers\WaterPayments;

use App\Http\Controllers\Controller;
use App\Models\WaterPayments\Cash;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Http\Request;

class CashController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {

        $total = Cash::sum('amount');

        $pagination = Cash::orderBy('date', 'desc')->paginate(50);

        $expenses = Cash::where('amount', '<', 0)->sum('amount');
        $incomes = Cash::where('amount', '>', 0)->sum('amount');


        return inertia('Water/Cash/Index', [
            'pagination' => $pagination,
            'total' => $total,
            'expenses' => $expenses,
            'incomes' => $incomes
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create() {}

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'amount' => 'required|numeric',
            'description' => 'required',
            'type' => 'required',
            'date' => 'required | date'
        ]);

        //check if amount is negative or positive according to the type

        if ($request->type == 'EXPENSE') {
            $request->request->add(['amount' => $request->amount * -1]);
        } else {
            $request->request->add(['amount' => $request->amount]);
        }

        $request->request->remove('type');


        $total = Cash::sum('amount');
        $request->request->add(['last_total_amount' => $total]);

        Cash::create($request->all());
    }

    /**
     * Display the specified resource.
     */
    public function show(Cash $cash)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Cash $cash)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Cash $cash)
    {
        $request->validate([
            'amount' => 'required|numeric',
            'description' => 'required',
            'type' => 'required',
            'date' => 'required | date'
        ]);


        if ($request->type == 'EXPENSE') {
            $request->request->add(['amount' => $request->amount * -1]);
        } else {
            $request->request->add(['amount' => $request->amount]);
        }

        $request->request->remove('type');

        $cash->update($request->all());

        return back()->with('success', 'Registro actualizado correctamente');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Cash $cash)
    {
        try {
            $cash->delete();
        } catch (\Throwable $th) {
            return back()->with('error', 'No se pudo eliminar el registro');
        }
    }

    public function destroyAll()
    {
        Cash::truncate();
    }

    public function report()
    {
        $total = Cash::sum('amount');

        $expenses = Cash::where('amount', '<', 0)->sum('amount');
        $incomes = Cash::where('amount', '>', 0)->sum('amount');

        $items = Cash::orderBy('date', 'asc')->get();

        $total_items = count($items);

        //count_incomes
        $incomes_count = Cash::where('amount', '>', 0)->count();
        $expenses_count = Cash::where('amount', '<', 0)->count();

        $pdf = Pdf::loadView('pdf/water/cash_report', [
            'movements' => $items,
            'total' => $total,
            'expenses' => $expenses,
            'incomes' => $incomes,
            'total_items' => $total_items,
            'incomes_count' => $incomes_count,
            'expenses_count' => $expenses_count
        ]);

        $date = date('Y-m-d');

        return $pdf->stream("reporte_caja_$date.pdf");
    }
}
