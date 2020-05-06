import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyDHlWtIl6bPVsRSIir3cXd-GYTSrJAQ4ug",
    authDomain: "crwn-db-461fb.firebaseapp.com",
    databaseURL: "https://crwn-db-461fb.firebaseio.com",
    projectId: "crwn-db-461fb",
    storageBucket: "crwn-db-461fb.appspot.com",
    messagingSenderId: "876493610531",
    appId: "1:876493610531:web:9a727a05f80438a3505b96",
    measurementId: "G-M5GRHLERDV"
  };

  export const createUserProfileDocument = async(userAuth, additionalData) => {
    if(!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`);

    const snapShot = await userRef.get();

    //add user on DB
    if(!snapShot.exists){
      const { displayName, email } = userAuth;
      const createdAt = new Date();
      try{
        await userRef.set({
          displayName,
          email,
          createdAt,
          ...additionalData
        })
      }catch(error){
        console.log('error creating user ', error.message);
      }
    }

    return userRef;
    console.log(snapShot);
  } 

  firebase.initializeApp(config);

  export const auth = firebase.auth();
  export const firestore = firebase.firestore();

  const provider = new firebase.auth.GoogleAuthProvider();
  provider.setCustomParameters({ prompt: 'select_account' });
  export const signInWithGoogle = () => auth.signInWithPopup(provider);

  export default firebase;