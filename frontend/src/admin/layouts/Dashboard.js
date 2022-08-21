import React from 'react'
import Navbar from './Navbar'
import Sidebar from './Sidebar'

const Dashboard = ({ children }) => {
    let auth = localStorage.getItem('user');
    if (auth)
        return (
            <div className='w-full block'>
                <div className='w-full flex flex-row'>
                    <div className='w-1/6 inline-block'>
                        <Sidebar />
                    </div>
                    <main className='w-5/6 flex flex-col'>
                        <Navbar />
                        <div className='p-2'>
                            {children}
                        </div>
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