import styled from "styled-components";

export const Fcons = styled.button`
  border : none;
  height: 35px;
  width: 35px;
  border-radius: 3px;
  background: #e0e5ec;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  -webkit-tap-highlight-color: rgba(0,0,0,0);
  -webkit-tap-highlight-color: transparent;
  box-shadow:
   -7px -7px 20px 0px #fff9,
   -4px -4px 5px 0px #fff9,
   7px 7px 20px 0px #0002,
   4px 4px 5px 0px #0001,
   inset 0px 0px 0px 0px #fff9,
   inset 0px 0px 0px 0px #0001,
   inset 0px 0px 0px 0px #fff9,
           inset 0px 0px 0px 0px #0001;
 transition:box-shadow 0.6s cubic-bezier(.79,.21,.06,.81);
  font-size: 16px;
  color: rgba(42, 52, 84, 1);
  text-decoration: none;

&:active{
  box-shadow:  4px 4px 6px 0 rgba(255,255,255,.5),
              -4px -4px 6px 0 rgba(116, 125, 136, .2), 
    inset -4px -4px 6px 0 rgba(255,255,255,.5),
    inset 4px 4px 6px 0 rgba(116, 125, 136, .3);
}
`;