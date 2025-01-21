<?php

namespace App\Http\Controllers\Web;

use App\Http\Controllers\Controller;
use App\Models\TruthTables\Expression;
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
}
