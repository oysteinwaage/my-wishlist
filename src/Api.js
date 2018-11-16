import { push } from 'connected-react-router';
import { usersRef, authRef, wishlistRef } from "./config/firebase";
import { TEST_ACTION, brukerLoggetInn, mottaMinOnskeliste } from "./actions/actions";

export const updateMyList = (userId, newWishlist) => {
  wishlistRef(userId).set(newWishlist);
}

export const loggInn = (brukernavn, passord) => async dispatch => {
  authRef.signInWithEmailAndPassword(brukernavn, passord)
    .then(user => {
      dispatch(brukerLoggetInn(user));
      dispatch(push('/minliste'));
    })
    .catch(function (error) {
      alert(error);
    });
};

export const fetdhMinOnskeliste = (userId) => async dispatch => {
  wishlistRef(userId).on("value", snapshot => {
    dispatch(mottaMinOnskeliste(snapshot.val()));
  });
};

export const fetdhUsers = () => async dispatch => {
  usersRef.on("value", snapshot => {
    dispatch({
      type: TEST_ACTION,
      payload: snapshot.val()
    });
  });
};