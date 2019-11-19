import { push } from 'connected-react-router';
import { allowedViewsRef, auth, myAllowedViewersRef, myUid, myWishlistRef, usersRef, wishlistRef } from "./config/firebase";
import {
  brukerLoggetInn,
  mottaBrukere,
  mottaMinOnskeliste,
  mottaValgtVennsListe,
  receiveMyFriendLists,
  resetAllData,
  updateAllowedViewers,
  resettPassordMailSendt
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

export const updateWishTextOnMyList = (newText, wishId) => {
  const wishRef = myWishlistRef().child(wishId);
  wishRef.update({ onskeTekst: newText });
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
      dispatch(updateAllowedViewers(res.val() && res.val().sort((a, b) => a.label.localeCompare(b.label))));
    });
};

export const fetchListsIAmAllowedToView = () => async dispatch => {
  allowedViewsRef.once('value', res => {
    const allLists = res.val();
    const myLists = allLists ?
      Object.keys(allLists).filter(groupId => allLists[groupId].find(member => member && member.value === myUid())).map(k => {
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

export const resetPassord = (mail) => async dispatch =>{
  auth.sendPasswordResetEmail(mail)
      .then(() => dispatch(resettPassordMailSendt(
          `Link til resetting av passord er sendt til din email: ${mail}. Sjekk i spam-mappen din også, den kan fort ende der`
      )))
      .catch( () => dispatch(resettPassordMailSendt('Noe gikk feil! Sjekk at du har skrevet inn riktig mail og prøv igjen')))
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

export const opprettNyBruker = (brukernavn, passord, firstName, lastName) => async dispatch => {
  const navn = firstName + " " + lastName;
  auth.createUserWithEmailAndPassword(brukernavn, passord)
    .then(() => {
      auth.currentUser.updateProfile({ displayName: navn, photoURL: null })
        .then(() => {
          usersRef.push().set({ navn, firstName, lastName, email: brukernavn, uid: auth.currentUser.uid });
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
