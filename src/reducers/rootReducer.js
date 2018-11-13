import { combineReducers } from 'redux';
import testReducer from './testReducer';
import innloggetBruker from './innloggetBrukerReducer';

const rootReducer = combineReducers({
  testReducer,
  innloggetBruker,
});

export default rootReducer;
