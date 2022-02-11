import { Input } from "./Input";
import {Cusdiv,Text} from "./Cusdiv";
import { Div } from "./Div";
import { Button } from "./Button";
import { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom"
import { Link } from "react-router-dom";


function Login(){
    const [uname,setName] = useState()
    const [pass,setPass] = useState()
    const history = useHistory();
    function senddata(e){
        axios.post('http://localhost:5000/login',{
          name: uname,
         password: pass
        })
       .then((response) => {
          localStorage.setItem('userdetails',JSON.stringify(response.data));
          history.push('/');
},[])};

    return (
        <Div>
            <Cusdiv>
                <Text>Login</Text>
                <Input placeholder="UserName or E-mail" value = {uname} onChange={e => setName(e.target.value)} ></Input>
                <Input type = "password" placeholder="Password" value = {pass} onChange={e => setPass(e.target.value)}></Input>
                <Button onClick={senddata}>Login</Button>
              <h5>  No account <Link to = "/signup">SignUp Now</Link></h5>
            </Cusdiv>
        </Div>
    );

}
export default Login;
