<?php

use Illuminate\Http\Request;
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

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});
Route::resource('/cliente', App\Http\Controllers\ClienteController::class);
Route::resource('/proveedor', App\Http\Controllers\ProveedorController::class);
Route::resource('/producto', App\Http\Controllers\ProductoController::class);
Route::resource('/detallecompra', App\Http\Controllers\DetalleCompraController::class);
Route::resource('/empresa', App\Http\Controllers\EmpresaController::class);

//Ruta para enviar foto y actualizar
Route::post('/producto/{producto}', [App\Http\Controllers\ProductoController::class, 'update']);
