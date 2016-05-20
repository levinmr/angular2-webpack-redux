import reducer from '../reducers/index';
import remoteAction from '../middleware/remote-action';
import { createStore, applyMiddleware } from 'redux';
import routerMiddleware from '../router-redux/middleware';

const persistState = require('redux-localstorage');
const thunk = require('redux-thunk').default;

export default function configureStore(initialState) {
  const router = routerMiddleware(history);
  const createStoreWithMiddleware = applyMiddleware(
    thunk,
    remoteAction,
    router
  )(createStore);

  return createStoreWithMiddleware(reducer, initialState);
};
