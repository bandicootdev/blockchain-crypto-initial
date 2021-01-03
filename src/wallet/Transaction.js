import { v5 } from 'uuid';

class Transaction {
  constructor() {
    this.id = v5();
    this.input = null;
    this.output = [];
  }

  create(senderWallet, recipientAddress, amount) {
    const { balance, publicKey } = senderWallet;
    if (amount > balance) throw Error(`Amount: ${amount} exceeds balance`);
    const transaction = new Transaction();
    transaction.output.push(...[
      { amount: balance - amount, address: publicKey },
      { amount, address: recipientAddress },
    ]);
    return transaction;
  }
}

export default Transaction;
