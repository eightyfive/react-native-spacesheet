import { createSizes } from './utils';

let sizes;

describe('Utils', () => {
  test('Generate Sizes', () => {
    sizes = createSizes(5, 1);
    expect(sizes).toEqual(['0', '1', '2', '3', '4']);

    sizes = createSizes(4, 2);
    expect(sizes).toEqual([
      '00',
      '01',
      '02',
      '03',
      '10',
      '11',
      '12',
      '13',
      '20',
      '21',
      '22',
      '23',
      '30',
      '31',
      '32',
      '33',
    ]);

    sizes = createSizes(3, 3);
    expect(sizes).toEqual([
      '000',
      '001',
      '002',
      '010',
      '011',
      '012',
      '020',
      '021',
      '022',
      '100',
      '101',
      '102',
      '110',
      '111',
      '112',
      '120',
      '121',
      '122',
      '200',
      '201',
      '202',
      '210',
      '211',
      '212',
      '220',
      '221',
      '222',
    ]);

    sizes = createSizes(2, 4);
    expect(sizes).toEqual([
      '0000',
      '0001',
      '0010',
      '0011',
      '0100',
      '0101',
      '0110',
      '0111',
      '1000',
      '1001',
      '1010',
      '1011',
      '1100',
      '1101',
      '1110',
      '1111',
    ]);
  });
});
