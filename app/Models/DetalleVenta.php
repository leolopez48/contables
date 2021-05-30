<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DetalleVenta extends Model
{
    use HasFactory;

    protected $table = "detalle_documento";

    protected $fillable = [
        'Id',
        'documento',
        'producto',
        'cant',
        'price',
    ];

    public $timestamps = false;

    protected $dateFormat = 'U';
}
