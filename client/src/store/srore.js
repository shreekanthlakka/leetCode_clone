import { createStore, combineReducers, compose, applyMiddleware } from "redux";
import { thunk } from "redux-thunk";
import { problemReducer } from "../reducers/problemsReducer";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const configurStore = () => {
    const store = createStore(
        combineReducers({
            problem: problemReducer,
        }),
        composeEnhancers(applyMiddleware(thunk))
    );
    return store;
};

export { configurStore };
