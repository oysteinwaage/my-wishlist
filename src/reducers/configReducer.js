import initialState from './initialState';
import { ENDRE_HEADER_TEKST } from '../actions/actions';

export default function config(state = initialState.config, action) {
  switch (action.type) {
    case ENDRE_HEADER_TEKST:
      return Object.assign({}, state, {
        headerTekst: action.nyTekst,
      });
    default:
      return state;
  }
}
