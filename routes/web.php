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
    return view('auth.login');
});


// Route::group(['middleware' => 'auth'], function () {
    Route::get('/clientes', function () {
        return view('Clientes.Cliente');
    });


    Route::get('/proveedores', function () {
        return view('Proveedores.Proveedor');
    });

    Route::get('/detallecompra', function () {
        return view('DetalleCompra.DetalleCompra');
    });

    Route::get('/productos', function () {
        return view('Productos.Producto');
    });
    Route::get('/empresa', function () {
        return view('Empresa');
    });

    Route::get('/home', [App\Http\Controllers\HomeController::class, 'index'])->name('home');

    Route::resource('/api/cliente', App\Http\Controllers\ClienteController::class);
    Route::resource('/api/proveedor', App\Http\Controllers\ProveedorController::class);
    Route::resource('/api/producto', App\Http\Controllers\ProductoController::class);
    Route::post('/api/detallecompra/compras', [App\Http\Controllers\DetalleCompraController::class, 'obtenerCompras']);
    Route::post('/api/detallecompra/eliminar', [App\Http\Controllers\DetalleCompraController::class, 'eliminar']);
    Route::apiResource('/api/detallecompra', App\Http\Controllers\DetalleCompraController::class);
    Route::resource('/api/empresa', App\Http\Controllers\EmpresaController::class);

    //Ruta para enviar foto y actualizar
    Route::post('/api/producto/{producto}', [App\Http\Controllers\ProductoController::class, 'update']);
// });

Auth::routes();
