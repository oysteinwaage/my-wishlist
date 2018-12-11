import { push } from 'connected-react-router';
import { allowedViewsRef, auth, myAllowedViewersRef, myUid, myWishlistRef, usersRef, wishlistRef } from "./config/firebase";
import {
  brukerLoggetInn,
  mottaBrukere,
  mottaMinOnskeliste,
  mottaValgtVennsListe,
  receiveMyFriendLists,
  resetAllData,
  updateAllowedViewers
} from "./actions/actions";

const mapTolist = res => res.val() ?
  Object.keys(res.val()).map(k => {
    return Object.assign({}, res.val()[k], { key: k, })
  }) : [];

/*
WISHLIST MANIPULATIONS
 */
export const addWishToMyList = newWish => {
  myWishlistRef().push().set(newWish);
};

export const removeWishFromMyList = wishId => {
  myWishlistRef().child(wishId).remove();
};

export const updateLinkOnWishOnMyList = (newLink, wishId) => {
  const wishRef = myWishlistRef().child(wishId);
  if (newLink !== '' && !newLink.startsWith('http')) {
    wishRef.update({ url: 'http://' + newLink })
  } else {
    wishRef.update({ url: newLink });
  }
};

export const updateWishOnListWith = (newValues, wish, listId) => {
  const wishKey = wish.key;
  delete wish.key;
  wishlistRef(listId).child(wishKey).update(Object.assign({}, wish, newValues));
};

export const fetdhMinOnskeliste = () => async dispatch => {
  myWishlistRef().on('value', snapshot => {
    dispatch(mottaMinOnskeliste(mapTolist(snapshot)));
  });
};

export const fetdhOnskelisteForUid = (uid) => async dispatch => {
  wishlistRef(uid).on("value", snapshot => {
    dispatch(mottaValgtVennsListe(mapTolist(snapshot)));
  });
};

/*
ALLOWED VIEWERS
 */
export const addViewersToMyList = (viewers) => {
  myAllowedViewersRef().set(viewers);
};

export const fetchViewersToMyList = () => async dispatch => {
  myAllowedViewersRef()
    .on('value', res => {
      dispatch(updateAllowedViewers(res.val().sort((a, b) => a.label.localeCompare(b.label))));
    });
};

export const fetchListsIAmAllowedToView = () => async dispatch => {
  allowedViewsRef.once('value', res => {
    const allLists = res.val();
    const myLists = allLists ?
      Object.keys(allLists).filter(groupId => allLists[groupId].find(member => member.value === myUid())).map(k => {
        return k;
      }) : [];
    dispatch(receiveMyFriendLists(myLists));
    return myLists;
  });
};

/*
USERS
 */
export const loggInn = (brukernavn, passord) => async dispatch => {
  auth.signInWithEmailAndPassword(brukernavn, passord)
    .then(user => {
      dispatch(brukerLoggetInn(user.user));
      dispatch(push('/minliste'));
      dispatch(fetdhUsers());
    })
    .catch(function (error) {
      alert(error);
    });
};

export const fetdhUsers = () => async dispatch => {
  usersRef.once('value', snapshot => {
    dispatch(mottaBrukere(mapTolist(snapshot).sort((a, b) => a.navn.localeCompare(b.navn))));
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
