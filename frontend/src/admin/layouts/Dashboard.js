import React, { useEffect } from 'react'
import Navbar from './Navbar'
import Sidebar from './Sidebar'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const Dashboard = ({ children }) => {
    const navigate = useNavigate();
    const authUser = useSelector((state) => state.authStore.authUser);
    useEffect(() => {
        if (!authUser || authUser.type !== 'User') {
            navigate('/');
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

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
}

export default Dashboard