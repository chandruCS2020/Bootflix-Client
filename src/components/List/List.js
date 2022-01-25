import React, { useEffect, useRef ,useState } from 'react'
import ListItem from '../listItem/ListItem'
import './List.css'
import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded';
import ArrowBackIosRoundedIcon from '@mui/icons-material/ArrowBackIosRounded';
function getWindowDimensions() {
    const { innerWidth: width, innerHeight: height } = window;
    return {
        width,
        height
    };
}
export default function List({list}) {
    const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());

    useEffect(() => {
        function handleResize() {
        setWindowDimensions(getWindowDimensions());
        }

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);
    const listRef = useRef();
    const [slideNumber, setslideNumber] = useState(0);
    let slide = list.value.length - 8;
    if(windowDimensions.width < 1100 && windowDimensions.width > 890 ){
        slide=list.value.length - 5;
    }else if(windowDimensions.width < 890 && windowDimensions.width > 750){
        slide = list.value.length -4;
    }else if(windowDimensions.width < 750 && windowDimensions.width > 500){
        slide = list.value.length - 2;
    }else if(windowDimensions.width < 499) {
        slide = list.value.length - 2;
    }
    const handleClick = (direction) =>{
        let distance = listRef.current.getBoundingClientRect().x - 60;
        console.log(distance);
        if(direction ==='left' && slideNumber>0){
            setslideNumber(slideNumber-1);
            listRef.current.style.transform = `translateX(${210 + distance}px)`
        }
        if(direction ==='right' && slideNumber <slide){
            setslideNumber(slideNumber+1);
            listRef.current.style.transform = `translateX(${-190 + distance}px)`
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
                {slideNumber<slide  && <ArrowForwardIosRoundedIcon className={`listSliderArrow right ${slide>0 && `show`}`} onClick={()=>handleClick("right")} />}
            </div>
            
        </div>
    )
}
