import Transaction from '../wallet/Transaction';
import Wallet from '../wallet/Wallet';

describe('Transaction', () => {
  let wallet;
  let transaction;
  let amount;
  let recipientAddress;

  beforeEach(() => {
    wallet = new Wallet();
    recipientAddress = 'address a transferir';
    amount = 5;
    transaction = new Transaction().create(wallet, recipientAddress, amount);
  });

  it('outputs the amount subtracted from de wallace balance ', () => {
    const output = transaction.outputs.find(({ address }) => address === wallet.publicKey);
    expect(output.amount).toEqual(wallet.balance - amount);
  });

  it('outputs the amount added to the recipient', () => {
    const output = transaction.outputs.find(({ address }) => address === recipientAddress);
    expect(output.amount).toEqual(amount);
  });

  describe('transaction with an amount that exceeds the balance', () => {
    beforeEach(() => {
      amount = 500;
      transaction = undefined;
    });
    it('does not create the transaction ', () => {
      expect(() => {
        transaction = new Transaction().create(wallet, recipientAddress, amount);
      }).toThrowError(`Amount: ${amount} exceeds balance`);
    });
  });
});
