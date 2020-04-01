import SpaceSheet, { aliases } from './index';

const space = SpaceSheet.create(5, 6, 'double', aliases);

// sizes = [0, 5, 10, 20, 40, 80]
//         [0, 1,  2,  3,  4,  5]

describe('SpaceSheet', () => {
  test('Aliases', () => {
    expect(space.styles.mt2).toHaveProperty('marginTop', 10);
    expect(space.styles.mt2).toHaveProperty('marginTop', 10);
    expect(space.styles.mr2).toHaveProperty('marginRight', 10);
    expect(space.styles.mb2).toHaveProperty('marginBottom', 10);
    expect(space.styles.ml2).toHaveProperty('marginLeft', 10);
    expect(space.styles.mv2).toHaveProperty('marginVertical', 10);
    expect(space.styles.mh2).toHaveProperty('marginHorizontal', 10);
  });

  test('Wrong alias', () => {
    expect(space.styles.fooBar).toBeUndefined();
  });

  test('Wrong size', () => {
    expect(space.styles.m0123456789).toBeUndefined();
  });
});

describe('Dial', () => {
  test('Row', () => {
    const result = space.styles.row5;

    expect(result).toHaveProperty('flexDirection', 'row');
    expect(result).toHaveProperty('justifyContent', 'center');
    expect(result).toHaveProperty('alignItems', 'center');
  });

  test('Col', () => {
    const result = space.styles.col3;

    expect(result).toHaveProperty('flexDirection', 'column');
    expect(result).toHaveProperty('justifyContent', 'flex-start');
    expect(result).toHaveProperty('alignItems', 'flex-end');
  });

  test('Wrong dial', () => {
    expect(space.styles.col0).toBeUndefined();
    expect(space.styles.col10).toBeUndefined();
  });
});
