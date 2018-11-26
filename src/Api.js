import { push } from 'connected-react-router';
import { usersRef, auth, wishlistRef, myWishlistRef } from "./config/firebase";
import { brukerLoggetInn, mottaMinOnskeliste, mottaBrukere, mottaValgtVennsListe, resetAllData } from "./actions/actions";
import { myWishlistId } from './utils/util';

const mapTolist = res => res.val() ?
  Object.keys(res.val()).map(k => {
    return Object.assign({}, res.val()[k], { key: k, })
  }) : [];

export const addWishToMyList = newWish => {
  myWishlistRef().push().set(newWish);
};

export const removeWishFromMyList = wishId => {
  myWishlistRef().child(wishId).remove();
};

export const updateLinkOnWishOnMyList = (newLink, wishId) => {
  myWishlistRef().child(wishId).update({ url: newLink });
};

export const updateWishOnListWith = (newValues, wish, listId) => {
  const wishKey = wish.key;
  delete wish.key;
  wishlistRef(listId).child(wishKey).update(Object.assign({}, wish, newValues));
};

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
          usersRef.push().set({ navn, email: brukernavn, uid: auth.currentUser.uid });
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
  wishlistRef(myWishlistId()).on('value', snapshot => {
    dispatch(mottaMinOnskeliste(mapTolist(snapshot)));
  });
};

export const fetdhOnskelisteForUid = (uid) => async dispatch => {
  wishlistRef(uid).on("value", snapshot => {
    dispatch(mottaValgtVennsListe(mapTolist(snapshot)));
  });
};

export const fetdhUsers = () => async dispatch => {
  usersRef.once('value', snapshot => {
    dispatch(mottaBrukere(mapTolist(snapshot)));
  });
};

export const logOut = () => async dispatch => {
  auth.signOut().then(function () {
    dispatch(push('/'));
    dispatch(resetAllData());
  }).catch(error => {
    alert(error);
  })
}
