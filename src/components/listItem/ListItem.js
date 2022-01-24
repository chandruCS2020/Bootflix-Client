import React, { useEffect, useState } from 'react'
import './ListItem.css'
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import AddIcon from '@mui/icons-material/Add';
import ShowMoreText from "react-show-more-text";
import { Link } from 'react-router-dom';
import { WishList } from '../../context/apicalls';
import axios from 'axios';
import DownloadDoneIcon from '@mui/icons-material/DownloadDone';
export default function ListItem({item}) {
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
    const movieIds = Object.keys(data);
    console.log(movieIds);
    const added = movieIds.find(element => element===item._id);
    const [addedIcon, setaddedIcon] = useState(false);
    return (
        <>
                <div className='listItem'>
                <Link to={`/movie/${item._id}`}>
                        <img src={'https://apibootflix.herokuapp.com/get-images/'+item.image} alt="Poster" />
                        </Link>
                        <div className="listItemBackground"></div>
                        <div className="listItemInfo">
                            <div className="listItemsIcon">
                                <PlayCircleOutlineIcon />
                                {item._id===added || addedIcon ? <DownloadDoneIcon className='tick'/>:<span onClick={()=>{WishList(item._id);setaddedIcon(true)}} style={{zIndex:5}}><AddIcon /></span>}
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
                                truncatedEndingComponent={"... "}
                            >{item.movieDesc}</ShowMoreText>
                            </Link>
                        </div>
                    </div>
        </>
    )
}
