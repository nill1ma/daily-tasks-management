import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { memo } from "react";
import styled from "styled-components";

export const ActionsContainer = styled.div`
    display: flex;
    align-items: center;
    width: 100%;
    padding-top: 10px;
    input{
        background-color: #161b22;
        color: #fff;
        border:solid #fff;
        padding: 5px 10px;
        border-radius: 5px;
    }

    .add{
        display: flex;
        align-items: center;
        margin: 0 10px;
        border-left: 3px solid #fff;
        cursor: pointer;
        span{
            margin-left: 10px;
        }
    }

    @media(max-width: 610px) {
        flex-direction: column;
        align-items: flex-start;
            .add{
                margin: 0;
                margin-top: 10px;
            }
        }
`

const F = styled(FontAwesomeIcon)`
    margin-left: 5px;
    width: 1000px;
`
export const FaPlus = memo(F)