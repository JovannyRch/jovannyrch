<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\Web\TruthTablesController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

//truth-tables
Route::get('/truth-tables', [TruthTablesController::class, 'index'])->middleware(['auth', 'verified'])->name('truth-tables.index');
Route::post('/truth-tables/update', [TruthTablesController::class, 'update'])->middleware(['auth', 'verified'])->name('truth-tables.update');
Route::post('/truth-tables/store', [TruthTablesController::class, 'store'])->middleware(['auth', 'verified'])->name('truth-tables.store');
Route::delete('/truth-tables/{id}', [TruthTablesController::class, 'destroy'])->middleware(['auth', 'verified'])->name('truth-tables.destroy');


Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__ . '/auth.php';
