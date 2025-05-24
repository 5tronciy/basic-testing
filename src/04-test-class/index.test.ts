import { getBankAccount } from '.';

describe('BankAccount', () => {
  test('should create account with initial balance', () => {
    const initialBalance = 100;
    const account = getBankAccount(initialBalance);

    expect(account.getBalance()).toBe(initialBalance);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    const account = getBankAccount(50);

    expect(() => account.withdraw(100)).toThrow(
      'Insufficient funds: cannot withdraw more than 50',
    );

    expect(account.getBalance()).toBe(50);
  });

  test('should throw error when transferring more than balance', () => {
    const sourceAccount = getBankAccount(50);
    const destinationAccount = getBankAccount(0);

    expect(() => sourceAccount.transfer(100, destinationAccount)).toThrow(
      'Insufficient funds: cannot withdraw more than 50',
    );

    expect(sourceAccount.getBalance()).toBe(50);
    expect(destinationAccount.getBalance()).toBe(0);
  });

  test('should throw error when transferring to the same account', () => {
    const account = getBankAccount(100);

    expect(() => account.transfer(50, account)).toThrow('Transfer failed');

    expect(account.getBalance()).toBe(100);
  });

  test('should deposit money', () => {
    const initialBalance = 50;
    const depositAmount = 25;
    const account = getBankAccount(initialBalance);

    account.deposit(depositAmount);

    expect(account.getBalance()).toBe(initialBalance + depositAmount);

    account.deposit(depositAmount).deposit(depositAmount);
    expect(account.getBalance()).toBe(initialBalance + depositAmount * 3);
  });

  test('should withdraw money', () => {
    const initialBalance = 100;
    const withdrawAmount = 40;
    const account = getBankAccount(initialBalance);

    account.withdraw(withdrawAmount);

    expect(account.getBalance()).toBe(initialBalance - withdrawAmount);

    account.withdraw(10).withdraw(10);
    expect(account.getBalance()).toBe(initialBalance - withdrawAmount - 20);
  });

  test('should transfer money', () => {
    const sourceInitialBalance = 100;
    const destinationInitialBalance = 50;
    const transferAmount = 30;

    const sourceAccount = getBankAccount(sourceInitialBalance);
    const destinationAccount = getBankAccount(destinationInitialBalance);

    sourceAccount.transfer(transferAmount, destinationAccount);

    expect(sourceAccount.getBalance()).toBe(
      sourceInitialBalance - transferAmount,
    );
    expect(destinationAccount.getBalance()).toBe(
      destinationInitialBalance + transferAmount,
    );
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    const account = getBankAccount(100);

    const spy = jest.spyOn(account, 'fetchBalance').mockResolvedValue(50);

    const balance = await account.fetchBalance();
    expect(typeof balance).toBe('number');
    expect(balance).toBe(50);

    spy.mockRestore();
  });

  test('should set new balance if fetchBalance returned number', async () => {
    const account = getBankAccount(100);
    const newBalance = 75;

    const spy = jest
      .spyOn(account, 'fetchBalance')
      .mockResolvedValue(newBalance);

    await account.synchronizeBalance();

    expect(account.getBalance()).toBe(newBalance);

    spy.mockRestore();
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    const account = getBankAccount(100);

    const spy = jest.spyOn(account, 'fetchBalance').mockResolvedValue(null);

    await expect(account.synchronizeBalance()).rejects.toThrow(
      'Synchronization failed',
    );

    expect(account.getBalance()).toBe(100);

    spy.mockRestore();
  });
});
