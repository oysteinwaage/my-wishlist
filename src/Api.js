import { push } from 'connected-react-router';
import { usersRef, auth, wishlistRef } from "./config/firebase";
import { brukerLoggetInn, mottaMinOnskeliste, mottaBrukere, mottaValgtVennsListe } from "./actions/actions";
import { myWishlistId } from './utils/util';

const mapTolist = res => Object.keys(res.val()).map(k => res.val()[k]);

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

// export const leggTilOnskeTilMinListe = (nyttOnske) => {
//   databaseMedRef('wishlists/' + auth.currentUser.uid).
// }

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
  wishlistRef(myWishlistId()).on("value", snapshot => {
    dispatch(mottaMinOnskeliste(snapshot.val()));
  });
};

export const fetdhOnskelisteForUid = (uid) => async dispatch => {
  wishlistRef(uid).on("value", snapshot => {
    dispatch(mottaValgtVennsListe(snapshot.val()));
  });
};

export const fetdhUsers = () => async dispatch => {
  usersRef.once('value', snapshot => {
    dispatch(mottaBrukere(mapTolist(snapshot)));
  });
};