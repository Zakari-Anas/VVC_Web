import React from 'react'
import { useState } from 'react';
import './css/info.css';
import { useEffect } from 'react';


function Info() {
    const [imageUrl, setImageUrl] = useState("https://t3.ftcdn.net/jpg/03/46/83/96/360_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg");
    const [info,setInfo]=useState([]);

    useEffect(()=>{

        setInfo([{
            nom:"Taoui",
            prenom:"Ranya",
            telephone:"0525252525",
            adresse:"Marrakech",
            gmail:"ranyataoui@gmail.com"
        }])
    },[])
    return (
        <div className="Infos">
          
            <img src={imageUrl} className="avatar" />
            <form className='infoForm' >
              {info.map((item,key)=>(
                <div key={key}>
                  <label>Nom</label>
                  <input type="text" defaultValue={item.nom}/>
                  <label>Prénom</label>
                  <input type="text" defaultValue={item.prenom}/>
                  <label>Telephone</label>
                  <input type="text" defaultValue={item.telephone}/>
                  <label>Adresse</label>
                  <input type="text" defaultValue={item.adresse}/>
                  <label>Email</label>
                  <input type="email" defaultValue={item.gmail}/><br/>
                  <button>test</button>
                </div>
              ))}
            </form>
          
        </div>
      );
      
      

      
}

export default Info;