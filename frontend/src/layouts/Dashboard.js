import React from 'react'
import Navbar from './Navbar'
import Sidebar from './Sidebar'

const Dashboard = ({ children }) => {
    let auth = localStorage.getItem('user');
    if (auth)
        return (
            <div className='w-full block'>
                <div className='w-full block'>
                    <Navbar />
                </div>
                <div className='w-full block'>
                    <div className='w-1/5 inline-block'>
                        <Sidebar />
                    </div>
                    <main className='w-4/5 inline-block'>
                        {children}
                    </main>
                </div>
            </div>
        )
    else
        return (
            <>
                {children}
            </>
        )
}

export default Dashboard