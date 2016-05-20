import reducer from '../reducers/index';
import remoteAction from '../middleware/remote-action';
import { createStore, applyMiddleware } from 'redux';
import routerMiddleware from '../router-redux/middleware';

// const persistState = require('redux-localstorage');
const createLogger = require('redux-logger');
const thunk = require('redux-thunk').default;
const loggerMiddleware = createLogger({collapsed: true});

export default function configureStore(initialState, history) {
  const router = routerMiddleware(history);
  const createStoreWithMiddleware = applyMiddleware(
    thunk,
    remoteAction,
    router,
    loggerMiddleware
  )(createStore);

  return createStoreWithMiddleware(reducer, initialState);
};
