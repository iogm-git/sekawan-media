<table>
    <thead>
        <tr>
            <th colspan="12" style="text-align: center">Laporan Periodik Pemakaian Kendaraan</th>
        </tr>
    </thead>
    <thead>
        <tr>
            <th>Id</th>
            <th>Penyetuju</th>
            <th>Pegawai</th>
            <th>Kendaraan</th>
            <th>Supir</th>
            <th>Admin Setuju</th>
            <th>User Setuju</th>
            <th>BBM Awal</th>
            <th>BBM Akhir</th>
            <th>Tanggal Mulai</th>
            <th>Tanggal Selesai</th>
            <th>Jadwal Service</th>
        </tr>
    </thead>
    <tbody>
        @foreach ($riwayat as $item)
            <tr>
                <td>{{ $item->id }}</td>
                <td>{{ $item->approver[0]->username }}</td>
                <td>{{ $item->employee[0]->nama }}</td>
                <td>{{ $item->vehicle[0]->nama }}</td>
                <td>{{ $item->driver[0]->nama }}</td>
                <td>{{ $item->admin_setuju }}</td>
                <td>{{ $item->user_setuju }}</td>
                <td>{{ $item->bbm_awal }}</td>
                <td>{{ $item->bbm_akhir }}</td>
                <td>{{ $item->tanggal_mulai }}</td>
                <td>{{ $item->tanggal_selesai }}</td>
                <td>{{ $item->jadwal_service }}</td>
            </tr>
        @endforeach
    </tbody>
</table>
