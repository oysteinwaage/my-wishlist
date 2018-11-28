import initialState from './initialState';
import { MOTTA_VALGT_VENNS_LISTE, SETTE_VALGT_VENN, RESET_ALL_DATA, RECEIVE_MY_FRIEND_LISTS } from '../actions/actions';

export default function vennersLister(state = initialState.vennersLister, action) {
  switch (action.type) {
    case RECEIVE_MY_FRIEND_LISTS:
      return Object.assign({}, state, {
        allowedListsForMe: action.lists,
      });
    case MOTTA_VALGT_VENNS_LISTE:
      return Object.assign({}, state, {
        valgtVennsListe: action.nyListe,
      });
    case SETTE_VALGT_VENN:
      return Object.assign({}, state, {
        valgtVenn: action.venn,
      });
    case RESET_ALL_DATA:
      return initialState.vennersLister;
    default:
      return state;
  }
}
