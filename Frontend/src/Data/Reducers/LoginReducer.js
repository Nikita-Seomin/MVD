import {createSlice} from "@reduxjs/toolkit";


const authSlice =  createSlice({
    name: "authSlice",
    initialState: {
        userName: ''
    },
    reducers: {
        postUserName: function (state, action) {
            state.userName = action.payload
        }
    }
})

export default authSlice.reducer;
export const {postUserName} = authSlice.actions;