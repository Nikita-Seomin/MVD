import {connect} from "react-redux";
import Login from "./Login";
import {postUserName} from "../../Data/Reducers/Login/LoginReducer";

let mapStateToProps = (state) => {
    return {
    }
}

export const AuthContainer = connect(mapStateToProps,{postUserName}) (Login);