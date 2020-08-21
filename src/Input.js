import styled from '@emotion/styled';

const Input = styled.input`
    background: none;
    border-style: none none solid none;
    border-color: ${props => props.error ? "red" : "white"};
    ::placeholder {
        color: white;
    }
    margin-bottom: 8px;
    width: 100%;
    font-size: 1em;
    color: white;
`;

export default Input