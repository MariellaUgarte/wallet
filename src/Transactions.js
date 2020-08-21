import React, {useEffect, useState} from 'react';
import { useUserStore } from './context/UserContext';
import List from './List';
import Item from './Item';
import Main from './Main';
import styled from '@emotion/styled';
import PlusIcon from './PlusIcon';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as yup from 'yup';
import SaveButton from './SaveButton';
import Select from 'react-select';
import Label from './Label';
import TransactionInput from './TransactionInput';
import Errors from './Errors';

export const TransactionInputv2 = styled(TransactionInput)`
    background: white;
    height: 38px;
    margin-bottom: 8px;
`;

const Header = styled.div`
    background: #EBF4FF;
    display: flex;
    padding: 30px;
    justify-content: space-between;
    padding: 40px;
    width: 100%;
    align-items: center;
`;

const Inner = styled.div`
    display: flex;
    flex-direction: column;
`;

export const Button = styled.button`
    padding: 8px 12px;
    border: none;
    font-weight: 800;
    background: none;
`;

const Submit = styled(Button)`
    background: #667EEA;
    color: white;
`;

export const options = [
    { value: 'shopping', label: 'Shopping' },
    { value: 'food_and_drinks', label: 'Food & Drinks' },
    { value: 'transport', label: 'Transport' },
    { value: 'others', label: 'Other' },
    { value: 'income', label: 'Income' },
    { value: 'services', label: 'Services' }
  ];

export const headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${localStorage.getItem("token")}`
};

const Transactions = props => {
    const [transactions, setTransactions] = useState([]);
    const [balance, setBalance] = useState(0);
    const [active, setActive] = useState(false);

    async function fetchData() {
        const response = await fetch('http://localhost:3000/transactions', {
            headers,
            method: 'GET'
        });
        const data = await response.json();
        setBalance(data.reduce((sum, x) => {
            return sum + x.amount * (x.category === "income" ? 1 : -1);
        }, 0));
        setTransactions(data);
    }

    useEffect(() => {
        fetchData();
    }, []);

    const createTransaction = async values => {
        values.category = values.category.value;
        setTransactions([...transactions, values])
        const response = await fetch('http://localhost:3000/transactions', {
            headers,
            method: 'POST',
            body: JSON.stringify(values)
        });
        fetchData();
        setActive(false);
    }

    return (
        <Main history={props.history}>
            <Header active={active}>
                {!active ? 
                    <>
                        <span style={{fontWeight: "bold"}}>
                            {`Balance: S/ ${balance}`}
                        </span>
                        <div
                            style={{background: "#667EEA", padding: "8px", color: "white", display: "flex", alignItems: "center"}}
                            onClick={() => setActive(true)}
                        >
                            <PlusIcon/>
                            <span style={{marginLeft: "12px"}}>Add transaction</span>
                        </div>
                    </> : 
                    <Formik 
                        initialValues={{
                            date: "",
                            category: "",
                            description: "",
                            payee: "",
                            amount: ""
                        }}
                        onSubmit={(values, { resetForm } ) => {
                            createTransaction(values);
                            resetForm({});
                        }}
                        validationSchema={yup.object().shape({
                            payee: yup.string().required("Required"),
                            description: yup.string().required("Required"),
                            date: yup.string().required("Required"),
                            category: yup.string().required("Required"),
                            amount: yup.number().required("Required")
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
                                            flexDirection: "column",
                                            width: "100%"                                                
                                        }}>
                                            <div style={{display: "flex", width: "100%", justifyContent: "space-between"}}>
                                                <Inner>
                                                    <Label htmlFor={"category"} normal={true}>
                                                        Category
                                                    </Label>
                                                    <div style={{width: "180px", marginBottom: "8px"}}>
                                                        <Select
                                                            id={"category"}
                                                            type={"text"}
                                                            value={values.category || ''}
                                                            onChange={option => setFieldValue("category", option)}
                                                            options={options}
                                                            onBlur={handleBlur}
                                                        />
                                                    </div>
                                                    {
                                                        errors.category && touched.category && (
                                                            <Errors>{errors.category}</Errors>
                                                        )
                                                    }
                                                </Inner>
                                                <Inner>
                                                    <Label htmlFor={"payee"} normal={true}>
                                                        Payee
                                                    </Label>
                                                    <TransactionInputv2
                                                        style={{width: "150px"}}
                                                        id={"payee"}
                                                        type={"text"}
                                                        value={values.payee || ''}
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                    />
                                                    {
                                                        errors.payee && touched.payee && (
                                                            <Errors>{errors.payee}</Errors>
                                                        )
                                                    }
                                                </Inner>
                                                <Inner>
                                                    <Label htmlFor={"description"} normal={true}>
                                                        Description
                                                    </Label>
                                                    <TransactionInputv2
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
                                                </Inner>
                                                <Inner>
                                                    <Label htmlFor={"date"} normal={true}>
                                                        Date
                                                    </Label>
                                                    <TransactionInputv2
                                                        id={"date"}
                                                        type={"date"}
                                                        placeholder={"dd/mm/yyyy"}
                                                        value={values.date}
                                                        onChange={e => setFieldValue("date", e.target.value)}
                                                        name={"form[datetime]"}/>
                                                    {
                                                        errors.date && touched.date && (
                                                        <Errors>{errors.date}</Errors>
                                                        )
                                                    }
                                                </Inner>
                                                <Inner>
                                                    <Label htmlFor={"amount"} normal={true}>
                                                        Amount
                                                    </Label>
                                                    <TransactionInputv2
                                                        id={"amount"}
                                                        type={"number"}
                                                        value={values.amount}
                                                        onChange={handleChange}
                                                    />
                                                    {
                                                        errors.amount && touched.amount && (
                                                        <Errors>{errors.amount}</Errors>
                                                        )
                                                    }
                                                </Inner>
                                            </div>
                                            <div style={{display: "flex", width: "100%", justifyContent: "flex-end"}}>
                                                <Button onClick={() => { handleReset(); setActive(false) }}>Cancel</Button>
                                                <Submit type={"submit"}>Save transaction</Submit>
                                            </div>
                                        </form>
                                    );
                                }
                            }
                    </Formik>
                }
            </Header>
            {transactions && transactions.length ?
                <List>
                    {transactions.map(item => <Item history={props.history} key={item.id} {...item}/>)}
                </List>
                :
                <></>
            }
        </Main>
    );
}

export default Transactions;