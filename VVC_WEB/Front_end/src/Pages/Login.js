//import logo from './logo.svg';
import React,{ useState } from "react";
import logo from './Smart.jpg';
import './css/Login.css';
import { useNavigate } from 'react-router-dom';
import {onAuthStateChanged} from 'firebase/auth';
import {auth} from '../Firebase-conf';
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { useEffect } from "react";


function Login() {

  const navigate =useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, seterror] = useState(false);



  
  
  const login =async(e) => {
    e.preventDefault();

   try{
      await signInWithEmailAndPassword(auth,email, password)
      
      .then(() => {
        navigate('/profile');
      });
      
    
    }catch(error){
      seterror(true);
    }
      
    
  };

  const logout = async (e) => {
   
   await signOut(auth);
  
};
  


  return (
    <div className="App">
     
     <form onSubmit={login}>
     <div className="App1">
     <h1 className="siign">*** SIGN-IN *** </h1>
     <img src={logo} className="App1-logo" alt="logo" />
       
       
        
          <input
            className="App1-input"
            name='email'
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder='Email'
          />
          <h1>{email}</h1>
       
        
          
          <input
            className="App1-input2"
            name='password'
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder='Password'
          />
           <h1>{password}</h1>
        
        <button className="App1-button"  type="submit" value="Login">LOGIN</button>
       
      </div>
    </form>
     
     
     
     
   
    </div>
    
  );
}

export default Login;
