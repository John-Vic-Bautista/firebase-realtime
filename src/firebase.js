import "firebase/database";
import { initializeApp } from "firebase/app";
import firebase from 'firebase/compat/app';
import 'firebase/compat/database';

const firebaseConfig = {
    apiKey: "AIzaSyCCCXihOrvn8qFpvEj4KHwai6WTU1mBKEo",
    authDomain: "realtimedatabase-88cc3.firebaseapp.com",
    databaseURL: "https://realtimedatabase-88cc3-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "realtimedatabase-88cc3",
    storageBucket: "realtimedatabase-88cc3.appspot.com",
    messagingSenderId: "894380872248",
    appId: "1:894380872248:web:dfc1fc56d488951382cccd",
    measurementId: "G-LD6510K2F2"
  };

  const app = initializeApp(firebaseConfig);
  const fireDb = firebase.initializeApp(firebaseConfig);
  export default fireDb.database().ref();