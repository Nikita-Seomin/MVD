import {connect} from "react-redux";
import {onLoginChange, onPasswordChange} from "../../Data/Reducers/LoginReducer";
import Auth from "./Auth";
import Login from "./Login";


let mapStateToProps = (state) => {
    return {
        loginText: state.loginPage.loginText,
        passwordText: state.loginPage.passwordText
    }
}

const AuthContainer = connect() (Login);
export default AuthContainer;