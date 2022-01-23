import axios from "axios";
import { loginFailure, loginStart, loginSuccess } from "./AuthAction";

export const login = async (dispatch) => {
dispatch(loginStart());
try {
    await axios.get("https://apibootflix.herokuapp.com/me",{withCredentials:true})
    .then((data)=>{
        localStorage.setItem('user',JSON.stringify(data.data));
        dispatch(loginSuccess());
        
    })
    .catch((err)=>{
        console.log(err.message);
        localStorage.removeItem('user');
    });
    
    
} catch (err) {
    dispatch(loginFailure());
}
};

export const logout = async()=>{
    try{
        await axios.get("https://apibootflix.herokuapp.com/logout",{withCredentials:true});
        localStorage.removeItem('user');
        window.location.href='http://localhost:3000/';
    }catch(err){
        console.log(err.message);
    }
};

export const WishList = async(id)=>{
    try{
        await axios.get("https://apibootflix.herokuapp.com/addMovieToWhislist/"+id,{withCredentials:true});
    }catch(err){
        console.log(err.message);
    }
}