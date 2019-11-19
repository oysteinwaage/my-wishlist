import initialState from './initialState';
import { ENDRE_HEADER_TEKST, TOGGLE_VIS_OPPRETT_BRUKER, MOTTA_BRUKERE, RESET_ALL_DATA, RESETT_PASSORD_MAIL_SENDT } from '../actions/actions';

export default function config(state = initialState.config, action) {
  switch (action.type) {
    case ENDRE_HEADER_TEKST:
      return Object.assign({}, state, {
        headerTekst: action.nyTekst,
      });
    case TOGGLE_VIS_OPPRETT_BRUKER:
      return Object.assign({}, state, {
        visOpprettNyBruker: !state.visOpprettNyBruker,
      });
    case MOTTA_BRUKERE:
      return Object.assign({}, state, {
        brukere: action.brukere,
      });
    case RESETT_PASSORD_MAIL_SENDT:
      return {
        ...state,
        infoResettMailSendt: action.infoText,
      };
    case RESET_ALL_DATA:
      return initialState.config;
    default:
      return state;
  }
}
