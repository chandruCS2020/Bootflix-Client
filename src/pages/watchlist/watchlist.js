import axios from 'axios';
import React, { useEffect } from 'react'
import { useState } from 'react';
import Navbar from '../../components/Navbar/Navbar'
import Watchlist from '../../components/watchlistItem/WatchlistItem'
import './watchlist.css'
export default function Watchlists() {
    const [data, setdata] = useState([]);
    useEffect(() => {
        const data = async()=>{
            try{
                const res = await axios.get('https://apibootflix.herokuapp.com/getWhishList',{withCredentials:true});
                setdata(res.data);
            }catch(err){
                console.log(err.message);
            }
        }
        data();
    }, []);
    const movieIds = Object.values(data);
    console.log(movieIds);
    
    return (
        <>
            <div className="watchlist">
                <Navbar  isloggedin={false} isSubscribed={false} />
                <div className="watchlistPage_container">
                    <div className="watchlist_title"><h1 className="watchlist_titlehead">Wishlist</h1></div>
                    {
                    movieIds.length<=0
                        ?
                        <div className="noData">
                            <h1 className="nodataFound">No WishList</h1>
                        </div>
                        :
                    
                    <div className="watchlist_body">
                        {movieIds.map((item,i)=>(
                            <Watchlist item={item} key={i}/>
                        ))}
                    </div>
                }
                </div>
            </div>
        </>
    )
}
