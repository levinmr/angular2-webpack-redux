import { setTitle } from './app';
import { isStandardAction } from '../utils/test-utils';

describe('app action creators', () => {

  it('returns a standard action for SET_TITLE', () => {
    const action = setTitle('foo');

    expect(action).toBeTruthy(isStandardAction(action));
  });

});
