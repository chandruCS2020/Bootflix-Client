import React, { useEffect , useState } from 'react'
import './watch.css';
import VideoPlayer from '../../components/Player/VideoPlayer'
import Navbar from '../../components/Navbar/Navbar';
import {movie} from '../../data/moviedata';
import  { Link } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import Trailer from '../../components/trailer/Trailer';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import WatchItem from '../../components/watchItem/WatchItem';
import { WishList } from '../../context/apicalls';
export default function Watch() {
    const location = useLocation();
    const movieId=location.pathname.split('/')[2];
    const [movieItem, setmovieItem] = useState([]);
    const [loading, setloading] = useState(false);
    useEffect(() => {
        const data = async()=>{
            try{
                const res = await axios.get('https://apibootflix.herokuapp.com/movie/'+movieId);
                setmovieItem(res.data);
                if(res.status===200){
                    setloading(true);
                }
            }catch(err){
                setloading(false);
                console.log(err.message);
            }
        }
        data();
    }, []);
    console.log(movieItem);
    
    // const genre=location.pathname.split('/');
    // let history= useHistory();
    // console.log(history)
    // console.log(genre[3]);
    // useEffect(() => {
    //     window.onbeforeunload = ()=>{
    //         // localStorage.setItem("user","fhfc");
    //     }
    // }, [location])
    console.log()
    
    return (
        <>
            <div className="watch">
                <Navbar  isloggedin={false} isSubscribed={false} />
                {loading &&
                    <>
                        <WatchItem item={movieItem} />
                        <div className="movieWatch">
                            <div className="movieWatchDesc">
                                <h1 className="movieWatchTitle">{movieItem.movieName}</h1>
                                <p className='movieWatchAll'>
                                    <span>{movieItem.genre.map((items,i)=>(<Link to={'/'+items} key={i}>{items}{i!==movieItem.genre.length-1?",":""}</Link>))}</span>
                                    <span> . </span>
                                    <span><Link to='/'>{movieItem.language}</Link></span>
                                    <span> . </span>
                                    <span>{movieItem.year}</span>
                                    <span> . </span>
                                    <span>{movieItem.limit} +</span>
                                </p>
                                <p className="movieWatchDesc">{movieItem.movieDesc}</p>
                            </div>
                            <div className="movieWatchShare">
                                <div className="movieWatchlistBtn" onClick={()=>WishList(movieItem._id)}><div><AddIcon /><div>Watchlist</div></div></div>
                            </div>
                            <hr />
                            <div className="trailerBox">
                                <div className="Trailer">Trailer & Extras </div>
                                <Trailer id={movieItem._id} />
                            </div>
                        </div> 
                    </>
                }
            </div>
        </>
    )
}
