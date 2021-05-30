<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\DetalleVenta;

class DetalleVentaController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $detalles = DetalleVenta::paginate(5);

        return response()->json(['message'=>'success', 'detalleventas'=>$detalles]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\DetalleVenta  $detalleVenta
     * @return \Illuminate\Http\Response
     */
    public function show(DetalleVenta $detalleVenta)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\DetalleVenta  $detalleVenta
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, DetalleVenta $detalleVenta)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\DetalleVenta  $detalleVenta
     * @return \Illuminate\Http\Response
     */
    public function destroy(DetalleVenta $detalleVenta)
    {
        //
    }
}
