
import Continue from '../Continue/Continue';
import React, { useRef ,useState ,useEffect} from 'react'
import './continueList.css';
import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded';
import ArrowBackIosRoundedIcon from '@mui/icons-material/ArrowBackIosRounded';
import axios from 'axios';
function getWindowDimensions() {
    const { innerWidth: width, innerHeight: height } = window;
    return {
        width,
        height
    };
}
export default function ContinueList({list,loading}) {
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
    
    const [continueloading, setcontinueloading] = useState(false);
    const [continueList, setcontinueList] = useState([]);
    let slide = continueList.length - 5;
    if(windowDimensions.width < 1110 && windowDimensions.width > 700){
        slide = continueList.length - 3;
    }else if(windowDimensions.width<700 && windowDimensions.width>600){
        slide = continueList.length - 2;
    }else if(windowDimensions.width<600){
        slide = continueList.length - 1;
    }
    const handleClick = (direction) =>{
        let distance = listRef.current.getBoundingClientRect().x - 60;
        console.log(distance);
        if(direction ==='left' && slideNumber>0){
            setslideNumber(slideNumber-1);
            listRef.current.style.transform = `translateX(${320 + distance}px)`
        }
        if(direction ==='right' && slideNumber <slide){
            setslideNumber(slideNumber+1);
            listRef.current.style.transform = `translateX(${-300 + distance}px)`
        }
    };
    useEffect(() => {
        const cList = async()=>{
            try{
                const res = await axios.get('https://apibootflix.herokuapp.com/getHistory',{withCredentials:true});
                setcontinueList(res.data);
                
                if(res.status===200){
                    setcontinueloading(true);
                }
            }catch(err){
                setcontinueloading(false);
                console.log(err.message);
            }
        }
        cList();
    }, []);
    
    console.log(continueList);
    return(
        <>
            {
                (continueloading && continueList.length>0) &&
                <>
                    <div className='list'>
                        <span className="listTitle">Continue to watch</span>
                        <div className="listWrapper">
                        {slideNumber > 0 && <ArrowBackIosRoundedIcon className='listSliderArrow left' onClick={()=>handleClick("left")}/>}
                            <div className="listConatiner" ref={listRef}>
                                { continueList.map((item,i)=>(
                                    <Continue key={i} array={item}/>
                                ))}
                            </div>
                            {slideNumber<slide  && <ArrowForwardIosRoundedIcon className={`listSliderArrow right ${slide>=0 && `show`}`} onClick={()=>handleClick("right")} />}
                        </div>
                        
                    </div>
                </>
            }
        </>
    )
}
