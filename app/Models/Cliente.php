<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Cliente extends Model
{
    use HasFactory;

    protected $table = "cliente";

    protected $fillable = [
        'Id',
        'nombre',
        'clasificacion',
        'direccion',
        'nit',
        'nrc',
        'razon_social',
        'giro',
        'telefono',
    ];

    public $timestamps = false;

    protected $dateFormat = 'U';
}
