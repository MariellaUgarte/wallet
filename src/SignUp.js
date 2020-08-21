import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as yup from 'yup';
import FormButton from './FormButton';
import Label from './Label';
import Input from './Input';
import Errors from './Errors';
import Sign from './Sign';
import Hr from './Hr';
import { signIn } from './actions/authActions';
import { useUserDispatch } from './context/UserContext';
import {Link} from 'react-router-dom';

const SignUp = props => {
    const userDispatch = useUserDispatch();

    return (
        <Sign>
            <Formik
                initialValues={{
                    first_name: "",
                    last_name: "",
                    phone: "",
                    email: "",
                    password: "",
                    passwordConfirm: ""
                }}
                onSubmit={ values => signIn(values, userDispatch, props.history, 'users') }
                validationSchema={yup.object().shape({
                    first_name: yup.string().required("Required"),
                    last_name: yup.string().required("Required"),
                    phone: yup.number().min(100000000, "Must be of 9 digits").max(999999999, "Must be of 9 digits").required("Required"),
                    email: yup.string().email().required("Required"),
                    password: yup.string().min(6).max(40).required("Password must have a length between 6 and 40"),
                    passwordConfirm: yup.string().oneOf([ yup.ref('password'), null ]).required("Required")
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
                            console.log("form props", props)
                            return (
                                <form onSubmit={handleSubmit} style={{
                                                display: "flex", 
                                                alignItems: "flex-start",
                                                flexDirection: "column",
                                                width: "320px"
                                                }}>
                                    <Label htmlFor={"first_name"}>
                                        First Name
                                    </Label>
                                    <Input
                                        id={"first_name"}
                                        placeholder={"John..."}
                                        type={"text"}
                                        value={values.first_name}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    />
                                    {
                                        errors.first_name && touched.first_name && (
                                            <Errors>{errors.first_name}</Errors>
                                        )
                                    }
                                    <Label htmlFor={"last_name"}>
                                        Last Name
                                    </Label>
                                    <Input
                                        id={"last_name"}
                                        placeholder={"Doe..."}
                                        type={"text"}
                                        value={values.last_name}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    />
                                    {
                                        errors.last_name && touched.last_name && (
                                            <Errors>{errors.last_name}</Errors>
                                        )
                                    }
                                    <Label htmlFor={"phone"}>
                                        Phone Number
                                    </Label>
                                    <Input
                                        id={"phone"}
                                        placeholder={987654312}
                                        type={"number"}
                                        value={values.phone}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    />
                                    {
                                        errors.phone && touched.phone && (
                                            <Errors>{errors.phone}</Errors>
                                        )
                                    }
                                    <Label htmlFor={"email"}>
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
                                    <Label htmlFor={"password"}>
                                        Password
                                    </Label>
                                    <Input
                                        id={"password"}
                                        placeholder={"**********"}
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
                                    <Label htmlFor={"passwordConfirm"}>
                                        Confirm Password
                                    </Label>
                                    <Input
                                        id={"passwordConfirm"}
                                        placeholder={"*********"}
                                        type={"password"}
                                        value={values.passwordConfirm}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    />
                                    {
                                        errors.passwordConfirm && touched.passwordConfirm && (
                                        <Errors>{errors.passwordConfirm}</Errors>
                                        )
                                    }
                                    <Hr/>
                                    <FormButton>
                                        Sign Up now
                                    </FormButton>
                                    <div style={{display: "flex", width: "100%", justifyContent: "center"}}>
                                        <span style={{fontWeight: "bold"}}>
                                            Already have an account? <Link to={"signin"}>Signin</Link>
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

export default SignUp;