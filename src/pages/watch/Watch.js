import React, { useEffect , useState ,useContext} from 'react'
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
import { RemoveWishList, WishList } from '../../context/apicalls';
import DownloadDoneIcon from '@mui/icons-material/DownloadDone';
import  {AuthContext } from '../../context/AuthContext';
export default function Watch() {
    const location = useLocation();
    const {isUser} = useContext(AuthContext);
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
    
    const [data, setdata] = useState([]);
    // useEffect(() => {
    //     const data = async()=>{
    //         try{
    //             const res = await axios.get('https://apibootflix.herokuapp.com/getWhishList',{withCredentials:true});
    //             setdata(res.data);
    //         }catch(err){
    //             console.log(err.message);
    //         }
    //     }
    //     data();
    // }, []);
    let data1 =[];
    var movieIds = '';
    var added = '';
    if(isUser){
        data1 = JSON.parse(localStorage.getItem('user')).whislist;
        movieIds = Object.keys(JSON.parse(data1));
        added = movieIds.find(element => element===movieItem._id);
    }
    const [addedIcon, setaddedIcon] = useState(false);
    
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
                                    <span>{movieItem.genre.map((items,i)=>(<Link to={'/genre/'+items} key={i}>{items}{i!==movieItem.genre.length-1?",":""}</Link>))}</span>
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
                                {movieItem._id===added || addedIcon ? <div className="movieWatchlistBtn" onClick={()=>{RemoveWishList(movieItem._id);setaddedIcon(false)}}><div><DownloadDoneIcon className='tick'/><div>Watchlist</div></div></div> :<div className="movieWatchlistBtn" onClick={()=>{WishList(movieItem._id);setaddedIcon(true)}}><div><AddIcon /><div>Watchlist</div></div></div>}
                            </div>
                            <hr />
                            <div className="trailerBox">
                                <div className="Trailer">Trailer & Extras </div>
                                <Trailer id={movieItem._id} item={movieItem} />
                            </div>
                        </div> 
                    </>
                }
            </div>
        </>
    )
}
