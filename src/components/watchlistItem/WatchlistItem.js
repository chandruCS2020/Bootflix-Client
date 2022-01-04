import React from 'react'
import './watchlistItem.css';
import {movie} from '../../data/moviedata';
import ShowMoreText from "react-show-more-text";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
export default function WatchlistItem() {
    return (
        <>
            <div className="watchlist_container">
                <div className="watchlist_img">
                    <img src={movie[0].top} alt="" />
                </div>
                <div className="watchlist_property">
                    <div className="watchlist_background"></div>
                    <div className="watchlist_property_content">
                        <h1 className="watchlist_movie">{movie[0].movie}</h1>
                        <ShowMoreText
                            lines={2}
                            className="watchlistItemDesc"
                            truncatedEndingComponent={"... "}
                        >{movie[0].desc}</ShowMoreText>
                        <div className="removewatchlistBtn">
                            <span><DeleteOutlineIcon /></span>
                            <span className="removewatchlist">remove from watchlist</span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
