import React from 'react'
import './FeatureItems.css'
export default function FeatureItems(item) {
    return (
        <>
            <div className="FeatureItem">
                <div className="FeatureItemsWrapper">
                    
                    <div className="MovieProperty">
                        <div className="Movie_Prop">
                            <h1 key={item.index}>{item.item.movie}</h1>
                            <p className="movie_genre_language"> 
                                <span className="movie_Language">
                                    {item.item.language}
                                </span>
                                <span className="movie_genre">
                                    {item.item.genre}
                                </span>
                            </p>
                            <p className="movie_description">{item.item.desc}</p>
                        </div>
                    </div>
                    <div className="Movie_Img">
                        <div className="Movie_image_shadow"></div>
                        <img src={item.item.top} alt="Poster" />
                    </div>
                </div>
            </div>
        </>
    )
}
