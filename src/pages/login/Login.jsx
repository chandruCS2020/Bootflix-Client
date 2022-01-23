import React from 'react'
import { useLocation } from 'react-router-dom';
import Logins from '../../components/Login/Login'
import './login.css';
export default function Login() {
    const location =useLocation();
    console.log(location.search)
    return (
        <div className='login'>
            <div className="login_container">
                <Logins />
            </div>
        </div>
    )
}
