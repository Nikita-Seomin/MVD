import React from "react";
import {connect} from "react-redux";
import Login from "./Login";
import {postUserName} from "../../Data/Reducers/LoginReducer";
import {login} from "../../AxiosAPI/login";


const AuthContainer = () => {
    const onClickLoginButton = values => {
        login.postSession(values.email, values.password).then(data => {
            if (data.UserName) {
                this.props.postUserName(data.UserName);
                window.location.href = '/';
            }
            else
                alert(data);
        });
    }
        return <Login
            onClickLoginButton={onClickLoginButton}
        />
}

let mapStateToProps = (state) => {
    return {
    }
}

export default connect(mapStateToProps,{postUserName}) (AuthContainer);