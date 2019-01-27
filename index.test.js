import SpaceSheet from './index';
import defaultStrategy from './strategy';

function _getStrategy(nextSize) {
  return { ...defaultStrategy, nextSize };
}

describe('setSpacing strategies', () => {
  test('setSpacing(4) – Double', () => {
    const ss = new SpaceSheet();
    ss.setSpacing(4);

    expect(ss.sizes).toEqual([0, 4, 8, 16, 32, 64]);
  });

  test('setSpacing(4, 3) – Double (range)', () => {
    const ss = new SpaceSheet();
    ss.setSpacing(4, 3);

    expect(ss.sizes).toEqual([0, 4, 8, 16]);
  });

  test('setSpacing(4, 3) – Linear', () => {
    const ss = new SpaceSheet(_getStrategy((amount, index) => amount * index));
    ss.setSpacing(4, 3);

    expect(ss.sizes).toEqual([0, 4, 8, 12]);
  });

  test('setSpacing(4, 3) – Multiply', () => {
    const ss = new SpaceSheet(
      _getStrategy((amount, index, range) => amount * index * range)
    );
    ss.setSpacing(4, 3);

    expect(ss.sizes).toEqual([0, 12, 24, 36]);
  });
});

describe('Default strategy', () => {
  const space = new SpaceSheet();
  const { style } = space;

  space.setSpacing(5);

  // sizes = [0, 5, 10, 20, 40, 80]
  //         [0, 1,  2,  3,  4,  5]

  test('Aliases', () => {
    expect(style.mt2).toHaveProperty('marginTop', 10);
    expect(style.mt2).toHaveProperty('marginTop', 10);
    expect(style.mr2).toHaveProperty('marginRight', 10);
    expect(style.mb2).toHaveProperty('marginBottom', 10);
    expect(style.ml2).toHaveProperty('marginLeft', 10);
    expect(style.mv2).toHaveProperty('marginVertical', 10);
    expect(style.mh2).toHaveProperty('marginHorizontal', 10);
  });

  test('Array notation (4)', () => {
    const result = style.m2345;

    expect(result).toHaveProperty('marginTop', 10);
    expect(result).toHaveProperty('marginRight', 20);
    expect(result).toHaveProperty('marginBottom', 40);
    expect(result).toHaveProperty('marginLeft', 80);
  });

  test('Array notation (3)', () => {
    const result = style.p414;

    expect(result).toHaveProperty('paddingTop', 40);
    expect(result).toHaveProperty('paddingHorizontal', 5);
    expect(result).toHaveProperty('paddingBottom', 40);
  });

  test('Array notation (2)', () => {
    const result = style.m54;

    expect(result).toHaveProperty('marginVertical', 80);
    expect(result).toHaveProperty('marginHorizontal', 40);
  });

  test('Wrong alias', () => {
    expect(style.fooBar).toBeUndefined();
  });

  test('Wrong size', () => {
    expect(style.m0123456789).toBeUndefined();
  });

  test('Array notation + margin(Top|Bottom|...)', () => {
    expect(style.mt04).toBeUndefined();
  });
});

describe('Dial', () => {
  const space = new SpaceSheet();
  const { style } = space;

  test('Row', () => {
    const result = style.row5;

    expect(result).toHaveProperty('flexDirection', 'row');
    expect(result).toHaveProperty('justifyContent', 'center');
    expect(result).toHaveProperty('alignItems', 'center');
  });

  test('Col', () => {
    const result = style.col3;

    expect(result).toHaveProperty('flexDirection', 'column');
    expect(result).toHaveProperty('justifyContent', 'flex-start');
    expect(result).toHaveProperty('alignItems', 'flex-end');
  });

  test('Wrong dial', () => {
    expect(style.col0).toBeUndefined();
    expect(style.col10).toBeUndefined();
  });
});
