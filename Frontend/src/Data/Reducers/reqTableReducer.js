import {createSlice} from "@reduxjs/toolkit";


export const reqTableSlice =  createSlice({
    name: "reqTableSlice",
    initialState: {
        requestToNum: ''
    },
    reducers: {
        updateRow: function (state, action) {
            console.log(action.payload)
            state.requestToNum = action.payload
        },
        newState: function (state, action) {
            state = action
        }
    }
})

export default reqTableSlice.reducer;
export const {updateRow, newState} = reqTableSlice.actions;