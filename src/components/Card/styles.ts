import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
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
    margin: 15px 5px 10px 5px;
    background-color: #161b22;
`

export const Title = styled.div`
    width: 98%;
    display: flex;
    justify-content: space-between;
    padding: 1% 1% 10px 5px;
    font-weight: bold;
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

export const Description = styled.div<CardDescription>`
    width: 80%;
    display: ${({ getHiden }) => getHiden ? 'none' : 'flex'};
    flex-wrap: wrap;
    padding: 0 5px 5px 5px;
    text-align: left;
    
`
export const Footer = styled.footer<CardPriority>`
    display: flex;
    padding: 0 5px 5px 5px;
    font-size: 0.8rem;
    span{
        color:${({ code }) => getColor(code)};
        margin-left: 1%;
    }
`
enum Colors {
    GREEN = 'green_2',
    YELLOW = 'yellow_1',
    RED = 'red_0'
}

type CardDescription = {
    getHiden: boolean
}

const getColor = (code: number) => {
    const color = Object.values(Colors).find((color: string) => color.includes(String(code)))
    return color ? color!.split('_')[0] : ''
}
