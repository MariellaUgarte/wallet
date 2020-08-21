import styled from '@emotion/styled';
import Input from './Input'

const TransactionInput = styled(Input)`
    border-style: solid;
    border-color: ${props => props.error ? "red" : "#A0AEC0"};
    border-width: 0.5px;
    height: 40px;
    border-radius: 4px;
    margin-bottom: 20px;
    color: black;
    padding: 2px 8px;
    width: 100%;
`;

export default TransactionInput;