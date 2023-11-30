import React, { useState } from 'react';
import { useCookies } from 'react-cookie';

import Layouts from '../Layouts'

// assets 
import 'src/assets/css/admin/Input.css'

// components
import Select from 'src/views/components/@root/form/Select';
import Date from 'src/views/components/@root/form/Date';

// env
import { api } from 'src/env/axios';
import Alert from 'src/views/components/@root/modal/Alert';

const Input = () => {
    const [dataSelect, setDataSelect] = useState(null)
    const [cookies] = useCookies(['token'])
    const [errors, setErrors] = useState(null)
    const [modal, setModal] = useState({ show: false })

    function setAllSelect() {
        api.get('admin/data-untuk-form', { headers: { Authorization: `Bearer ${cookies.token}` } }).then(res => {
            setDataSelect(res.data)
        })
    }

    function modalClose() {
        setModal({ show: false })
    }

    // set form
    const [penyetuju, setPenyetuju] = useState(null)
    const [pegawai, setPegawai] = useState(null)
    const [kendaraan, setKendaraan] = useState(null)
    const [supir, setSupir] = useState(null)
    const [persetujuanAdmin, setPersetujuanAdmin] = useState(null)
    const [bbmAwal, setBbmAwal] = useState(null)
    const [tanggalMulai, setTanggalMulai] = useState(null)
    const [tanggalSelesai, setTanggalSelesai] = useState(null)

    function handleInput(e) {
        e.preventDefault()
        setErrors(null)
        let data = {
            penyetuju: penyetuju,
            pegawai: pegawai,
            kendaraan: kendaraan,
            supir: supir,
            persetujuanAdmin: persetujuanAdmin,
            bbmAwal: bbmAwal,
            tanggalMulai: tanggalMulai,
            tanggalSelesai: tanggalSelesai,
        }
        api.post('admin/store-riwayat', data, { headers: { Authorization: `Bearer ${cookies.token}` } })
            .then(res => { setErrors(null); setModal({ show: true, msg: `Berhasil membuat laporan pemakaian mobil , dan menunggu persetujuan oleh user`, link: 'admin' }) })
            .catch(e => setErrors(e.response.data))
    }
    // benerin select option map
    useState(() => {
        setAllSelect()
    }, [])

    return (
        <Layouts>
            {modal.show && <Alert msg={modal.msg} link={modal.link} modalClose={modalClose} />}
            <section className='input__section'>
                <form onSubmit={handleInput}>
                    <h2>Input pemesanan kendaraan dan driver</h2>
                    <div className="input__box">
                        {dataSelect &&
                            <>
                                <Select err={errors && errors.penyetuju && errors.penyetuju[0]} label='Penyetuju' select={dataSelect.penyetuju} handleChange={value => setPenyetuju(value)} />
                                <Select err={errors && errors.pegawai && errors.pegawai[0]} label='Pegawai' select={dataSelect.pegawai} handleChange={value => setPegawai(value)} />
                                <Select err={errors && errors.kendaraan && errors.kendaraan[0]} label='Kendaraan' select={dataSelect.kendaraan} handleChange={value => setKendaraan(value)} />
                                <Select err={errors && errors.supir && errors.supir[0]} label='Supir' select={dataSelect.supir} handleChange={value => setSupir(value)} />
                            </>}
                        <Select err={errors && errors.persetujuanAdmin && errors.persetujuanAdmin[0]} label='Persetujuan Admin' select={[{ 'setuju': 'ya', 'label': 'Setuju' }, { 'setuju': 'tidak', 'label': 'Tidak Setuju' }]} handleChange={value => setPersetujuanAdmin(value)} />
                        <Select err={errors && errors.bbmAwal && errors.bbmAwal[0]} label='BBM di Awal' select={[{ 'value': 75, 'label': '75 Liter' }, { 'value': 175, 'label': '175 Liter' }, { 'value': 275, 'label': '275 Liter' }, { 'value': 375, 'label': '375 Liter' }]} handleChange={value => setBbmAwal(value)} />
                        <Date err={errors && errors.tanggalMulai && errors.tanggalMulai[0]} label='Tanggal Mulai' handleChange={value => setTanggalMulai(value)} />
                        <Date err={errors && errors.tanggalSelesai && errors.tanggalSelesai[0]} label='Tanggal Selesai' handleChange={value => setTanggalSelesai(value)} />
                    </div>
                    <button type='submit' className='button'>Submit</button>
                </form>
            </section>
        </Layouts>
    )
}

export default Input