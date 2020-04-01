import SpaceSheet from './SpaceSheet';
import * as strategies from './strategies';
import { runStrategy, zipAliases } from './utils';

export { aliases, sides, spacings, zipAliases } from './utils';

export default {
  create(spacing, range, strategy, aliases) {
    if (Array.isArray(spacing)) {
      return new SpaceSheet(spacing, range);
    }

    const sizes = runStrategy(spacing, range, strategies[strategy]);

    return new SpaceSheet(sizes, aliases);
  },
};
