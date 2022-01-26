export const eligibleMoviesStart = () => ({
type: "ELIGIBLE_MOVIES_START",
});

export const eligibleMoviesSuccess = (isEligible) => ({
type: "ELIGIBLE_MOVIES_SUCCESS",
payload: isEligible,
});

export const eligibleMoviesFailure = () => ({
type: "ELIGIBLE_MOVIES_FAILURE",
});
