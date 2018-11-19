import { push } from 'connected-react-router';
import { usersRef, auth, wishlistRef } from "./config/firebase";
import { brukerLoggetInn, mottaMinOnskeliste } from "./actions/actions";
import { myWishlistId } from './utils/util';


export const updateMyList = (newWishlist) => {
  wishlistRef(myWishlistId()).set(newWishlist);
}

export const loggInn = (brukernavn, passord) => async dispatch => {
  auth.signInWithEmailAndPassword(brukernavn, passord)
    .then(user => {
      dispatch(brukerLoggetInn(user.user));
      dispatch(push('/minliste'));
    })
    .catch(function (error) {
      alert(error);
    });
};

export const opprettNyBruker = (brukernavn, passord, navn) => async dispatch => {
  auth.createUserWithEmailAndPassword(brukernavn, passord)
    .then(() => {
      auth.currentUser.updateProfile({ displayName: navn, photoURL: null })
        .then(() => {
          dispatch(brukerLoggetInn(auth.currentUser));
          dispatch(push('/minliste'));
          // alert('Gratulerer du har opprettet bruker. Nå kan du logge inn!')
          // dispatch(toggleVisOpprettBruker());
        })
    })
    .catch(function (error) {
      alert(error);
    });
};

export const fetdhMinOnskeliste = () => async dispatch => {
  wishlistRef(myWishlistId()).on("value", snapshot => {
    dispatch(mottaMinOnskeliste(snapshot.val()));
  });
};

export const fetdhUsers = () => async dispatch => {
  usersRef.on("value", snapshot => {
    // doSomething
  });
};