import React from 'react'
import { useNavigate } from 'react-router-dom'

const Card = ({ data }) => {
    const navigate = useNavigate()
    let cicil, est
    if (data.rencana === 0) {
        cicil = "Perhari"
        est = "Hari Lagi"
    } else if (data.rencana === 1) {
        cicil = "Perminggu"
        est = "Minggu Lagi"
    } else {
        cicil = "Perbulan"
        est = "Bulan Lagi"
    }

    const handleOnclick = (id) => {
        navigate(`/celenganku/${id}`)
    }
    return (
        <div className='bg-slate-500 rounded-md shadow-md p-4 text-left w-3/4 text-gray-200'>
            <div>
                <p>{data.nama}</p>
            </div>
            <div className='flex flex-row justify-between items-center'>
                <div>
                    <p>RP {data.target}</p>
                    <p>RP {data.nominal} {cicil}</p>
                </div>
                <div>
                    <p>Progres</p>
                    <p> {parseInt(data.progres).toFixed()}%</p>
                </div>
            </div>

            <p>Estimasi: {data.estimate} {est}</p>
            <button onClick={(e) => handleOnclick(data.id)}>Detail</button>
        </div>
    )
}

export default Card
