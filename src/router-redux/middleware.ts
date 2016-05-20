import { CALL_HISTORY_METHOD } from './actions';

export default function routerMiddleware(history) {
  return () => next => action => {
    if (action.type !== CALL_HISTORY_METHOD) {
      return next(action);
    }

    const { payload: { method, args } } = action;
    history[method](...args);
  };
};
