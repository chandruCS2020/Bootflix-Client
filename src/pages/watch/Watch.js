import React, { useEffect } from 'react'
import './watch.css';
import VideoPlayer from '../../components/Player/VideoPlayer'
import Navbar from '../../components/Navbar/Navbar';
import {movie} from '../../data/moviedata';
import  { Link } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import Trailer from '../../components/trailer/Trailer';
import { useLocation } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
export default function Watch() {
    let location = useLocation();
    const genre=location.pathname.split('/');
    let history= useHistory();
    console.log(genre[3]);
    useEffect(() => {
        window.onbeforeunload = ()=>{
            localStorage.setItem("user","fhfc");
        }
    }, [location])
    return (
        <>
            <div className="watch">
                <Navbar  isloggedin={false} isSubscribed={false} />
                <VideoPlayer /> 
                <div className="movieWatch">
                    <div className="movieWatchDesc">
                        <h1 className="movieWatchTitle">{movie[0].movie}</h1>
                        <p className='movieWatchAll'>
                            <span><Link to='/'>{movie[0].genre}</Link></span>
                            <span> . </span>
                            <span><Link to='/'>{movie[0].language}</Link></span>
                            <span> . </span>
                            <span>{movie[0].year}</span>
                            <span> . </span>
                            <span>{movie[0].certificate}</span>
                            <span> . </span>
                            <span>{movie[0].content}</span>
                        </p>
                        <p className="movieWatchDesc">{movie[0].desc}</p>
                    </div>
                    <div className="movieWatchShare">
                        <div className="movieWatchlistBtn"><div><AddIcon /><div>Watchlist</div></div></div>
                    </div>
                    <hr />
                    <div className="trailerBox">
                        <div className="Trailer">Trailer & Extras </div>
                        <Trailer />
                    </div>
                </div> 
            </div>
        </>
    )
}
