const MovieReducer = (state, action) => {
    switch (action.type) {
    case "ELIGIBLE_MOVIES_START":
        return {
        isEligible: false,
        isFetching: true,
        error: false,
        };
    case "ELIGIBLE_MOVIES_SUCCESS":
        return {
        isEligible: action.payload,
        isFetching: false,
        error: false,
        };
    case "ELIGIBLE_MOVIES_FAILURE":
        return {
        isEligible: false,
        isFetching: false,
        error: true,
        };
    default:
        return { ...state };
    }
};

export default MovieReducer;