import styled from "styled-components";
import Modal from 'react-modal';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const StyledModal = styled(Modal)`
    display: flex;
    flex-direction: column;
    align-items: center;
    .header{
        display: flex;
        justify-content: flex-end;
        height:30%;
        width: 100%;
        padding: 0;
    }
    .field{
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: flex-start;
        height:70%;
        width: 80%;
        input, textarea{
            background-color: #161b22;
            color: #fff;
            border:solid #fff;
            border-radius: 5px;
            font-size: 22px;
            width: 80%;
        }

        input{
            padding: 3% 10%;
        }

        .priority{
            padding:10px 10px 5px 0;
            display: flex;
            justify-content: space-between;
            select{
                background-color: #161b22;
                color: #fff;
                border: 1px solid white;
                padding: 5px;
                outline: none;
            }
            
        }
    
        textarea{
            height: 30%;
            padding: 5% 10%;
            margin-top: 5px;
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
        }
    }
`

export const SaveButton = styled.button`
    padding: 10px;
    cursor: pointer;
    margin: 10px 0;
    background-color: #0ff;
    border:none;
    font-weight: bold;
`

export const CloseButton = styled(FontAwesomeIcon)`
    margin: 5px;
    cursor: pointer;
`