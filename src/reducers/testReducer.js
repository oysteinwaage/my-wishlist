import initialState from './initialState';
import { TEST_ACTION } from '../actions/actions';

export default function testReducer(state = initialState.brukere, action) {
  switch (action.type) {
    case TEST_ACTION:
      console.log('TEST_ACTION: ', action);
      return Object.assign({}, state, {
      });
    default:
      return state;
  }
}
