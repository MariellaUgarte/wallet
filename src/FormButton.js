import React from 'react';
import styled from '@emotion/styled';

const Button = styled.button`
    background: white;
    text-transform: uppercase;
    padding: 0 30px;
    height: 28px;
    border-radius: 14px;
    border: none;
    font-weight: bold;
    margin-bottom: 25px;
`;

const Wrapper = styled.div`
    display: flex;
    width: 100%;
    justify-content: center;
    align-items: center;
`;

const FormButton = ({children}) => (
    <Wrapper>
        <Button type={"submit"}>
            {children}
        </Button>
    </Wrapper>
);

export default FormButton;