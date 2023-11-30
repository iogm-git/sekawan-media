<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Persetujuan extends Model
{
    use HasFactory;

    public $timestamps = false;
    protected $table = 'persetujuan';
    protected $guarded = [''];
}
