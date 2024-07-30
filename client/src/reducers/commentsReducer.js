import {
    COMMENT_ERROR,
    COMMENTS_BY_PROBLEMID,
    CREATE_COMMENT,
    DELETE_COMMENT,
    START_COMMENT_ISCREATING,
    START_COMMENT_ISDELETING,
    START_COMMENT_ISLOADING,
} from "../actions/commentAction";

const statusInitialState = {
    isLoading: false,
    isUpdating: false,
    isDeleting: false,
    isCreating: false,
};

const initialState = {
    comments: [],
    status: statusInitialState,
    error: null,
};

function commentReducer(state = initialState, action) {
    switch (action.type) {
        case START_COMMENT_ISCREATING:
            return {
                ...state,
                status: { ...state.status, isCreating: true },
                error: null,
            };
        case CREATE_COMMENT:
            return {
                ...state,
                status: { ...state.status, isCreating: false },
                comments: [...state.comments, action.payload],
            };
        case COMMENT_ERROR:
            return {
                ...state,
                status: { ...statusInitialState },
                error: action.payload,
            };
        case START_COMMENT_ISLOADING:
            return {
                ...state,
                status: { ...state.status, isLoading: true },
                error: null,
            };
        case COMMENTS_BY_PROBLEMID:
            return {
                ...state,
                status: { ...state.status, isLoading: false },
                comments: action.payload,
            };
        case START_COMMENT_ISDELETING:
            return {
                ...state,
                status: { ...state.status, isDeleting: true },
                error: null,
            };
        case DELETE_COMMENT:
            return {
                ...state,
                status: { ...state.status, isDeleting: false },
                comments: state.comments.filter(
                    (comment) => comment._id !== action.payload
                ),
            };
        default:
            return state;
    }
}

export { commentReducer };
