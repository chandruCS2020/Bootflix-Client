import MovieReducer from "./MovieReducer";
import { createContext, useReducer } from "react";

const INITIAL_STATE = {
isEligible: false,
isFetching: false,
error: false,
};

export const MovieContext = createContext(INITIAL_STATE);

export const MovieContextProvider = ({ children }) => {
const [state, dispatch] = useReducer(MovieReducer, INITIAL_STATE);

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