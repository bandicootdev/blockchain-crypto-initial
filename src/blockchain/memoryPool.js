import { Transaction } from '../wallet';

class MemoryPool {
  constructor() {
    this.transactions = [];
  }

  addOrUpdate(transaction) {
    const { input, outputs = [] } = transaction;
    const outputTotal = outputs.reduce((total, output) => Number(total) + Number(output.amount), 0);
    if (input.amount !== outputTotal) throw Error(`invalid transaction from ${input.address}`);
    if (!Transaction.verify(transaction)) throw Error(`invalid signature from ${input.address}`);
    const txIndex = this.transactions.findIndex(({ id }) => id === transaction.id);
    if (txIndex >= 0) this.transactions[txIndex] = transaction;
    else this.transactions.push(transaction);
  }

  find(address) {
    return this.transactions.find(({ input }) => input.address === address);
  }

  wipe() {
    this.transactions = [];
  }
}

export default MemoryPool;
