<?php

use App\Http\Controllers\TruthTables\ExpressionsController;
use App\Http\Controllers\WaterPayments\CashController;
use Illuminate\Support\Facades\Route;

Route::get('/expressions', [ExpressionsController::class, 'index']);
Route::post('/expressions', [ExpressionsController::class, 'store']);
Route::get('/expressions/videos', [ExpressionsController::class, 'showVideos']);
Route::get('/expressions/{id}', [ExpressionsController::class, 'show']);


Route::group(['prefix' => 'water'], function () {
    Route::get('/cash-report', [CashController::class, 'report'])->name('cash.report');
});
