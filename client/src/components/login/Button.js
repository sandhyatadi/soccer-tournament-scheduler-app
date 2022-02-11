import styled from "styled-components";

export const Button = styled.button`
    outline: none;
    border: none;
    cursor: pointer;
    width: 90%;
    height: 8% ;
    border-radius: 30px;
    font-size: 130%;
    font-weight: 700;
    font-family: 'Lato', sans-serif;
    color: #fff;
    text-align: center;
    background-color: #448a96;
    box-shadow: 3px 3px 8px #b1b1b1, -3px -3px 8px #fff;
    transition: all 0.5s;
    &:hover {
        background-color: #337180;
      }
    &:active {
        background-color: #88ef9e;
    }
`;