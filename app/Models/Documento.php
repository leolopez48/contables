<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Documento extends Model
{
    use HasFactory;

    protected $table = "documento";

    protected $fillable = [
        'Id',
        'numero',
        'serie',
        'cliente',
        'fecha',
        'documento_anterior',
        'anulada_por',
        'motivo_anulacion',
        'afectas',
        'exentas',
        'iva',
        'retencion',
        'condiciones',
        'datos_cliente',
        'nota_remision',
        'creacion',
        'creado_por',
        'caso',
    ];

    public $timestamps = false;

    protected $dateFormat = 'U';
}
