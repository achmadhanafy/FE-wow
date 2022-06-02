import React from 'react'
import { Link } from 'react-router-dom'
import notfound from '../assets/nofound.svg'

function NotFound() {
    return (
        <div className="flex flex-col justify-center items-center h-screen">
            <div>
                <img src={notfound} width="250px" alt=""/>
            </div>
            <div className="text-3xl font-semibold mt-5">
                404
            </div>
            <p className="text-lg text-gray-500 ml-3">
                Maaf halaman tersebut tidak dapat ditemukan
            </p>
            <Link to="/home"><div className="button bgPrimary text-white mt-5" style={{padding:'10px 10px 10px 10px'}}>Kembali ke Beranda</div></Link>
        </div>
    )
}

export default NotFound
