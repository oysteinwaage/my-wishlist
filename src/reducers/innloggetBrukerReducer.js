import initialState from './initialState';
import { BRUKER_LOGGET_INN, MOTTA_MIN_ONSKELISTE, RESET_ALL_DATA, TOGGLE_LENKE_DIALOG, UPDATE_ALLOWED_VIEWERS } from '../actions/actions';

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
        openLenkeDialogOnske: action.index || {},
      });
    case UPDATE_ALLOWED_VIEWERS:
      return Object.assign({}, state, {
        allowedViewers: action.viewers || [],
      });
    case RESET_ALL_DATA:
      return initialState.innloggetBruker;
    default:
      return state;
  }
}
