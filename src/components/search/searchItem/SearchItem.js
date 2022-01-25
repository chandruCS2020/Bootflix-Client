import React from 'react';
import { Link } from 'react-router-dom';
import './searchItem.css';
export default function SearchItem({item,list}) {
    return(
        <>
            <Link to={'/movie/'+item._id}>
                <div className="searchItem">
                <div className="searchLeft">
                    <img src={'https://apibootflix.herokuapp.com/get-images/'+item.titleImage} alt="" />
                </div>
                <div className="searchRight">
                    <div className="searchMovieName">
                        {item.movieName}
                    </div>
                    <div className="searchDesc">
                    {item.genre.map((items,i)=>(<>{items}{','}</>))}{item.language}
                    </div>
                </div>
            </div>
            </Link>
        </>
    )
}
