import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import CustomerService from '../../../services/CustomerService';
import { authActions } from '../../../store/auth';
import Toast from '../../layouts/Toast';

const CustomerLogin = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const notifySuccess = (message) => Toast.sucessToast(message);
    const notifyError = (message) => Toast.errorToast(message);

    const dispatch = useDispatch();

    const submit = async (e) => {
        e.preventDefault();
        const data = {
            email: email,
            password: password
        };
        const response = await CustomerService.loginCustomer(data);
        if (response.success) {
            dispatch(authActions.loginCustomer(response.data));
            notifySuccess(response.message);
            navigate('/');
        } else {
            notifyError(response.message);
            navigate('/customers/login');
        }
    }

    useEffect(() => {
        const authUser = localStorage.getItem('authUser') ? JSON.parse(localStorage.getItem('authUser')) : false;
        if (authUser) {
            if (authUser.type === 'Customer')
                navigate('/');
            else
                navigate('/dashboard');
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className='m-16 p-16 w-1/2 bg-gray-100'>
            <h1 className='pb-4 mb-4 border-b-2 text-3xl bold'>Login</h1>
            <form>
                <div className="mb-6">
                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Email</label>
                    <input type="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@flowbite.com" required=""
                        value={email} onChange={(e) => { setEmail(e.target.value) }}
                    />
                </div>
                <div className="mb-6">
                    <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Password</label>
                    <input type="password" id="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required=""
                        value={password} onChange={(e) => { setPassword(e.target.value) }}
                    />
                </div>
                <div className="flex items-start mb-6">
                    <div className="flex items-center h-5">
                        <input id="remember" type="checkbox" value="" className="w-4 h-4 bg-gray-50 rounded border border-gray-300 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800" required="" />
                    </div>
                    <label htmlFor="remember" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Remember me</label>
                </div>
                <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    onClick={submit}
                >Login</button>
            </form>

        </div>
    )
}

export default CustomerLogin