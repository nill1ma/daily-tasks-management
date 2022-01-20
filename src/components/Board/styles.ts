import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import styled from "styled-components"

export const Board = styled.div`
    text-decoration:none;
    color:#fff;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    width: 31%;
    height: 150px;
    border: 1px solid #fff;
    border-radius: 10px;
    cursor: pointer;
    margin-left: 10px;
    span{
        display: flex;
        align-items: center;
        height:80% ;
    }
    &:hover{
        color: #D3D3D3;
        border-color: #D3D3D3;
        font-weight: bold;
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

export const BoardHeader = styled.div`
    width: 98%;
    display: flex;
    justify-content: flex-end;
    padding-top: 2%;
    padding-right: 2%;
    border-bottom: 1px solid #fff;
    height:18%;
    border-radius: 10px 10px 0 0;
    
`
export const Icon = styled(FontAwesomeIcon)`
    cursor: pointer;
`