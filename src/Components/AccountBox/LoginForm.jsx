import React, { useState,useContext } from "react";
import {
  BoldLink,
  BoxContainer,
  FormContainer,
  Input,
  MutedLink,
  SubmitButton,
} from "./Common.jsx";
import { Marginer } from "../Marginer";
import { AccountContext } from "./AccountContext";
import axios from 'axios';
import { useHistory} from 'react-router-dom';
export function LoginForm(props) {
  const { switchToSignup } = useContext(AccountContext);
  const [email,setEmail]=useState('');
  const [password,setPassword]=useState('');
  const [keeplogin,setKeeplogin]=useState(false);
  const history= useHistory();
  const api=axios.create({
    baseURL:'http://localhost:3000/api'
  })
  const onSubmit=(e)=>{
     e.preventDefault();
     
     if(!email)
     {
       alert('please add email');
     }
     else if (!password)
     {
      alert('please add password');

     }
     else if (keeplogin==true)
     {
      alert('please add password');

     }
     else
     {
      api.post('/login',{userName:email,password:password}).then(res=>{
        console.log(res.data);
         if(res.data.data!=null)
         {
          console.log(res.data.token);
         
          localStorage.setItem('token',res.data.token);

          alert("Login sucessfully");
          // window.location.href = "http://localhost:3001/";
          history.push('/');

         }
         else
         {
           alert("invalid id/password");

         }
       
      }).catch(err=>console.log(err));
  
     }
  
  }
  

  return (
    
    <BoxContainer>
      <FormContainer>
        <Input type="email" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="Email" />
        <Input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} placeholder="Password" />
        <span > Keep me login</span>
        <input style={{padding:'1px',margin:'1px'}} type="checkbox" name="keeplogin" value={keeplogin} onChange={(e)=>setKeeplogin(!keeplogin)} />
      </FormContainer>
      <Marginer direction="vertical" margin={10} />
      <MutedLink href="#">Forget your password?</MutedLink>
      <Marginer direction="vertical" margin="1.6em" />
      <SubmitButton onClick={onSubmit} type="submit">Signin</SubmitButton>
      <Marginer direction="vertical" margin="1em" />
      <MutedLink href="#">
        Don't have an accoun?{" "}
        <BoldLink href="#" onClick={switchToSignup}>
          Signup
        </BoldLink>
      </MutedLink>
    </BoxContainer>
  );
}