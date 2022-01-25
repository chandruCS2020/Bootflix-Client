import React , { useContext, useState } from 'react'
import './Navbar.css';
import MenuIcon from '@mui/icons-material/Menu'
import TranslateIcon from '@mui/icons-material/Translate';
import ImportContactsIcon from '@mui/icons-material/ImportContacts';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SearchIcon from '@mui/icons-material/Search';
import LibraryMusicIcon from '@mui/icons-material/LibraryMusic';
import HelpIcon from '@mui/icons-material/Help';
import LogoutIcon from '@mui/icons-material/Logout';
import { Link, NavLink } from 'react-router-dom'
import LoginIcon from '@mui/icons-material/Login';
import logo from '../../images/logo.png';
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';
import Login from '../Login/Login';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import { AuthContext } from '../../context/AuthContext';
import { logout } from '../../context/apicalls';
import axios from 'axios';
import SerachList from '../search/serachList/SerachList';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ViewListIcon from '@mui/icons-material/ViewList';
import MovieIcon from '@mui/icons-material/Movie';
import ViewList from '@mui/icons-material/ViewList';
function Navbar(props) {
    const [mobilemenuClick, setmobilemenuClick] = useState(false);
    const [open, setOpen] = useState(false);

    const onOpenModal = () => {setOpen(true);setmobilemenuClick(false)};
    const onCloseModal = () => setOpen(false);
    function mobilemenuOnclick(){
        setmobilemenuClick(!mobilemenuClick);
    }
    const {isUser}=useContext(AuthContext);
    var subscription='';
    if(localStorage.getItem('user')===null){
        subscription='Free';
    }else{
        subscription=JSON.parse(localStorage.getItem('user')).plan.plan;
    }
    const [searchResult, setsearchResult] = useState([]);
    const [searchLoading, setsearchLoading] = useState(false);
    const [search, setsearch] = useState('');
    const handelSearchChange = (e)=>{
        setsearch(e.target.value);
        if(e.target.value!==''){
            const getData = async()=>{
                try{
                    const res = await axios.get('https://apibootflix.herokuapp.com/list-movies?search='+e.target.value);
                    setsearchResult(res.data.result);
                    if(res.status===200){
                        setsearchLoading(true);
                    }
                }catch(err){
                    setsearchLoading(false);
                    console.log(err.message);
                }
            }
            getData();
        }else{
            setsearchResult([]);
            setsearchLoading(false)
        }
    }
    if(isUser){
        const response=fetch(JSON.parse(localStorage.getItem('user')).profilePic,{method:'get',mode:'no-cors'})
        console.log(response);
    }
    const [searchMobile, setsearchMobile] = useState(false);
    const handlesearchBarClick = ()=>{
        setsearchMobile(!searchMobile);
    }
    return (
        <div className='navs'>
            <nav>
                <div className="navbar_header_desktop">
                        <div className="navbar_logo">
                            <div className="navbar_logo_inner">
                                <NavLink to='/'><img src={logo} alt="" /></NavLink>
                            </div>
                        </div>
                        <div className="navigation" role="navigation">
                            <ul>
                                <li>
                                    <div className="dropdown-container">
                                        <NavLink className="nav-link" to='/movie'>
                                            <div>Movies</div>
                                        </NavLink>
                                    </div>
                                </li>
                                <li>
                                    <div className="dropdown-container">
                                        <NavLink className="nav-link" to='/categories'>
                                            <div>Categories</div>
                                        </NavLink>
                                        <div className="sublink-container slide-up">
                                            <NavLink to='/genre/Action' className='dropdown-link'>Action</NavLink>
                                            <NavLink to='/genre/Thriller' className='dropdown-link'>Thriller</NavLink>
                                            <NavLink to='/genre/Sci-Fi' className='dropdown-link'>Sci Fi</NavLink>
                                            <NavLink to='/genre/Drama' className='dropdown-link'>Drama</NavLink>
                                            <NavLink to='/genre/Crime' className='dropdown-link'>Crime</NavLink>
                                            <NavLink to='/genre/Fantacy' className='dropdown-link'>Fantacy</NavLink>
                                            <NavLink to='/genre/Sports' className='dropdown-link'>Sports</NavLink>
                                            <NavLink to='/genre/Comedyt' className='dropdown-link'>Comedy</NavLink>
                                            <NavLink to='/genre/Horror' className='dropdown-link'>Horror</NavLink>
                                            <NavLink to='/genre/Mystery' className='dropdown-link'>Mystery</NavLink>
                                            <NavLink to='/genre/Romance' className='dropdown-link'>Romance</NavLink>
                                        </div>
                                    </div>
                                </li>
                                <li>
                                    <NavLink className="nav-link" to='/songs'>
                                            <div>Songs</div>
                                    </NavLink>
                                </li>
                            </ul>
                        </div>
                        
                        <div className="search-container right-element">
                            <input type="search" className='input-open' placeholder='Search' autoComplete='off' id='seacrField' name="search" onChange={handelSearchChange} />
                            <div className="searchIcon  searchIcon-active">
                                <SearchIcon />
                            </div>
                            {searchLoading && <SerachList item={searchResult} query={search}/>}
                        </div>
                        {/* <button className="subscribe-btn right-element upgrade">Music Player</button> */}
                        {subscription!=='Free' ?  <NavLink to='/subscribe' className="subscribe-btn right-element upgrade">upgrade</NavLink> : <NavLink to='/subscribe' className="subscribe-btn right-element subscribe">Subscribe</NavLink>}
                        <div className="right-element user-profile">
                            {localStorage.getItem('user') ?<div className="user-pic">
                                <div className="dropdown-container">
                                    <div className="navbar_userprofile_mobile">
                                            <img src={JSON.parse(localStorage.getItem('user')).profilePic} alt="profile" />
                                        </div>
                                    <div className="sublink-container slide-up">
                                        <Link to='/wishlist'>Wishlist</Link>
                                        <Link to='/myaccount'>MyAccount</Link>
                                        <div onClick={()=>logout()} className="dropdown-link">Log Out</div>
                                    </div>
                                </div>
                            </div> :
                            <div className="signIn" onClick={onOpenModal}>LOGIN</div>}
                        </div>
                </div>
                <Modal open={open} onClose={onCloseModal} closeIcon={<CloseRoundedIcon />} center classNames='LoginModel'>
                    <Login />
                </Modal>
                <div className={`navbar_header_mobile`}>
                    <div className={`navbar_menubar_mobile`} onClick={mobilemenuOnclick}>
                        <div className="navbar_menubar_Icon_mobile">
                            <MenuIcon />
                        </div>
                    </div>
                    <div className="navbar_logo_mobile">
                        <div className="navbar_logo_mobile_inner">
                            <NavLink to='/'><img src={logo} alt="" /></NavLink>
                        </div>
                    </div>
                    {subscription!=='Free' ?  <NavLink to='/subscribe' className="subscribe-btn upgrade">upgrade</NavLink> : <NavLink to='/subscribe'><button className="subscribe-btn  subscribe">Subscribe</button></NavLink>}
                    <div className="searchBar_mobile right-element" onClick={handlesearchBarClick}>
                        <SearchIcon />
                    </div>
                    <div className={`navbar_menuItems_mobile ${mobilemenuClick ? `active` : ``}`}>
                        <div className="navbar_menuItems_user_mobile">
                            
                            {isUser ?
                                <>
                                    <div className="navbar_userprofile_mobile">
                                        <img src={JSON.parse(localStorage.getItem('user')).profilePic} alt="" />
                                    </div>
                                    <div className="navbar_userdetails_mobile">
                                        <h3>{JSON.parse(localStorage.getItem('user')).firstName} {JSON.parse(localStorage.getItem('user')).lastName}</h3>
                                    </div>
                                </>
                                :
                                <div className="navbar_userdetails_mobile">
                                    <h3>Login To Explore</h3>
                                </div>
                            }
                        </div>
                        <div className="navbar_dropdownList_mobile">
                            <ul>
                                <li>
                                    <NavLink to='/movie'>
                                        <div className="iconClass Language">
                                            <MovieIcon />
                                        </div>
                                        <div>Movie</div>
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to='/genre'>
                                        <div className="iconClass Genres">
                                            <ImportContactsIcon />
                                        </div>
                                        <div>Genres</div>
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to='/wishlist'>
                                        <div className="iconClass Help">
                                            <ViewList />
                                        </div>
                                        <div>Watchlist</div>
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to='/myaccount'>
                                        <div className="iconClass Help">
                                            <AccountCircleIcon />
                                        </div>
                                        <div>My Account</div>
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to='/songs'>
                                        <div className="iconClass Songs">
                                            <LibraryMusicIcon />
                                        </div>
                                        <div>Songs</div>
                                    </NavLink>
                                </li>
                            </ul>
                        </div>
                        <div className="navbar_logout_mobile bottom-element">
                            {isUser? 
                                <div onClick={()=> logout()} className='log'>
                                    <div className="iconClass Songs">
                                        <LogoutIcon />
                                    </div>
                                    <div>Log Out</div>
                                </div> :
                                <div onClick={onOpenModal} className='log'>
                                    <div className="iconClass Songs">
                                        <LoginIcon />
                                    </div>
                                    <div >Login</div>
                                </div>
                            
                            }
                        </div>
                    </div>
                    
                </div>
            </nav>  
            <div className={`searchContainer_mobile ${searchMobile ? `active` : ''}`}>
                        <div className="back" onClick={()=>setsearchMobile(!searchMobile)}><ArrowBackIcon /></div>
                        <div className="searchInput">
                            <input type="search" name="search" id="" placeholder='Search' onChange={handelSearchChange}/>
                            <div className="searchIcon  searchIcon-active">
                                <SearchIcon />
                            </div>
                        </div>
                        {searchLoading && <SerachList item={searchResult} query={search}/>}
                    </div>
        </div>
    )
}

export default Navbar
