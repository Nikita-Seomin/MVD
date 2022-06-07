import React from "react";
import {connect} from "react-redux";
import Login from "./Login";
import {postUserName} from "../../Data/Reducers/LoginReducer";
import {loginAxiosAPI} from "../../AxiosAPI/AxiosAPI";


class AuthContainer extends React.Component {
    onClickLoginButton = values => {
        loginAxiosAPI.postSession(values.email, values.password).then(data => {
            if (data.UserName) {
                this.props.postUserName(data.UserName);
                window.location.href = '/';
            }
            else
                alert(data);
        });
    }

    render() {
        return <Login
            onClickLoginButton={this.onClickLoginButton}
        />
    }
}

let mapStateToProps = (state) => {
    return {
    }
}

export default connect(mapStateToProps,{postUserName}) (AuthContainer);