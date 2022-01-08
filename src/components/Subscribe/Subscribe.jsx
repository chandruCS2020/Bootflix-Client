import React, { useContext, useState } from 'react'
import './subscribe.css'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { Link } from 'react-router-dom';
import logo from '../../images/logo.png'
import CheckIcon from '@mui/icons-material/Check';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import axios from 'axios';
import useRazorpay from "react-razorpay";
import logo1  from '../../images/logo.png';
import { AuthContext } from '../../context/AuthContext';
import { logout } from '../../context/AuthAction';
import Login from '../Login/Login';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';
export default function Subscribe() {
    const [click, setclick] = useState(false);
    const {isUser,dispatch} = useContext(AuthContext);
    console.log(isUser);
    const [open, setOpen] = useState(false);
    const onOpenModal = () => {setOpen(true)};
    const onCloseModal = () => setOpen(false);
    const handleClick = () =>{
        setclick(!click);
    }
    const subscription= JSON.parse(localStorage.getItem('user')).plan.plan;
    console.log(subscription);
    const Razorpay = useRazorpay();
    const handlePremium = ()=>{
        axios.get('https://apibootflix.herokuapp.com/upgradePlan/Preminum')
        .then((data1)=>{
            console.log(data1)
            handlePayment(data1.data.clientId,data1.data.id);
        })
        .catch((err)=>{
            console.log(err.message);
        })
    }
    const handleStandard = ()=>{
        axios.get('https://apibootflix.herokuapp.com/upgradePlan/Standard')
        .then((data1)=>{
            console.log(data1)
            handlePayment(data1.data.clientId,data1.data.id);
        })
        .catch((err)=>{
            console.log(err.message);
        })
    }
    const handlePayment = (key_id,orderId)=>{
        const options = {
            key: key_id, // Enter the Key ID generated from the Dashboard
            amount: "50000", // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
            currency: "INR",
            name: "Bootflix",
            description: "Test Transaction",
            image: logo1,
            order_id: orderId, //This is a sample Order ID. Pass the `id` obtained in the response of createOrder().
            handler: function (response) {
                orderRequest(response);
            },
            
            notes: {
            address: "Bootflix",
            },
            theme: {
            color: "#3399cc",
            },
        };
        
        const rzp1 = new Razorpay(options);
        
        rzp1.on("payment.failed", function (response) {
            alert(response.error.code);
            alert(response.error.description);
            alert(response.error.source);
            alert(response.error.step);
            alert(response.error.reason);
            alert(response.error.metadata.order_id);
            alert(response.error.metadata.payment_id);
        });
        
        rzp1.open();
    }
    const orderRequest = (data)=>{
        axios.post("https://apibootflix.herokuapp.com/payment-succesfull",data,{withCredentials:true}).then((data1)=>{
            console.log(data1);
        }).catch((err)=>{console.log(err.message)})
    }
    return (
        <div className='Subscribe'>
            <div className="Subscribe_Navbar">
                <div className="Subscribe__Logo">
                    <Link to='/'><img src={logo} alt="" /></Link>
                </div>
                <div className={`right-element Subscribe__user_details ${click && 'active'}`}>
                    {
                        isUser ? 
                        <div className="Subscribe__user_logout">
                            <div className="Subscribe_user_logSession" onClick={handleClick}>
                                <div className="Subscribe_Number">{JSON.parse(localStorage.getItem('user')).firstName}</div>
                                {click ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                            </div>
                            <ul className={`Subscribe_user_dropdown ${click && 'active'}`}>
                                <Link to='/myaccount' className="Subscribe_myAccount">
                                    <li >
                                        <span>My Account</span>
                                    </li>
                                </Link>
                                <div onClick={()=> dispatch(logout())} className="Subscribe_logout">
                                    <li >
                                        <span>Logout</span>
                                    </li>
                                </div>
                            </ul>
                        </div> :
                        <div onClick={onOpenModal} className="Subscribe_loginBtn">Log In</div>}
                    
                </div>
            </div>
            <Modal open={open} onClose={onCloseModal} closeIcon={<CloseRoundedIcon />} center classNames='LoginModel'>
                    <Login />
                </Modal>
            <div className="Subscribe_content">
                <div className="Subscribe_content_title">
                    <h1>Subscribe to watch all content on Bootflix</h1>
                </div>
                <div className="Subscribe_container">
                    <div className={`Subscribe_container_main Subscribe_Standard ${(subscription ==='Standard' || subscription ==='Preminum') && 'current'}`}>
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
                            <div className="SubscribeBtn" onClick={handleStandard}>
                                <span><CurrencyRupeeIcon /></span> 399/Year
                            </div>
                        </div>
                    </div>
                    <div className={`Subscribe_container_main Subscribe_Premium ${subscription ==='Preminum' && 'current'}`}>
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
                            <div className="SubscribeBtn"  onClick={handlePremium}>
                                <span><CurrencyRupeeIcon /></span> 799/Year
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
