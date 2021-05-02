<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

Route::get('/clientes', function () {
    return view('Clientes.Cliente');
});


Route::get('/proveedores', function () {
    return view('Proveedores.Proveedor');
});

Route::get('/productos', function () {
    return view('Productos.Producto');
});

Auth::routes();

Route::get('/home', [App\Http\Controllers\HomeController::class, 'index'])->name('home');

// Route::post('/iva', [App\Http\Controllers\HomeController::class, 'prueba']);
