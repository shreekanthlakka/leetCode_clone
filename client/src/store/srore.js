import { createStore, combineReducers, compose, applyMiddleware } from "redux";
import { thunk } from "redux-thunk";
import { problemReducer } from "../reducers/problemsReducer";
import { submissionReducer } from "../reducers/submissionReducer";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const configurStore = () => {
    const store = createStore(
        combineReducers({
            problem: problemReducer,
            submission: submissionReducer,
        }),
        composeEnhancers(applyMiddleware(thunk))
    );
    return store;
};

export { configurStore };
