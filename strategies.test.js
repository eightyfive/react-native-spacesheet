import { double } from './strategies';
import { runStrategy as run } from './index';

let sizes;

describe('Strategies', () => {
  test('Double', () => {
    sizes = run(5, 4, double);
    expect(sizes).toEqual([0, 5, 10, 20]);

    sizes = run(2, 10, double);
    expect(sizes).toEqual([0, 2, 4, 8, 16, 32, 64, 128, 256, 512]);
  });
});
