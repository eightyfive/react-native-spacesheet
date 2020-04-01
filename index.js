import SpaceSheet from './SpaceSheet';
import * as strategies from './strategies';

export function runStrategy(spacing, range, strategy) {
  const sizes = [];

  for (let i = 0; i < range; i++) {
    sizes.push(strategy(i, spacing, range));
  }

  return sizes;
}

export default {
  create(spacing, range, strategy) {
    let sizes;

    if (Array.isArray(spacing)) {
      sizes = spacing;
    } else {
      sizes = runStrategy(spacing, range, strategies[strategy]);
    }

    return new SpaceSheet(sizes);
  },
};
