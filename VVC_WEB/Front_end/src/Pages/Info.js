import React, { useEffect } from "react";
import "./css/Profile.css";
import { useState } from "react";
import { useNavigate,useLocation } from 'react-router-dom';
import {ref,getDownloadURL} from 'firebase/storage'
import {useAuth,upload } from '../Firebase-conf';
import 'bootstrap/dist/css/bootstrap.min.css';
import { db } from '../Firebase-conf';
import { storage } from '../Firebase-conf';
import Navbar from "./Navbar";
import CryptoJS from 'crypto-js'; 
function Info(){
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const encodedEncryptedUid = searchParams.get("uid");
    const encryptedUid = decodeURIComponent(encodedEncryptedUid);
    const secretKey = 'dkchidylsecurite@1'; // Replace with your secret key
    const bytes = CryptoJS.AES.decrypt(encryptedUid, secretKey);
    const uid = bytes.toString(CryptoJS.enc.Utf8);

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

 


  
    useEffect(() => {
      fetch("https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=http://localhost:3000/info?uid="+uid+"")
      .then((response) => response.blob())
      .then((blob) => {
        
      setImageURL(URL.createObjectURL(blob));
      });
      setIsOpen(!isOpen);
    }, []);


const navigate= useNavigate();  




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

 

 return(
  <div className="profile-body justify-content-center min-vh-100">
      <Navbar/>

    <div className="container ">
      <div className="row justify-content-center">
        <div className=" col-8 profile-card">

          {/* src={imageUrl} 
          <FaCamera color="blue" />*/}
          <div className="d-flex flex-column align-items-center" >
            <div className="position-relative" >
              <img src={photo} alt="Profile" className="rounded-circle" width="150" height="150" key={photo} />
            </div>
          </div>
             
             
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
                
              </tbody>
            </table>
            
           
           
                        
          </div>
        </div>
        <div className=" col-8 profile-card d-flex justify-content-center align-items-center">

<iframe src="/Home"
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



export default Info;