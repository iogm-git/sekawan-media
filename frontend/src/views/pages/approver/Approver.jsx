import React, { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';

import Layouts from '../Layouts'

// assets 
import 'src/assets/css/@root/form.css'
import 'src/assets/css/approver/Approver.css'

// components
import Alert from 'src/views/components/@root/modal/Alert';

// env
import { api } from 'src/env/axios';
import useAuthContext from 'src/context/AuthContext';

const Approver = () => {
    const [cookies] = useCookies(['token'])
    const [modal, setModal] = useState({ show: false })
    const [dataRiwayat, setDataRiwayat] = useState(null)
    const { user } = useAuthContext()

    function modalClose() {
        setModal({ show: false })
    }

    function getRiwayat() {
        if (user != null) {
            api.get(`approver/data-riwayat?penyetuju=${user.id}`, { headers: { Authorization: `Bearer ${cookies.token}` } })
                .then(res => setDataRiwayat(res.data))
        }
    }

    function handleSetuju(id, value) {
        api.post('approver/edit-riwayat', { id: id, user_setuju: value }, { headers: { Authorization: `Bearer ${cookies.token}` } })
            .then(res => {
                getRiwayat()
                setModal({ show: true, msg: `Update riwayat pemakaian mobil berhasil dengan id : ${id} dan status setuju : ${value}`, link: 'approver' })
            })
    }

    useEffect(() => {
        getRiwayat()
    }, [user])

    return (
        <Layouts>
            {modal.show && <Alert msg={modal.msg} link={modal.link} modalClose={modalClose} />}
            <section className='content-wrapper'>
                <h2>Data yang harus disetujui dalam hal Pemakaian Mobil</h2>
                <div className="approver__box">
                    {dataRiwayat && dataRiwayat.map((value, index) => (
                        <div className="approver__card" key={index}>
                            <div className="approver__card-id">id : {value.id}</div>
                            <div className="approver__card-box">
                                <div className='approver__card-div'>
                                    <div className="approver__card-part">Kendaraan Id : {value.vehicle[0].id}</div>
                                    <div className="approver__card-pack">
                                        <div className="approver__card-key">Nama</div>
                                        <div className="approver__card-value">: {value.vehicle[0].nama}</div>
                                        <div className="approver__card-key">Jenis</div>
                                        <div className="approver__card-value">: {value.vehicle[0].jenis}</div>
                                        <div className="approver__card-key">Status</div>
                                        <div className="approver__card-value">: {value.vehicle[0].status}</div>
                                        <div className="approver__card-key">Kondisi</div>
                                        <div className="approver__card-value">: {value.vehicle[0].kondisi}</div>
                                        <div className="approver__card-key">Tanggal</div>
                                        <div className="approver__card-value">: {value.tanggal_mulai} - {value.tanggal_selesai}</div>
                                    </div>
                                </div>
                                <div className='approver__card-div'>
                                    <div className="approver__card-part">Info Tambahan </div>
                                    <div className="approver__card-info">
                                        <div className='approver__info'>
                                            <div className="approver__info-key">Atas Nama Pegawai</div>
                                            <div className="approver__info-value">{value.employee[0].nama}</div>
                                        </div>
                                        <div className='approver__info'>
                                            <div className="approver__info-key">Tanggal</div>
                                            <div className="approver__info-value">{value.tanggal_mulai} - {value.tanggal_selesai}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="approver__card-buttons">
                                <div className="approver__card-part">Menyetujui</div>
                                <div className="approver__card-btn-pack">
                                    <div onClick={() => handleSetuju(value.id, 'ya')} className={value.user_setuju == 'ya' ? "approver__card-btn active" : "approver__card-btn"}>Ya</div>
                                    <div onClick={() => handleSetuju(value.id, 'tidak')} className={value.user_setuju == 'tidak' ? "approver__card-btn active" : "approver__card-btn"}>Tidak</div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </Layouts>
    )
}

export default Approver