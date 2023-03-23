// Import the functions you need from the SDKs you need
import * as firebase from 'firebase/compat';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyAcJ4ykl6g3t_CShTaJZYLX0PwTAHYR4uU',
  authDomain: 'nfcattendance-aa0bc.firebaseapp.com',
  projectId: 'nfcattendance-aa0bc',
  storageBucket: 'nfcattendance-aa0bc.appspot.com',
  messagingSenderId: '957532967034',
  appId: '1:957532967034:web:cf14aaa40e30aa9ddd2bc3',
};

// Initialize Firebase
let app;
if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig);
} else {
  app = firebase.app();
}

const auth = firebase.auth();

export {auth};
