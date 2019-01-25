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
  const { sheet, style } = space;

  space.setSpacing(5);

  // sizes = [0, 5, 10, 20, 40, 80]
  //         [0, 1,  2,  3,  4,  5]

  test('Aliases', () => {
    expect(style.mt2).toHaveProperty('marginTop', 10);
    expect(sheet.mt2).toHaveProperty('marginTop', 10);
    expect(sheet.mr2).toHaveProperty('marginRight', 10);
    expect(sheet.mb2).toHaveProperty('marginBottom', 10);
    expect(sheet.ml2).toHaveProperty('marginLeft', 10);
    expect(sheet.mv2).toHaveProperty('marginVertical', 10);
    expect(sheet.mh2).toHaveProperty('marginHorizontal', 10);
  });

  test('Array notation (4)', () => {
    const result = sheet.m2345;

    expect(result).toHaveProperty('marginTop', 10);
    expect(result).toHaveProperty('marginRight', 20);
    expect(result).toHaveProperty('marginBottom', 40);
    expect(result).toHaveProperty('marginLeft', 80);
  });

  test('Array notation (3)', () => {
    const result = sheet.p414;

    expect(result).toHaveProperty('paddingTop', 40);
    expect(result).toHaveProperty('paddingHorizontal', 5);
    expect(result).toHaveProperty('paddingBottom', 40);
  });

  test('Array notation (2)', () => {
    const result = sheet.m54;

    expect(result).toHaveProperty('marginVertical', 80);
    expect(result).toHaveProperty('marginHorizontal', 40);
  });

  test('Wrong alias', () => {
    expect(sheet.fooBar).toBeUndefined();
  });

  test('Wrong size', () => {
    expect(sheet.m0123456789).toBeUndefined();
  });

  test('Array notation + margin(Top|Bottom|...)', () => {
    expect(sheet.mt04).toBeUndefined();
  });
});
