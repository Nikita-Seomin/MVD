import React from 'react';
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

const validationSchemaLoginForm = Yup.object().shape( {

    password: Yup.string()
        .min( 0, "Поле должно содержать символы" )
        .max( 30, "Поле не должно быть больше 30 символов" )
        .required( "Поле должно содержать символы" )
} );


const Login = (props) => {

    return (
        <div>
            <h2> ... Login 555 </h2>

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
                    <Form onSubmit={props.handleSubmit}>
                        <div>
                            <Field
                                name={'email'}
                                value={props.values.login}
                                onChange={props.handleChange}
                                type={'text'}
                                placeholder={'Логин'} />
                        </div>
                        <ErrorMessage name="email" component="div" />

                        <div>
                            <Field
                                name={'password'}
                                value={props.values.password}
                                onChange={props.handleChange}
                                type={'password'}
                                placeholder={'Пароль'} />
                        </div>
                        <ErrorMessage name="password" component="div" />

                        <button type={'submit'}>Login</button>
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