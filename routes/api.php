<?php

use App\Http\Controllers\TruthTables\ExpressionsController;
use Illuminate\Support\Facades\Route;

Route::get('/expressions', [ExpressionsController::class, 'index']);
Route::post('/expressions', [ExpressionsController::class, 'store']);
Route::get('/expressions/{id}', [ExpressionsController::class, 'show']);

