import { elliptic, hash } from '../utils/index';
import Transaction from './Transaction';

const INITIAL_BALANCE = 100;

class Wallet {
  constructor(blockchain, initialBalance = INITIAL_BALANCE) {
    this.balance = initialBalance;
    this.keyPair = elliptic.createKeyPair();
    this.publicKey = this.keyPair.getPublic().encode('hex');
    this.blockchain = blockchain;
  }

  sign(data) {
    return this.keyPair.sign(hash(data));
  }

  createTransaction(recipientAddress, amount) {
    const { balance, blockchain: { memoryPool } } = this;

    if (amount > balance) throw Error(`Amount: ${amount} exceeds current balance: ${balance}`);
    let tx = memoryPool.find(this.publicKey);
    if (tx) {
      tx.update(this, recipientAddress, amount);
    } else {
      tx = Transaction.create(this, recipientAddress, amount);
      memoryPool.addOrUpdate(tx);
    }
    return tx;
  }

  toString() {
    const { balance, publicKey } = this;
    return `Wallet -
    publicKey    :${publicKey}
    balance       :${balance}`;
  }
}

export { INITIAL_BALANCE };
export default Wallet;
