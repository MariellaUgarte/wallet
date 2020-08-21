import React from 'react';
import styled from '@emotion/styled';
import Hr from './Hr';

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    color: white;
`;

const Sign = ({children}) => {
    return (
        <Wrapper>
            <h2>Walletable</h2>
            <span>Hi! Welcome to walletable 👋</span>
            <span>Sign in to start enjoying your new money management super powers!</span>
            <Hr margin={"15px"}/>
            {children}
        </Wrapper>
    );
};

export default Sign;