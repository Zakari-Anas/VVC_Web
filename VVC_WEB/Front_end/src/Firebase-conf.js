
import {onAuthStateChanged, updateProfile} from "firebase/auth";

import {useState,useEffect} from "react";
import {ref,uploadBytesResumable,getDownloadURL, uploadBytes} from 'firebase/storage'
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';

const firebaseConfig = {
  apiKey: "AIzaSyBB9h0_bMcIZoxQ02K5wr63Bwpo_1uXeFA",
  authDomain: "test-bb2ea.firebaseapp.com",
  databaseURL: "https://test-bb2ea-default-rtdb.firebaseio.com",
  projectId: "test-bb2ea",
  storageBucket: "test-bb2ea.appspot.com",
  messagingSenderId: "194533806709",
  appId: "1:194533806709:web:abfb990b4d66420fac5e3c",
  measurementId: "G-KGHM4YHCD0"
};
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const auth = firebase.auth();
const storage = firebase.storage();



  
 //Custome hook to get current user 
 export function useAuth(){
  const [currentUser,setCurrentUser]=useState(null);
  useEffect(()=>{ 
      const current= onAuthStateChanged(auth,user=>{setCurrentUser(user);})
      return current;
  },[]);
  return currentUser;
  }

  //storage 

  export async function upload(file, currentUser, setLoading) {
    const fileRef = ref(storage, currentUser.uid + '.png'); // Create a reference to the file in Firebase Storage
    setLoading(true); // Set the loading state to true
  
    // Check if the file is not empty
    if (file.size === 0) {
      alert('Error: The file is empty.');
      setLoading(false);
      return;
    }
  
    // Read the contents of the file and check if it is not empty
    const fileReader = new FileReader();
    fileReader.readAsArrayBuffer(file);
    fileReader.onload = async (event) => {
      const fileBuffer = event.target.result;
      if (!fileBuffer) {
        alert('Error: Failed to read the file.');
        setLoading(false);
        return;
      }
  
      const snapshot = await uploadBytes(fileRef, fileBuffer); // Upload the file to Firebase Storage and get a snapshot of the upload progress
      const photoURL = await getDownloadURL(fileRef); // Get the download URL of the uploaded file
  
      
      setLoading(false); // Set the loading state to false
      alert('Profile picture set !!!'); // Show a success message to the user
    };
  }


  export { db, auth, storage };

