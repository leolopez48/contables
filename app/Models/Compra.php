<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Compra extends Model
{
    use HasFactory;

    protected $table = "compra";

    protected $fillable = [
        'Id',
        'afectas',
        'iva',
        'retencion',
        'proveedor',
        'fecha',
        'registrado_por',
        'condiciones',
    ];

    public $timestamps = false;

    protected $dateFormat = 'U';
}
