import {combineReducers, configureStore} from "@reduxjs/toolkit";
import authSlice from "./Reducers/LoginReducer";

let reducers = combineReducers({
    loginPage: authSlice,
});

export const store = configureStore({
    reducer: reducers
})

window.store = store;
