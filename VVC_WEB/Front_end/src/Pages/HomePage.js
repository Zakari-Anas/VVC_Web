import React from "react";
import { useMemo } from "react";
import {GoogleMap,useLoadScript,Marker,useJsApiLoader} from "@react-google-maps/api";
import "./css/homePage.css";
import usePlacesAutocomplete,{getGeocode,getLatLng}from "use-places-autocomplete";
import{Combobox,ComboboxInput,ComboboxPopover,ComboboxList,ComboboxOption} from "@reach/combobox";
import "@reach/combobox/styles.css";
import { useState } from "react";

function HomePage() {

    const {isloaded}=useJsApiLoader({
        id: "google-map-script",
        googleMapsApiKey: "AIzaSyDyvxKKxeb26tnf2FclKdlwyLxBf32ujBU",
        libraries: ["places"],
    })


    if (isloaded) {
            
        return(
               
            <div>Loading...</div>   
                
        )
            
        }

    else{
        return (
            <div><Map/></div>
        )
    }
    

  
        
    
}

function Map(){


    const center = useMemo(() => ({ lat:31.628674 ,lng:-7.992047}), []);

    const [selectes,setSelected] = useState(null);
    return ( 

        <>
        <div className="search">

            {/* <PlacesAutocomplete setSelected={setSelected}/> */}
        </div>
        <GoogleMap 
            zoom={10} 
            center={
            center
        }
            mapContainerClassName="map-container">
             <Marker position={center} />
    </GoogleMap>

    </>
    )


    
}


export default HomePage;