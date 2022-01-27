import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";
import { CardPriority } from "../../schemas/card";

type Editable = {
    isEditable: boolean
}

export const CardContainer = styled.div<Editable>`
    display: flex;
    flex-direction: column;
    border: ${({ isEditable }) => isEditable ? `1px solid green` : `none`};
    border-radius: 5px;
    height: auto;
    cursor: move;
    padding: 5px;
    margin: 15px 5px 10px 5px;
    background-color: #161b22;
`
export const Title = styled.div`
    width: 98%;
    display: flex;
    justify-content: space-between;
    padding: 1% 1% 10px 5px;
    input{
        font-size: 1em;
        font-weight: bold;
        border: none;
        outline: none;
        background-color: #161b22;
        color:#fff;
        width: 100%;
    }
    .icons{
        display: flex;
        height: 100%;
        width: 12%;
        justify-content: space-between;
    }
`
export const Icon = styled(FontAwesomeIcon)`
    cursor: pointer;
`
export const Description = styled.textarea`
    min-width: 80%;
    max-width: 80%;
    min-height: 10px;
    max-height: 50px;
    flex-wrap: wrap;
    padding: 0 5px 5px 5px;
    text-align: left;
    border: none;
    outline: none;
    background-color: #161b22;
    color:#fff;
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
export const Footer = styled.footer<CardPriority>`
    width: 98%;
    display: flex;
    justify-content: space-between;
    padding: 1% 1% 5px 5px;
    font-size: 0.8rem;
    div{
        display: flex;
        span{
            color:${({ code }) => getColor(code)};
            cursor: pointer;
            background-color: #161b22;
            border: none;
            outline: none;
        }
    }
`
export const ChoosePriority = styled.div<CardPriority>`
    display: 'flex' !important;
    select{
        color: ${({ code }) => getColor(code)} !important;
        -webkit-appearance: none;
        -moz-appearance: none;
        appearance: none; 
        border:none;
        outline: none;
        background-color: #161b22;
        padding: 0;
        cursor: pointer;
    }
`
export const SOption = styled.option<CardPriority>`
    color: ${({ code }) => getColor(code)}
`

enum Colors {
    GREEN = 'green_2',
    YELLOW = 'yellow_1',
    RED = 'red_0'
}

type CardDescription = {
    getHiden: boolean
}

export const changingPriority = (active?: boolean) => { return !active }

export const getColor = (code: number) => {
    const color = Object.values(Colors).find((color: string) => color.includes(String(code)))
    return color ? color!.split('_')[0] : ''
}