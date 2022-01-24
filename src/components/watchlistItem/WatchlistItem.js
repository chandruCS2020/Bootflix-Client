import React from 'react'
import './watchlistItem.css';
import {movie} from '../../data/moviedata';
import ShowMoreText from "react-show-more-text";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { Link } from 'react-router-dom';
import { RemoveWishList, WishList } from '../../context/apicalls';
export default function WatchlistItem({item}) {
    return (
        <>
            
                <div className="watchlist_container">
                <Link to={'/movie/'+item._id}>
                    <img src={'https://apibootflix.herokuapp.com/get-images/'+item.titleImage} alt="" />
                    </Link>
                    <div className="watchlist_property">
                    <Link to={'/movie/'+item._id}><div className="watchlist_background"></div></Link>
                        <div className="watchlist_property_content">
                        <Link to={'/movie/'+item._id}><h1 className="watchlist_movie">{item.movieName}</h1>
                            <ShowMoreText
                                lines={2}
                                className="watchlistItemDesc"
                                truncatedEndingComponent={"... "}
                            >{item.movieDesc}</ShowMoreText></Link>
                            <div className="removewatchlistBtn" onClick={()=>RemoveWishList(item._id)} style={{zIndex:2}}>
                                <span><DeleteOutlineIcon /></span>
                                <span className="removewatchlist">remove from watchlist</span>
                            </div>
                        </div>
                    </div>
                </div>
        </>
    )
}
