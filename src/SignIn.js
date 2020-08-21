import React, { useContext, useEffect } from 'react';
import styled from '@emotion/styled';
import Sign from './Sign';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as yup from 'yup';
import Input from './Input';
import Errors from './Errors';
import FormButton from './FormButton';
import Hr from './Hr';
import Label from './Label';
import { signIn } from './actions/authActions';
import { useUserStore, useUserDispatch } from './context/UserContext';
import {Link} from 'react-router-dom';

const SignIn = props => {
    const userDispatch = useUserDispatch();

    return (
        <Sign>
            <Formik
                initialValues={{
                    email: "",
                    password: ""
                    }}
                onSubmit={ values => signIn(values, userDispatch, props.history, 'login')}
                validationSchema={yup.object().shape({
                    email: yup.string().email().required("Email is not valid"),
                    password: yup.string().min(6).max(40).required("Password must have a length between 6 and 40")
                })}>
                {
                    props => {
                        const {
                            values,
                            touched,
                            errors,
                            handleChange,
                            handleBlur,
                            handleSubmit,
                            handleReset
                        } = props;
                        return (
                            <form onSubmit={handleSubmit} style={{
                                                                display: "flex", 
                                                                alignItems: "flex-start",
                                                                flexDirection: "column",
                                                                width: "320px"
                                                                }}>
                                <Label htmlFor={"email"} styled={{}}>
                                    Email Address
                                </Label>
                                <Input
                                    id={"email"}
                                    placeholder={"youremail@domain.com"}
                                    type={"email"}
                                    value={values.email}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                                {
                                    errors.email && touched.email && (
                                        <Errors>{errors.email}</Errors>
                                    )
                                }
                                <Label htmlFor={"password"} styled={{}}>
                                    Password
                                </Label>
                                <Input
                                    id={"password"}
                                    placeholder={"*********"}
                                    type={"password"}
                                    value={values.password}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                                {
                                    errors.password && touched.password && (
                                        <Errors>{errors.password}</Errors>
                                    )
                                }
                                <Hr/>
                                <FormButton>
                                    Sign in now
                                </FormButton>
                                <div style={{display: "flex", width: "100%", justifyContent: "center"}}>
                                    <span style={{fontWeight: "bold"}}>
                                        Don't have an account? <Link to={"signup"}>Signup</Link>
                                    </span>
                                </div>
                            </form>
                        );
                    }
                }
            </Formik>
        </Sign>
    );
};

export default SignIn;