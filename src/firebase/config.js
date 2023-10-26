import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage'
import 'firebase/storage'

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAe3bJ2Mhk_83N_BtSD5zQjVM42ATgvFT8",
    authDomain: "olx-demo-aa3b5.firebaseapp.com",
    projectId: "olx-demo-aa3b5",
    storageBucket: "olx-demo-aa3b5.appspot.com",
    messagingSenderId: "93471999129",
    appId: "1:93471999129:web:5371f3ea9ce95006fc2408",
    measurementId: "G-GX1FZEBL9V"
  };

export default firebase.initializeApp(firebaseConfig)