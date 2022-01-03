import React, { useRef ,useState } from 'react'
import ListItem from '../listItem/ListItem'
import './List.css'
import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded';
import ArrowBackIosRoundedIcon from '@mui/icons-material/ArrowBackIosRounded';
export default function List() {
    const listRef = useRef();
    const [slideNumber, setslideNumber] = useState(0);
    const handleClick = (direction) =>{
        let distance = listRef.current.getBoundingClientRect().x - 60;
        console.log(distance);
        if(direction ==='left' && slideNumber>0){
            setslideNumber(slideNumber-1);
            listRef.current.style.transform = `translateX(${170 + distance}px)`
        }
        if(direction ==='right' && slideNumber <7){
            setslideNumber(slideNumber+1);
            listRef.current.style.transform = `translateX(${-170 + distance}px)`
        }
    };
    return (
        <div className='list'>
            <span className="listTitle">Continue to watch</span>
            <div className="listWrapper">
                {slideNumber > 0 && <ArrowBackIosRoundedIcon className='listSliderArrow left' onClick={()=>handleClick("left")}/>}
                <div className="listConatiner" ref={listRef}>
                    <ListItem />
                    <ListItem />
                    <ListItem />
                    <ListItem />
                    <ListItem />
                    <ListItem />
                    <ListItem />
                    <ListItem />
                    <ListItem />
                    <ListItem />
                    <ListItem />
                    <ListItem />
                    <ListItem />
                    <ListItem />
                    <ListItem />
                </div>
                {slideNumber<7 && <ArrowForwardIosRoundedIcon className='listSliderArrow right' onClick={()=>handleClick("right")} />}
            </div>
            
        </div>
    )
}
