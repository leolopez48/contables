<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class LibreriaController extends Controller
{
    public function calcularIvaNeto($valor)
    {
        $iva = $valor * 0.13;
        return $iva;
    }
}
