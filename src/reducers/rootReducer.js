import { combineReducers } from 'redux';
import innloggetBruker from './innloggetBrukerReducer';
import config from './configReducer';

const rootReducer = combineReducers({
  innloggetBruker,
  config,
});

export default rootReducer;
