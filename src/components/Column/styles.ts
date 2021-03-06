import styled from "styled-components";
import Modal from 'react-modal';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const ColumnContainer = styled.div`
    display: flex;
    flex-direction: column;
    border: 1px solid;
    min-height: 80%;
    max-height: 100%;
    min-width: 355px;
    max-width: 355px;
    background-color: #0d1117;
    color: #fff;
    border-radius: 5px;
    &:nth-child(n){
        margin-left: 10px;
    }
    @media(max-width: 610px) {
        min-width: 95%;
        margin-right: 10px;
        :nth-child(n){
            margin-top: 10px;
        }
        :nth-child(1){
            margin-top: 0;
        }
    }
`
export const ColumnHeader = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 5px;
    div{
        display: flex;
        align-items: center;
        span {
            :nth-child(1){
                display: flex;
                justify-content: center;
                align-items: center;
                border:none;
                width: 25px;
                height: 25px;
                border-radius: 50%;
                font-weight: bold;
                background-color: #808080;
            }
            :nth-child(2){
                margin-left: 5px;
            }
        }
        &:nth-child(2){
            width: 10%;
            justify-content: space-between;
        }
    }
`

export const CardsArea = styled.div`
    overflow-y:auto;
    &::-webkit-scrollbar{
        width: 10px;
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

export const ColumnsdModal = styled(Modal)`
    input{
        background-color: #161b22;
        color: #fff;
        border:solid #fff;
        padding: 5px 10px;
        border-radius: 5px;
        font-size: 22px;
    }
`
export const Icon = styled(FontAwesomeIcon)`
    cursor: pointer;
`