import React, { useEffect, useState } from 'react'
import Navbar from '../../components/Navbar/Navbar'
import Myaccounts from '../../components/MyAccount/Myaccount'
import axios from 'axios';
export default function Myaccount() {
    const [user, setuser] = useState([]);
    useEffect(() => {
        function getData(){
            const response=axios.get("https://apibootflix.herokuapp.com/me",{withCredentials:true});
            setuser(response.data);
        }
        getData();
        
    }, [])
    return (
        <div>
            <Navbar />
            <Myaccounts />
        </div>
    )
}
