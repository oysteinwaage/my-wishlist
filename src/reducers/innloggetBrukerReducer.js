import initialState from './initialState';
import {
  BRUKER_LOGGET_INN,
  MOTTA_BRUKERE,
  MOTTA_MIN_ONSKELISTE,
  RESET_ALL_DATA,
  TOGGLE_LENKE_DIALOG,
  UPDATE_ALLOWED_VIEWERS, SET_LAST_SEEN_VERSION, UPDATE_MY_MEASUREMENTS
} from '../actions/actions';

export default function innloggetBruker(state = initialState.innloggetBruker, action) {
  switch (action.type) {
    case BRUKER_LOGGET_INN:
      return Object.assign({}, state, {
        email: action.user.email,
        navn: action.user.displayName,
        uid: action.user.uid
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
    case MOTTA_BRUKERE:
      const me = action.brukere.find(b => b.uid === state.uid);
      return {
        ...state,
        lastSeenVersion: (me && me.lastSeenVersion) || state.lastSeenVersion,
        userDbKey: me && me.key
      };
    case UPDATE_MY_MEASUREMENTS:
      return {
        ...state,
        measurements: action.newMeasurements
      };
    case SET_LAST_SEEN_VERSION:
      return {
        ...state,
        lastSeenVersion: action.newVersion,
      };
    case RESET_ALL_DATA:
      return initialState.innloggetBruker;
    default:
      return state;
  }
}
