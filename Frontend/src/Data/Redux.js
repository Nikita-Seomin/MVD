import {combineReducers,  legacy_createStore as createStore} from "redux";
import LoginReducer from "./Reducers/LoginReducer";

let reducers = combineReducers({
    loginPage: LoginReducer
});

let store = createStore(reducers);

export default store;