import { Input } from "./Input";
import { Cusdiv, Text } from "./Cusdiv";
import { Div } from "./Div";
import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import styled from "styled-components";
const Button = styled.button`
outline: none;
border: none;
cursor: pointer;
width: 90%;
height: 60px;
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
const Select = styled.select`
width: 93 %;
border: none;
outline: none;
background: none;
font-size: 18px;
color: #555;
border: 4px solid #EBEBED;
padding: 5%;
margin-top : 1%;
margin-bottom: 5%;
border-radius: 25px;
box-shadow: inset 8px 8px 8px #cbced1, inset -8px -8px 8px #fff;
`;
const Option = styled.option`
`;

function Signup() {
  const [uname, setName] = useState()
  const [pass, setPass] = useState()
  const [role, setRole] = useState()
  const [email, setEmail] = useState()
  const [phone, setphone] = useState()
  function senddata(e) {
    axios.post('http://localhost:5000/register', {
      name: uname,
      password: pass,
      role :role,
      email:email,
      phone:phone
    })
      .then((response) => {
        console.log(response);
      }, (error) => {
        console.log(error);
      });
    console.log('teste')
  }

  return (
    <Div>
      <Cusdiv>
        <Text>Sign up</Text>
        <Input placeholder="User Name" value={uname} onChange={e => setName(e.target.value)} ></Input>
        <Input type="password" placeholder= "Password" value={pass} onChange={e => setPass(e.target.value)}></Input>
        <Input type="text" placeholder= "Phone" value={phone} onChange={e => setphone(e.target.value)}></Input>
        <Input type = "email" placeholder="Email" value={email} onChange={e =>setEmail(e.target.value)}></Input>
           <Select value = {role} onChange = { (e) => setRole(e.target.value)}>
              <Option>Select</Option>
              <Option>Coach</Option>
              <Option>Volunteer</Option>
              <Option>Referee</Option>
        </Select>
        <Button onClick={senddata}>Signup</Button>
        <h5>Already a user ? <Link to='/login'> Login</Link></h5>
      </Cusdiv>
    </Div>
  );
}
export default Signup;
