import Blockchain from '../blockchain/Blockchain';
import Block from '../blockchain/Block';

describe('blockchain', () => {
  let blockchain;
  beforeEach(() => {
    blockchain = new Blockchain();
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

});
