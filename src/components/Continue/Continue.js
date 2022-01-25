import React from 'react';
import { Link } from 'react-router-dom';
import './continue.css';
export default function Continue({array}) {
    console.log(array);
    const percentage = (Math.round(array.prevTime)/Math.round(array.totalTime))*100;
    console.log(percentage);
    return(
        <>
            <Link to={{pathname:'/movie/'+array._id._id+'/watch',time:Math.round(array.prevTime)}}>
            <div className="continueItem">
                <img src={'https://apibootflix.herokuapp.com/get-images/'+array._id.titleImage} alt="" />
                <div className="movieName">{array._id.movieName}</div>
                <progress value={Math.round(percentage)} max={100}></progress>
            </div>
            </Link>
        </>
    )
}
