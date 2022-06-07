import {combineReducers, configureStore} from "@reduxjs/toolkit";
import authSlice from "./Reducers/LoginReducer";
import {reqTableSlice} from "./Reducers/reqTableReducer";

let reducers = combineReducers({
    loginPage: authSlice,
    reqTablePage: reqTableSlice
});

export const store = configureStore({
    reducer: reducers
})

window.store = store;
