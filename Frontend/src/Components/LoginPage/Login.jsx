import React from 'react';
import classes from "./Login.module.css"
import {Formik, Form, Field, ErrorMessage} from "formik";
import * as Yup from "yup";
import {loginAxiosAPI} from "../../AxiosAPI/AxiosAPI";


const validateLoginForm = values => {
    const errors = {};
    if (!values.email) {
        errors.email = 'Поле должно содержать символы';
    }
    return errors;
};

const validationSchemaLoginForm = Yup.object().shape({

    password: Yup.string()
        .min(0, "Поле должно содержать символы")
        .max(30, "Поле не должно быть больше 30 символов")
        .required("Поле должно содержать символы")
});


const Login = (props) => {

    return (
        <div>
            <Formik
                initialValues={{
                    email: "",
                    password: "",
                }}
                validate={validateLoginForm}
                validationSchema={validationSchemaLoginForm}
                onSubmit={(values) => {
                    loginAxiosAPI.postSession(values.email, values.password).then(data => {
                        if (data.UserName)
                            props.postUserName(data.UserName);
                        else
                            alert(data);
                    });
                }}
            >
                {props => (
                    <Form onSubmit={props.handleSubmit} className={classes.login} >
                        <p>
                            <label htmlFor="login">Логин:</label>
                            <Field
                                id={classes.login}
                                name={'email'}
                                value={props.values.login}
                                onChange={props.handleChange}
                                type={'text'}
                                placeholder={'Логин'}/>
                        </p>
                        <ErrorMessage name="email" component="div"/>

                        <p>
                            <label htmlFor="password">Пароль:</label>
                            <Field
                                id={classes.password}
                                name={'password'}
                                value={props.values.password}
                                onChange={props.handleChange}
                                type={'password'}
                                placeholder={'Пароль'}/>
                        </p>
                        <ErrorMessage name="password" component="div"/>
                        <p className={classes.login_submit}>
                            <button type={'submit'} className={classes.login_button}>Login</button>
                        </p>
                    </Form>
                )}
            </Formik>

            <div>
                ...
            </div>

        </div>
    )
}

export default Login;