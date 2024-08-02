import {
    START_LIKE_ISLOADING,
    TOTAL_LIKES,
    TOTAL_LIKES_ERROR,
} from "../actions/likeAction";

const statusInitialState = {
    isLoading: false,
    isUpdating: false,
    isDeleting: false,
    isCreating: false,
};

const initialState = {
    likesByProblemId: [],
    status: statusInitialState,
    error: null,
};

const likesReducer = (state = initialState, action) => {
    switch (action.type) {
        case START_LIKE_ISLOADING:
            return {
                ...state,
                status: {
                    ...state.status,
                    isLoading: true,
                },
                error: null,
            };

        case TOTAL_LIKES:
            return {
                ...state,
                likesByProblemId: action.payload,
                status: {
                    ...state.status,
                    isLoading: false,
                },
            };
        case TOTAL_LIKES_ERROR:
            return {
                ...state,
                status: {
                    ...statusInitialState,
                },
                error: action.payload,
            };
        default:
            return state;
    }
};

export { likesReducer };
