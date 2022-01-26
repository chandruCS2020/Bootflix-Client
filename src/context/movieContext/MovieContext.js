import MovieReducer from "./MovieReducer";
import { createContext, useEffect, useReducer } from "react";

const INITIAL_STATE = {
isEligible: JSON.parse(localStorage.getItem("eligible")) || false,
isFetching: false,
error: false,
};

export const MovieContext = createContext(INITIAL_STATE);

export const MovieContextProvider = ({ children }) => {
const [state, dispatch] = useReducer(MovieReducer, INITIAL_STATE);
useEffect(() => {
    localStorage.setItem("eligible", JSON.stringify(state.isEligible));
}, [state.isEligible]);
return (
    <MovieContext.Provider
    value={{
        isEligible: state.isEligible,
        isFetching: state.isFetching,
        error: state.error,
        dispatch,
    }}
    >
    {children}
    </MovieContext.Provider>
);
};