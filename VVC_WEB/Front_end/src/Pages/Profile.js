import React, { useEffect } from "react";
import "./css/Profile.css";
import { useState } from "react";
import { Link } from 'react-router-dom';
import { useNavigate,useLocation } from 'react-router-dom';
import {ref,getDownloadURL} from 'firebase/storage'
import {useAuth,upload } from '../Firebase-conf';
import 'bootstrap/dist/css/bootstrap.min.css';
import { db } from '../Firebase-conf';
import { storage } from '../Firebase-conf';
import {  Modal } from 'react-bootstrap';
import Navbar from "./Navbar";
import CryptoJS from 'crypto-js';




function Profile(){
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const uid = searchParams.get("uid");
    const currentUser=useAuth();
    const [userData, setUserData] = useState(null);
    const [imageUrl, setImageURL] = useState();
    const[loading,setLoading]=useState(false)
    const [isOpen, setIsOpen] = useState(false);
    const [photo, setPhoto] = useState("https://t3.ftcdn.net/jpg/03/46/83/96/360_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg");

    const getUserData = async (docName) => {
      try {
        const userRef = db.collection('Utilisateur').doc(docName);
        const userData = await userRef.get();
        if (userData.exists) {
          return userData.data();
        } else {
          alert('There was an error fetching user data');
          navigate('/');  
        }
      } catch (error) {
        console.log('Error getting document:', error);
      }
    };
    const getImageURL = async () => {
      try {
        // (`${uid}.png`)
        
        const url = await storage.ref().child(`${uid}.png`).getDownloadURL();
        setPhoto(url);
        
      } catch (error) {
        console.log('Error getting image URL:', error);
      }
    }
    
    const getUserInfo = async () => {
      const data = await getUserData(uid);
      setUserData(data);
      getImageURL();
    };
  
    useEffect(() => {
      getUserInfo();
    }, []);

    const secretKey = 'dkchidylsecurite@1'; // Replace with your secret key

    const encryptedUid = CryptoJS.AES.encrypt(uid, secretKey).toString();
    const encodedEncryptedUid = encodeURIComponent(encryptedUid); // URL-safe Base64 encoding



  
    useEffect(() => {
      fetch("https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=http://localhost:3000/info?uid="+encodedEncryptedUid+"")
      .then((response) => response.blob())
      .then((blob) => {
        
      setImageURL(URL.createObjectURL(blob));
      });
      setIsOpen(!isOpen);
    }, []);

  function handleClick() {
    
  }

const navigate= useNavigate();  

const navigation=()=>{

    navigate("/home")
}


useEffect(() => {
  const photoURL = getDownloadURL(ref(storage, `${uid}.png`));
  setPhoto(photoURL);
}, [currentUser]);

const handleChange = async (event) => {
  if (event.target.files[0]) {
    setPhoto(URL.createObjectURL(event.target.files[0]));
    event.preventDefault();
    await upload(event.target.files[0], currentUser, setLoading);
  }
};

const [showModal, setShowModal] = useState(false);

  const handleGenerateQRCode = () => {
    setShowModal(true);
  };
  function handleDownloadQRCode() {
    const qrCodeImg = document.querySelector('.qr-code img');
    const link = document.createElement('a');
    link.download = '~/Downloads/QR Codes/qr-code.png';
    link.href = qrCodeImg.src;
    link.click();
  }
 return(
  <div className="profile-body justify-content-center min-vh-100">
      <Navbar/>

    <div className="container ">
      <div className="row justify-content-center">
        <div className=" col-8 profile-card">

          {/* src={imageUrl} 
          <FaCamera color="blue" />*/}
          <div className="d-flex flex-column align-items-center" onClick={() => document.getElementById('inputImage').click()}>
                <div className="position-relative" >
                <img src={photo} alt="Profile" className="rounded-circle" width="150" height="150" key={photo} />
                
                  <input type="file" name="image" id="inputImage" onChange={handleChange} className="d-none" />
                </div>
                <button type="button" className="btn btn-link mt-1" >
                  Change Profile
                </button>
              </div>
              <Modal  show={showModal} onHide={() => setShowModal(false)}   centered>
                <Modal.Header style={{ backgroundColor: "#d3b419" }} closeButton>
                  <Modal.Title>Share Your Profile</Modal.Title>
                </Modal.Header>
                <Modal.Body style={{ backgroundColor: "#212529" }}>
                  <div className="d-flex justify-content-center">
                    <div className="qr-code">
                      <img src={imageUrl} alt="QR Code" />
                    </div>
                  </div>
                  <div className="d-flex justify-content-center mt-3">
                    <button className="btn text-white btn-profile btn-warning" onClick={handleDownloadQRCode}>Download QR Code</button>
                  </div>
                </Modal.Body>
              </Modal>
             
        </div>
        <div className=" col-8 profile-card">
      <h3 className="text-center mb-5" style={{color: "#d3b419"}}>{userData?.username}'s profile</h3>

          <div className="profile-info">
            <h2 className="text-primary"> </h2>
            <table className="table table-hover">
              <tbody>
              <tr>
                  <td>Name</td>
                  <td>{userData?.username}</td>
                </tr>
                <tr>
                  <td>Email</td>
                  <td>{userData?.email}</td>
                </tr>
                <tr>
                  <td>day of birth</td>
                  <td>{userData?.birthday}</td>
                </tr>
                <tr>
                  <td>Phone number</td>
                  <td>{userData?.phone}</td>
                </tr>
                
                
                <tr>
                  <td>Password</td>
                  <td>{userData?.password}</td>
                </tr>
              </tbody>
            </table>
            
           
            <div className="mt-5 d-flex justify-content-center">
              <Link to="/edit-profile" className="btn text-white btn-edit btn-warning mx-5">Edit Profile</Link>
              <button className="btn text-white btn-profile btn-warning mx-5" onClick={handleGenerateQRCode}>Generate QR Code</button>
            </div>
                        
          </div>
        </div>
        <div className=" col-8 profile-card d-flex justify-content-center align-items-center">

                <iframe src="/Map"
                  width="95%"
                  height="95%"
                  style={{ border: "5px solid black" }}
                  allowfullscreen=""
                  loading="lazy"

                >


                </iframe>



</div>
      </div>
      
    </div>
  </div>
    
  );
    
}



export default Profile;