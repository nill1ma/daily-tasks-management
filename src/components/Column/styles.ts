import styled from "styled-components";

export const ColumnContainer = styled.div`
    display: flex;
    flex-direction: column;
    border: 1px solid;
    height: 90%;
    min-width: 355px;
    max-width: 355px;
    background-color: #0d1117;
    color: #fff;
    border-radius: 5px;
    &:nth-child(n){
        margin-left: 10px;
    }
    &:nth-child(1){
        margin-left: 0;
    }
`
export const ColumnNameArea = styled.div`
    display: flex;
    align-items: center;
    padding: 5px;
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
            padding: 10px 0;
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