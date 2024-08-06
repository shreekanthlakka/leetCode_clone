import {
    addProblemApi,
    deleteProblemApi,
    getAllProblemsApi,
    getBoilerPlateCodeApi,
} from "../services/problemsServices";

export const START_PROBLEMS_ISLOADING = "START_PROBLEMS_ISLOADING";
export const START_PROBLEMS_ISADDING = "START_PROBLEMS_ISADDING";
export const START_PROBLEMS_ISDELETING = "START_PROBLEMS_ISDELETING";

export const PROBLEMS_ERROR = "PROBLEMS_ERROR";

export const GET_ALL_PROBLEMS = "GET_ALL_PROBLEMS";
export const ADD_PROBLEM = "ADD_PROBLEM";
export const DELETE_PROBLEM = "DELETE_PROBLEM";

export const GET_BOILERPLATE_CODE = "GET_BOILERPLATE_CODE";
export const SET_SELECTED_PROBLEM_ID = "SET_SELECTED_PROBLEM_ID";
export const RESET_SELECTED_PROBLEM_ID = "RESET_SELECTED_PROBLEM_ID";

const startGetAllProblems = () => {
    return async (dispatch) => {
        try {
            dispatch({ type: START_PROBLEMS_ISLOADING });
            const response = await getAllProblemsApi();
            if (!response.success) {
                throw {
                    message: response.message,
                    statusCode: response.statusCode,
                };
            }
            dispatch(getAllProblems(response.data));
        } catch (error) {
            dispatch(problemError(error));
        }
    };
};

const startAddProblem = (formData, onSuccess) => {
    return async (dispatch) => {
        try {
            dispatch({ type: START_PROBLEMS_ISADDING });
            const res = await addProblemApi(formData);
            if (!res.success) {
                throw {
                    message: res.message,
                    statusCode: res.statusCode,
                };
            }
            dispatch(addProblem(res.data));
            onSuccess();
        } catch (error) {
            dispatch(problemError(error));
        }
    };
};

const startDeleteProblem = (id, onSuccess) => {
    return async (dispatch) => {
        try {
            dispatch({ type: START_PROBLEMS_ISDELETING });
            const res = await deleteProblemApi(id);
            if (!res.success) {
                throw {
                    message: res.message,
                    statusCode: res.statusCode,
                };
            }
            dispatch(deleteProblem(id));
            onSuccess();
        } catch (error) {
            dispatch(problemError(error));
        }
    };
};

const startGetBoilerPlateCode = (id, onSuccess) => {
    return async (dispatch) => {
        try {
            dispatch({ type: START_PROBLEMS_ISLOADING });
            const res = await getBoilerPlateCodeApi(id);
            if (!res.success) {
                throw {
                    message: res.message,
                    statusCode: res.statusCode,
                };
            }
            dispatch(getBoilerPlateCode(res.data));
            onSuccess();
        } catch (error) {
            dispatch(problemError(error));
        }
    };
};

const deleteProblem = (id) => {
    return {
        type: DELETE_PROBLEM,
        payload: id,
    };
};

const getBoilerPlateCode = (data) => {
    return {
        type: GET_BOILERPLATE_CODE,
        payload: data,
    };
};

const addProblem = (formdata) => {
    return {
        type: ADD_PROBLEM,
        payload: formdata,
    };
};

const getAllProblems = (data) => {
    return {
        type: GET_ALL_PROBLEMS,
        payload: data,
    };
};

const problemError = (error) => {
    return {
        type: PROBLEMS_ERROR,
        payload: error,
    };
};

const setSelectedProblem = (id) => {
    return {
        type: SET_SELECTED_PROBLEM_ID,
        payload: id,
    };
};

const resetSelectedProblem = () => {
    return {
        type: RESET_SELECTED_PROBLEM_ID,
    };
};

export {
    startGetAllProblems,
    startAddProblem,
    startGetBoilerPlateCode,
    setSelectedProblem,
    resetSelectedProblem,
    startDeleteProblem,
};
