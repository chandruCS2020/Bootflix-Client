import React , { useState } from 'react'
import './Navbar.css';
import MenuIcon from '@mui/icons-material/Menu'
import TranslateIcon from '@mui/icons-material/Translate';
import ImportContactsIcon from '@mui/icons-material/ImportContacts';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SearchIcon from '@mui/icons-material/Search';
import LibraryMusicIcon from '@mui/icons-material/LibraryMusic';
import HelpIcon from '@mui/icons-material/Help';
import LogoutIcon from '@mui/icons-material/Logout';
import { NavLink } from 'react-router-dom'
import LoginIcon from '@mui/icons-material/Login';
import logo from '../../images/logo.png';
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';
import Login from '../Login/Login';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
function Navbar(props) {
    const [mobilemenuClick, setmobilemenuClick] = useState(false);
    const [open, setOpen] = useState(false);

    const onOpenModal = () => {setOpen(true);setmobilemenuClick(false)};
    const onCloseModal = () => setOpen(false);
    function mobilemenuOnclick(){
        setmobilemenuClick(!mobilemenuClick);
    }
    console.log(mobilemenuClick);
    console.log(props.isloggedin);
    return (
        <>
            <nav>
                <div className="navbar_header_desktop">
                        {/* <div className="navbar_menubar">
                            <div className="navbar_menubar_Icon">
                                <MenuIcon />
                            </div>
                            <div className="navbar_menu_list">
                                <div className="navbar_menu_items">
                                    <NavLink to='/language'>
                                        <div className="iconClass Language">
                                            <TranslateIcon />
                                        </div>
                                        <div>Language</div>
                                    </NavLink>
                                </div>
                                <div className="navbar_menu_items">
                                    <NavLink to='/genres'>
                                    <div className="iconClass Genres">
                                            <ImportContactsIcon />
                                        </div>
                                        <div>Genres</div>
                                    </NavLink>
                                </div>
                            </div>
                        </div> */}
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
                                        <div className="sublink-container slide-up">
                                            <NavLink to='/movies/languages/tamil' className='dropdown-link'>Tamil</NavLink>
                                            <NavLink to='/movies/languages/telugu' className='dropdown-link'>Telugu</NavLink>
                                            <NavLink to='/movies/languages/telugu' className='dropdown-link'>Malayalam</NavLink>
                                            <NavLink to='/movies/languages/telugu' className='dropdown-link'>English</NavLink>
                                            <NavLink to='/movies/languages/telugu' className='dropdown-link'>Hindi</NavLink>
                                        </div>
                                    </div>
                                </li>
                                <li>
                                    <div className="dropdown-container">
                                        <NavLink className="nav-link" to='/categories'>
                                            <div>Categories</div>
                                        </NavLink>
                                        <div className="sublink-container slide-up">
                                            <NavLink to='/categories/action' className='dropdown-link'>Action</NavLink>
                                            <NavLink to='/categories/thriller' className='dropdown-link'>Thriller</NavLink>
                                            <NavLink to='/categories/sci-fi' className='dropdown-link'>Sci Fi</NavLink>
                                            <NavLink to='/categories/drama' className='dropdown-link'>Drama</NavLink>
                                            <NavLink to='/categories/crime' className='dropdown-link'>Crime</NavLink>
                                            <NavLink to='/categories/fantacy-adventure' className='dropdown-link'>Fantacy Adventure</NavLink>
                                            <NavLink to='/categories/kids' className='dropdown-link'>Kids</NavLink>
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
                            <input type="search" className='input-open' placeholder='Search' autoComplete='off' id='seacrField' name="search" />
                            <div className="searchIcon  searchIcon-active">
                                <SearchIcon />
                            </div>
                        </div>
                        {/* <button className="subscribe-btn right-element upgrade">Music Player</button> */}
                        {props.isSubscribed ?  <button className="subscribe-btn right-element upgrade">upgrade</button> : <NavLink to='/subscribe' className="subscribe-btn right-element subscribe">Subscribe</NavLink>}
                        <div className="right-element user-profile">
                            {props.isloggedin ?<div className="user-pic">
                                <div className="dropdown-container">
                                    <AccountCircleIcon />
                                    <div className="sublink-container slide-up">
                                        <NavLink to='/fcb' className="dropdown-link">Log Out</NavLink>
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
                    {props.isSubscribed ?  <button className="subscribe-btn upgrade">upgrade</button> : <NavLink to='/subscribe'><button className="subscribe-btn  subscribe">Subscribe</button></NavLink>}
                    <div className="searchBar_mobile right-element">
                        <SearchIcon />
                    </div>
                    <div className={`navbar_menuItems_mobile ${mobilemenuClick ? `active` : ``}`}>
                        <div className="navbar_menuItems_user_mobile">
                            <div className="navbar_userprofile_mobile">
                                <AccountCircleIcon />
                            </div>
                            {props.isloggedin ?
                                <div className="navbar_userdetails_mobile">
                                    <h3>Chandru</h3>
                                    <h5>6374520688</h5>
                                </div> :
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
                            {props.isloggedin ? 
                                <NavLink to='/'>
                                    <div className="iconClass Songs">
                                        <LogoutIcon />
                                    </div>
                                    <div>Log Out</div>
                                </NavLink> :
                                <NavLink to='/'>
                                    <div className="iconClass Songs">
                                        <LoginIcon />
                                    </div>
                                    <div onClick={onOpenModal}>Login</div>
                                </NavLink>
                            
                            }
                        </div>
                    </div>
                </div>
            </nav>  
        </>
    )
}

export default Navbar
