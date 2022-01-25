import React, { useContext, useEffect, useState } from 'react'
import './ListItem.css'
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import AddIcon from '@mui/icons-material/Add';
import ShowMoreText from "react-show-more-text";
import { Link } from 'react-router-dom';
import { WishList } from '../../context/apicalls';
import axios from 'axios';
import DownloadDoneIcon from '@mui/icons-material/DownloadDone';
import { RemoveWishList } from '../../context/apicalls';
import OfflineBoltIcon from '@mui/icons-material/OfflineBolt';
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';
import { AuthContext } from '../../context/AuthContext';
export default function ListItem({item}) {
    const [data, setdata] = useState([]);
    const {isUser} = useContext(AuthContext);
    useEffect(() => {
        var d=document.querySelectorAll('.my-anchor-css-class');
        for (let i = 0; i < d.length; i++) {
            d[i].remove();
        }
        // const data = async()=>{
        //     try{
        //         const res = await axios.get('https://apibootflix.herokuapp.com/getWhishList',{withCredentials:true});
        //         setdata(res.data);
        //     }catch(err){
        //         console.log(err.message);
        //     }
        // }
        // data();
    }, []);
    let data1 =[];
    var movieIds = '';
    var added = '';
    if(isUser){
        data1 = JSON.parse(localStorage.getItem('user')).whislist;
        movieIds = Object.keys(JSON.parse(data1));
        added = movieIds.find(element => element===item._id);
    }
    const [addedIcon, setaddedIcon] = useState(false);
    return (
        <>
                <div className='listItem'>
                <Link to={`/movie/${item._id}`}>
                        <img src={'https://apibootflix.herokuapp.com/get-images/'+item.image} alt="Poster" />
                        </Link>
                        <div className="listItemBackground"></div>
                        <div className="iconGet">{item.plan==='Standard' ? <OfflineBoltIcon /> : item.plan!=='Free' && <LocalFireDepartmentIcon style={{color:'red'}} />}</div>
                        <div className="listItemInfo">
                            <div className="listItemsIcon">
                                <Link to={`/movie/${item._id}`}>
                                    <PlayCircleOutlineIcon />
                                </Link>
                                {item._id===added || addedIcon ? <span onClick={()=>{RemoveWishList(item._id);setaddedIcon(true)}}><DownloadDoneIcon className='tick'/></span>:<span onClick={()=>{WishList(item._id);setaddedIcon(true)}} style={{zIndex:5}}><AddIcon /></span>}
                            </div>
                            <Link to={`/movie/${item._id}`}>
                                <div className="listItemMovie">
                                    {item.movieName}
                                </div>
                                <div className="listItemGenere">
                                    {item.genre.map((item,i)=>(<span key={i}>{item}{i!==item.length-1 ? ',' :''}</span>)) }{ item.language}
                                </div>
                                <ShowMoreText
                                lines={2}
                                className="listItemDesc"
                                anchorClass="my-anchor-css-class"
                                expanded={false}
                                truncatedEndingComponent={"... "}
                            >{item.movieDesc}</ShowMoreText>
                            </Link>
                        </div>
                    </div>
        </>
    )
}
