import Transaction from '../wallet/Transaction';
import Wallet from '../wallet/Wallet';

describe('Transaction', () => {
  let wallet;
  let transaction;
  let amount;
  let recipientAddress;

  beforeEach(() => {
    wallet = new Wallet();
    recipientAddress = 'address a transfer';
    amount = 5;
    // eslint-disable-next-line new-cap
    transaction = new Transaction.create(wallet, recipientAddress, amount);
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
        transaction = Transaction.create(wallet, recipientAddress, amount);
      }).toThrowError(`Amount: ${amount} exceeds balance`);
    });
  });

  it('inputs the balance of the wallet', () => {
    expect(transaction.input.amount).toEqual(wallet.balance);
  });

  it('inputs the sender address of the wallet', () => {
    expect(transaction.input.address).toEqual(wallet.publicKey);
  });

  it('inputs hash a signature using the wallet fake', () => {
    expect(typeof transaction.input.signature).toEqual('object');
    expect(transaction.input.signature).toEqual(wallet.sign(transaction.outputs));
  });

  it('validates a valid transaction', () => {
    expect(Transaction.verify(transaction)).toBe(true);
  });

  it('', () => {
    transaction.outputs[0].amount = 500;
    expect(Transaction.verify(transaction)).toBe(false);
  });

  describe('and updating a transaction', () => {
    let nextAmount;
    let nextRecipient;

    beforeEach(() => {
      nextAmount = 5;
      nextRecipient = 'address-test';
      transaction = transaction.update(wallet, nextRecipient, nextAmount);
    });

    it('subtracts the next amount from de senders wallet', () => {
      const output = transaction.outputs.find(({ address }) => address === wallet.publicKey);
      expect(output.amount).toEqual(wallet.balance - amount - nextAmount);
    });

    it('outputs an amount for then next recipient ', () => {
      const output = transaction.outputs.find(({ address }) => address === nextRecipient);
      expect(output.amount).toEqual(nextAmount);
    });
  });
});
