import React, { useContext, useEffect, useState } from 'react';
import './watchItem.css';
import PlayCircleFilledWhiteIcon from '@mui/icons-material/PlayCircleFilledWhite';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Eligible } from '../../context/movieContext/apicalls';
import { MovieContext } from '../../context/movieContext/MovieContext';

export default function WatchItem({item}) {
    const [erroeredirect, seterroeredirect] = useState(false);
    
    const {isEligible,dispatch} = useContext(MovieContext);
    // useEffect(() => {
    //     const getdata = async()=>{
    //         try{
    //             const res = await axios.get('https://apibootflix.herokuapp.com/isEligiblieForMovie/'+item._id,{withCredentials:true});
    //             if(res.status===200){
    //                 console.log("se");
    //                 seterroeredirect(false);
    //             }else if(res.status===404){
    //                 console.log("404");
    //                 seterroeredirect(true);
    //             }
    //             // setplan(res.data.plan);
    //             // seterroeredirect(res.data.plan===`${isUser ? JSON.parse(localStorage.getItem('user')).plan.plan : 'Free'}`)
    //         }catch(err){
    //             seterroeredirect(true);
    //             console.log(err.message);
    //         }
    //     }
    //     // getdata();
    // }, []);
    useEffect(() => {
        Eligible(dispatch,item._id);
    }, []);
    console.log(isEligible);
    return(
        <>
            <Link to={`/movie/`+item._id+`/watch${erroeredirect ? `?isEligible=${erroeredirect}` : ''}`}>
                <div className="FeatureItem">
                    <div className="FeatureItemsWrapper">
                        
                        <div className="MovieProperty">
                            <div className="Movie_Prop">
                                <h1 >{item.movieName}</h1>
                                
                                <p className="movie_genre_language"> 
                                    <span className="movie_Language">
                                        {item.language}
                                    </span>
                                    <span className="movie_genre">
                                        {item.genre.map((items,i)=>(<span key={i}>{items}{i!==item.genre.length-1?",":""}</span>))}
                                    </span>
                                </p>
                                <p className="movie_description">{item.movieDesc}</p>
                                <div className='moviePlay'>
                                    <PlayCircleFilledWhiteIcon /> <span>Watch Movie</span>
                                </div>
                            </div>
                        </div>
                        <div className="Movie_Img">
                            <div className="Movie_image_shadow"></div>
                            <img src={'https://apibootflix.herokuapp.com/get-images/'+item.titleImage} alt="Poster" />
                        </div>
                    </div>
                </div>
            </Link>
        </>
    );
}
