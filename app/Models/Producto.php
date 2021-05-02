<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Producto extends Model
{
    use HasFactory;

    protected $table = "producto";

    protected $fillable = [
        'Id',
        'Nombre',
        'Existencias',
        'Precio',
        'Costo',
        'Descripcion',
        'Imagen',
        'Codigo',
    ];

    public $timestamps = false;

    protected $dateFormat = 'U';
}
