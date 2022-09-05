import React from 'react'
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.min.css';

import Footer from './Footer'
import Header from './Header'

const Main = ({ children }) => {
    return (
        <div className='w-full block'>
            <ToastContainer />
            <div className='w-full flex flex-col'>
                <Header />
                <main className=''>
                    <div className=''>
                        {children}
                    </div>
                </main>
                <Footer />
            </div>
        </div>
    )
}

export default Main