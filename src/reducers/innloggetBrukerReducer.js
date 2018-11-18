import initialState from './initialState';
import { BRUKER_LOGGET_INN, MOTTA_MIN_ONSKELISTE, TOGGLE_LENKE_DIALOG } from '../actions/actions';

export default function innloggetBruker(state = initialState.innloggetBruker, action) {
  switch (action.type) {
    case BRUKER_LOGGET_INN:
      return Object.assign({}, state, {
        email: action.user.email,
        navn: action.user.displayName,
      });
    case MOTTA_MIN_ONSKELISTE:
      return Object.assign({}, state, {
        mineOnsker: action.nyListe || [],
      });
    case TOGGLE_LENKE_DIALOG:
      return Object.assign({}, state, {
        openLenkeDialog: !state.openLenkeDialog,
        openLenkeDialogOnske: action.index,
      });
    default:
      return state;
  }
}
