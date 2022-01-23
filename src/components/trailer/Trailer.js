import React from 'react'
import './trailer.css'
import {movie} from '../../data/moviedata';
import {Link} from 'react-router-dom'
export default function trailer({id}) {
    return (
        <>
            <Link to={'/trailer/'+id+'/watch'}>
                <div className="trailerContainer">
                    <img src={movie[0].top} alt="" />
                    <div className="trailerProperty">{movie[0].movie} - trailer</div>
                    <div className="backgroundProperty"></div>
                </div>
            </Link>
        </>
    )
}
