import React, { useEffect } from "react";
import "./css/Profile.css";
import { useState } from "react";
import { Link } from 'react-router-dom';
import HomePage from "./HomePage";
import { useNavigate } from 'react-router-dom';
import {useAuth,upload } from '../Firebase-conf';


function Profile(){

    const currentUser=useAuth();
    
const [info,setInfo]=useState([]);
const [nomPrenom,setNomPrenom]=useState([]);
const [info2,setInfo2]=useState([]);


const [photo, setPhoto] = useState(null);
const[loading,setLoading]=useState(false)
const [imageUrl, setImageUrl] = useState("https://t3.ftcdn.net/jpg/03/46/83/96/360_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg");

const [imageURL, setImageURL] = useState("");
const [isOpen, setIsOpen] = useState(false);

  function handleClick() {
    fetch("https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=http://localhost:3000/info&qzone=1")
      .then((response) => response.blob())
      .then((blob) => {
        setImageURL(URL.createObjectURL(blob));
      });
      setIsOpen(!isOpen);
  }

const navigate= useNavigate();  

const navigation=()=>{

    navigate("/home")
}


const handleChange = (event) => {

    if(event.target.files[0]){
      setPhoto(event.target.files[0]);
    }
  }



   useEffect(()=>{
        
        if(currentUser?.photoURL){
            setNomPrenom([{Nom:"Taoui",Prenom:"Ranya"}])
            setInfo2([{TT:"0525252525",GP:"06911907530000",Tele:"069119075300000",Adresse:"Marrakech",Gmail:"ranyataoui@outlook.com",TF:"0525252525",AT:"Marrakech"}]) 
            setImageUrl(currentUser.photoURL )
          }
  
   },[currentUser])

   const handleAdd=async(e)=>{

    e.preventDefault();
    upload(photo,currentUser,setLoading);
  }


   
    return(
        <div className="container">
        <div className="row">
        </div>  
        <img  src={imageUrl} alt="Avatar" className="avatar"/> 
      
            <form className="imageset" onSubmit={handleAdd}>     
                    <div className="nom"> {currentUser?.email}</div>
                     <input type="file" onChange={handleChange}/>
                     <button disable={loading || photo==null} type="submit" >Changer Photo</button>
            </form> 
         
            
            
           

            <div className="inf2">

                {info2.map((value, key) => (
                     <div key={key} className="Info2">
                        
                     <div> <input type="checkbox"  name="vehicle1" value="Telephone-Travail"></input> Telephone-Travail:  {value.TT }</div><br></br>
                    <div> <input type="checkbox" name="Gmail-Professionnelle" value="Gmail-Professionnelle"></input> Gmail-Professionnelle:  {value.GP}</div><br></br>
                    <div> <input type="checkbox" name="Gmail-Professionnelle" value="Gmail-Professionnelle"></input> Gmail-Professionnelle:  {value.GP}</div><br></br>
                    <div> <input type="checkbox" name="Gmail-Professionnelle" value="Gmail-Professionnelle"></input> Gmail-Professionnelle:  {value.GP}</div><br></br>
                    <div> <input type="checkbox" name="Gmail-Professionnelle" value="Gmail-Professionnelle"></input> Gmail-Professionnelle:  {value.GP}</div><br></br>
                    <div> <input type="checkbox" name="Gmail-Professionnelle" value="Gmail-Professionnelle"></input> Telephone-Personnel:  {value.Tele}</div><br></br>
                    <div> <input type="checkbox" name="Gmail-Professionnelle" value="Gmail-Professionnelle"></input> Adresse:  {value.Adresse}</div><br></br>
                    <div> <input type="checkbox" name="Gmail-Professionnelle" value="Gmail-Professionnelle"></input> Gmail:  {value.Gmail}</div><br></br>
                    <div> <input type="checkbox" name="Gmail-Professionnelle" value="Gmail-Professionnelle"></input> Telephone-Fix:  {value.TF}</div><br></br>
                    <div> <input type="checkbox" name="Gmail-Professionnelle" value="Gmail-Professionnelle"></input> Adresse-Travail:  {value.AT}</div><br></br>
                    <div> <input type="checkbox" name="Gmail-Professionnelle" value="Gmail-Professionnelle"></input> Adresse-Travail:  {value.AT}</div><br></br>
                    <div> <input type="checkbox" name="Gmail-Professionnelle" value="Gmail-Professionnelle"></input> Adresse-Travail:  {value.AT}</div><br></br>
                    <div> <input type="checkbox" name="Gmail-Professionnelle" value="Gmail-Professionnelle"></input> Adresse-Travail:  {value.AT}</div><br></br>
                    <div> <input type="checkbox" name="Gmail-Professionnelle" value="Gmail-Professionnelle"></input> Adresse-Travail:  {value.AT}</div><br></br>
                     </div>
                     
                ))}
                <br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br>
            </div>
           
            
       
<div className="map"> 

<iframe src="/Home"
 width="100%"
 height="100%"
 style={{ border: "0" }}
 allowfullscreen=""
 loading="lazy"
 
>
  

</iframe>

<button className="lien-maps"  onClick={navigation}>Positionnement</button>

</div>

<div className="App1-button-div" ><button className="App1-button" type="submit" value="PARTAGER" onClick={handleClick}>PARTAGER</button>{imageURL && 
      <div>
        {/* <img src={imageURL} alt={"Fetched Image"}/> */}
  
        {isOpen && (
          <div className="modal">
            <div className="modal-content">
              <span className="close" onClick={handleClick}>
                &times;
              </span>
              <img src={imageURL} alt={"Fetched Image"} />
            </div>
          </div>
        )}
      </div>}</div>
<div className="App2-button-div" ><button className="App1-button2" type="submit" value="Modifier">Modifier</button></div>


{/* <footer className="footer">
<Link className="About-us">About us</Link>
<Link className="Contact-us">Contact us</Link>
<Link className="Help">Help</Link> 
<p className="Contact-us">Contact us</p>
<p className="Help">Help</p>
 </footer> */}

<footer className="footer">
<Link className="About-us">About us</Link>
<Link className="Contact-us">Contact us</Link>
<Link className="Help">Help</Link> 
<p className="Contact-us">Contact us</p>
<p className="Help">Help</p>
 </footer>

        </div>
    )
    
}



export default Profile;