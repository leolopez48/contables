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
use DB;

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
            $detallecompras = DetalleCompra::paginate(15);
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
        $usuario = Auth::user()->name;

        $compra = new Compra();

        $compra->condiciones = $request->compra["condicion"];
        $compra->fecha = $request->compra["fecha"];
        $compra->iva = $request->compra["iva"];
        $compra->retencion = $request->compra["retencion"];
        $compra->afectas = $request->compra["total"];
        $compra->registrado_por = $usuario;
        $compra->proveedor = $request->compra["proveedor"];

        $compra->save();

        $compra = DB::table('compra')->latest('Id')->first();

        foreach ($request->productos as $pro) {
            $det = new DetalleCompra();
            $det->compra = $compra->Id;
            $det->producto = (int)$pro["Id"];
            $det->price = (double)$pro["Precio"];
            $det->cant = (int)$pro["cantidad"];
            $det->save();
            $cantidadAnterior = Producto::find($det->producto);
            // $id = DB::table('producto')->latest('Id')->first();
            // dd($id->Id);
            $nuevaExistencia = (int)$cantidadAnterior["Existencias"]-(int)$det->cant;
            DB::table('producto')->where('Id', $det->producto)->update(['Existencias'=> $nuevaExistencia]);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\DetalleCompra  $detalleCompra
     * @return \Illuminate\Http\Response
     */
    public function show(DetalleCompra $detalleCompra)
    {
        // dd($detalleCompra);
        $detalleCompras = DB::table('detalle_compra')
        ->where(['compra'=>$detalleCompra->compra])
        ->join('producto', 'producto.Id', '=', 'detallecompra.Id')
        ->get();
        return response()->json(['detalleCompras'=>$detalleCompras]);
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
        $usuario = Auth::user()->name;
        $id = $request->Id;

        $compra = new Compra();
        // dd($request->compra["condicion"]);
        $compra->exists = true;
        $compra->Id = $request->compra["Id"];
        $compra->condiciones = $request->compra["condicion"];
        $compra->fecha = $request->compra["fecha"];
        $compra->iva = $request->compra["iva"];
        $compra->retencion = $request->compra["retencion"];
        $compra->afectas = $request->compra["total"];
        $compra->registrado_por = $usuario;
        $compra->proveedor = $request->compra["proveedor"];

        // $compras = Compras::where(['Id'=>$compra->Id]);
        // $detalles = DetalleCompra::where(['compra'=>$compra->Id]);
        // dd($compras, $detalles);
        // $det = DB::table('detalle_compra')->where(['Id'=>$request->Id])->first();
        // $pro = DB::table('producto')->where(['Id'=>$det->producto])->first();

        // $cantidadAnterior = $pro->Existencias;
        // $nuevaExistencia = $cantidadAnterior+(int)$det->cant;
        // DB::table('producto')->where('Id', $pro->Id)->update(['Existencias'=> $nuevaExistencia]);

        DB::table('detalle_compra')->where(['compra'=>$compra->Id])->delete();
        DB::table('compra')->where(['Id'=>$compra->Id])->delete();

        Compra::create([
        'Id'=>$compra->Id,
        'condiciones'=>$compra->condiciones,
        'fecha'=>$compra->fecha,
        'iva'=>$compra->iva,
        'retencion'=>$compra->retencion,
        'afectas'=>$compra->afectas,
        'registrado_por'=>$compra->registrado_por,
        'proveedor'=>$compra->proveedor]);

        foreach ($request->productos as $pro) {
            $det = new DetalleCompra();
            $det->exists = true;
            $det->Id = $id;
            // dd($det->Id);
            $det->compra = $compra->Id;
            $det->producto = (int)$pro["Id"];
            $det->price = (double)$pro["Precio"];
            $det->cant = (int)$pro["cantidad"];

            DB::table('producto')->where(['Id'=>$det->producto])->update(['Existencias'=>$pro["Existencias"]]);

            // $det->save();
            DetalleCompra::create([
                'Id'=>$det->Id,
                'compra'=>$det->compra,
                'producto'=>$det->producto,
                'cant'=>$det->cant,
                'price'=>$det->price,
            ]);
        }
        // $compra->save();

        // $compra = DB::table('compra')->latest('Id')->first();
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\DetalleCompra  $detalleCompra
     * @return \Illuminate\Http\Response
     */
    public function destroy(DetalleCompra $detalleCompra)
    {
        try {
            DetalleCompra::where('Id', $detalleCompra->Id)->dd();
            return response()->json(['mensaje'=>'correcto']);
        } catch (\Throwable $th) {
            return response()->json(['mensaje'=>'fallido', 'razon'=>$th->getMessage()]);
        }
    }

    public function eliminar(Request $request)
    {
        try {
            $det = DB::table('detalle_compra')->where(['Id'=>$request->Id])->first();
            $pro = DB::table('producto')->where(['Id'=>$det->producto])->first();
            $cantidadAnterior = $pro->Existencias;
            $nuevaExistencia = $cantidadAnterior+(int)$det->cant;
            DB::table('producto')->where('Id', $pro->Id)->update(['Existencias'=> $nuevaExistencia]);
            DetalleCompra::where('Id', $request->Id)->delete();
            return response()->json(['mensaje'=>'correcto']);
        } catch (\Throwable $th) {
            return response()->json(['mensaje'=>'fallido', 'razon'=>$th->getMessage()]);
        }
    }

    public function obtenerCompras(Request $request)
    {
        $detalleCompras = DB::table('detalle_compra')
        ->select('producto.*', 'detalle_compra.cant as cantidad')
        ->join('producto', 'detalle_compra.producto', '=', 'producto.Id')
        ->where('detalle_compra.compra', $request->compra)
        ->get();
        return response()->json(['detalleCompras'=>$detalleCompras]);
    }
}
