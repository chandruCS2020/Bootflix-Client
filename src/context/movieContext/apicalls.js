import axios from "axios";
import { eligibleMoviesFailure, eligibleMoviesStart, eligibleMoviesSuccess } from "./MovieAction";

export const Eligible = async (dispatch,id) => {
    dispatch(eligibleMoviesStart());
    try {
        const response = await axios.get('https://apibootflix.herokuapp.com/isEligiblieForMovie/'+id,{withCredentials:true});
        if(response.status===200){
            console.log("eligible");
            dispatch(eligibleMoviesSuccess(false));
        }
        
    } catch (err) {
        dispatch(eligibleMoviesFailure());
    }
    };