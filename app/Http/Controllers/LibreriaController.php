<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class LibreriaController
{
    public function __construct()
    {
    }

    public function calcularIva($valor)
    {
        $iva = $valor * 0.13;
        return $iva;
    }

    public function calcularIvaNeto($valor)
    {
        $iva = $valor / 1.13;
        return $iva;
    }

    public function impuestoRenta($valor)
    {
        $renta = $valor * 0.10;
        return $renta;
    }

    public function retencion(Proveedor $pro, Compra $com)
    {
    }
}
