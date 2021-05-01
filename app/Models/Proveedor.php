<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Proveedor extends Model
{
    use HasFactory;

    protected $table = "proveedor";

    protected $fillable = [
        'Id',
        'tipo',
        'clasificacion',
        'nit',
        'nrc',
        'nombre',
        'razon_social',
        'direccion',
        'telefono',
    ];

    public $timestamps = false;

    protected $dateFormat = 'U';
}
