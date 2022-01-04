import React from 'react'
import GoogleIcon from '@mui/icons-material/Google';
import TwitterIcon from '@mui/icons-material/Twitter';
import './login.css';
export default function Login() {
    const handleLogin = ()=>{
        console.log("hcchc")
    }
    return (
        <div className='Login'>
            <div className="signUp_with_google signUp_btn" onClick={handleLogin}><GoogleIcon />signup with Google</div>
            <div className="orSignUp"><span>- </span>or<span> -</span></div>
            <div className="signUp_with_Facebook signUp_btn"><TwitterIcon /> signup with Twitter</div>
        </div>
    )
}
