import React from 'react'
import { Navigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { authActions } from '../../../store/auth';


const CustomerLogout = () => {
    const dispatch = useDispatch();
    dispatch(authActions.logout());
    return (<Navigate to="/" />)
}

export default CustomerLogout