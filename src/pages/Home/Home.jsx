import React, { useContext } from 'react'
import FeatureList from '../../components/Features/FeatureList/FeatureList'
import List from '../../components/List/List'
import Myaccount from '../../components/MyAccount/Myaccount';
import Navbar from '../../components/Navbar/Navbar'
import VideoPlayer from '../../components/Player/VideoPlayer';
import { AuthContext } from '../../context/AuthContext';
// import Subscribe from '../../components/Subscribe/Subscribe';
import './Home.css';
export default function Home() {
    const {user}=useContext(AuthContext);
    console.log(user);
    return (
        <>
            <div className="home">
            <Navbar  isloggedin={false} isSubscribed={false} />
            <FeatureList />
            <List />
            <List />
            <List />
            <List />
            <VideoPlayer />
            <List />
            <Myaccount />
            </div>
        </>
    )
}
