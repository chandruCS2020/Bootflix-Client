import axios from "axios";
import { loginFailure, loginStart, loginSuccess } from "./AuthAction";

export const login = async (dispatch) => {
// dispatch(loginStart());
try {
    const res = await axios.get("https://apibootflix.herokuapp.com/me",{withCredentials:true})
    .then((data)=>{
        console.log(data);
        localStorage.setItem('user',JSON.stringify(data.data));
        console.log(JSON.parse(localStorage.getItem('user')).plan.plan);
        window.location.href='http://localhost:3000/';
        
    })
    .catch((err)=>{
        console.log(err.message);
        localStorage.removeItem('user');
    });
    // dispatch(loginSuccess(res.data));
    
} catch (err) {
    // dispatch(loginFailure());
}
};

export const logout = async()=>{
    try{
        const res = await axios.get("https://apibootflix.herokuapp.com/logout",{withCredentials:true});
        localStorage.removeItem('user');
        window.location.href='http://localhost:3000/';
    }catch(err){
        console.log(err.message);
    }
};