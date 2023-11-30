<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use App\Models\Kendaraan;
use App\Models\Pegawai;
use App\Models\Persetujuan;
use App\Models\Riwayat;
use App\Models\Supir;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        // \App\Models\User::factory(10)->create();

        // \App\Models\User::factory()->create([
        //     'name' => 'Test User',
        //     'email' => 'test@example.com',
        // ]);

        $users = [
            ['username' => 'admin', 'password' => Hash::make('admin')],
            ['username' => 'user_1', 'password' => Hash::make('user_1')],
            ['username' => 'user_2', 'password' => Hash::make('user_2')],
        ];

        foreach ($users as $value) {
            User::create(['username' => $value['username'], 'password' => $value['password']]);
        }

        $kendaraan = [
            ['nama' => 'truck_1', 'jenis' => 'Angkut Barang', 'status' => 'Milik Perusahaan', 'kondisi' => 'sedang beroperasi'],
            ['nama' => 'mobil_1', 'jenis' => 'Angkut Orang', 'status' => 'Sewa Kendaraan', 'kondisi' => 'sedang beroperasi'],
            ['nama' => 'truck_2', 'jenis' => 'Angkut Barang', 'status' => 'Sewa Kendaraan', 'kondisi' => 'siap ditugaskan'],
            ['nama' => 'mobil_2', 'jenis' => 'Angkut Orang', 'status' => 'Milik Perusahaan', 'kondisi' => 'siap ditugaskan'],
        ];

        foreach ($kendaraan as $value) {
            Kendaraan::create(['nama' => $value['nama'], 'jenis' => $value['jenis'], 'status' => $value['status'], 'kondisi' => $value['kondisi']]);
        }

        for ($i = 1; $i <= 5; $i++) {
            if ($i == 2 || $i == 3) {
                Supir::create(['nama' => 'Supir_' . $i, 'kondisi' => 'sedang beroperasi']);
                Pegawai::create(['nama' => 'Pegawai_' . $i, 'kondisi' => 'sedang beroperasi']);
            } else {
                Supir::create(['nama' => 'Supir_' . $i]);
                Pegawai::create(['nama' => 'Pegawai_' . $i]);
            }
        }

        $riwayat = [
            ['penyetuju_id' => '2', 'pegawai_id' => '1', 'kendaraan_id' => '2', 'supir_id' => '3', 'admin_setuju' => 'ya', 'user_setuju' => 'ya', 'bbm_awal' => 200, 'bbm_akhir' => 100, 'tanggal_mulai' => '2023-11-03', 'tanggal_selesai' => '2023-12-03', 'jadwal_service' => '2023-12-05'],
            ['penyetuju_id' => '3', 'pegawai_id' => '2', 'kendaraan_id' => '1', 'supir_id' => '2', 'admin_setuju' => 'ya', 'user_setuju' => 'ya', 'bbm_awal' => 500, 'bbm_akhir' => 50, 'tanggal_mulai' => '2023-11-03', 'tanggal_selesai' => '2024-04-03', 'jadwal_service' => '2024-04-05'],
        ];

        foreach ($riwayat as $value) {
            Riwayat::create(['penyetuju_id' => $value['penyetuju_id'], 'pegawai_id' => $value['pegawai_id'], 'kendaraan_id' => $value['kendaraan_id'], 'supir_id' => $value['supir_id'], 'admin_setuju' => $value['admin_setuju'], 'user_setuju' => $value['user_setuju'], 'bbm_awal' => $value['bbm_awal'], 'bbm_akhir' => $value['bbm_akhir'], 'tanggal_mulai' => $value['tanggal_mulai'], 'tanggal_selesai' => $value['tanggal_selesai'], 'jadwal_service' => $value['jadwal_service']]);
        }

        $persetujuan = [
            ['user_id' => '2', 'riwayat' => '1'],
            ['user_id' => '3', 'riwayat' => '2']
        ];

        foreach ($persetujuan as $value) {
            Persetujuan::create(['user_id' => $value['user_id'], 'riwayat' => $value['riwayat']]);
        }
    }
}
