import React, { useState } from "react";
import logo from '../assets/logo.png';
import defaultProfilePic from '../assets/defaultProfilePic.jpg';
import './css/Signup.css';
import { auth, db, storage } from "../Firebase-conf";
import { useNavigate } from 'react-router-dom';
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import 'firebase/compat/auth';
import { FaArrowLeft } from 'react-icons/fa';
import 'firebase/compat/firestore';

const SignUp = () => {

  const [loader, setLoader] = useState(false);
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [Confirmpassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");
  const [uid, setUid] = useState("");
  const [phone, setPhone] = useState("");
  const [birthday, setBirthday] = useState("");
  const [location, setLocation] = useState("");
  const [image, setImage] = useState(defaultProfilePic);
  const [imgFile, setImgFile] = useState(new File([], ""));
  const [url, setUrl] = useState(null);
  

  // uploading image
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    
    setImgFile(file);
    reader.onloadend = () => {
      setImage(reader.result);
      
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };
 

  //------------------------------------------
  const signup = (e) => {
    e.preventDefault();
    setLoader(true);
    if (!username || !email || !password || !phone) {
      return alert("Please enter a username, email, and password");
    }
    if (password !== Confirmpassword) {
     
      return  alert("Passwords do not match. Please try again.");;
    }
  
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((userAuth) => {
        setTimeout(500);
        // Create a new user document in Firestore with the user's data
        db.collection("Utilisateur")
          .doc(userAuth.user.uid)
          .set({
            username,
            email,
            phone,
            birthday,
            location,
            password,
          })
          .then(() => {
            // Upload the image to Firebase Storage
            const imageRef = ref(storage, `${userAuth.user.uid}.png`);
            uploadBytes(imageRef, imgFile)
              .then(() => {
                getDownloadURL(imageRef)
                  .then((url) => {
                    setUrl(url);
                  })
                  .catch((error) => {
                    console.log(error.message, "error getting the image url");
                  });
                setImage(null);
                console.log("paoziepaoziepo",userAuth.user.uid);
                navigate(`/profile?uid=${userAuth.user.uid}`);
              })
              .catch((error) => {
                console.log(error.message, "error uploading the image");
              });
          })
          .catch((error) => {
            console.log(error.message, "error creating user document", error);
          });
      })
      .catch((error) => {
        console.log(error.message, "error creating user", error);
      });
  };

  return (
    <div className="signup-body vh-100 py-md-3">
      <div className="signup-container container d-flex justify-content-center align-items-center col-md-6 col-9 ">

        <div className="container row">



          <form onSubmit={signup} method="POST" className="row g-3">

            <div className="col-12">
              <div className="d-flex flex-column align-items-center">
                <div className="position-relative">
                  <img src={image} alt="Profile" className="rounded-circle" width="100" height="100" />
                  <label htmlFor="inputImage" className="position-absolute top-50 start-50 translate-middle ">
                    <i className="bi bi-camera-fill fs-1 text-white"></i>
                  </label>
                  <input type="file" name="image" id="inputImage" onChange={handleImageChange} className="d-none" />
                </div>
                <button type="button" className="btn btn-link mt-1" onClick={() => document.getElementById('inputImage').click()}>
                  Change Profile
                </button>
              </div>
            </div>

            <div className="mt-3 mb-3 form-group row col-12">
              <label htmlFor="inputUsername" className="col-md-3 col-4 form-label text-center">Full Name</label>
              <div className="col-md-9 col-8">
                <input type="text" name="username" className="signup-input form-control" id="inputUsername" placeholder="Name" value={username} onChange={(e) => setUsername(e.target.value)} required />
              </div>
            </div>


            <div className="mb-3 form-group row col-12">
              <label htmlFor="inputPhone" className="col-md-3 col-4 form-label text-center">Telephone</label>
              <div className="col-md-9 col-8">
                <input type="tel" name="phone" className="signup-input form-control" id="inputPhone" placeholder="Telephone" value={phone} onChange={(e) => setPhone(e.target.value)} required />
              </div>
            </div>

            <div className="mb-3 form-group row col-12">
              <label htmlFor="inputEmail" className="col-md-3 col-4 form-label text-center">Email</label>
              <div className="col-md-9 col-8">
                <input type="email" name="email" className="signup-input form-control" id="inputEmail" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
              </div>
            </div>

            <div className="mb-3 form-group row col-12">
              <label htmlFor="inputBirthday" className="col-md-3 col-4 form-label text-center">Birthday</label>
              <div className="col-md-9 col-8">
                <input type="date" name="birthday" className="signup-input form-control" id="inputBirthday" placeholder="Birthday" value={birthday} onChange={(e) => setBirthday(e.target.value)} required />
              </div>
            </div>

            <div className="mb-3 form-group row col-12">
              <label htmlFor="inputLocation" className="col-md-3 col-4 form-label text-center">Location</label>
              <div className="col-md-9 col-8">
                <input type="text" name="location" className="signup-input form-control" id="inputLocation" placeholder="Location" value={location} onChange={(e) => setLocation(e.target.value)} required />
              </div>
            </div>

            <div className="mb-3 form-group row col-12">
              <label htmlFor="inputPassword" className="col-md-3 col-4 form-label text-center">Password</label>
              <div className="col-md-9 col-8">
                <input type="password" name="password" className="signup-input form-control" id="inputPassword" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
              </div>
            </div>
            <div className="mb-3 form-group row col-12">
              <label htmlFor="inputPassword" className="col-md-3 col-4 form-label text-center">Confirme Password</label>
              <div className="col-md-9 col-8">
                <input type="password" name="password" className=" signup-input form-control" id="inputPassword" placeholder="Password" value={Confirmpassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
              </div>
            </div>

            <div className="col-12 row mb-md-3 mt-md-3">
              <div className="col-md-5 col-6">
                <a href="#" className="go-back ">
                <FaArrowLeft /> Already have an account ?
              </a>
              </div>
              <div className="col-md-6 col-6" >
              <button type="submit" className="btn btn-warning btn-signup mt-md-1 mb-md-1 col-md-8 col-12">Register</button>

              </div>
            </div>

          </form>
          
        </div>





      </div>
    </div>

  );
};
export default SignUp;