import React, { useState } from "react";

function QrFetcher() {
  const [imageURL, setImageURL] = useState("");

  function handleClick() {
    fetch("https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=http://localhost:3000/profile")
      .then((response) => response.blob())
      .then((blob) => {
        setImageURL(URL.createObjectURL(blob));
      });
      setIsOpen(!isOpen);
  }
  
    const [isOpen, setIsOpen] = useState(false);
  
    function toggleModal() {
      
    }
  
      
  
  return (
    <div>
      <button onClick={handleClick}>Fetch Image</button>
      {imageURL && 
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
      </div>}
      {/* {imageURL && <img src={imageURL} alt="Fetched Image" />} */}
    </div>
  );
}

export default QrFetcher;