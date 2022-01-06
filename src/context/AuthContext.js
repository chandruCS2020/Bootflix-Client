import AuthReducer from "./AuthReducer";
import { createContext, useEffect, useReducer } from "react";

const INITIAL_STATE = {
user: localStorage.getItem("user") || null,
isUser:false,
isFetching: false,
error: false,
};

export const AuthContext = createContext(INITIAL_STATE);

export const AuthContextProvider = ({ children }) => {
const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);

useEffect(() => {
    localStorage.setItem("user", JSON.stringify(state.user));
}, [state.user]);

return (
    <AuthContext.Provider
    value={{
        user: state.user,
        isUser: state.isUser,
        isFetching: state.isFetching,
        error: state.error,
        dispatch,
    }}
    >
    {children}
    </AuthContext.Provider>
);
};