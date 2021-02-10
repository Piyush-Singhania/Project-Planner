import firebase from "firebase/app";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAc3INE-MtOC56nGONt9y1KdSrEQjwCbYw",
  authDomain: "vue-3-projects.firebaseapp.com",
  projectId: "vue-3-projects",
  storageBucket: "vue-3-projects.appspot.com",
  messagingSenderId: "79712493233",
  appId: "1:79712493233:web:db1cf4c07fcdb8099c0c90",
};

//Initialize firebase
firebase.initializeApp(firebaseConfig);

const projectFirestore = firebase.firestore();
const timestamp = firebase.firestore.FieldValue.serverTimestamp;

export { projectFirestore, timestamp };
