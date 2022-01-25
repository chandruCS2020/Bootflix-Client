import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import SearchItem from '../searchItem/SearchItem';
import './serachList.css';
export default function SerachList({item,query}) {
    console.log(query);
    const history = useHistory();
    return(
        <>
            {item &&
            <>
                {
                    item.length <= 0 ?<div className='search'><h1>No data found</h1></div>
                    :
                    <>
                        <div className="search desktop">
                            <div className={`searchList  ${item.length>5 ? ` more` :''}`} style={{height:`${item.length>5 ? `430px` : `${80 * item.length + 30}px`}`}}>
                                <>
                                    {item.map((items,i)=>(
                                        <SearchItem key={i} item={items} list={item}/>
                                    ))}
                                
                                </>
                            </div>
                            <div  className={`moreBtn${item.length>5 ? ` more` :''}`} onClick={()=>history.push('/search?q='+query)}>More Results</div>
                        </div>
                        <div className="search mobile">
                            <div className="searchList mobile">
                                <>
                                    {item.map((items,i)=>(
                                        <SearchItem key={i} item={items} list={item}/>
                                    ))}
                                </>
                            </div>
                            <div  className={`moreBtn${item.length>5 ? ` more` :''}`} onClick={()=>history.push('/search?q='+query)}>More Results</div>
                        </div>
                    </>
                }
            </>
}
        </>
    )
}
