<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Controllers\LibreriaController;

class HomeController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth');
    }

    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Contracts\Support\Renderable
     */
    public function index()
    {
        return view('home');
    }

    public function prueba(Request $request)
    {
        try {
            $valor = $request->id;
            $lib = new LibreriaController();
            $iva = $lib->calcularIvaNeto($valor);

            return response()->json(['message'=>'success', 'iva'=>$iva]);
        } catch (\Throwable $th) {
            return response()->json(['message'=>'fail', 'data'=>$th->getMessage()]);
        }
    }
}
