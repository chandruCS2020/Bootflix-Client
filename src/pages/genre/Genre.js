import axios from 'axios';
import React, { useEffect,useState } from 'react';
import { useLocation } from 'react-router-dom';
import ListItem from '../../components/listItem/ListItem';
import Navbar from '../../components/Navbar/Navbar';
import './genre.css';
export default function Genre() {
    const location = useLocation();
    const genre=location.pathname.split('/')[2];
    const [genreList, setgenreList] = useState([]);
    useEffect(() => {
        const getData = async()=>{
            try{
                const res = await axios.get('https://apibootflix.herokuapp.com/list-movies?genre='+genre);
                setgenreList(res.data.result);
            }catch(err){
                console.log(err.message);
            }
        }
        getData();
    }, []);
    console.log(genreList);
    return(
        <>
            <Navbar />
            <div className="genre">
                <h2 className="genreTitle">{genre}</h2>
                {genreList.length<=0 ? 
                    <>
                        <div className="noData">
                            <h1 className="nodataFound">No Data Found</h1>
                        </div>
                    </>
                    :
                    <>
                        <div className='genreWrapper'>
                            {genreList.map((item,i)=>(
                                <ListItem item={item} key={i}/>
                            ))}
                        </div>
                    </>
            
                }
            </div>
        </>
    )
}
