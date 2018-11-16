import initialState from './initialState';
import { TEST_ACTION } from '../actions/actions';

export default function testReducer(state = initialState.brukere, action) {
  switch (action.type) {
    case TEST_ACTION:
      return Object.assign({}, state, {
      });
    default:
      return state;
  }
}
