import SpaceSheet from './SpaceSheet';
import * as strategies from './strategies';
import { runStrategy, zipAliases } from './utils';

export const spacings = {
  m: 'margin',
  p: 'padding',
};

export const sides = {
  '': '',
  t: 'Top',
  r: 'Right',
  b: 'Bottom',
  l: 'Left',
  v: 'Vertical',
  h: 'Horizontal',
};

export const aliases = zipAliases(spacings, sides);

export { zipAliases };

export default {
  create(...args) {
    let sizes;
    let names;

    if (args.length > 2) {
      let amount, range, strategy;

      [amount, range, strategy, names] = args;

      sizes = runStrategy(
        amount,
        range,
        typeof strategy === 'string' ? strategies[strategy] : strategy,
      );
    } else {
      [sizes, names] = args;
    }

    return new SpaceSheet(sizes, names || aliases);
  },
};
