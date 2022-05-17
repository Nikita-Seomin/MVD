import keyMirror from "./../../Constants/ReducerConst";

const initialState = {
    loginText: '',
    passwordText: '',
    userName: ''
}

const profileReducer = (state = initialState, action) => {
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