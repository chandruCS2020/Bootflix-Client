// import { ImagesearchRoller } from '@mui/icons-material';
import React, { useEffect } from 'react'
import { useState } from 'react';
import './myaccount.css';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
export default function Myaccount() {
    const [image, setimage] = useState([]);
    const handleImage = (e)=>{
        setimage(e.target.files);
    }
    const [imageUrl, setimageUrl] = useState([]);
    useEffect(() => {
        if(image.length<1) return;
        setimageUrl(URL.createObjectURL(image[0]));
    }, [image])
    console.log(imageUrl);
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
