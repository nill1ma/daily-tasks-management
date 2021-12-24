import { Link } from "react-router-dom";
import styled from "styled-components";

type ItemProps = {
    active: boolean
}

export const HeaderContainer = styled.aside`
    width: 100vw;
    height: 10vh;
    display: flex;
    align-items: center;
    background-color: #161b22;
    color: #fff;
`


export const Item = styled(Link)<ItemProps>`
    display: flex;
    background-color: ${({active})=> active ? `#fff` : `#161b22`};
    color: ${({active})=> active ? `#161b22` : `#fff`};
    font-weight:bold;
    text-decoration: none;
    cursor: pointer;
    padding: 15px;  
    margin-left: 10px;
`