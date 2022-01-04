import React from 'react'
import './trailer.css'
import {movie} from '../../data/moviedata';
export default function trailer() {
    return (
        <>
            <div className="trailerContainer">
                <img src={movie[0].top} alt="" />
                <div className="trailerProperty">{movie[0].movie} - trailer</div>
                <div className="backgroundProperty"></div>
            </div>
        </>
    )
}
