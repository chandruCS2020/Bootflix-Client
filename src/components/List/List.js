import React, { useRef ,useState } from 'react'
import ListItem from '../listItem/ListItem'
import './List.css'
import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded';
import ArrowBackIosRoundedIcon from '@mui/icons-material/ArrowBackIosRounded';
export default function List({list}) {
    const listRef = useRef();
    const [slideNumber, setslideNumber] = useState(0);
    const slide = list.value.length/2;
    const handleClick = (direction) =>{
        let distance = listRef.current.getBoundingClientRect().x - 60;
        console.log(distance);
        if(direction ==='left' && slideNumber>0){
            setslideNumber(slideNumber-1);
            listRef.current.style.transform = `translateX(${170 + distance}px)`
        }
        if(direction ==='right' && slideNumber <slide){
            setslideNumber(slideNumber+1);
            listRef.current.style.transform = `translateX(${-170 + distance}px)`
        }
    };
    return (
        <div className='list'>
            <span className="listTitle">{list.genre} Movies</span>
            <div className="listWrapper">
                {slideNumber > 0 && <ArrowBackIosRoundedIcon className='listSliderArrow left' onClick={()=>handleClick("left")}/>}
                <div className="listConatiner" ref={listRef}>
                    {list.value.map((item,i)=>(
                        <ListItem item={item} key={i}/>
                    ))}
                </div>
                {slideNumber<slide  && <ArrowForwardIosRoundedIcon className={`listSliderArrow right ${slide>=9 && `show`}`} onClick={()=>handleClick("right")} />}
            </div>
            
        </div>
    )
}
