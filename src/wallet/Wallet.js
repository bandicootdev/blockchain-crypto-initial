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
    const { currentBalance, blockchain: { memoryPool } } = this;
    if (amount > currentBalance) throw Error(`Amount: ${amount} exceeds current balance: ${currentBalance}`);
    let tx = memoryPool.find(this.publicKey);
    if (tx) {
      tx.update(this, recipientAddress, amount);
    } else {
      tx = Transaction.create(this, recipientAddress, amount);
      memoryPool.addOrUpdate(tx);
    }
    return tx;
  }

  get currentBalance() {
    const { blockchain: { blocks = [] }, publicKey } = this;
    let { balance } = this;
    const txs = [];
    blocks.forEach(({ data = [] }) => {
      if (Array.isArray(data)) data.forEach((tx) => txs.push(tx));
    });

    const walletsInputTxs = txs.filter((tx) => tx.input.address === publicKey);
    let timestamp = 0;
    if (walletsInputTxs.length > 0) {
      const recentInputTx = walletsInputTxs
        .sort((a, b) => a.timestamp - b.timestamp)
        .pop();
      // eslint-disable-next-line no-const-assign
      balance = recentInputTx.outputs.find(({ address }) => address === publicKey).amount;
      // eslint-disable-next-line no-const-assign
      timestamp = recentInputTx.input.timestamp;
    }
    txs
      .filter(({ input }) => input.timestamp > timestamp)
      .forEach(({ outputs }) => {
        // eslint-disable-next-line array-callback-return
        outputs.find(({ address, amount }) => {
          // eslint-disable-next-line no-const-assign
          if (address === publicKey) balance += amount;
        });
      });
    return balance;
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
