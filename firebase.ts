import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore'
import 'firebase/compat/auth'
const firebaseConfig = {
    apiKey: "AIzaSyBQ7jIlGGmDt_PhgdVLGtw_HR6oneD0Nvg",
    authDomain: "construction-tech.firebaseapp.com",
    projectId: "construction-tech",
    storageBucket: "construction-tech.appspot.com",
    messagingSenderId: "76543244234",
    appId: "1:76543244234:web:33d887472c11f91c9d0133",
    measurementId: "G-P6RF87H5ZQ"
};
firebase.initializeApp(firebaseConfig);
export default firebase;
