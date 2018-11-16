import initialState from './initialState';
import { BRUKER_LOGGET_INN, MOTTA_MIN_ONSKELISTE } from '../actions/actions';

export default function innloggetBruker(state = initialState.innloggetBruker, action) {
  switch (action.type) {
    case BRUKER_LOGGET_INN:
      return Object.assign({}, state, {
        email: action.data.bruker.email,
        name: action.data.bruker.displayName,
      });
    case MOTTA_MIN_ONSKELISTE:
      return Object.assign({}, state, {
        mineOnsker: action.nyListe || [],
      });
    default:
      return state;
  }
}
