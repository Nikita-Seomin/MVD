import {connect} from "react-redux";
import {onLoginChange, onPasswordChange} from "../../Data/Reducers/LoginReducer";
import Auth from "./Auth";


let mapStateToProps = (state) => {
    return {
        loginText: state.loginPage.loginText,
        passwordText: state.loginPage.passwordText
    }
}

const AuthContainer = connect(mapStateToProps, {onLoginChange , onPasswordChange }) (Auth);
export default AuthContainer;