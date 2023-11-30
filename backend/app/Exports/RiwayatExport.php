<?php

namespace App\Exports;

use App\Models\Riwayat;
use Illuminate\Contracts\View\View;
use Maatwebsite\Excel\Concerns\FromView;

class RiwayatExport implements FromView
{
    public function view(): View
    {
        return view('riwayat', [
            'riwayat' => Riwayat::all()
        ]);
    }
}
