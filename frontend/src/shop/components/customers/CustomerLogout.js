import React from 'react'
import { Navigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { authActions } from '../../../store/auth';
import { cartActions } from '../../../store/cart';

const CustomerLogout = () => {
    const dispatch = useDispatch();
    dispatch(authActions.logout());
    dispatch(cartActions.cleanCart());
    return (<Navigate to="/" />)
}

export default CustomerLogout