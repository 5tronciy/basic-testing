import { simpleCalculator, Action } from './index';

const testCases = [
  {
    a: 3,
    b: 5,
    action: Action.Add,
    expected: 8,
    description: 'should add two numbers',
  },
  {
    a: 10,
    b: 4,
    action: Action.Subtract,
    expected: 6,
    description: 'should subtract two numbers',
  },
  {
    a: 3,
    b: 7,
    action: Action.Multiply,
    expected: 21,
    description: 'should multiply two numbers',
  },
  {
    a: 15,
    b: 3,
    action: Action.Divide,
    expected: 5,
    description: 'should divide two numbers',
  },
  {
    a: 2,
    b: 3,
    action: Action.Exponentiate,
    expected: 8,
    description: 'should exponentiate two numbers',
  },
];

const testCasesToBeNull = [
  {
    a: 5,
    b: 3,
    action: 'invalid',
    description: 'should return null for invalid action',
  },
  {
    arguments: [
      { a: '5', b: 3 },
      { a: 5, b: '3' },
      { a: '5', b: '3' },
    ],
    action: Action.Add,
    description: 'should return null for invalid arguments',
  },
];
describe('simpleCalculator', () => {
  test.each(testCases)('$description', ({ a, b, action, expected }) => {
    const result = simpleCalculator({ a, b, action });
    expect(result).toBe(expected);
  });

  test.each(testCasesToBeNull.filter((tc) => !tc.arguments))(
    '$description',
    ({ a, b, action }) => {
      const result = simpleCalculator({ a, b, action });
      expect(result).toBeNull();
    },
  );

  test('should return null for invalid arguments', () => {
    const invalidArgCase = testCasesToBeNull.find((tc) => tc.arguments);

    invalidArgCase?.arguments?.forEach((scenario) => {
      const result = simpleCalculator({
        a: scenario.a,
        b: scenario.b,
        action: invalidArgCase.action,
      });
      expect(result).toBeNull();
    });
  });
});
