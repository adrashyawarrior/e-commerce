import React, { useEffect } from 'react'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.min.css';
import { useSelector } from 'react-redux';

import Footer from './Footer'
import Header from './Header'
import { useNavigate } from 'react-router-dom';

const Main = ({ children }) => {
    const navigate = useNavigate();
    const authUser = useSelector((state) => state.authStore.authUser);
    useEffect(() => {
        if (authUser && authUser.type === 'User') {
            navigate('/dashboard');
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
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