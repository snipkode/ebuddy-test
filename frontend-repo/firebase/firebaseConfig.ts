import { initializeApp } from 'firebase/app';

const firebaseConfig = {
  apiKey: "AIzaSyCQEg2Pc-uEficmXpDAn2gfsvPF9Sk20V0",
  authDomain: "e-compfastku.firebaseapp.com",
  databaseURL: "https://e-compfastku.firebaseio.com",
  projectId: "e-compfastku",
  storageBucket: "e-compfastku.firebasestorage.app",
  messagingSenderId: "940782247662",
  appId: "1:940782247662:web:ca7062c5e868768f"
};

const firebaseApp = initializeApp(firebaseConfig);

export default firebaseApp;
