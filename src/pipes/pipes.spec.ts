import * as Pipes from './pipes';
import { fromJS } from 'immutable';

describe('MapToArrayPipe', () => {

  it('converts a map to an array', () => {
    const uut = new Pipes.MapToArrayPipe();
    const output = uut.transform(fromJS({
      '1': { test: 1 },
      '2': { test: 2 }
    }))

    expect(output).toEqual([
      { test: 1},
      { test: 2}
    ]);
  });

  it('MapToArrayPipe return an empty array for a nil value', () => {
    const uut = new Pipes.MapToArrayPipe();
    const output = uut.transform(undefined);

    expect(output).toEqual([]);
  });

});

describe('OrderByPipe', () => {

  it('orders an array by a single key ASC', () => {
    const uut = new Pipes.OrderByPipe();
    const input = [
      { test: 5 },
      { test: 1 },
      { test: 3 },
      { test: 3 }
    ];

    const output = uut.transform(input, ['test']);
    expect(output).toEqual([
      { test: 1 },
      { test: 3 },
      { test: 3 },
      { test: 5 }
    ]);
  });

  it('orders an array by a single key DESC', () => {
    const uut = new Pipes.OrderByPipe();
    const input = [
      { test: 5 },
      { test: 1 },
      { test: 3 }
    ];

    const output = uut.transform(input, ['test'], true);
    expect(output).toEqual([
      { test: 5 },
      { test: 3 },
      { test: 1 }
    ]);
  });

  it('orders an array by multiple keys ASC', () => {
    const uut = new Pipes.OrderByPipe();
    const input = [
      { test: 5, other: 2 },
      { test: 5, other: 1 },
      { test: 3, other: 7 }
    ];

    const output = uut.transform(input, ['test', 'other']);
    expect(output).toEqual([
      { test: 3, other: 7 },
      { test: 5, other: 1 },
      { test: 5, other: 2 }
    ]);
  });

  it('orders an array by multiple keys DESC', () => {
    const uut = new Pipes.OrderByPipe();
    const input = [
      { test: 5, other: 2 },
      { test: 5, other: 1 },
      { test: 3, other: 7 }
    ];

    const output = uut.transform(input, ['test', 'other'], true);
    expect(output).toEqual([
      { test: 5, other: 2 },
      { test: 5, other: 1 },
      { test: 3, other: 7 }
    ]);
  });

  it('returns the original value if no keys are specified', () => {
    const uut = new Pipes.OrderByPipe();
    const input = [
      { test: 5, other: 2 },
      { test: 5, other: 1 },
      { test: 3, other: 7 }
    ];

    const output = uut.transform(input, [], true);
    expect(output).toEqual([
      { test: 5, other: 2 },
      { test: 5, other: 1 },
      { test: 3, other: 7 }
    ]);
  });

});
