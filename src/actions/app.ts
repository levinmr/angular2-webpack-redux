import { push } from '../router-redux/actions';

export const APP_SET_TITLE = 'APP_SET_TITLE';

export function setTitle(title: string) {
  return {
    type: APP_SET_TITLE,
    payload: {
      title
    }
  };
};

export function changeRoute(path) {
  return dispatch => dispatch(push(path));
};

export const appActions = { setTitle };
