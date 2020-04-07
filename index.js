import _defaults from 'lodash.defaults';

import SpaceSheet from './SpaceSheet';
import * as strategies from './strategies';
import { runStrategy, zipAliases } from './utils';

const defaultOptions = {
  spacings: {
    m: 'margin',
    p: 'padding',
  },
  sides: {
    '': '',
    t: 'Top',
    r: 'Right',
    b: 'Bottom',
    l: 'Left',
    v: 'Vertical',
    h: 'Horizontal',
  },
};

export default {
  create(...args) {
    let sizes;
    let options;

    if (args.length > 2) {
      let amount, range, strategy;

      [amount, range, strategy, options = {}] = args;

      sizes = runStrategy(
        amount,
        range,
        typeof strategy === 'string' ? strategies[strategy] : strategy,
      );
    } else {
      [sizes, options = {}] = args;
    }

    _defaults(options, defaultOptions);

    const aliases = zipAliases(options.spacings, options.sides);

    return new SpaceSheet(sizes, aliases);
  },
};
