import React from 'react'
import testImg from './test.png'
import styled from "styled-components";

const Border = styled.div`
    border: 14px solid #EBEBED;
    border-radius: 25px;
    margin : 2%;
    box-shadow: -8px -8px 8px #fff,8px 8px 8px #cbced1;
    float : left;
    justify-content : center;
`;
const IM = styled.img`
border-radius : 10px;
display : border-box;
width : 300px;
`;
const Adiv = styled.div`
    width : 90vw;
`;
const Ads = () => {
    return (
        <Adiv>
            {/* GRID */}
                <Border><IM src="/Assets/images/im1.jpg" height="150px"/></Border>
                <Border><IM src="/Assets/images/im2.jpg" height="150px" /></Border>
                <Border><IM src="/Assets/images/im3.jpg" height="150px" /></Border>
                
            
        </Adiv>
    )
}

export default Ads