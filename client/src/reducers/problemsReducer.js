import {
    ADD_PROBLEM,
    DELETE_PROBLEM,
    GET_ALL_PROBLEMS,
    GET_BOILERPLATE_CODE,
    PROBLEMS_ERROR,
    RESET_SELECTED_PROBLEM_ID,
    SET_SELECTED_PROBLEM_ID,
    START_PROBLEMS_ISADDING,
    START_PROBLEMS_ISDELETING,
    START_PROBLEMS_ISLOADING,
} from "../actions/problemActions";

const initialStatuValues = {
    isLoading: false,
    isDeleting: false,
    isAdding: false,
    isUpdating: false,
};

const initialState = {
    problems: [],
    errors: null,
    status: initialStatuValues,
    selectedProblem: null,
    boilerPlateCode: null,
};

function problemReducer(state = initialState, action) {
    switch (action.type) {
        case START_PROBLEMS_ISLOADING:
            return {
                ...state,
                errors: null,
                status: { ...state.status, isLoading: true },
            };
        case PROBLEMS_ERROR:
            return {
                ...state,
                errors: action.payload,
                status: { ...initialStatuValues },
            };
        case GET_ALL_PROBLEMS:
            return {
                ...state,
                problems: action.payload,
                status: { ...state.status, isLoading: false },
            };
        case START_PROBLEMS_ISADDING:
            return {
                ...state,
                status: { ...state.status, isAdding: true },
                errors: null,
            };
        case ADD_PROBLEM:
            return {
                ...state,
                problems: [...state.problems, action.payload],
                status: { ...state.status, isAdding: false },
            };

        case GET_BOILERPLATE_CODE:
            return {
                ...state,
                boilerPlateCode: action.payload,
                status: { ...state.status, isLoading: false },
            };
        case SET_SELECTED_PROBLEM_ID:
            return {
                ...state,
                selectedProblem: action.payload,
            };
        case RESET_SELECTED_PROBLEM_ID:
            return {
                ...state,
                selectedProblem: null,
                boilerPlateCode: null,
            };
        case START_PROBLEMS_ISDELETING:
            return {
                ...state,
                status: { ...state.status, isDeleting: true },
            };
        case DELETE_PROBLEM:
            return {
                ...state,
                status: { ...state.status, isDeleting: false },
                problems: state.problems.filter(
                    (ele) => ele._id !== action.payload
                ),
            };
        default:
            return state;
    }
}

export { problemReducer };
