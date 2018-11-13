import initialState from './initialState';
import { BRUKER_LOGGET_INN } from '../actions/actions';

export default function innloggetBruker(state = initialState.innloggetBruker, action) {
  switch (action.type) {
    case BRUKER_LOGGET_INN:
      console.log('innlogget bruker action: ', action);
      return Object.assign({}, state, {
        email: action.data.bruker.email,
        name: action.data.bruker.displayName,
      });
    default:
      return state;
  }
}
