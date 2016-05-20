import * as ActionTypes from '../actions/user';
import user from './user';
import { Map, fromJS } from 'immutable';
const matchers = require('jasmine-immutable-matchers');

describe('user reducer', () => {

  beforeEach(() => {
    jasmine.addMatchers(matchers);
  });

  it('handles USER_GET_ALL_REQUEST by setting pending and error', () => {
    const initialState = fromJS({
      getAllPending: false,
      getAllError: null,
      users: {}
    });

    const action = {
      type: ActionTypes.USER_GET_ALL_REQUEST
    }

    const nextState = user(initialState, action);

    expect(nextState).toEqualImmutable(fromJS({
      getAllPending: true,
      getAllError: null,
      users: {}
    }));
  });

  it('handles USER_GET_ALL_REQUEST by clearing existing error', () => {
    const initialState = fromJS({
      getAllPending: false,
      getAllError: 'bad stuff',
      users: {}
    });

    const action = {
      type: ActionTypes.USER_GET_ALL_REQUEST
    }

    const nextState = user(initialState, action);

    expect(nextState).toEqualImmutable(fromJS({
      getAllPending: true,
      getAllError: null,
      users: {}
    }));
  });

  it('handles USER_GET_ALL_REQUEST without initial state', () => {
    const action = {
      type: ActionTypes.USER_GET_ALL_REQUEST
    }

    const nextState = user(undefined, action);

    expect(nextState).toEqualImmutable(fromJS({
      getAllPending: true,
      getAllError: null,
      users: {}
    }));
  });

  it('handles USER_GET_ALL_SUCCESS by setting pending and users', () => {
    const initialState = fromJS({
      getAllPending: true,
      getAllError: null,
      users: {}
    });

    const action = {
      type: ActionTypes.USER_GET_ALL_SUCCESS,
      payload: {
        response: {
          entities: {
            users: {
              '1': {
                id: '1',
                firstName: 'Test',
                lastName: 'One'
              }
            }
          }
        }
      }
    }

    const nextState = user(initialState, action);

    expect(nextState).toEqualImmutable(fromJS({
      getAllPending: false,
      getAllError: null,
      users: {
        '1': {
          id: '1',
          firstName: 'Test',
          lastName: 'One'
        }
      }
    }));
  });

  it('handles USER_GET_ALL_ERROR by setting pending, users and error', () => {
    const initialState = fromJS({
      getAllPending: true,
      getAllError: null,
      users: {
        '1': {
          id: '1',
          firstName: 'Test',
          lastName: 'One'
        }
      }
    });

    const action = {
      type: ActionTypes.USER_GET_ALL_ERROR,
      error: 'Bad Stuff'
    }

    const nextState = user(initialState, action);

    expect(nextState).toEqualImmutable(fromJS({
      getAllPending: false,
      getAllError: 'Bad Stuff',
      users: {}
    }));
  });
});
