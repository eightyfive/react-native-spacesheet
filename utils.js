import _mapKeys from 'lodash.mapkeys';
import _padStart from 'lodash.padstart';
import _zipObject from 'lodash.zipobject';
import getDialStyle from 'react-native-col/dial';

export const reDial = /^(row|col)([1-9])$/;

export const reSpace = /^([a-zA-Z]+)(\d)$/;

/**
 * Limitation of Proxy polyfill (https://github.com/GoogleChrome/proxy-polyfill)
 *
 * "This means that the properties you want to proxy *must be known at creation time*."
 *
 * Hence we need this method to generate all possible Proxy keys:
 * mb1, pv2, m202, p1030, etc...
 */
export function createCache(max, aliases) {
  const sizes = [].concat(generateSizes(max, 1));

  const cache = {};

  aliases.forEach((alias) => {
    sizes.forEach((size) => {
      cache[`${alias}${size}`] = false;
    });
  });

  for (let dial = 1; dial < 10; dial++) {
    cache[`row${dial}`] = false;
    cache[`col${dial}`] = false;
  }

  return cache;
}

export function createDialStyle(prop) {
  const [, dir, dial] = reDial.exec(prop);

  return getDialStyle(dir === 'col' ? 'column' : 'row', dial);
}

/**
 * Generates all possible shorthands combinations (max = 5):
 * 0001, 0002, ..., 0025, 0030, ..., 0455, 0500, ..., 5554, 5555.
 */
export function generateSizes(base, pad) {
  const sizes = [];

  const total = Math.pow(base, pad);

  for (let i = 0; i < total; i++) {
    const rebased = i.toString(base);

    sizes.push(_padStart(rebased, pad, '0'));
  }

  return sizes;
}

export function createSpaceStyle(property, sizes) {
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

  return _mapKeys(sides, (size, side) => `${property}${side}`);
}

export function runStrategy(spacing, range, strategy) {
  const sizes = [];

  for (let i = 0; i < range; i++) {
    sizes.push(strategy(i, spacing, range));
  }

  return sizes;
}

export function zipAliases(spacings, sides) {
  const keys = makeProperties(Object.keys(spacings), Object.keys(sides));
  const vals = makeProperties(Object.values(spacings), Object.values(sides));

  return _zipObject(keys, vals);
}

function makeProperties(spacings, sides) {
  const [margins, paddings] = spacings.map((spacing) =>
    sides.map((side) => `${spacing}${side}`),
  );

  return margins.concat(paddings);
}

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
