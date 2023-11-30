<?php

namespace App\Http\Controllers;

use App\Exports\RiwayatExport;
use App\Models\Kendaraan;
use App\Models\Pegawai;
use App\Models\Riwayat;
use App\Models\Supir;
use App\Models\User;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Validator;
use Maatwebsite\Excel\Facades\Excel;

class AdminController extends Controller
{
    public function dataRiwayat()
    {
        return response()->json(Riwayat::get());
    }

    public function dataUntukForm()
    {
        return response()->json(['penyetuju' => User::where('username', '!=', 'admin')->get(['id', 'username']), 'pegawai' => Pegawai::where('kondisi', '=', 'siap ditugaskan')->get(['id', 'nama']), 'kendaraan' => Kendaraan::where('kondisi', '=', 'siap ditugaskan')->get(['id', 'nama', 'jenis', 'status']), 'supir' => Supir::where('kondisi', '=', 'siap ditugaskan')->get(['id', 'nama'])]);
    }

    public function storeRiwayat()
    {
        $validator = Validator::make(request()->all(), [
            'penyetuju' => 'required',
            'pegawai' => 'required',
            'kendaraan' => 'required',
            'supir' => 'required',
            'persetujuanAdmin' => 'required',
            'bbmAwal' => 'required',
            'tanggalMulai' => 'required',
            'tanggalSelesai' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 401);
        }

        Pegawai::find(request('pegawai'))->update(['kondisi' => 'sedang beroperasi']);
        Supir::find(request('supir'))->update(['kondisi' => 'sedang beroperasi']);
        Kendaraan::find(request('kendaraan'))->update(['kondisi' => 'sedang beroperasi']);

        Riwayat::create([
            'penyetuju_id' => request('penyetuju'),
            'pegawai_id' => request('pegawai'),
            'kendaraan_id' => request('kendaraan'),
            'supir_id' => request('supir'),
            'admin_setuju' => request('persetujuanAdmin'),
            'bbm_awal' => request('bbmAwal'),
            'tanggal_mulai' => request('tanggalMulai'),
            'tanggal_selesai' => request('tanggalSelesai'),
            'jadwal_service' => Carbon::createFromFormat('Y-m-d', request('tanggalSelesai'))->addDays(2)->format('Y-m-d')
        ]);

        return response()->json(['success' => 'true']);
    }

    public function export()
    {
        return Excel::download(new RiwayatExport, 'riwayat.xlsx');
    }
}
