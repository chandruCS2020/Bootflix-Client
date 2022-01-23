import React from 'react'
import './FeatureItems.css'
export default function FeatureItems({item}) {
    return (
        <>
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
                                    {item.genre}
                                </span>
                            </p>
                            <p className="movie_description">{item.movieDesc}</p>
                        </div>
                    </div>
                    <div className="Movie_Img">
                        <div className="Movie_image_shadow"></div>
                        <img src={'https://apibootflix.herokuapp.com/get-images/'+item.titleImage} alt="Poster" />
                    </div>
                </div>
            </div>
        </>
    )
}
