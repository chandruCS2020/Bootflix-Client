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
    const [searchResult, setsearchResult] = useState(null);
    const handelSearchChange = (e)=>{
        const getData = async()=>{
            try{
                const res = await axios.get('https://apibootflix.herokuapp.com/list-movies?search='+e.target.value);
                setsearchResult(res.data.result);
            }catch(err){
                console.log(err.message);
            }
        }
        getData();
    }
    console.log(searchResult);
    if(isUser){
        const response=fetch(JSON.parse(localStorage.getItem('user')).profilePic,{method:'get',mode:'no-cors'})
        console.log(response);
    }
    const handlesearchBarClick = ()=>{

    }
    return (
        <>
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
                                        <NavLink className="nav-link" to='/movies'>
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
                        </div>
                        {/* <button className="subscribe-btn right-element upgrade">Music Player</button> */}
                        {subscription!=='Free' ?  <NavLink to='/subscribe' className="subscribe-btn right-element upgrade">upgrade</NavLink> : <NavLink to='/subscribe' className="subscribe-btn right-element subscribe">Subscribe</NavLink>}
                        <div className="right-element user-profile">
                            {localStorage.getItem('user') ?<div className="user-pic">
                                <div className="dropdown-container">
                                    <div className="navbar_userprofile_mobile">
                                            <img src={JSON.parse(localStorage.getItem('user')).profilePic} alt="" />
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
                                    <NavLink to='/language'>
                                        <div className="iconClass Language">
                                            <TranslateIcon />
                                        </div>
                                        <div>Language</div>
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to='/genres'>
                                        <div className="iconClass Genres">
                                            <ImportContactsIcon />
                                        </div>
                                        <div>Genres</div>
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to='/help'>
                                        <div className="iconClass Help">
                                            <HelpIcon />
                                        </div>
                                        <div>Help</div>
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
        </>
    )
}

export default Navbar
