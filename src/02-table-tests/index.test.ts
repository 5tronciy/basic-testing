import { simpleCalculator, Action } from './index';

const testCases = [
  {
    a: 1,
    b: 2,
    action: Action.Add,
    expected: 3,
    description: 'should add 1 + 2 = 3',
  },
  {
    a: 2,
    b: 2,
    action: Action.Add,
    expected: 4,
    description: 'should add 2 + 2 = 4',
  },
  {
    a: 3,
    b: 2,
    action: Action.Add,
    expected: 5,
    description: 'should add 3 + 2 = 5',
  },
  {
    a: -1,
    b: 1,
    action: Action.Add,
    expected: 0,
    description: 'should add -1 + 1 = 0',
  },
  {
    a: 5,
    b: 2,
    action: Action.Subtract,
    expected: 3,
    description: 'should subtract 5 - 2 = 3',
  },
  {
    a: 10,
    b: 7,
    action: Action.Subtract,
    expected: 3,
    description: 'should subtract 10 - 7 = 3',
  },
  {
    a: 0,
    b: 5,
    action: Action.Subtract,
    expected: -5,
    description: 'should subtract 0 - 5 = -5',
  },
  {
    a: 3,
    b: 4,
    action: Action.Multiply,
    expected: 12,
    description: 'should multiply 3 * 4 = 12',
  },
  {
    a: 5,
    b: 5,
    action: Action.Multiply,
    expected: 25,
    description: 'should multiply 5 * 5 = 25',
  },
  {
    a: -2,
    b: 3,
    action: Action.Multiply,
    expected: -6,
    description: 'should multiply -2 * 3 = -6',
  },
  {
    a: 10,
    b: 2,
    action: Action.Divide,
    expected: 5,
    description: 'should divide 10 / 2 = 5',
  },
  {
    a: 9,
    b: 3,
    action: Action.Divide,
    expected: 3,
    description: 'should divide 9 / 3 = 3',
  },
  {
    a: 15,
    b: 5,
    action: Action.Divide,
    expected: 3,
    description: 'should divide 15 / 5 = 3',
  },
  {
    a: 2,
    b: 3,
    action: Action.Exponentiate,
    expected: 8,
    description: 'should exponentiate 2 ^ 3 = 8',
  },
  {
    a: 3,
    b: 2,
    action: Action.Exponentiate,
    expected: 9,
    description: 'should exponentiate 3 ^ 2 = 9',
  },
  {
    a: 5,
    b: 1,
    action: Action.Exponentiate,
    expected: 5,
    description: 'should exponentiate 5 ^ 1 = 5',
  },
];

const testCasesToBeNull = [
  {
    a: 'invalid',
    b: 5,
    action: Action.Add,
    description: 'should return null when a is not a number',
  },
  {
    a: 5,
    b: 'invalid',
    action: Action.Add,
    description: 'should return null when b is not a number',
  },
  {
    a: 5,
    b: 5,
    action: 'invalid',
    description: 'should return null when action is invalid',
  },
];

describe('simpleCalculator', () => {
  test.each(testCases)('$description', ({ a, b, action, expected }) => {
    const result = simpleCalculator({ a, b, action });
    expect(result).toBe(expected);
  });

  test.each(testCasesToBeNull)('$description', ({ a, b, action }) => {
    const result = simpleCalculator({ a, b, action });
    expect(result).toBeNull();
  });
});
