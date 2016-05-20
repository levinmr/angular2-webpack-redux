import { combineReducers } from 'redux';
import app from './app';
import user from './user';
import { routerReducer } from '../router-redux/reducers';

const reducer = combineReducers({
  routing: routerReducer,
  app,
  user
});

export default reducer;
