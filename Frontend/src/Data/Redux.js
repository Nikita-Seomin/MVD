import {combineReducers, configureStore, legacy_createStore as createStore} from "@reduxjs/toolkit";
import authSlice from "./Reducers/Login/LoginReducer";

let reducers = combineReducers({
    loginPage: authSlice,
});

export const store = configureStore({
    reducer: reducers
})

window.store = store;
