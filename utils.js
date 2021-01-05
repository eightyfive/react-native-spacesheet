import _mapKeys from 'lodash.mapkeys';
import _padStart from 'lodash.padstart';
import _zipObject from 'lodash.zipobject';

export const reDial = /^(row|col)([1-9])$/;

export const reFlex = /^f([0-9])$/;

export const reSpace = /^([a-zA-Z]+)(\d+)$/;

/**
 * Limitation of Proxy polyfill (https://github.com/GoogleChrome/proxy-polyfill)
 *
 * "This means that the properties you want to proxy *must be known at creation time*."
 *
 * Hence we need this method to generate all possible Proxy keys:
 * mb1, pv2, m202, p1030, etc...
 *
 * @param `rebase` Number: Rebase size index
 *   - rebase = 4
 *   - Ex: [0, 4, 8, 16] (sizes)
 *   - Ex: [0, 1, 2,  3] (indexes)
 *   - Generates --> p0, p1, p2, p3, m0, m1...
 */
export function createCache(rebase, aliases) {
  const sizes = [].concat(createSizes(rebase, 1));

  const cache = {};

  // Spacing
  aliases.forEach((alias) => {
    sizes.forEach((size) => {
      cache[`${alias}${size}`] = false;
    });
  });

  // Dial
  for (let dial = 1; dial < 10; dial++) {
    cache[`row${dial}`] = false;
    cache[`col${dial}`] = false;
  }

  // Flex
  for (let grow = 1; grow < 10; grow++) {
    cache[`f${grow}`] = false;
  }

  return cache;
}

export function createSpaceStyle(prop, sizes) {
  let sides = {};

  switch (sizes.length) {
    case 1:
      sides = {
        '': sizes[0],
      };
      break;

    case 2:
      sides = {
        Vertical: sizes[0],
        Horizontal: sizes[1],
      };
      break;

    case 3:
      sides = {
        Top: sizes[0],
        Horizontal: sizes[1],
        Bottom: sizes[2],
      };
      break;

    case 4:
      sides = {
        Top: sizes[0],
        Right: sizes[1],
        Bottom: sizes[2],
        Left: sizes[3],
      };
      break;

    default:
      break;
  }

  return _mapKeys(sides, (size, side) => `${prop}${side}`);
}

/**
 * Generates sizes combinations (base = 5):
 * 1, 2, ..., 4, 01, 02, ..., 203, ..., 0330, ..., 4443, 4444.
 */
export function createSizes(base, pad) {
  const sizes = [];

  const total = Math.pow(base, pad);

  for (let i = 0; i < total; i++) {
    const rebased = i.toString(base);

    sizes.push(_padStart(rebased, pad, '0'));
  }

  return sizes;
}

export function runStrategy(amount, length, strategy) {
  const sizes = [];

  for (let i = 0; i < length; i++) {
    sizes.push(strategy(i, amount));
  }

  return sizes;
}
