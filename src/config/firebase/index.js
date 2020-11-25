import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyAlkNuOEUbMsYJx5KzDKpKt7GJXQSjpvbk",
  authDomain: "simple-note-firebase-bed33.firebaseapp.com",
  databaseURL: "https://simple-note-firebase-bed33.firebaseio.com",
  projectId: "simple-note-firebase-bed33",
  storageBucket: "simple-note-firebase-bed33.appspot.com",
  messagingSenderId: "235826359975",
  appId: "1:235826359975:web:177d36bdbfbceefef0b582",
  measurementId: "G-BWNW1L19ZE"
};

firebase.initializeApp(firebaseConfig);

export const database = firebase.database();

export default firebase;