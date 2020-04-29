import firebase from 'firebase';
const config={
     apiKey: "AIzaSyByjIkAL7TPK8ht4aZmwlQouF4sScY3LwA",
     authDomain: "cannago-ba078.firebaseapp.com",
     databaseURL: "https://cannago-ba078.firebaseio.com",
    projectId: "cannago-ba078",
    storageBucket: "cannago-ba078.appspot.com",
    messagingSenderId: "444061209106",
    appId: "1:444061209106:ios:b900a94b85d44e67a1becb",
    measurementId: "G-5Y9DLF5NT9"
}
const Firebase = firebase.initializeApp(config);
export default Firebase;