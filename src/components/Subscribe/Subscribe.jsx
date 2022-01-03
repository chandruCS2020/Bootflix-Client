import React, { useState } from 'react'
import './subscribe.css'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { Link } from 'react-router-dom';
import logo from '../../images/logo.png'
import CheckIcon from '@mui/icons-material/Check';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
export default function Subscribe() {
    const [click, setclick] = useState(false);
    const handleClick = () =>{
        setclick(!click);
    }
    const user=true;
    const subscription=localStorage.getItem("subscription");
    localStorage.setItem("subscription","");
    console.log(subscription)
    return (
        <div className='Subscribe'>
            <div className="Subscribe_Navbar">
                <div className="Subscribe__Logo">
                    <Link to='/'><img src={logo} alt="" /></Link>
                </div>
                <div className={`right-element Subscribe__user_details ${click && 'active'}`}>
                    {
                        user ? 
                        <div className="Subscribe__user_logout">
                            <div className="Subscribe_user_logSession" onClick={handleClick}>
                                <div className="Subscribe_Number">+916374520688</div>
                                {click ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                            </div>
                            <ul className={`Subscribe_user_dropdown ${click && 'active'}`}>
                                <Link to='/myaccount' className="Subscribe_myAccount">
                                    <li >
                                        <span>My Account</span>
                                    </li>
                                </Link>
                                <Link to='/logout' className="Subscribe_logout">
                                    <li >
                                        <span>Logout</span>
                                    </li>
                                </Link>
                            </ul>
                        </div> :
                        <div className="Subscribe_loginBtn">Log In</div>}
                    
                </div>
            </div>
            <div className="Subscribe_content">
                <div className="Subscribe_content_title">
                    <h1>Subscribe to watch all content on Bootflix</h1>
                </div>
                <div className="Subscribe_container">
                    <div className={`Subscribe_container_main Subscribe_Standard ${(subscription ==='Standard' || subscription ==='Premium') && 'current'}`}>
                        <div className="Subscribe_main_title"><h3>Standard</h3></div>
                        <div className="Subscribe_details">
                            <ul className="Subscribe_details_list">
                                <li className="Subscribe_details_items">
                                    <span><CheckIcon /></span>All Content
                                </li>
                                <li className="Subscribe_details_items">
                                <span><CheckIcon /></span> Watch on TV or Laptop
                                </li>
                                <li className="Subscribe_details_items">
                                    <span>2</span> devices 
                                </li>
                            </ul>
                            <div className="SubscribeBtn">
                                <span><CurrencyRupeeIcon /></span> 399/Year
                            </div>
                        </div>
                    </div>
                    <div className={`Subscribe_container_main Subscribe_Premium ${subscription ==='Premium' && 'current'}`}>
                        <div className="Subscribe_main_title"><h3>Premium</h3></div>
                        <div className="Subscribe_details">
                            <ul className="Subscribe_details_list">
                                <li className="Subscribe_details_items">
                                    <span><CheckIcon /></span>All Content
                                </li>
                                <li className="Subscribe_details_items">
                                <span><CheckIcon /></span> Watch on TV or Laptop
                                </li>
                                <li className="Subscribe_details_items">
                                    <span>4</span> devices 
                                </li>
                            </ul>
                            <div className="SubscribeBtn">
                                <span><CurrencyRupeeIcon /></span> 799/Year
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
