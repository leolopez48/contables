<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Empresa extends Model
{
    use HasFactory;

    protected $table = "empresa";

    protected $fillable = [
        'Id',
        'nit',
        'nrc',
        'comercial',
        'juridico',
        'clasificacion',
    ];

    public $timestamps = false;

    protected $dateFormat = 'U';
}
