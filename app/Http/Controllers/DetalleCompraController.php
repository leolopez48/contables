<?php

namespace App\Http\Controllers;

use App\Models\DetalleCompra;
use App\Models\Compra;
use App\Models\Producto;
use App\Models\Proveedor;
use App\Models\Empresa;
use Illuminate\Http\Request;
use Auth;
use App\User;

class DetalleCompraController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        try {
            $detallecompras = DetalleCompra::paginate(5);
            $compra = Compra::get();
            $producto= Producto::get();
            $proveedor= Proveedor::get();
            $empresa= Empresa::get();
            return response()->json(['mensaje'=>'correcto',
            'detallecompras'=>$detallecompras ,
            'compras'=>$compra ,
            'productos'=>$producto,
            'empresa'=>$empresa[0],
            'proveedores'=>$proveedor]);
        } catch (\Throwable $th) {
            return response()->json(['mensaje'=>'fallido', 'razon'=>$th->getMessage()]);
        }
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $usuario = $request;
        dd(optional(Auth::user())->id);
        foreach ($request->productos as $pro) {
            $compra = new Compra();
            // $compra->Id = $pro->Id;
            $compra->condiciones = $pro->condicion;
            $compra->fecha = $pro->fecha;
            $compra->iva = $pro->iva;
            $compra->retencion = $pro->retencion;
            $compra->afectas = $pro->total;
            $compra->registrado_por = $usuario;
            $compra->proveedor = $pro->proveedor;
            return response()->json([$compra]);
        }
        // $detallecompra = new DetalleCompra();
        // $id=DB::table('detalle_compra')->latest('Id')->first();
        // $detallecompra->Id = $id;
        // $detallecompra->create($request->all());
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\DetalleCompra  $detalleCompra
     * @return \Illuminate\Http\Response
     */
    public function show(DetalleCompra $detalleCompra)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\DetalleCompra  $detalleCompra
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, DetalleCompra $detalleCompra)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\DetalleCompra  $detalleCompra
     * @return \Illuminate\Http\Response
     */
    public function destroy(DetalleCompra $detalleCompra)
    {
        //
    }
}
