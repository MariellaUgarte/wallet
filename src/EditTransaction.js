import React, {useState, useLayoutEffect} from 'react';
import IconContainer from './IconContainer';
import SilverWareIcon from './SilverWareIcon';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as yup from 'yup';
import Label from './Label';
import styled from '@emotion/styled';
import Input from './Input'
import SaveButton from './SaveButton';
import Select from 'react-select';
import Hr from './Hr';
import TransactionInput from './TransactionInput';
import {options, TransactionInputv2, headers, Button} from './Transactions';
import Main from './Main';
import Errors from './Errors';
import {displayNames} from './Item'

const TextArea = styled.textarea`
    border-style: solid;
    border-radius: 4px;
    border-color: ${props => props.error ? "red" : "#A0AEC0"};
    margin-bottom: 20px;
    width: 100%;
    min-height: 80px;
    resize: none;
`;

const EditTransaction = props => {
    const id = props.location.pathname.split('/')[2];
    const baseURL = `http://localhost:3000/transactions/${id}`;

    const [transaction, setTransaction] = useState({});

    const mapCategory = category => {
        for(let [key, value] of Object.entries(displayNames)) {
            if(key === category) {
                return { "value": key, "label": value };
            }
        }
    };

    useLayoutEffect(() => {
        async function fetchTransaction() {
            const response = await fetch(baseURL, {
                headers,
                method: 'GET'
            });
            let data = await response.json();
            data.category = mapCategory(data.category);
            const date = new Date(data.date);
            data.date = `${date.getFullYear()}-${(date.getMonth() < 10 ? '0' : '') + date.getMonth()}-${date.getDate()}`
            setTransaction(data);
        }
        fetchTransaction();
    }, [])

    const updateTransaction = async values => {
        values.category = values.category.value;
        try {
            await fetch(baseURL, {
                headers,
                method: 'PATCH',
                body: JSON.stringify(values)
            });
            props.history.push('/transactions');
        }
        catch (err) {
            console.log("error:", err);
        }
    };

    const deleteTransaction = async () => {
        try {
            await fetch(baseURL, {
                headers,
                method: 'DELETE',
            });
            props.history.replace('/transactions');
        }
        catch (err) {
            console.log("error:", err);
        }
    }

    return (
        <Main history={props.history}>
            <IconContainer color={"#E53E3E"}>
                <SilverWareIcon/>
            </IconContainer>
            <Formik
                enableReinitialize={true}
                initialValues={{
                    payee: transaction.payee,
                    description: transaction.description,
                    amount: transaction.amount,
                    category: transaction.category,
                    date: transaction.date
                }}
                onSubmit={values => updateTransaction(values)}
                validationSchema={yup.object().shape({
                    payee: yup.string().required("Required"),
                    description: yup.string().required("Required")
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
                            setFieldValue,
                            handleReset
                        } = props;

                        return (
                            <form onSubmit={handleSubmit} style={{
                                display: "flex", 
                                alignItems: "flex-start",
                                flexDirection: "column",
                                width: "200px"
                            }}>
                                <Label htmlFor={"category"} normal={true}>
                                    Category
                                </Label>
                                <div style={{width: "100%", marginBottom: "15px"}}>
                                    <Select
                                        id={"category"}
                                        type={"text"}
                                        value={values.category}
                                        onChange={option => setFieldValue("category", option)}
                                        options={options}
                                        onBlur={handleBlur}
                                    />
                                    {
                                        errors.category && touched.category && (
                                        <Errors>{errors.category}</Errors>
                                        )
                                    }
                                </div>
                                <Label htmlFor={"payee"} normal={true}>
                                    Payee
                                </Label>
                                <TransactionInputv2
                                    id={"payee"}
                                    type={"text"}
                                    value={values.payee}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                                {
                                    errors.payee && touched.payee && (
                                    <Errors>{errors.payee}</Errors>
                                    )
                                }
                                <Label htmlFor={"description"} normal={true}>
                                    Description
                                </Label>
                                <TextArea
                                    id={"description"}
                                    type={"text"}
                                    value={values.description}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                                {
                                    errors.description && touched.description && (
                                    <Errors>{errors.description}</Errors>
                                    )
                                }
                                <Label htmlFor={"date"} normal={true}>
                                    Date
                                </Label>
                                <TransactionInputv2
                                    id='date'
                                    type='date'
                                    placeholder='dd/mm/yyyy' 
                                    value={values.date}
                                    onChange={e => setFieldValue("date", e.target.value)}
                                    onBlur={handleBlur}
                                    name='form[datetime]'/>
                                {
                                    errors.date && touched.date && (
                                    <Errors>{errors.date}</Errors>
                                    )
                                }
                                <Label htmlFor={"amount"} normal={true}>
                                    Amount
                                </Label>
                                <TransactionInputv2
                                    id={"amount"}
                                    type={"number"}
                                    value={values.amount}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                                {
                                    errors.amount && touched.amount && (
                                    <Errors>{errors.amount}</Errors>
                                    )
                                }
                                <div style={{display: "flex", width: "100%", justifyContent: "flex-end"}}>
                                    <Button onClick={deleteTransaction}>Delete</Button>
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

export default EditTransaction;