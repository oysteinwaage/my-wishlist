import initialState from './initialState';
import { MOTTA_BRUKERE, MOTTA_VALGT_VENNS_LISTE, SETTE_VALGT_VENN } from '../actions/actions';

export default function vennersLister(state = initialState.vennersLister, action) {
  switch (action.type) {
    case MOTTA_BRUKERE:
      return Object.assign({}, state, {
        venner: action.brukere,
      });
    case MOTTA_VALGT_VENNS_LISTE:
      return Object.assign({}, state, {
        valgtVennsListe: action.nyListe,
      });
    case SETTE_VALGT_VENN:
      return Object.assign({}, state, {
        valgtVenn: action.venn,
      });
    default:
      return state;
  }
}
