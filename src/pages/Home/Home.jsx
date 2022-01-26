import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import FeatureList from '../../components/Features/FeatureList/FeatureList'
import List from '../../components/List/List'
import Navbar from '../../components/Navbar/Navbar'
import { AuthContext } from '../../context/AuthContext';
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
