import firebase from "firebase";
const firebaseConfig = {
  apiKey: "AIzaSyAT2GX4ZjW5HgJwOd2RFSHI4Nj3HyC9i64",
  authDomain: "disneyplus-clone-3eeed.firebaseapp.com",
  databaseURL: "https://disneyplus-clone-3eeed-default-rtdb.firebaseio.com",
  projectId: "disneyplus-clone-3eeed",
  storageBucket: "disneyplus-clone-3eeed.appspot.com",
  messagingSenderId: "179174207081",
  appId: "1:179174207081:web:376075538f5d336a807cf8"
};


const firebaseApp = firebase.initializeApp(firebaseConfig);
firebase.firestore().settings({ experimentalForceLongPolling: true });
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();
const storage = firebase.storage();

export { auth, provider, storage };
export default db;