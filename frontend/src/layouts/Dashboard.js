import React from 'react'
import Navbar from './Navbar'
import Sidebar from './Sidebar'
import AuthUser from '../components/auth/AuthUser'

const Dashboard = ({ children }) => {
    if (!AuthUser)
        return (<></>);
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
}

export default Dashboard