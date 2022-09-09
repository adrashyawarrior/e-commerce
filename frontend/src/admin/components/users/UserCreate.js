import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import UserService from '../../../services/UserService';

const UserCreate = () => {
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("");
    const [status, setStatus] = useState("");

    const [statuses, setStatuses] = useState([]);
    const [roles, setRoles] = useState([]);

    useEffect(() => {
        UserService.createUser().then((response) => {
            setStatuses(response.statuses);
            setRoles(response.roles);
        }).catch((error) => {
            console.log(error);
        });
    }, []);

    const submit = async (e) => {
        e.preventDefault();
        const data = {
            name: name,
            email: email,
            password: password,
            role: role,
            status: status
        };
        await UserService.storeUser(data);
        navigate('/users');
    }

    return (
        <div className='m-8 p-16 rounded-xl bg-gray-100'>
            <h1 className='pb-4 mb-4 border-b-2 text-3xl bold'>Add New User</h1>
            <form>
                <div className="mb-6">
                    <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Full Name</label>
                    <input type="text" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Robert Junior" required=""
                        value={name} onChange={(e) => { setName(e.target.value) }}
                    />
                </div>
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
                <div className="mb-6">
                    <label htmlFor="role" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">Select an option</label>
                    <select id="role" name="role" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        value={role} onChange={(e) => { setRole(e.target.value) }}
                    >
                        {roles.map(function (value, index) {
                            return (
                                <option key={"role-" + value} value={value}>{value}</option>
                            )
                        })}
                    </select>
                </div>
                <div className="mb-6">
                    <label htmlFor="status" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">Select an option</label>
                    <select id="status" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        value={status} onChange={(e) => { setStatus(e.target.value) }}
                    >
                        {statuses.map(function (value, index) {
                            return (
                                <option key={"status-" + value} value={value}>{value}</option>
                            )
                        })}
                    </select>
                </div>
                <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    onClick={submit}
                >Submit</button>
            </form>

        </div>
    )
}

export default UserCreate