import { subtraction, sum } from './math';

describe('Math functions', () => {
  it('1 + 2 = 3', () => {
    const result = sum(1, 2);

    expect(result).toBe(3);
  });

  test('1 - 1 = 0', () => {
    const result = subtraction(1, 1);

    expect(result).toEqual(0);
  });
});
