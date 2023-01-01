import styled from "styled-components"

const ButtonWrapper = styled.div<IButtonWrapper>`
    padding: 10px 15px 10px 15px;
    background-color: #232323 ;
    border-radius: 20px;
    transition: background-color .3s;
    width: ${ props => props.width };

    button {
        all: unset;
        width: 100%;
        text-align: center;
        font-weight: bold;
        
    }

    &:hover {
        background-color: #6B6B6B;
        cursor: pointer;
    }
`

interface IButtonWrapper {
    width: string;
}

export default ButtonWrapper