import React from 'react'
import Footer from './Footer'
import Header from './Header'

const Main = ({ children }) => {
    return (
        <div className='w-full block'>
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