import React ,{ useState ,useEffect}from 'react'
import { movie } from '../../../data/moviedata'
import {Link} from 'react-router-dom'
import FeatureItems from '../FeatureItems/FeatureItems'
import Slider from 'react-slick';
import './FeatureList.css';
import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded';
import ArrowBackIosRoundedIcon from '@mui/icons-material/ArrowBackIosRounded';
import axios from 'axios';
export default function FeatureList() {
    const [Index, setIndex] = useState(0);
    const NextArrow = ({ onClick }) => {
        return (
        <div className="arrow next"  style={{borderRadius:'50%',padding:'10px'}} onClick={onClick}>
            <ArrowForwardIosRoundedIcon style={{display:'flex',alignItems:'center'}} />
        </div>
        );
    };
    
    const PrevArrow = ({ onClick }) => {
        return (
        <div className="arrow prev" style={{borderRadius:'50%',padding:'10px'}} onClick={onClick}>
            <ArrowBackIosRoundedIcon style={{display:'flex',alignItems:'center'}}/>
        </div>
        );
    };
    const settings = {
        infinite: true,
        lazyLoad: true,
        autoplay: true,
        autoplaySpeed: 1000*5,
        speed: 700,
        slidesToShow: 1,
        slidesToScroll: 1,
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />,
        beforeChange: (current, next) => setIndex(next),
    };
    const [movieItem, setmovieItem] = useState([]);
    const [loading, setloading] = useState(false);
    useEffect(() => {
        const data = async()=>{
            try{
                const res = await axios.get('https://apibootflix.herokuapp.com/list-movies');
                setmovieItem(res.data.result.slice(0,5));
                if(res.status===200){
                    setloading(true);
                }
            }catch(err){
                setloading(false);
                console.log(err.message);
            }
        }
        data();
    }, []);
    return (
        <>
            <div className="FeatureMovie">
                {loading && 
                    <>
                        <Slider {...settings}>
                            {movieItem.map((item,index)=>(
                                <Link to={item._id} key={index}><FeatureItems item={item}   /></Link>
                            ))}
                        </Slider>
                    </>
                }
            </div>
        </>
    )
}
