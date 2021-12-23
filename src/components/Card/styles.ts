import styled from "styled-components";

export const CardContainer = styled.div`
    display: flex;
    flex-direction: column;
    border: 1px solid;
    border-radius: 5px;
    height: auto;
    cursor: move;
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