
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {

    apiKey: "AIzaSyDNAZf7aqAVTmwoKit6XAzyEd6RtC4epN8",

    authDomain: "todo-app-dfd0c.firebaseapp.com",
  
    projectId: "todo-app-dfd0c",
  
    storageBucket: "todo-app-dfd0c.appspot.com",
  
    messagingSenderId: "795945604483",
  
    appId: "1:795945604483:web:1478593907a0c03d3c12b6"
  

};


// Initialize Firebase

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);