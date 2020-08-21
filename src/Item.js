import React from 'react';
import styled from '@emotion/styled';
import IconContainer from './IconContainer';
import SilverWareIcon from './SilverWareIcon';
import Hr from './Hr';
import { formatDistance } from 'date-fns';
import Errors from './Errors';
import HouseIcon from './HouseIcon';
import TransportIcon from './TransportIcon';
import ShoppingIcon from './ShoppingIcon';
import OtherIcon from './OtherIcon';
import CoinsIcon from './CoinsIcon';
import ServicesIcon from './ServicesIcon';

const Wrapper = styled.div`
    display: flex;
    align-items: center;
    width: 100%;
    justify-content: space-between;
`;

const Inner = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
`;

const Identifier = styled.span`
    font-weight: 440;
    color: #1A202C;
`;

const Attribute = styled.span`
    font-weight: 200;
    color: #4A5568;
`;

export const displayNames = {
    "food_and_drinks": "Food & Drinks",
    "housing": "Housing",
    "transport": "Transport",
    "shopping": "Shopping",
    "others": "Others",
    "income": "Income",
    "services": "Services"
}

const Item = props => {
    let {
        id,
        category,
        payee,
        description,
        date, 
        amount
    } = props;

    return (
        <>
            <Wrapper>
                <Inner>
                    {
                        (() => {
                            switch(category) {
                                case "food_and_drinks":
                                    return (<IconContainer color={"#E53E3E"} margin={"10px"}>
                                                <SilverWareIcon/>
                                            </IconContainer>);
                                case "housing":
                                    return (<IconContainer color={"#F6E05E"} margin={"10px"}>
                                        <HouseIcon/>
                                    </IconContainer>);
                                case "transport":
                                    return (<IconContainer color={"#ED8936"} margin={"10px"}>
                                        <TransportIcon/>
                                    </IconContainer>
                                    );
                                case "shopping": 
                                    return (<IconContainer color={"#63B3ED"} margin={"10px"}>
                                        <ShoppingIcon/>
                                    </IconContainer>);
                                case "others":
                                    return (
                                        <IconContainer color={"#718096"} margin={"10px"}>
                                            <OtherIcon/>
                                        </IconContainer>
                                    );
                                case "income":
                                    return (
                                        <IconContainer color={"#68D391"} margin={"10px"}>
                                            <CoinsIcon/>
                                        </IconContainer>          
                                    );
                                case "services":
                                    return (
                                        <IconContainer color={"#4FD1C5"} margin={"10px"}>
                                            <ServicesIcon/>
                                        </IconContainer>
                                    );
                                default:
                                    throw new Error();
                            }
                        })()
                    }
                </Inner>
                <Wrapper onClick={() => props.history.push(`/transactions/${id}/edit`)}>
                    <Inner style={{width: "150px", paddingRight: "30px"}}>
                        <Identifier>{displayNames[category]}</Identifier>
                        <Attribute>Category</Attribute>
                    </Inner>
                    <Inner style={{width: "132px", paddingRight: "8px"}}>
                        <Identifier>{payee}</Identifier>
                        <Attribute>Payee</Attribute>
                    </Inner>
                    <Inner style={{width: "300px", paddingRight: "8px"}}>
                        <Identifier>{description}</Identifier>
                        <Attribute>Description</Attribute>
                    </Inner>
                    <Inner style={{width: "100px", paddingRight: "8px"}}>
                        <Identifier>{formatDistance(new Date(date), new Date())}</Identifier>
                        <Attribute>Date</Attribute>
                    </Inner>
                    <Inner style={{alignItems: "flex-end", flex: 1}}>
                        <Identifier style={{fontWeight: "bold"}}>{`S/ ${amount * (category !== "income" ? -1 : 1)}`}</Identifier>
                        <Attribute>Amount</Attribute>
                    </Inner>
                </Wrapper>
            </Wrapper>
            <Hr style={{visibility: "visible", margin: 0}}/>
        </>
    );
};

export default Item;