import axios from 'axios';
import React, { useEffect,useState } from 'react';
import { useLocation } from 'react-router-dom';
import ListItem from '../../components/listItem/ListItem';
import Navbar from '../../components/Navbar/Navbar';
import './genre.css';
export default function Genre() {
    const location = useLocation();
    let type='';
    let search='';
    console.log(location);
    let genre='';
    const [genreList, setgenreList] = useState([]);
    if(location.pathname==='/search'){
        type=location.pathname.split('/')[1];
        const params = new URLSearchParams(location.search)
        search=params.get('q');

    }else if (location.pathname.split('/'[1]==='genre')){
        type=location.pathname.split('/')[1];
        genre=location.pathname.split('/')[2] || '';
    }else if(location.pathname.split('/'[1]==='movie')){
        type=location.pathname.split('/')[1];
    }
    console.log(search);
    useEffect(() => {
        const getData = async()=>{
            try{
                const res = await axios.get(`https://apibootflix.herokuapp.com/list-movies${type==='search' ? `?search=`+search : ''}${type==='genre' ? `?genre=`+genre : ''}${type==='movie' ? '' :''}`);
                setgenreList(res.data.result);
            }catch(err){
                console.log(err.message);
            }
        }
        getData();
    }, [type,genre]);
    console.log(genreList);
    return(
        <>
            <Navbar />
            <div className="genre">
                
                {genreList.length<=0 ? 
                    <>
                        <div className="noData">
                            <h1 className="nodataFound">{type==='search' ? 'No Results Found' : 'No Movie Found'}</h1>
                        </div>
                    </>
                    :
                    <>
                        <h2 className="genreTitle">{type==='search' ? 'Showing all results for '+search : type==='genre' ? genre : 'Movie'}</h2>

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
