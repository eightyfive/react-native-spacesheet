import { double, linear, multiply } from './strategies';
import { runStrategy as run } from './utils';

let sizes;

describe('Strategies', () => {
  test('Double', () => {
    sizes = run(5, 4, double);
    expect(sizes).toEqual([0, 5, 10, 20]);

    sizes = run(2, 10, double);
    expect(sizes).toEqual([0, 2, 4, 8, 16, 32, 64, 128, 256, 512]);
  });

  test('Linear', () => {
    sizes = run(2, 6, linear);
    expect(sizes).toEqual([0, 2, 4, 6, 8, 10]);
  });
});

