const AuthReducer = (state, action) => {
    switch (action.type) {
    case "LOGIN_START":
        return {
        isUser:false,
        isFetching: true,
        error: false,
        };
    case "LOGIN_SUCCESS":
        return {
        isUser:true,
        isFetching: false,
        error: false,
        };
    case "LOGIN_FAILURE":
        return {
        isUser:false,
        isFetching: false,
        error: true,
        };
    case "LOGOUT":
        return {
        isUser:false,
        isFetching: false,
        error: false,
        };
    default:
        return { ...state };
    }
};

export default AuthReducer;