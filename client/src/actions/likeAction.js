import { totalLikes } from "../services/likesServices";

export const START_LIKE_ISLOADING = "START_LIKE_ISLOADING";
export const START_LIKE_ISADDING = "START_LIKE_ISADDING";
// export const START_SUBMISSION_ISUPDATING = "START_SUBMISSION_ISUPDATING";
// export const START_SUBMISSION_ISDELETING = "START_SUBMISSION_ISDELETING";

export const TOTAL_LIKES = "TOTAL_LIKES";
export const TOTAL_LIKES_SUCCESS = "TOTAL_LIKES_SUCCESS";
export const TOTAL_LIKES_ERROR = "TOTAL_LIKES_ERROR";

const startLikesByProblemId = (problemId) => {
    return async (dispatch) => {
        try {
            dispatch({ type: START_LIKE_ISLOADING });
            const res = await totalLikes(problemId);
            if (!res.success) {
                throw {
                    message: res.message,
                    status: res.status,
                };
            }
            dispatch(likesByProblemId(res.data));
        } catch (error) {
            dispatch({ type: TOTAL_LIKES_ERROR, payload: error });
        }
    };
};

const likesByProblemId = (data) => {
    return {
        type: TOTAL_LIKES,
        payload: data,
    };
};

export { startLikesByProblemId };
