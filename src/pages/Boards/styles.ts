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
    span {
        display: flex;
        width: 100%;
        justify-content: center;
        font-size: 2em;
    }
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