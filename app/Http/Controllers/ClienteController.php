<?php

namespace App\Http\Controllers;

use App\Models\Cliente;
use Illuminate\Http\Request;
use DB;

class ClienteController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        try {
            $clientes = Cliente::paginate(5);
            return response()->json(['mensaje'=>'correcto', 'clientes'=>$clientes]);
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
        $cliente = new Cliente();
        $cliente->create($request->all());
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Cliente  $cliente
     * @return \Illuminate\Http\Response
     */
    public function show(Cliente $cliente)
    {
        dd($cliente);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Cliente  $cliente
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Cliente $cliente)
    {
        try {
            Cliente::where('Id', $cliente->Id)->update($request->all());
            return response()->json(["mensaje"=>"correcto"]);
        } catch (\Throwable $th) {
            return response()->json(['mensaje'=>'fallido', 'razon'=>$th->getMessage()]);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Cliente  $cliente
     * @return \Illuminate\Http\Response
     */
    public function destroy(Cliente $cliente)
    {
        try {
            Cliente::where('Id', $cliente->Id)->delete();
            return response()->json(['mensaje'=>'correcto']);
        } catch (\Throwable $th) {
            return response()->json(['mensaje'=>'fallido', 'razon'=>$th->getMessage()]);
        }
    }
}
