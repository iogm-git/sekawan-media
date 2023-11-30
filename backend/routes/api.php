<?php

use App\Http\Controllers\AdminController;
use App\Http\Controllers\ApproverController;
use App\Http\Controllers\AuthController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::controller(AuthController::class)->prefix('auth')->group(function () {
    Route::post('login', 'login');
    Route::post('logout', 'logout');
    Route::post('refresh', 'refresh');
    Route::post('me', 'me');
});

Route::controller(AdminController::class)->prefix('admin')->middleware('jwt.verify')->group(function () {
    Route::get('data-riwayat', 'dataRiwayat');
    Route::get('data-export', 'export');
    Route::get('data-untuk-form', 'dataUntukForm');
    Route::post('store-riwayat', 'storeRiwayat');
});

Route::controller(ApproverController::class)->prefix('approver')->middleware('jwt.verify')->group(function () {
    Route::get('data-riwayat', 'dataRiwayat');
    Route::post('edit-riwayat', 'editRiwayat');
});
