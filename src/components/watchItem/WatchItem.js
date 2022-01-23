import React from 'react';
import './watchItem.css';
import PlayCircleFilledWhiteIcon from '@mui/icons-material/PlayCircleFilledWhite';
import { Link } from 'react-router-dom';

export default function WatchItem({item}) {
    
    return(
        <>
            <Link to={'/movie/'+item._id+'/watch'}>
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
