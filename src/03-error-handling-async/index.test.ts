import {
  throwError,
  throwCustomError,
  resolveValue,
  MyAwesomeError,
  rejectCustomError,
} from './index';

describe('resolveValue', () => {
  test('should resolve provided value', async () => {
    const testValue = 'test value';
    const result = await resolveValue(testValue);
    expect(result).toBe(testValue);

    expect(await resolveValue(42)).toBe(42);
    expect(await resolveValue(null)).toBe(null);
    expect(await resolveValue(undefined)).toBe(undefined);

    const obj = { key: 'value' };
    expect(await resolveValue(obj)).toBe(obj);
  });
});

describe('throwError', () => {
  test('should throw error with provided message', () => {
    const errorMessage = 'Custom error message';

    expect(() => throwError(errorMessage)).toThrow(errorMessage);
    expect(() => throwError(errorMessage)).toThrow(Error);
  });

  test('should throw error with default message if message is not provided', () => {
    const defaultMessage = 'Oops!';

    expect(() => throwError()).toThrow(defaultMessage);
    expect(() => throwError()).toThrow(Error);
  });
});

describe('throwCustomError', () => {
  test('should throw custom error', () => {
    expect(() => throwCustomError()).toThrow(
      'This is my awesome custom error!',
    );

    expect(() => throwCustomError()).toThrow(MyAwesomeError);
  });
});

describe('rejectCustomError', () => {
  test('should reject custom error', async () => {
    const promise = rejectCustomError();

    await expect(promise).rejects.toThrow('This is my awesome custom error!');
    await expect(promise).rejects.toThrow(MyAwesomeError);
  });
});
