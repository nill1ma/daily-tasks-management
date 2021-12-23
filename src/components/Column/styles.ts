import styled from "styled-components";

export const ColumnContainer = styled.div`
    display: flex;
    flex-direction: column;
    border: 1px solid;
    height: 100vh;
    padding: 5px;
`
export const ColumnNameArea = styled.div`
    display: flex;
    align-items: center;
    padding: 5px 0;
    span {
        :nth-child(1){
            display: flex;
            justify-content: center;
            align-items: center;
            border:1px solid;
            width: 25px;
            height: 25px;
            border-radius: 50%;
            font-weight: bold;
        }
        :nth-child(2){
            margin-left: 5px;
        }
    }
`