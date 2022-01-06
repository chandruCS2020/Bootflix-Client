// import { ImagesearchRoller } from '@mui/icons-material';
import React, { useEffect } from 'react'
import { useState } from 'react';
import './myaccount.css';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import logo from '../../images/logo.png'
export default function Myaccount() {
    const { user } = useContext(AuthContext);
    const [image, setimage] = useState([]);
    const handleImage = (e)=>{
        setimage(e.target.files[0]);
    }
    const [imageUrl, setimageUrl] = useState([logo]);
    useEffect(() => {
        if(image.length<1) return;
        setimageUrl(URL.createObjectURL(image));
    }, [image])
    console.log(imageUrl);
    // var user=JSON.parse(localStorage.getItem("user"));
    // console.log(user.profilePic)
    return (
        <div>
            <div className="Myaccount_Container">
                <div className="Myaccount_body">
                    <div className="Myaccount_img">
                        <label htmlFor="profileImg" className='uploadIcon'><AddAPhotoIcon /></label>
                        <input type="file" multiple accept='image/*' name="profile" id="profileImg" hidden onChange={handleImage}/>
                        <img src={imageUrl} alt=""  className='ProfileImage'/>
                    </div>
                    
                </div>
            </div>
        </div>
    )
}
