<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Riwayat extends Model
{
    use HasFactory;

    public $timestamps = false;
    protected $table = 'riwayat';
    protected $guarded = [''];
    protected $with = ['approver', 'employee', 'vehicle', 'driver'];

    public function approver()
    {
        return $this->hasMany(User::class, 'id', 'penyetuju_id');
    }

    public function employee()
    {
        return $this->hasMany(Pegawai::class, 'id', 'pegawai_id');
    }

    public function vehicle()
    {
        return $this->hasMany(Kendaraan::class, 'id', 'kendaraan_id');
    }

    public function driver()
    {
        return $this->hasMany(Supir::class, 'id', 'supir_id');
    }
}
