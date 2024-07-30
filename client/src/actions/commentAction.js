import {
    createCommentApi,
    deleteCommentApi,
    getCommentsByProblemIdApi,
} from "../services/commentsServices";

export const START_COMMENT_ISLOADING = "START_COMMENT_ISLOADING";
export const START_COMMENT_ISCREATING = "START_COMMENT_ISCREATING";
export const START_COMMENT_ISUPDATING = "START_COMMENT_ISUPDATING";
export const START_COMMENT_ISDELETING = "START_COMMENT_ISDELETING";

export const CREATE_COMMENT = "CREATE_COMMENT";
export const UPDATE_COMMENT = "UPDATE_COMMENT";
export const DELETE_COMMENT = "DELETE_COMMENT";
export const COMMENT_ERROR = "COMMENT_ERROR";
export const COMMENTS_BY_PROBLEMID = "COMMENTS_BY_PROBLEMID";

const startCreateComment = (problemId, commentObj, onSuccess) => {
    return async (dispatch) => {
        try {
            dispatch({ type: START_COMMENT_ISCREATING });
            const res = await createCommentApi(problemId, commentObj);
            if (!res.success) {
                throw {
                    message: res.message,
                    statusCode: res.statusCode,
                    error: res.error,
                };
            }
            dispatch(createComment(res.data));
            onSuccess(res.data);
        } catch (error) {
            dispatch(commentError(error));
        }
    };
};

const startGetAllCommentsByProblemId = (id) => {
    return async (dispatch) => {
        try {
            dispatch({ type: START_COMMENT_ISLOADING });
            const res = await getCommentsByProblemIdApi(id);
            if (!res.success) {
                throw {
                    message: res.message,
                    statusCode: res.statusCode,
                    error: res.error,
                };
            }
            dispatch(getAllCommentsByProblemId(res.data));
        } catch (error) {
            dispatch(commentError(error));
        }
    };
};

const startDeleteComment = (problemId, commentId, onSuccess) => {
    return async (dispatch) => {
        try {
            dispatch({ type: START_COMMENT_ISDELETING });
            const res = await deleteCommentApi(problemId, commentId);
            if (!res.success) {
                throw {
                    message: res.message,
                    statusCode: res.statusCode,
                    error: res.error,
                };
            }
            dispatch(deleteComment(res.data._id));
            onSuccess();
        } catch (error) {
            dispatch(commentError(error));
        }
    };
};

const deleteComment = (id) => {
    return {
        type: DELETE_COMMENT,
        payload: id,
    };
};

const getAllCommentsByProblemId = (data) => {
    return {
        type: COMMENTS_BY_PROBLEMID,
        payload: data,
    };
};

const createComment = (data) => {
    return {
        type: CREATE_COMMENT,
        payload: data,
    };
};

const commentError = (err) => {
    return {
        type: COMMENT_ERROR,
        payload: err,
    };
};

export {
    startCreateComment,
    startGetAllCommentsByProblemId,
    startDeleteComment,
};
