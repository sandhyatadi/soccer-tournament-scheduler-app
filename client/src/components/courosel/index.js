import React from 'react'
import styled from 'styled-components'
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';

const Border = styled.div`
  border: 14px solid #EBEBED;
  margin-top : 2%;
  margin-bottom: 2%;
  border-radius: 25px;
  box-shadow: -8px -8px 8px #fff,8px 8px 8px #cbced1;
  float : left;
  padding : 0; 
  justify-content : center;
  align-items : center;
`;
const Div = styled.div`
  width : 90%:
  height : 50%:
`;
const IM = styled.img`
  border-radius : 10px;
  object-fit : cover;
  height : 50vh;
`;
const dummy = styled.div`
  width : 50vw;
`;
const Coursel = () => {

  return (
    <Div>
      <Border>
        <Carousel showThumbs='' showIndicators='false' axis='horizontal' autoPlay='true' showArrows='false' infiniteLoop='true' width='90vw'>
          <dummy> <IM src="/Assets/images/logo.jpeg"></IM></dummy>
          <dummy><IM src="/Assets/images/stadium.jpg"></IM></dummy>
          <dummy><IM src="/Assets/images/ball.jpg"></IM></dummy>
        </Carousel>
      </Border>
    </Div>
  )
}

export default Coursel
