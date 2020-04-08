import SpaceSheet from './index';

describe('SpaceSheet(amount, length, strategy)', () => {
  const space = SpaceSheet.create(5, 6, 'double');
  // sizes = [0, 5, 10, 20, 40, 80]
  //         [0, 1,  2,  3,  4,  5]

  test('Aliases', () => {
    expect(space.styles.mt2).toHaveProperty('marginTop', 10);
    expect(space.styles.pb3).toHaveProperty('paddingBottom', 20);
    expect(space.styles.mv5).toHaveProperty('marginVertical', 80);
    expect(space.styles.ph0).toHaveProperty('paddingHorizontal', 0);
  });

  test('Wrong alias', () => {
    // TODO: Needs to throw Error when real Proxy support
    expect(space.styles.fooBar).toBeUndefined();
  });

  test('Wrong size', () => {
    // TODO: Needs to throw Error when real Proxy support
    expect(space.styles.m0123456789).toBeUndefined();
  });
});

describe('SpaceSheet(sizes)', () => {
  const space = SpaceSheet.create([0, 4, 8, 16]);
  // sizes = [0, 4, 8, 16]
  //         [0, 1, 2,  3]

  test('Aliases', () => {
    expect(space.styles.mt2).toHaveProperty('marginTop', 8);
    expect(space.styles.pb3).toHaveProperty('paddingBottom', 16);
    expect(space.styles.mv1).toHaveProperty('marginVertical', 4);
    expect(space.styles.ph0).toHaveProperty('paddingHorizontal', 0);
  });
});

describe('Dial', () => {
  // Dummy: No need sizes for testing Dial styles
  const space = SpaceSheet.create([0, 10, 20]);

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

describe('Flex', () => {
  // Dummy: No need sizes for testing Flex styles
  const space = SpaceSheet.create([0, 10, 20]);

  test('Valid', () => {
    for (let i = 1; i < 10; i++) {
      expect(space.styles[`flex${i || ''}`]).toHaveProperty('flex', +i || 1);
    }
  });

  test('Invalid', () => {
    expect(space.styles.flex).toBeUndefined();
    expect(space.styles.flex0).toBeUndefined();
    expect(space.styles.flex10).toBeUndefined();
  });
});
