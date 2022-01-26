import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import Continue from '../../components/Continue/Continue';
import FeatureList from '../../components/Features/FeatureList/FeatureList'
import List from '../../components/List/List'
import Myaccount from '../../components/MyAccount/Myaccount';
import Navbar from '../../components/Navbar/Navbar'
import VideoPlayer from '../../components/Player/VideoPlayer';
import SearchItem from '../../components/search/searchItem/SearchItem';
import SerachList from '../../components/search/serachList/SerachList';
import { AuthContext } from '../../context/AuthContext';
// import Subscribe from '../../components/Subscribe/Subscribe';
import ContinueList from '../../components/continueList/ContinueList'
import './Home.css';
export default function Home() {
    const [list, setlist] = useState([]);
    const [loading, setloading] = useState(false);
    const {isUser} = useContext(AuthContext);
    console.log(isUser);
    useEffect(() => {
        const getData = async()=>{
            try{
                const res = await axios.get('https://apibootflix.herokuapp.com/movie-genrewise');
                setlist(res.data);
                if(res.status===200){
                    setloading(true);
                }
            }catch(err){
                setloading(false);
                console.log(err.message);
            }
        }
        getData();
        
    }, []);
    console.log(isUser);
    return (
        <>
            <div className="home">
            <Navbar  isloggedin={false} isSubscribed={false} />
            <FeatureList />
            {isUser && <ContinueList />}
            { loading && list.map((item,i)=>(
                <List key={i} list={item}/>
            ))}
            {/* <Myaccount /> */}
            </div>
        </>
    )
}
