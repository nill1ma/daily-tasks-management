import styled from "styled-components";
import Modal from 'react-modal';

export const BoardContainer = styled.div`
    width: 100vw;
    height: 90vh;
    display: flex;
    flex-direction: column;
    background-color: #161b22;
    color: #fff;
    overflow-x: hidden;
`
export const Header = styled.header`
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 20vh;
    padding-left: 10px;
    .projectName{
        display: flex;
        flex-direction: column;
    }
`

export const ColumnsArea = styled.div`
    width: 100%;
    display: flex;
    overflow-x:auto;
    /* margin-left: 10px; */
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
    @media(max-width: 610px) {
        flex-direction: column;
    }
`

export const ColumndModal = styled(Modal)`
    input{
        background-color: #161b22;
        color: #fff;
        border:solid #fff;
        padding: 5px 10px;
        border-radius: 5px;
        font-size: 22px;
    }
`