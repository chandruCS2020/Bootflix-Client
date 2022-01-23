// import { ImagesearchRoller } from '@mui/icons-material';
import React, { useEffect } from 'react'

import './myaccount.css';
import logo from '../../images/logo.png'
import { useHistory, useLocation } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';

export default function Myaccount() {
    const history = useHistory();
    const location = useLocation();
    
    // var imageUrl=user.profilePic;
    // if(user){
    //     const response=fetch(imageUrl,{method:'get',mode:'no-cors'})
    // }
    const handleSubscribeLink = ()=>{
        history.push('/subscribe');
    }
    if(localStorage.getItem('user')===null){
        history.push(`/login?returnUrl=${location.pathname}`)
    }
    
    return (
        <div>
            <div className="Myaccount_Container">
                <div className="Myaccount_body">
                    <div className="Myaccount__container">
                        <div className="user__Profile">
                            <div className="user__Profile__details">
                                <div className="user__ProfilePic">
                                    <img src={JSON.parse(localStorage.getItem('user')).profilePic} alt="profilePic"  className='ProfileImage'/>
                                </div>
                                <div className="user__ProfileInfo">
                                    <div className="user_details"><span className="userName"><span>{JSON.parse(localStorage.getItem('user')).firstName} </span><span> {JSON.parse(localStorage.getItem('user')).lastName} </span></span></div>
                                    <div className="user_details"><span className='userName_sub'>{JSON.parse(localStorage.getItem('user'))._id} </span></div>
                                </div>
                            </div>
                        </div>
                        <div className="userSubscription_details">
                            {JSON.parse(localStorage.getItem('user')).plan.plan==='Free'?<div className="subscription_details">
                                <h3 className="sub_detials">Get more with Bootflix Premium</h3>
                                <h4 className="sub_price">Only ₹799/year</h4>
                            </div>:
                            JSON.parse(localStorage.getItem('user')).plan.plan==='Standard'?<div className="subscription_details">
                            <h3 className="sub_detials">Bootflix Standard for ₹ 399/year</h3>
                            <h4 className="sub_price">{JSON.parse(localStorage.getItem('user')).plan.days} <span>Days </span>{JSON.parse(localStorage.getItem('user')).plan.hours} <span> Hours </span> to expire</h4>
                        </div>:<div className="subscription_details">
                                <h3 className="sub_detials">Get more with Bootflix Premium</h3>
                                <h4 className="sub_price">Only ₹799/year</h4>
                            </div>
                            }
                            <div onClick={handleSubscribeLink} className="subscribe_btn">{JSON.parse(localStorage.getItem('user')).plan.plan==='Free'?`Subscribe`:`Upgrade Plan`}</div>
                        </div>
                        <div className="logoutUser" onClick={(e)=>{console.log("hvdd")}}>
                            <div className="logoutBtn">Logout</div>
                        </div>
                        <div className="logoutUser" onClick={(e)=>{console.log("dhjhdsxhjv")}}>
                            <div className="logoutBtn">Logout All</div>
                        </div>
                    </div>
                </div>
            </div> 
        </div>
    )
}
