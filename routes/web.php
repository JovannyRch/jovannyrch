<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\WaterPayments\CashController;
use App\Http\Controllers\WaterPayments\GroupController;
use App\Http\Controllers\WaterPayments\PaymentController;
use App\Http\Controllers\WaterPayments\PaymentTypeController;
use App\Http\Controllers\WaterPayments\WaterUserController;
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

Route::prefix('water')->group(function () {

    Route::delete('users/destroy-all', [WaterUserController::class, 'destroyAll'])->name('water.users.destroy-all')->middleware(['auth']);
    Route::delete('cash/destroy-all', [CashController::class, 'destroyAll'])->name('water.cash.destroy-all')->middleware(['auth']);

    Route::post('users/upload', [WaterUserController::class, 'upload'])->name('water.users.upload')->middleware(['auth']);

    Route::get('users/export', [WaterUserController::class, 'download'])->name('water.users.download')->middleware(['auth']);

    Route::resource('payment-types', PaymentTypeController::class)->middleware(['auth']);
    Route::resource('water-users', WaterUserController::class)->middleware(['auth']);


    Route::resource('payments', PaymentController::class)->middleware(['auth']);
    Route::resource('groups', GroupController::class)->middleware(['auth']);
    Route::resource('cash', CashController::class)->middleware(['auth']);
});

require __DIR__ . '/auth.php';
