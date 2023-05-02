import React,{ useState } from "react";
import logo from './Smart.jpg';
import './css/Signup.css';
import { auth, db,storage } from "../Firebase-conf";
import { useNavigate } from 'react-router-dom';
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
// import {createUserWithEmailAndPassword } from "firebase/auth";




const SignUp = () => {

  const [loader, setLoader] = useState(false);
  const navigate =useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");
  const [phone, setPhone] = useState("");
  const [birthday, setBirthday] = useState("");
  const [location, setLocation] = useState("");
  const [image, setImage] = useState(null);
  const [url, setUrl] = useState(null);

// uploading image
  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };
  const handleSubmit = () => {
    const imageRef = ref(storage, `${username}`);
    uploadBytes(imageRef, image)
      .then(() => {
        getDownloadURL(imageRef)
          .then((url) => {
            setUrl(url);
          })
          .catch((error) => {
            console.log(error.message, "error getting the image url");
          });
        setImage(null);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };


//------------------------------------------
  const signup = (e) => {
    e.preventDefault();
    setLoader(true);
    if (!username || !email || !password) {
      return alert("Please enter a username, email, and password");
    };

      auth.createUserWithEmailAndPassword(email, password)
      .then(userAuth => {
        // Create a new user document in Firestore with the user's data
        db.collection("testing with image").add({
          username,
          email,
          gender,
          phone,
          birthday,
          location,
        })
      
          .then(() => {
            navigate('/home')
          });
        });
      }
  

  return (
    <div className="App">
        <form onSubmit={signup} method="POST">
          <div className="App1">
          <h1 className="siign">Sign Up</h1>
          <img src={logo} className="App1-logo" alt="logo" />

            <input type="text" name="username" className="App1-input" placeholder='Name' value={username} onChange={(e) => setUsername(e.target.value)}/>
          
            <input type="password" name="password" className="App1-input2" placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} />
  
            <input type="email" name="email" className="App1-input3" placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)}/>
 
            <select name="Gender" className="App1-input4" required value={gender} onChange={(e) => setGender(e.target.value)}>
              <option value="" hidden selected >Select gender...</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>

 
            <input type="tel" name="phone" className="App1-input5" placeholder='Telephone' value={phone} onChange={(e)=> setPhone(e.target.value)}/>

            <input type="date" name="birthday" className="App1-input6" placeholder='Birthday' value={birthday} onChange={(e)=> setBirthday(e.target.value)}/>
    
            <input type="text" name="location" className="App1-input7" placeholder='Location' value={location} onChange={(e)=> setLocation(e.target.value)}/>
            <input type="file" onChange={handleImageChange}/>
            <button type="submit" onClick={handleSubmit} className="App1-button">
            Create
          </button>
          </div>
        </form>

  </div>
    
  );
};
export default SignUp;