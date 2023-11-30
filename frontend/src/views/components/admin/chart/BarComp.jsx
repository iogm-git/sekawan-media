import React from 'react'
import { BarChart, Bar, Cell, XAxis, YAxis, Tooltip, CartesianGrid, LabelList, ResponsiveContainer, Label } from 'recharts';
import './BarComp.css'

const COLORS = ['#4285F4', '#EA4335'];

const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
        return (
            <div className="tooltip-custom">
                {payload.map((item) => (
                    <div className="tooltip-data" key={item.payload.id}>
                        <div className="tooltip-wrapper">
                            <div className="tooltip-title">Info Kendaraan</div>
                            {item.payload.vehicle.map((value) => (
                                <div className="tooltip-packs" key={value.id}>
                                    <div className='tooltip-key'>Nama</div>
                                    <div className="tooltip-value">: {value.nama}</div>
                                    <div className='tooltip-key'>Jenis</div>
                                    <div className="tooltip-value">: {value.jenis}</div>
                                    <div className='tooltip-key'>Status</div>
                                    <div className="tooltip-value">: {value.status}</div>
                                </div>
                            ))}
                        </div>

                        <div className="tooltip-wrapper">
                            <div className="tooltip-title">Info Tambahan</div>
                            <div className="tooltip-packs" >
                                <div className='tooltip-key'>Peminjam</div>
                                <div className="tooltip-value">: {item.payload.employee[0].nama}</div>
                                <div className='tooltip-key'>Penyetuju</div>
                                <div className="tooltip-value">: {item.payload.approver[0].username}</div>
                                <div className='tooltip-key'>Awal Pakai</div>
                                <div className="tooltip-value">: {item.payload.tanggal_mulai}</div>
                            </div>
                        </div>

                        <div className="tooltip-wrapper">
                            <div className="tooltip-title">Info BBM</div>
                            <div className="tooltip-packs" >
                                <div className='tooltip-key'>BBM Awal</div>
                                <div className="tooltip-value">: {item.payload.bbm_awal}</div>
                                <div className='tooltip-key'>BBM Akhir</div>
                                <div className="tooltip-value">: {item.payload.bbm_akhir}</div>
                            </div>
                        </div>

                        <div className="tooltip-wrapper">
                            <div className="tooltip-title">Info Service</div>
                            <div className="tooltip-packs" >
                                <div className='tooltip-key'>Selesai Pakai</div>
                                <div className="tooltip-value">: {item.payload.tanggal_selesai}</div>
                                <div className='tooltip-key'>Jadwal Service</div>
                                <div className="tooltip-value">: {item.payload.jadwal_service}</div>
                            </div>
                        </div>

                    </div>
                ))
                }
            </div >
        );
    }

    return null;
};

const BarComp = ({ data }) => {
    return (
        <ResponsiveContainer width="100%" height="100%">
            <BarChart width={100} height={40} data={data}>
                <Bar dataKey="lama_pemakaian" activeBar >
                    {data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % 20]} />
                    ))}
                    <LabelList dataKey="label_lama_pemakaian" position={'top'} />
                </Bar>
                <XAxis dataKey={"tanggal_mulai"} type='category'>
                    <Label value={'Tgl Mulai'} position={'left'} dx={15} fontSize={12} />
                </XAxis>
                <YAxis >
                    <Label angle={-90} value={'Lama Pakai Dalam Hari'} position={'center'} dx={-15} fontSize={12} />
                </YAxis>
                <CartesianGrid strokeDasharray="3 3" />
                <Tooltip cursor={{ fill: '#00000007' }} content={<CustomTooltip />} />
            </BarChart>
        </ResponsiveContainer>
    )
}

export default BarComp