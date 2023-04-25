// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: 'AIzaSyBUN4truXSZ8RJHYR3UbIew7hjhMzEQSp4',
    authDomain: 'accommodation-306b8.firebaseapp.com',
    projectId: 'accommodation-306b8',
    storageBucket: 'accommodation-306b8.appspot.com',
    messagingSenderId: '163869192044',
    appId: '1:163869192044:web:6964d3114451d4f3fd8d49',
    measurementId: 'G-GT1ZPE7WKG',
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
