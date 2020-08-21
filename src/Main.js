import React from 'react';
import styled from '@emotion/styled';
import Hr from './Hr';
import TransactionsIcon from './TransactionsIcon';
import ReportIcon from './ReportIcon';
import { useUserDispatch } from './context/UserContext';
import {logout} from './actions/authActions';

const Wrapper = styled.div`
    border-radius: 8px;
    background: white;
    width: 65%;
    min-height: 80vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 40px 0;
`;

const ProfileDivider = styled(Hr)`
    visibility: visible;
    width: 95%;
`;

const Header = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 95%;
`;

const Inner = styled.div`
    display: flex;
    align-items: center;
    color: #A0AEC0;
    margin-right: 6px;
`;

const Main = ({children, history}) => {
    const userDispatch = useUserDispatch();

    return (
        <Wrapper>
            <Header>
                <Inner>
                    <Inner>
                        <TransactionsIcon/>
                        <span style={{color: "#4C51BF"}}>Transactions</span>
                    </Inner>
                    <Inner>
                        <ReportIcon/>
                        <span>Reports</span>
                    </Inner>
                </Inner>
                <Inner>
                    <Inner>
                        <span style={{color: "#434190"}} onClick={() => history.push("/profile")}>Profile</span>
                    </Inner>
                    <Inner>
                        <span style={{color: "#434190"}} onClick={() => logout(userDispatch, history)}>Logout</span>
                    </Inner>
                </Inner>
            </Header>
            <ProfileDivider/>
            {children}
        </Wrapper>
    );
};

export default Main;