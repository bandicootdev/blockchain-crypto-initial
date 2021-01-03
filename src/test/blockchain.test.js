import Blockchain from '../blockchain/Blockchain';
import Block from '../blockchain/Block';

describe('blockchain', () => {
  let blockchain;
  let blockchainB;
  beforeEach(() => {
    blockchain = new Blockchain();
    blockchainB = new Blockchain();
  });

  it('every blockchain hash a genesis block ', () => {
    const [genesisBlock] = blockchain.blocks;
    expect(genesisBlock).toEqual(Block.genesis);
    expect(blockchain.blocks.length).toEqual(1);
  });

  it('use addBlock', () => {
    const data = 'test data';
    blockchain.addBlock(data);
    const [, lastBlock] = blockchain.blocks;
    expect(lastBlock.data).toEqual(data);
    expect(blockchain.blocks.length).toEqual(2);
  });

  it('replace the chain with a valid chain ', () => {
    blockchainB.addBlock('block-1');
    blockchain.replace(blockchainB.blocks);

    expect(blockchain.blocks).toBe(blockchainB.blocks);
  });

  it('does not replace the chain with one with less block', () => {
    blockchain.addBlock('block-1');

    expect(() => {
      blockchain.replace(blockchainB.blocks);
    }).toThrowError('received chain is not longer than current chain');
  });

  it('not replace the chain with one is not valid', () => {
    blockchainB.addBlock('block-1');
    blockchainB.blocks[1].data = 'block-hack';
    expect(() => {
      blockchain.replace(blockchainB.blocks);
    }).toThrowError('received chain is invalid');
  });
});
