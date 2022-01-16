import styled from "styled-components";
import Modal from 'react-modal';

export const BoardsContainer = styled.div`
    width: 100vw;
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
export const BoardsArea = styled.div`
    width: 100%;
    display: flex;
    min-height: 70vh;
    max-height: 70vh;
    overflow-y:auto;
    flex-wrap: wrap; 
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
        flex-wrap: nowrap;
        overflow-y: auto;
        &::-webkit-scrollbar{
            height: 1px;
        }
        &::-webkit-scrollbar-track{
            padding: 0;
        }
        &::-webkit-scrollbar-thumb{
            border-radius: 5px;
        }
    }
`

export const Board = styled.div`
    text-decoration:none;
    color:#fff;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 31%;
    height: 150px;
    border: 1px solid #fff;
    border-radius: 10px;
    cursor: pointer;
    margin-left: 10px;
    &:hover{
        color: green;
        border-color: green;
    }
    &:nth-child(n){
        margin-top: 10px;
    }
    &:nth-child(1){
        margin-top: 0;
    }
    &:nth-child(2){
        margin-top: 0;
    }
    &:nth-child(3){
        margin-top: 0;
    }
    @media(max-width: 610px) {
        width: 95%;
        margin-right: 10px;
        min-height: 100px;
        :nth-child(n){
            margin-top: 10px;
        }
        :nth-child(1){
            margin-top: 0;
        }
    }
`

export const BoardModal = styled(Modal)`
    input{
        background-color: #161b22;
        color: #fff;
        border:solid #fff;
        padding: 5px 10px;
        border-radius: 5px;
        font-size: 22px;
    }
`