import styled from "styled-components";

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
    width: 90%;
    display: flex;
    flex-wrap: wrap;
    padding: 0 5px 5px 5px;
    text-align: left;
`