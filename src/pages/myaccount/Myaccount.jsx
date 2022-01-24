import React, { useEffect, useState } from 'react'
import Navbar from '../../components/Navbar/Navbar'
import Myaccounts from '../../components/MyAccount/Myaccount'
import axios from 'axios';
export default function Myaccount() {
    
    return (
        <div>
            <Navbar />
            <Myaccounts />
        </div>
    )
}
