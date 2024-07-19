import { START_PROBLEMS_ISADDING } from "../actions/problemActions";
import {
    ADD_SUBMISSION,
    GET_ALL_SUBMISSIONS,
    START_SUBMISSION_ISLOADING,
    SUBMISSION_ERROR,
    UPDATE_SUBMISSION_STATUS,
} from "../actions/submissionActions";

const initialStatuValues = {
    isLoading: false,
    isDeleting: false,
    isAdding: false,
    isUpdating: false,
};
const initialState = {
    submissions: [],
    status: initialStatuValues,
    error: null,
};

const submissionReducer = (state = initialState, action) => {
    switch (action.type) {
        case START_SUBMISSION_ISLOADING:
            return {
                ...state,
                status: { ...state.status, isLoading: true },
                error: null,
            };
        case GET_ALL_SUBMISSIONS:
            return {
                ...state,
                status: { ...state.status, isLoading: false },
                submissions: action.payload,
            };
        case SUBMISSION_ERROR:
            return {
                ...state,
                status: { ...initialStatuValues },
                error: action.payload,
            };
        case START_PROBLEMS_ISADDING:
            return {
                ...state,
                status: { ...state.status, isAdding: true },
                error: null,
            };
        case ADD_SUBMISSION:
            return {
                ...state,
                status: { ...state.status, isAdding: false },
                submissions: [...state.submissions, action.payload],
            };
        case UPDATE_SUBMISSION_STATUS:
            return {
                ...state,
                status: { ...state.status, isUpdating: true },
                submissions: state.submissions.map((ele) =>
                    ele._id === action.payload._id
                        ? { ...ele, testCaseResults: ele.testCaseResults }
                        : ele
                ),
            };
        default:
            return state;
    }
};

export { submissionReducer };
