
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Tambah = ({ celengans, setCelengans }) => {
    const navigate = useNavigate()

    const [nama, setNama] = useState("")
    const [target, setTarget] = useState("")
    const [nominal, setNominal] = useState("")
    const [rencana, setRencana] = useState(0)

    const handleSubmit = (e) => {
        e.preventDefault()
        let estimate = target / nominal
        if (parseInt(nominal) > parseInt(target)) {
            return alert("salah")
        }
        const now = new Date(Date.now())
        let temp = {
            id: +new Date(),
            nama: nama,
            target: target,
            nominal: nominal,
            rencana: rencana,
            dibuat: now.toLocaleDateString(),
            progres: 0,
            estimate: estimate.toFixed(),
            terkumpul: 0,
            kurang: target,
            data: [
            ],
            selesai: false
        }
        setCelengans([...celengans, temp])
        navigate("/")
    }

    return (
        <div className='h-screen flex justify-center'>
            <form onSubmit={handleSubmit} className="flex flex-col justify-center h-72 mt-24 gap-4 p-8 rounded-md shadow-md bg-slate-500">
                <div className='w-full flex justify-start '>
                <button onClick={e=>navigate(-1)}>
                    Back
                </button>
                </div>
                
                <div className='flex space-x-2'>
                    <p>Nama</p>
                    <input className='rounded-md p-1 bg-transparent border' onChange={(e) => setNama(e.target.value)} name='nama' type='text' placeholder='Nama tabungan' required />
                </div>

                <div className='flex space-x-2'>
                    <p>Target</p>
                    <input className='rounded-md p-1 bg-transparent border' onChange={(e) => setTarget(e.target.value)} name='target' type='number' placeholder='Target Tabungan' required />
                </div>
                <div className='flex space-x-2'>
                    <p>Nominal</p>
                    <input className='rounded-md p-1 bg-transparent border' onChange={(e) => setNominal(e.target.value)} name='nominal' type='number' placeholder='Nominal Pengisian' required />
                </div>
                <div>
                    <p>Rencana Pengisian</p>
                    <select className='rounded-md p-1 bg-transparent border' onChange={(e) => setRencana(e.target.value)} value={rencana} name="cars" id="cars" required>
                        <option value="0">Harian</option>
                        <option value="1">Mingguan</option>
                        <option value="2">Bulanan</option>
                    </select>
                </div>
                <div className='w-full flex justify-center items-center'>
                    <input className='rounded-md shadow-sm w-32' type='submit' />
                </div>

            </form>
        </div>
    )
}

export default Tambah