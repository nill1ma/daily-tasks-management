import { Link } from "react-router-dom";
import styled from "styled-components";

export const HeaderContainer = styled.header`
    width: 100vw;
    min-height: 10vh;
    max-height: 10vh;
    display: flex;
    align-items: center;
    background-color: #161b22;
    color: #fff;
`


export const Item = styled(Link)`
    display: flex;
    background-color: #fff;
    color: #161b22;
    font-weight:bold;
    text-decoration: none;
    cursor: pointer;
    padding: 15px;  
    margin-left: 10px;
`