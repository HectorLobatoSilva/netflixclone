import firebase from 'firebase/app'
import 'firebase/auth'

const app = firebase.initializeApp({
    apiKey: process.env.REACT_APP_FIREBASE_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_DOMAIN,
    databaseURL: process.env.REACT_APP_FIREBASE_DATABASE,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREABASE_SENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID,

})

export interface UserStateInterface {
    useremail: string;
    password: string;
    passwordRepeated?: string;
}

export const FirebaseAddUser = ( user: UserStateInterface ) => {
    const { useremail, password, passwordRepeated } = user
    if( password === passwordRepeated ) {
        app.auth().createUserWithEmailAndPassword( useremail, password ).then( user => app.auth().signInWithEmailAndPassword( useremail, password ) ).catch( error => "Can not create user" )
    }
}

export const FirebaseSignIn = ( user: UserStateInterface  ) => {
    const { useremail, password } = user
    app.auth().signInWithEmailAndPassword( useremail, password ).then( user => console.log("user loged in", user) ).catch( error => console.log("There is an error", error) )
}

export default app