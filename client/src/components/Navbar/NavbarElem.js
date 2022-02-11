import styled from "styled-components";
import './style.css';
export const Nav = styled.nav`
    margin-left : auto;
    margin-right : auto;
    margin-top : 2vh;
    padding: 0 20px;
    height: 10vh;
    width: 90vw;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: row;
    border-radius: 10px;
    box-shadow: 7px 7px 10px #cbced1,
      -7px -7px 10px #fff;

`;

export const Text = styled.text`
    color: #ecf0f3;
    font-size : 200%;
    font-weight: bold;
    font-family: sans-serif;
    text-shadow: 2px 2px 5px #cbced1, 
                  -2px -2px 5px #fff;
`;

export const Li = styled.li`
    color: gray;
    list-style-type: none;
    margin: 0 10px;
    padding: 10px 15px;
    border-radius: 10px;
    width: auto;
    text-align: center;
    &:hover {
        color: #505050;
        box-shadow: 7px 7px 10px #cbced1,
        -7px -7px 10px #fff;
    }
`;
