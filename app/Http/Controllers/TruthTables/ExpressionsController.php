<?php

namespace App\Http\Controllers\TruthTables;

use App\Http\Controllers\Controller;
use App\Models\TruthTables\Expression;
use Illuminate\Http\Request;



class ExpressionsController extends Controller
{
    public function index(Request $request)
    {
        $type = $request->query('type');
        if ($type) {
            return response()->json([
                'expressions' => Expression::where('type', $type)->orderBy('counter', 'desc')->paginate(20)
            ]);
        }

        return response()->json([
            'expressions' => Expression::orderBy('counter', 'desc')->paginate(20)
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'expression' => 'required',
            'type' => 'required',
        ]);

        $request['expression'] = strtolower($request['expression']);


        $expression = Expression::where('expression', $request['expression'])->first();
        if ($expression) {
            $expression->incrementCounter();
            return response()->json($expression, 200);
        }

        $request['counter'] = 1;
        $expression = Expression::create($request->all());
        return response()->json($expression, 201);
    }

    public function show($id)
    {
        return response()->json([
            'expression' => Expression::find($id)
        ]);
    }

    public function showVideo()
    {
        return response()->json([
            'expressions' => Expression::whereNotNull('video_link')->orderBy('counter', 'desc')->paginate(20)
        ]);
    }



}
