import React from 'react'
import './trailer.css'
import {movie} from '../../data/moviedata';
import {Link} from 'react-router-dom'
export default function trailer({id,item}) {
    return (
        <>
            <Link to={'/trailer/'+id+'/watch'}>
                <div className="trailerContainer">
                    <img src={'https://apibootflix.herokuapp.com/get-images/'+item.titleImage} alt="" />
                    <div className="trailerProperty">{item.movieName} - trailer</div>
                    <div className="backgroundProperty"></div>
                </div>
            </Link>
        </>
    )
}
