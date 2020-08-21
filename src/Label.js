import styled from '@emotion/styled';

const Label = styled.label`
    font-weight: ${props => props.normal ? "normal" : "bold"};
    display: block;
    margin-bottom: 10px;
`;

export default Label;