import React from 'react';
import styled from '@emotion/styled';

const Wrapper = styled.div`
    border-radius: 12px;
    background-color: ${props => props.color || "gray"};
    padding: 10px 12px;
    margin: ${props => props.margin || "20px"};
`;

const IconContainer = ({color, margin, children}) => {
    return (
        <Wrapper color={color} margin={margin}>
            {children}
        </Wrapper>
    );
};

export default IconContainer;