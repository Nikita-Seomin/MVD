import React from 'react';

const Auth = (props) => {

    const onLoginChange = (e) => {
        props.onLoginChange(e.target.value);
    }
    const onPasswordChange = (e) => {
        props.onPasswordChange(e.target.value);
    }

    return (
        <div>
            логин:
            <div>
                <input onChange={onLoginChange}
                       value={props.loginText}/>
            </div>
            пароль:
            <div>
                <input onChange={onPasswordChange} value={props.passwordText}/>
            </div>

        </div>
    )
}

export default Auth;