import React from 'react'
import './ListItem.css'
import { movie } from '../../data/moviedata'
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import AddIcon from '@mui/icons-material/Add';
import ShowMoreText from "react-show-more-text";
import { Link } from 'react-router-dom';
export default function ListItem({item}) {
    return (
        <>
            <Link to={`/movie/${item._id}`}>
                <div className='listItem'>
                        <img src={'https://apibootflix.herokuapp.com/get-images/'+item.image} alt="Poster" />
                        <div className="listItemBackground"></div>
                        <div className="listItemInfo">
                            <div className="listItemsIcon">
                                <PlayCircleOutlineIcon />
                                <AddIcon />
                            </div>
                            <div className="listItemMovie">
                                {item.movieName}
                            </div>
                            <div className="listItemGenere">
                                {item.genre.map((item,i)=>(<span key={i}>{item}{i!==item.length-1 ? ',' :''}</span>)) }{ item.language}
                            </div>
                            <ShowMoreText
                            lines={2}
                            className="listItemDesc"
                            truncatedEndingComponent={"... "}
                        >{item.movieDesc}</ShowMoreText>
                        </div>
                    </div>
            </Link>
        </>
    )
}
