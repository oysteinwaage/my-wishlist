import { combineReducers } from 'redux';
import testReducer from './testReducer';
import innloggetBruker from './innloggetBrukerReducer';
import config from './configReducer';

const rootReducer = combineReducers({
  testReducer,
  innloggetBruker,
  config,
});

export default rootReducer;
