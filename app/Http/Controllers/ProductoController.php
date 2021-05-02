<?php

namespace App\Http\Controllers;

use App\Models\Producto;
use Illuminate\Http\Request;
use DB;
use Storage;

class ProductoController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        try {
            $productos = Producto::paginate(5);
            return response()->json(['mensaje'=>'correcto', 'productos'=>$productos]);
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
        $fullUrl = "";
        $producto = new producto();

        $id=DB::table('producto')->latest('Id')->first();

        if ($request->hasFile('Imagen')) {
            $photo = Storage::put('public', $request->Imagen);
            $url = Storage::url($photo);
            $fullUrl = asset($url);
        }

        $producto = $request->except(['Imagen']);
        $producto["Id"] = $id->Id+1;
        $producto["Imagen"] = $url;

        Producto::insert([$producto]);

        return response()->json(['mensaje'=>'correcto', 'producto'=>$producto]);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Producto  $producto
     * @return \Illuminate\Http\Response
     */
    public function show(Producto $producto)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Producto  $producto
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Producto $producto)
    {
        try {
            $url = "";

            if ($request->imagenModificada) {
                if ($request->hasFile('Imagen')) {
                    $photo = Storage::put('public', $request->Imagen);
                    $url = Storage::url($photo);
                    $fullUrl = asset($url);
                }
            }

            $pro = new Producto();
            $pro = $request->except('imagenModificada');
            $pro["Imagen"] = $url;

            Producto::where('Id', $producto->Id)->update($pro);
            return response()->json(["mensaje"=>"correcto"]);
        } catch (\Throwable $th) {
            return response()->json(['mensaje'=>'fallido', 'razon'=>$th->getMessage()]);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Producto  $producto
     * @return \Illuminate\Http\Response
     */
    public function destroy(Producto $producto)
    {
        try {
            Producto::where('Id', $producto->Id)->delete();
            return response()->json(['mensaje'=>'correcto']);
        } catch (\Throwable $th) {
            return response()->json(['mensaje'=>'fallido', 'razon'=>$th->getMessage()]);
        }
    }
}
