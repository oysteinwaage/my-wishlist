import initialState from './initialState';
import { ENDRE_HEADER_TEKST, TOGGLE_VIS_OPPRETT_BRUKER } from '../actions/actions';

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
    default:
      return state;
  }
}
