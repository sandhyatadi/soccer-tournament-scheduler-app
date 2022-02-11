
import { Navbar } from '../Navbar'
import React from 'react';
import "./style.css";
import styled from "styled-components";
import testImg from './sponsors.png'
const Myimg = styled.img`
    height : 20vh;
    width : 30vw;
    object-fit : cover;
`;

const AboutUs = () => {
    return (
        <div>
            <Navbar></Navbar>
            <h1 className="emboss"> About Us</h1>
            <p className = "p-abt">
               JASS is a world class soccer league and one of the largest tournament hosts in the United States. The tournament is held in Arizona’s finest soccer complex, Red Mountain Soccer Complex in Mesa, AZ. The tournament is open for all the players from the age of 8 years through over 18 years. The league also accommodates all people who are interested in playing soccer regardless of their age. So if you think you can play soccer but doubt yourself, here’s the right platform for you because we have the best coaches.<br></br>
               </p>
               <br></br>
            <h1 className="emboss"> Sponsors</h1>
               <p className = "p1-abt"><Myimg src="/Assets/images/sponsors.png" height="300px"></Myimg></p>
            
            
        </div>
    )
}

export default AboutUs
