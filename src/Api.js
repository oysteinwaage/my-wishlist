import { push } from 'connected-react-router';
import { usersRef, authRef } from "./config/firebase";
import { TEST_ACTION, brukerLoggetInn } from "./actions/actions";

/*
export const addToDo = newToDo => async dispatch => {
  usersRef.push().set(newToDo);
};

export const completeToDo = completeToDoId => async dispatch => {
  usersRef.child(completeToDoId).remove();
}; */

export const loggInn = (brukernavn, passord) => async dispatch => {
  authRef.signInWithEmailAndPassword(brukernavn, passord)
    .then(user => {
      console.log('innlogget bruker: ', user);
      dispatch(brukerLoggetInn(user));
      dispatch(push('/minliste'));
    })
    .catch(function (error) {
      alert(error);
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