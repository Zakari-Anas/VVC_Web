//import logo from './logo.svg';
import React,{ useState } from "react";
import logo from '../assets/logo.png';

import { useNavigate } from 'react-router-dom';

import {auth} from '../Firebase-conf';
import { signInWithEmailAndPassword, signOut } from "firebase/auth";

import 'bootstrap/dist/css/bootstrap.min.css';
import "./css/Login.css"


function Login() {

  const navigate =useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, seterror] = useState(false);



  
  
  const login =async(e) => {
    e.preventDefault();

   try{
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const uid = userCredential.user.uid; // Retrieve the UID after logging in
    navigate(`/profile?uid=${uid}`);
    
    }catch(error){
      seterror(true);
    }
      
    
  };

  const logout = async (e) => {
   
   await signOut(auth);
  
};
  


  return (
    
    
      <div className="logo-body">
        <div className=" d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
      <div className="login-container rounded p-4 col-md-5 ">
      <div >
      <form onSubmit={login} className="container ">
      <div className="text-center ">
        <img src={logo} className=" login-logo" alt="logo" />
      </div>
        
        <div className="form-group row col-12">
          <label htmlFor="email" className="col-3 text-center">Email</label>
          <div className="col-md-9 col-8">
            <input type="email" className="  form-control login-input" id="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
        </div>
        <div className="form-group row col-12 mt-3">
          <label htmlFor="password" className="col-3 text-center">Password</label>
          <div class="col-md-9 col-8">
            <input type="password" className=" form-control login-input" id="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>
        </div>
        <div className="form-group row col-11 mt-3">
          <button type="submit"  className="btn text-white btn-login btn-warning  mt-3 mb-3 offset-3 col-5">Log In</button>
        </div>
      </form>
      <p className="text-center">Don't have an account? <a href="/signup">Sign up</a></p>
    </div>
      </div>
  </div>
    </div>
    
    
    
  );
}

export default Login;


