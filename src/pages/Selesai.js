import React from 'react'
import { Navbar } from '../components/Navbar'
import Card from '../components/Card'

const Selesai = ({celengans}) => {
    let filtered = celengans?.filter((data)=>{
        return data.selesai
    })
    return (
        <>
            <Navbar />
            <div className='mt-4 w-full flex flex-col justify-center items-center space-y-4'>
            {
                filtered ? filtered.map((data) => {
                    return <Card key={data.nama} data={data} />
                }) : <p>kosongh</p>
            }
            </div>
           
        </>
    )
}

export default Selesai