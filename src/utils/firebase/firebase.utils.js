import { initializeApp } from 'firebase/app';
import { 
    getAuth, 
    signInWithRedirect, 
    signInWithPopup, 
    GoogleAuthProvider
} from 'firebase/auth';
import {
    getFirestore,
    doc,
    getDoc,
    setDoc
} from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyARA8r5wEoxnIiHAv7UmgvnO7fKFs_2Iao",
    authDomain: "crwn-clothing-db-1fb10.firebaseapp.com",
    projectId: "crwn-clothing-db-1fb10",
    storageBucket: "crwn-clothing-db-1fb10.appspot.com",
    messagingSenderId: "150615206239",
    appId: "1:150615206239:web:08722b1da35de15a252eea"
};
  
  // Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();

provider.setCustomParameters({
    prompt: "select_account"
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {
    const userDocRef = doc(db, 'users', userAuth.uid);

    console.log(userDocRef);

    const userSnapshot = await getDoc(userDocRef);
    console.log(userSnapshot.exists());

    if (!userSnapshot.exists()) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try {
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt
            });
        }   catch(error) {
            console.log('error creating user', error.message)
        }
    }

    return userDocRef;
    //check if user exists. if so, return userdocref
    //if not, create document with data from userauth
}