import firebase from "firebase/app";
import 'firebase/database';
import 'firebase/auth'

import { FirebaseConfig } from './keys';

firebase.initializeApp(FirebaseConfig);

const databaseRef = firebase.database().ref();
export const usersRef = databaseRef.child('users');
export const wishlistRef = myListId => databaseRef.child('wishlists').child(myListId);

export const authRef = firebase.auth();