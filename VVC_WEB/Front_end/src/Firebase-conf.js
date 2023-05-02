import { initializeApp } from "firebase/app";
import {getAuth,onAuthStateChanged, updateProfile} from "firebase/auth";
import {getFirestore} from "firebase/firestore";
import {useState,useEffect} from "react";
import {getStorage,ref,uploadBytes,getDownloadURL} from 'firebase/storage'

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

const app = initializeApp(firebaseConfig);
export const db =getFirestore(app);
const auth= getAuth(app);
export const storage=getStorage(app);


  
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

export {auth};


