import * as ActionTypes from '../actions/user';
import { Action } from '../actions/action';
import { fromJS, Map } from 'immutable';

const INITIAL_STATE = fromJS({
  getAllPending: false,
  getAllError: null,
  users: {}
});

function getAllRequest(state) {
  return state.set('getAllPending', true)
              .set('getAllError', null);
}

function getAllSuccess(state, action: Action) {
  const {payload: {response: {entities: { users }}}} = action;
  return state.set('getAllPending', false)
              .set('users', fromJS(users));
}

function getAllError(state, action: Action) {
  return state.set('getAllPending', false)
              .set('getAllError', action.error)
              .set('users', Map());
}

export default function user(
  state = INITIAL_STATE,
  action: Action = {type: ''}): Map<string, any> {

  switch (action.type) {
  case ActionTypes.USER_GET_ALL_REQUEST:
    return getAllRequest(state);

  case ActionTypes.USER_GET_ALL_SUCCESS:
    return getAllSuccess(state, action);

  case ActionTypes.USER_GET_ALL_ERROR:
    return getAllError(state, action);
  }

  return state;
};
