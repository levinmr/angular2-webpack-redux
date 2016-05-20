import * as ActionTypes from '../actions/app';
import app from '../reducers/app';
import { Map, fromJS } from 'immutable';
const matchers = require('jasmine-immutable-matchers');

describe('app reducer', () => {

  beforeEach(() => {
    jasmine.addMatchers(matchers);
  });

  it('handles SET_TITLE by settings the title', () => {
    const initialState = fromJS({
      title: 'foo'
    });

    const action = {
      type: ActionTypes.APP_SET_TITLE,
      payload: {
        title: 'bar'
      }
    }

    const nextState = app(initialState, action);

    expect(nextState.get('title')).toBe('bar');
  });


  it('handles SET_TITLE without initial state', () => {
    const action = {
      type: ActionTypes.APP_SET_TITLE,
      payload: {
        title: 'bar'
      }
    };

    const nextState = app(undefined, action);

    expect(nextState.get('title')).toEqualImmutable('bar');
  });
});
