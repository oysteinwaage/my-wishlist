import firebase from "firebase/app";
import 'firebase/database';
import 'firebase/auth'

import { FirebaseConfig } from './keys';

firebase.initializeApp(FirebaseConfig);
const databaseRef = firebase.database().ref();

export const db = firebase.database();

// Users
export const usersRef = databaseRef.child('users');

// Wishlist
export const wishlistRef = listId => db.ref('wishlists/' + listId);
export const myWishlistRef = () => wishlistRef(myUid());


export const auth = firebase.auth();
export const myUid = () => firebase.auth().currentUser.uid;