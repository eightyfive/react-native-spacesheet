import _zipObject from 'lodash.zipobject';

export function zipAliases(spacings, sides) {
  const keys = makeProperties(Object.keys(spacings), Object.keys(sides));
  const vals = makeProperties(Object.values(spacings), Object.values(sides));

  return _zipObject(keys, vals);
}

function makeProperties(spacings, sides) {
  const names = spacings.map((spacing) =>
    sides.map((side) => `${spacing}${side}`),
  );

  return names[0].concat(names[1]);
}

const spacings = {
  m: 'margin',
  p: 'padding',
};

const sides = {
  '': '',
  t: 'Top',
  r: 'Right',
  b: 'Bottom',
  l: 'Left',
  v: 'Vertical',
  h: 'Horizontal',
};

const aliases = zipAliases(spacings, sides);

export const double = (index, spacing, range) => {
  if (index === 0) {
    return 0;
  }

  return spacing * Math.pow(2, index - 1);
};

export default {
  aliases,

  // "Double" spacing
  nextSize(spacing, index) {
    return spacing * Math.pow(2, index - 1);
  },
};
