
import {onAuthStateChanged, updateProfile} from "firebase/auth";

import {useState,useEffect} from "react";
import {ref,uploadBytes,getDownloadURL} from 'firebase/storage'
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

  export async function upload(file,currentUser,setLoading){

    const fileRef=ref(storage,currentUser.uid+'.png');

    setLoading(true);

    const  snapshot=await uploadBytes(fileRef,file) 

    const photoURL= await getDownloadURL(fileRef);


    updateProfile(currentUser,{photoURL})

    setLoading(false);

    alert('Profile picture set !!!');


  }


  export { db, auth, storage };

