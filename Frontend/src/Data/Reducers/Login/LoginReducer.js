import {createSlice} from "@reduxjs/toolkit";


const authSlice =  createSlice({
    name: "authSlice",
    initialState: {
        userName: ''
    },
    reducers: {
        postUserName: function (state, action) {
            state.userName = action.payload
            //alert(state.userName);
        }
    }
})

export default authSlice.reducer;
export const {postUserName} = authSlice.actions;