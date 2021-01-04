import SpaceSheet from './index';

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
      expect(space.styles[`f${i || ''}`]).toHaveProperty('flex', +i || 1);
    }
  });

  test('Invalid', () => {
    expect(space.styles.f).toBeUndefined();
    expect(space.styles.f0).toBeUndefined();
    expect(space.styles.f10).toBeUndefined();
  });
});
