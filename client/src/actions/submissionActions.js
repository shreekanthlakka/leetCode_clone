import {
    getAllSubmissionsApi,
    getSubmissionStatusApi,
    submitProblemApi,
} from "../services/submissionService";

export const START_SUBMISSION_ISLOADING = "START_SUBMISSION_ISLOADING";
export const START_SUBMISSION_ISADDING = "START_SUBMISSION_ISADDING";
export const START_SUBMISSION_ISUPDATING = "START_SUBMISSION_ISUPDATING";
export const START_SUBMISSION_ISDELETING = "START_SUBMISSION_ISDELETING";

export const GET_ALL_SUBMISSIONS = "GET_ALL_SUBMISSIONS";
export const ADD_SUBMISSION = "ADD_SUBMISSION";
export const SUBMISSION_ERROR = "SUBMISSION_ERROR";
export const UPDATE_SUBMISSION_STATUS = "UPDATE_SUBMISSION_STATUS";

const startGetAllSubmissions = (problemId) => {
    return async (dispatch) => {
        dispatch({ type: START_SUBMISSION_ISLOADING });
        try {
            const res = await getAllSubmissionsApi(problemId);
            if (!res.success) {
                throw {
                    message: res.message,
                    statusCode: res.statusCode,
                    error: res.error,
                };
            }
            dispatch(getAllSubmissions(res.data));
        } catch (error) {
            dispatch(submissionError(error));
        }
    };
};

const startAddSubmission = (formData, problemId, onSuccess) => {
    return async (dispatch) => {
        try {
            dispatch({ type: START_SUBMISSION_ISADDING });
            const res = await submitProblemApi(formData, problemId);
            if (!res.success) {
                throw {
                    message: res.message,
                    error: res.error,
                    statusCode: res.statusCode,
                };
            }
            console.log("===== RESPONSE ======> ", res);
            dispatch(addSubmission(res.data));
            onSuccess(res.data._id);
        } catch (error) {
            dispatch(submissionError(error));
        }
    };
};

const startGetSubmissionStatus = (problemId, submissionId, onSuccess) => {
    return async (dispatch) => {
        dispatch({ type: START_SUBMISSION_ISUPDATING });
        try {
            const res = getSubmissionStatusApi(problemId, submissionId);
            if (!res.success) {
                throw {
                    message: res.message,
                    statusCode: res.statusCode,
                };
            }
            dispatch(getSubmissionStatus(res.data));
            onSuccess(res.data);
        } catch (error) {
            dispatch(submissionError(error));
        }
    };
};

const getSubmissionStatus = (data) => {
    return {
        type: UPDATE_SUBMISSION_STATUS,
        payload: data,
    };
};

const addSubmission = (data) => {
    return {
        type: ADD_SUBMISSION,
        payload: data,
    };
};

const getAllSubmissions = (data) => {
    return {
        type: GET_ALL_SUBMISSIONS,
        payload: data,
    };
};

const submissionError = (error) => {
    return {
        type: SUBMISSION_ERROR,
        payload: error,
    };
};

export { startGetAllSubmissions, startAddSubmission, startGetSubmissionStatus };
