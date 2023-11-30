<?php

namespace App\Http\Controllers;

use App\Models\Riwayat;

class ApproverController extends Controller
{
    public function dataRiwayat()
    {
        return response()->json(Riwayat::where('penyetuju_id', '=', request('penyetuju'))->get());
    }

    public function editRiwayat()
    {
        Riwayat::find(request('id'))->update(['user_setuju' => request('user_setuju')]);

        return response()->json(['success', true]);
    }
}
