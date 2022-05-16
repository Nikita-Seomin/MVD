import keyMirror from "./../../Constants/ReducerConst";
let UPDATE_LOGIN_TEXT = 'UPDATE_LOGIN_TEXT'
let UPDATE_PASSWORD_TEXT = "UPDATE_PASSWORD_TEXT"

const initialState = {
    loginText: '',
    passwordText: '',
    userName: ''
}

const profileReducer = (state = initialState, action) => {
    console.log(state.passwordText)
    switch (action.type){
        case keyMirror.UPDATE_LOGIN_TEXT:
            return {
                ...state,
                loginText: action.LoginText
            }
        case keyMirror.UPDATE_PASSWORD_TEXT:
            return {
                ...state,
                passwordText: action.newPasswordText
            }
        default:
            return state;
    }
}

export const onLoginChange = (LoginText) => ({type: keyMirror.UPDATE_LOGIN_TEXT, LoginText});
export const onPasswordChange = (newPasswordText) => ({type: keyMirror.UPDATE_PASSWORD_TEXT, newPasswordText});


export default profileReducer;