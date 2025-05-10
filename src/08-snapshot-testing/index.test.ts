import { generateLinkedList } from './index';

describe('generateLinkedList', () => {
  test('should generate linked list from values 1', () => {
    const values = [1, 2, 3];

    const result = generateLinkedList(values);

    expect(result).toStrictEqual({
      value: 1,
      next: {
        value: 2,
        next: {
          value: 3,
          next: {
            value: null,
            next: null,
          },
        },
      },
    });
  });

  test('should generate linked list from values 2', () => {
    const values = ['a', 'b', 'c', 'd'];

    const result = generateLinkedList(values);

    expect(result).toMatchSnapshot();

    expect(generateLinkedList([])).toMatchSnapshot();
    expect(generateLinkedList([1])).toMatchSnapshot();
    expect(generateLinkedList([null, undefined])).toMatchSnapshot();
  });
});
