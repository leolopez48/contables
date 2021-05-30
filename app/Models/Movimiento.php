<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Movimiento extends Model
{
    use HasFactory;

    protected $table = "movimiento";

    protected $fillable = [
        'Id',
        'producto',
        'Cantidad',
        'Ultima_existencia',
        'Precio',
        'Costo',
        'Ultimo_costo',
        'descripcion',
    ];

    public $timestamps = false;

    protected $dateFormat = 'U';
}
