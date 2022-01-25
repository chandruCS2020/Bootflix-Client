import React from 'react'
import GoogleIcon from '@mui/icons-material/Google';
import TwitterIcon from '@mui/icons-material/Twitter';
import './login.css';
export default function Login() {
    const handleLogin = ()=>{
        window.location.href='https://accounts.google.com/o/oauth2/v2/auth?response_type=code&client_id=976399131482-mv20jui1ieahgp2p3j9jokdc467kgqnv.apps.googleusercontent.com&scope=openid%20email%20profile&redirect_uri=https%3A//apibootflix.herokuapp.com/oauth-google-callback&state=aroundTrip';
    }
    const handleTwitterLogin = ()=>{
        window.location.href='https://twitter.com/i/oauth2/authorize?response_type=code&client_id=RUcxaDlXNEtBcjk5TkYydnYzWEc6MTpjaQ&redirect_uri=https://apibootflix.herokuapp.com/twitter-oauth&scope=tweet.read%20offline.access%20users.read&state=3027087406414.963&code_challenge=challenge&code_challenge_method=plain';
    }
    return (
        <div className='Login'>
            <div className="signUp_with_google signUp_btn" onClick={handleLogin}><GoogleIcon />signup with Google</div>
            <div className="orSignUp"><span>- </span>or<span> -</span></div>
            <div className="signUp_with_Facebook signUp_btn" onClick={handleTwitterLogin}><TwitterIcon /> signup with Twitter</div>
        </div>
    )
}
