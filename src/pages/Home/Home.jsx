import React from 'react'
import FeatureList from '../../components/Features/FeatureList/FeatureList'
import List from '../../components/List/List'
import Navbar from '../../components/Navbar/Navbar'
import VideoPlayer from '../../components/Player/VideoPlayer';
// import Subscribe from '../../components/Subscribe/Subscribe';
import './Home.css';
export default function Home() {
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
            </div>
        </>
    )
}
