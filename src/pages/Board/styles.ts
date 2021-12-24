import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";

type BoarStyledProps = {
    length: number
}

export const BoardContainer = styled.div`
    width: 100vw;
    height: 90vh;
    display: grid;
    background-color: #161b22;
    color: #fff;
    overflow-x: hidden;
`

export const ColumnsArea = styled.header<BoarStyledProps>`
    width: 100%;
    display: flex;
    overflow-x:auto;
    padding-left: 10px;
    &::-webkit-scrollbar{
        height: 10px;
    }
    &::-webkit-scrollbar-track{
        border: 1px solid #000;
        padding: 5px;
        background-color: #737272;
    }
    &::-webkit-scrollbar-thumb{
        border-radius: 5px;
        box-shadow: inset 0 0 6px rgba(0,0,0,.3);
        background-color: #fff;
        border: 1px solid #000
    }
`
export const Header = styled.header`
    display: flex;
    flex-direction: column;
    justify-content: center;
    /* align-items: center; */
    padding-left: 10px;
    .projectName{
        display: flex;
        flex-direction: column;
    }
`