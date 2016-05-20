import * as ActionTypes from '../actions/app';
import { Action } from '../actions/action';
import { fromJS, Map } from 'immutable';

const INITIAL_STATE = fromJS({
  title: 'medCPU UI Starter'
});

function setTitle(state, action: Action) {
  return state.set('title', action.payload.title);
}

export default function app(
  state = INITIAL_STATE,
  action: Action = {type: ''}): Map<string, any> {

  switch (action.type) {
  case ActionTypes.APP_SET_TITLE:
    return setTitle(state, action);
  }

  return state;
};
