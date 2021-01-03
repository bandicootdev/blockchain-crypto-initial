import Blockchain from '../blockchain/Blockchain';
import validate from '../utils/validate';

describe('validate()', () => {
  let blockchain;
  beforeEach(() => {
    blockchain = new Blockchain();
  });

  it('validate a valid chain', () => {
    blockchain.addBlock('block-1');
    blockchain.addBlock('block-2');
    expect(validate(blockchain.blocks)).toBe(true);
  });

  it('invalidate a chain with a corrupt genesis block', () => {
    blockchain.blocks[0] = 'bad data';
    expect(() => {
      validate(blockchain.blocks);
    }).toThrowError('invalid Genesis Block');
  });

  it('invalidates a chain with a corrupt previousHash within a block ', () => {
    blockchain.addBlock('block-1');
    blockchain.blocks[1].previousHash = 'hack';
    expect(() => {
      validate(blockchain.blocks);
    }).toThrowError('invalid previous Hash');
  });

  it('invalidate a chain with a corrupt hash within a block ', () => {
    blockchain.addBlock('block-1');
    blockchain.blocks[1].hash = 'hack';
    expect(() => {
      validate(blockchain.blocks);
    }).toThrowError('invalid Hash');
  });
});
