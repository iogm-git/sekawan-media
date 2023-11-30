import React, { useEffect, useState } from 'react'

import ChartKonsumsiBbm from 'src/views/components/admin/chart/PieComp'
import BarChart from 'src/views/components/admin/chart/BarComp'
import Layouts from 'src/views/pages/Layouts'
import { api } from 'src/env/axios'
import 'src/assets/css/admin/Admin.css'
import { useCookies } from 'react-cookie'

const Admin = () => {
    // inisialisasi data
    const [konsumsiBbm, setKonsumsiBbm] = useState(null)
    const [pemakaianKendaraan, setPemakaianKendaraan] = useState(null)
    const [riwayatPemakaian, setRiwayatPemakaian] = useState(null)

    // monitoring kendaraan
    const [cookies] = useCookies(['token'])
    function getData() {
        api.get('admin/data-riwayat', { headers: { Authorization: `Bearer ${cookies.token}` } }).then(e => {
            setRiwayatPemakaian(e.data)
            let kendaraanAngkutOrang = 0, kendaraanAngkutBarang = 0, dataPemakaianKendaraan = []

            for (let i = 0; i < e.data.length; i++) {
                let item = e.data[i],
                    vehicle = item.vehicle[0]

                // === chart untuk konsumsi bbm ===
                if (vehicle.jenis.includes('Orang')) {
                    kendaraanAngkutOrang += (item.bbm_awal - item.bbm_akhir)
                } else if (vehicle.jenis.includes('Barang')) {
                    kendaraanAngkutBarang += (item.bbm_awal - item.bbm_akhir)
                }
                // === chart untuk konsumsi bbm ===

                // === chart untuk pemakaian kendaraan ===
                // function untuk mendapatkan lama pemakaian mobil dalam hari
                function diffDay(tanggal_selesai, tanggal_mulai) {
                    return (tanggal_selesai.getTime() - tanggal_mulai.getTime()) / (1000 * 3600 * 24)
                }
                // function untuk mengubah format tanggal
                function changeFormatDate(param) {
                    let newFormatDate = new Date(param)
                    return `${newFormatDate.getDate()}-${newFormatDate.getMonth() + 1}-${newFormatDate.getFullYear()}`
                }

                item.lama_pemakaian = diffDay(new Date(item.tanggal_selesai), new Date(item.tanggal_mulai))
                item.tanggal_mulai = changeFormatDate(item.tanggal_mulai)
                item.tanggal_selesai = changeFormatDate(item.tanggal_selesai)
                item.jadwal_service = changeFormatDate(item.jadwal_service)
                item.label_lama_pemakaian = `${item.lama_pemakaian} Hari`
                dataPemakaianKendaraan.push(item)
                // === chart untuk pemakaian kendaraan ===
            }

            setKonsumsiBbm([
                { name: 'Kendaraan Angkut Orang', value: kendaraanAngkutOrang },
                { name: 'Kendaraan Angkut Barang', value: kendaraanAngkutBarang }
            ])

            setPemakaianKendaraan(dataPemakaianKendaraan)

            // chart untuk riwayat pemakaian
        })
    }

    // download excel
    function download() {
        api.get('admin/data-export', { headers: { Authorization: `Bearer ${cookies.token}` }, responseType: 'blob' })
            .then((res) => {
                let url = window.URL.createObjectURL(new Blob([res.data]))
                let link = document.createElement('a')
                link.href = url
                link.setAttribute('download', 'file.xlsx')
                document.body.appendChild(link)
                link.click()
            })
    }

    useEffect(() => {
        konsumsiBbm == null && getData()
    }, [])

    return (
        <Layouts>
            <section className='admin__data'>
                <div className="content-wrapper">
                    <div className="admin__chart-title">
                        Riwayat Pemakaian Kendaraaan
                    </div>
                    <div className="admin__chart-box">
                        <div className="admin__chart-svg">
                            {pemakaianKendaraan && <BarChart data={pemakaianKendaraan} />}
                        </div>
                    </div>
                </div>

                <div className="content-wrapper">
                    <div className="admin__chart-title">
                        Konsumsi Bbm
                    </div>
                    <div className="admin__chart-box">
                        <div className="admin__chart-svg">
                            {konsumsiBbm && <ChartKonsumsiBbm data={konsumsiBbm} />}
                        </div>
                    </div>
                </div>

                <div className="content-wrapper">
                    <div className="admin__chart-title">
                        Jadwal Service
                    </div>
                    <div className="admin__view__table">
                        <table className='admin__table'>
                            <thead>
                                <tr>
                                    <th>Id</th>
                                    <th>Nama</th>
                                    <th>Jenis</th>
                                    <th>Status</th>
                                    <th>Awal Pakai</th>
                                    <th>Seleseai Pada</th>
                                    <th>Jadwal Service</th>
                                </tr>
                            </thead>
                            <tbody>
                                {pemakaianKendaraan && pemakaianKendaraan.map((value) => (
                                    <tr key={value.id}>
                                        <td>{value.vehicle[0].id}</td>
                                        <td>{value.vehicle[0].nama}</td>
                                        <td>{value.vehicle[0].jenis}</td>
                                        <td>{value.vehicle[0].status}</td>
                                        <td>{value.tanggal_mulai}</td>
                                        <td>{value.tanggal_selesai}</td>
                                        <td>{value.jadwal_service}</td>
                                    </tr>
                                ))}
                            </tbody>

                        </table>
                    </div>
                </div>
            </section>

            <section className='admin__laporan content-wrapper'>
                <h2>Laporan Periodik</h2>
                <div className="button button-blue" onClick={download}>Download</div>
                {/* <a href="http://127.0.0.1:8000/api/admin/data-export" className='button button-blue' download={'file'}>download</a> */}
                <div className="admin__view__table">
                    <table className='admin__table'>
                        <thead>
                            <tr>
                                <th>Id Riwayat</th>
                                <th>Penyetuju</th>
                                <th>Pegawai</th>
                                <th>Kendaraan</th>
                                <th>Supir</th>
                                <th>BBM Awal</th>
                                <th>Tanggal Mulai</th>
                                <th>Tanggal Selesai</th>
                                <th>Disetujui User</th>
                            </tr>
                        </thead>
                        <tbody>
                            {riwayatPemakaian && riwayatPemakaian.map((item, index) => (
                                <tr key={index}>
                                    <td>{item.id}</td>
                                    <td>{item.approver[0].username}</td>
                                    <td>{item.employee[0].nama}</td>
                                    <td>{item.vehicle[0].nama}</td>
                                    <td>{item.driver[0].nama}</td>
                                    <td>{item.bbm_awal}</td>
                                    <td>{item.tanggal_mulai}</td>
                                    <td>{item.tanggal_selesai}</td>
                                    <td>{item.user_setuju}</td>
                                </tr>
                            ))}
                        </tbody>

                    </table>
                </div>
            </section>
        </Layouts>
    )
}

export default Admin