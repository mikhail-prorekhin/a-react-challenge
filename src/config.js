import firebase from 'firebase'

export const appName = 'myob-challenge'

const config = {
    apiKey: "AIzaSyA3tK0ASDkE6frsUl4jpKPHIT0pZte4pU0",
    authDomain: `${appName}.firebaseapp.com`,
    databaseURL: `https://${appName}.firebaseio.com`,
    projectId: appName,
    storageBucket: "",
    messagingSenderId: "191209772093"
}

firebase.initializeApp(config)
