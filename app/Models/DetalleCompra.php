<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DetalleCompra extends Model
{
    use HasFactory;

    protected $table = "detalle_compra";

    protected $fillable = [
        'Id',
        'compra',
        'producto',
        'cant',
        'price',
    ];

    public $timestamps = false;

    protected $dateFormat = 'U';
}
