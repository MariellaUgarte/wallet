import styled from '@emotion/styled';

const Hr = styled.hr`
    visibility: hidden;
    width: 100%;
    margin: ${props => props.margin || "8px"};
`;

export default Hr;