import React, { useEffect, useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as yup from 'yup';
import Label from './Label';
import Input from './Input';
import Errors from './Errors';
import styled from '@emotion/styled';
import ProfileIcon from './ProfileIcon';
import IconContainer from './IconContainer';
import SaveButton from './SaveButton';
import Main from './Main';
import {headers} from './Transactions';

const ProfileInput = styled(Input)`
    border-style: solid;
    border-color: ${props => props.error ? "red" : "#A0AEC0"};
    border-width: 0.5px;
    height: 40px;
    border-radius: 4px;
    color: black;
    margin-bottom: 10px;
    padding: 0 8px;
`;

const baseURL = 'http://localhost:3000/';

const Profile = props => {

    const [profile, setProfile] = useState({});

    const fetchProfile = async () => {
        const response = await fetch(baseURL + 'user', {
            headers,
            method: 'GET'
        });
        const data = await response.json();
        console.log("profile data", data)
        setProfile(data);
    }

    useEffect(() => {
        fetchProfile();
    }, [])

    const updateProfile = async values => {
        const response = await fetch(baseURL + 'edit_user', {
            headers,
            method: 'PATCH',
            body: JSON.stringify(values)
        })
        console.log(response);
        props.history.push('/transactions');
    }

    return (
        <Main history={props.history}>
            <IconContainer color={"#A0AEC0"}>
                <ProfileIcon/>
            </IconContainer>
            <Formik
                enableReinitialize={true}
                initialValues={{
                    first_name: profile.first_name,
                    last_name: profile.last_name,
                    phone: profile.phone,
                    email: profile.email
                }}
                onSubmit={ values => updateProfile(values)}
                validationSchema={yup.object().shape({
                    first_name: yup.string().required("Required"),
                    last_name: yup.string().required("Required"),
                    phone: yup.number().min(100000000, "Must be of 9 digits")
                                    .max(999999999, "Must be of 9 digits").required("Required"),
                    email: yup.string().email().required("Required")
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
                        console.log("profile props", props);
                        return (
                            <form 
                                style={{
                                    display: "flex",
                                    alignItems: "flex-start",
                                    flexDirection: "column",
                                    width: "200px"
                                }}
                                onSubmit={handleSubmit}
                            >
                                <Label htmlFor={"first_name"} normal={true}>
                                    First Name
                                </Label>
                                <ProfileInput
                                    border={true}
                                    allborders={true}
                                    id={"first_name"}
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
                                <Label htmlFor={"last_name"} normal={true}>
                                    Last Name
                                </Label>
                                <ProfileInput
                                    border={true}
                                    allborders={true}
                                    id={"last_name"}
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
                                <Label htmlFor={"phone"} normal={true}>
                                    Phone number
                                </Label>
                                <ProfileInput
                                    border={true}
                                    allborders={true}
                                    id={"phone"}
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
                                <Label htmlFor={"email"} normal={true}>
                                    Email Address
                                </Label>
                                <ProfileInput
                                    border={true}
                                    allborders={true}
                                    id={"email"}
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
                                <div style={{display: "flex", width: "100%", justifyContent: "flex-end"}}>
                                    <SaveButton/>
                                </div>
                            </form>
                        );
                    }
                }
            </Formik>
        </Main>
    );
};

export default Profile;