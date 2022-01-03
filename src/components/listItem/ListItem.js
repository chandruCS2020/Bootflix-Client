import React from 'react'
import './ListItem.css'
import { movie } from '../../data/moviedata'
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import AddIcon from '@mui/icons-material/Add';
import ShowMoreText from "react-show-more-text";
export default function ListItem() {
    return (
        <div className='listItem'>
            <img src={movie[0].poster} alt="" />
            <div className="listItemBackground"></div>
            <div className="listItemInfo">
                <div className="listItemsIcon">
                    <PlayCircleOutlineIcon />
                    <AddIcon />
                </div>
                <div className="listItemMovie">
                    {movie[0].movie}
                </div>
                <div className="listItemGenere">
                    {movie[0].genre },{ movie[0].language}
                </div>
                <ShowMoreText
                lines={2}
                className="listItemDesc"
                truncatedEndingComponent={"... "}
            >{movie[0].desc}</ShowMoreText>
            </div>
        </div>
    )
}
