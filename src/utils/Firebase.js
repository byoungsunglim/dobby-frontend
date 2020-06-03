import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/storage';
import config from './config.json';

// Initialize Firebase
firebase.initializeApp(config);

export const db = firebase.firestore();
export const storage = firebase.storage().ref();