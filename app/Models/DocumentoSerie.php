<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DocumentoSerie extends Model
{
    use HasFactory;

    protected $table = "documento_serie";

    protected $fillable = [
        'Id',
        'inicia_desde',
        'termina_en',
        'serie',
        'tipo',
    ];

    public $timestamps = false;

    protected $dateFormat = 'U';
}
