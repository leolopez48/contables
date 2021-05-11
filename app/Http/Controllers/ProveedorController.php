<?php

namespace App\Http\Controllers;

use App\Models\Proveedor;
use Illuminate\Http\Request;
use DB;

class ProveedorController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        try {
            $proveedores = Proveedor::paginate(15);
            return response()->json(['mensaje'=>'correcto', 'proveedores'=>$proveedores]);
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
        $proveedor = new Proveedor();
        $id=DB::table('proveedor')->latest('Id')->first();
        $proveedor->Id = $id;
        $proveedor->nombre= $request->nombre;
        $proveedor->create($request->all());
        return response()->json(['proveedor'=>$request->all()]);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Proveedor  $proveedor
     * @return \Illuminate\Http\Response
     */
    public function show(Proveedor $proveedor)
    {
        dd($proveedor);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Proveedor  $proveedor
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Proveedor $proveedor)
    {
        try {
            Proveedor::where('Id', $proveedor->Id)->update($request->all());
            return response()->json(["mensaje"=>"correcto"]);
        } catch (\Throwable $th) {
            return response()->json(['mensaje'=>'fallido', 'razon'=>$th->getMessage()]);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Proveedor  $proveedor
     * @return \Illuminate\Http\Response
     */
    public function destroy(Proveedor $proveedor)
    {
        try {
            Proveedor::where('Id', $proveedor->Id)->delete();
            return response()->json(['mensaje'=>'correcto']);
        } catch (\Throwable $th) {
            return response()->json(['mensaje'=>'fallido', 'razon'=>$th->getMessage()]);
        }
    }
}
