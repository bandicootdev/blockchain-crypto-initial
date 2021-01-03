import MemoryPool from '../blockchain/memoryPool';
import Wallet, { Transaction } from '../wallet';

describe('MemoryPool', () => {
  let memoryPool;
  let wallet;
  let transaction;

  beforeEach(() => {
    memoryPool = new MemoryPool();
    wallet = new Wallet();
    transaction = Transaction.create(wallet, 'random-address', 5);
    memoryPool.addOrUpdate(transaction);
  });

  it('has one transaction ', () => {
    expect(memoryPool.transactions.length).toEqual(1);
  });

  it('add a transaction to the memoryPool ', () => {
    const found = memoryPool.transactions.find(({ id }) => id === transaction.id);
    expect(found).toEqual(transaction);
  });

  it('update a transaction in the memoryPool ', () => {
    const txOld = JSON.stringify(transaction);
    const txNew = transaction.update(wallet, 'other-addres', 10);
    memoryPool.addOrUpdate(txNew);
    expect(memoryPool.transactions.length).toEqual(1);
    const found = memoryPool.transactions.find(({ id }) => id === transaction.id);
    expect(JSON.stringify(found)).not.toEqual(txOld);
    expect(txNew).toEqual(found);
  });
  it('wipe transactions ', () => {
    memoryPool.wipe();
    expect(memoryPool.transactions.length).toEqual(0);
  });
});
