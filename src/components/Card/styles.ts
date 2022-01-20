import styled from "styled-components";
import { CardPriority } from "../../schemas/card";

export const CardContainer = styled.div`
    display: flex;
    flex-direction: column;
    border: none;
    border-radius: 5px;
    height: auto;
    cursor: move;
    padding: 5px;
    margin: 0 5px 10px 5px;
    background-color: #161b22;
`

export const Title = styled.div`
    width: 80%;
    display: flex;
    padding: 5px 0 10px 5px;
    font-weight: bold;
`
export const Description = styled.div`
    width: 80%;
    display: flex;
    flex-wrap: wrap;
    padding: 0 5px 5px 5px;
    text-align: left;
    
`
export const Footer = styled.footer<CardPriority>`
    display: flex;
    padding: 0 5px 5px 5px;
    font-size: 0.8rem;
    span:nth-child(2){
        color:${({code}) => getColor(code)};
        margin-left: 1%;
    }
`
enum Colors {
    GREEN = 'green_2',
    YELLOW = 'yellow_1',
    RED = 'red_0'
}
const getColor = (code: number) => {
    const color = Object.values(Colors).find((color: string) => color.includes(String(code)))
    return color ? color!.split('_')[0] : ''
}
