import Block from '../blockchain/Block';

describe('block', () => {
  let timestamp;
  let previousBlock;
  let data;
  let hash;
  let nonce;
  beforeEach(() => {
    timestamp = new Date(2021, 0, 1);
    previousBlock = Block.genesis;
    data = 'test-data';
    hash = 'test-hash';
    nonce = 128;
  });

  it('create an instance with parameters ', () => {
    const block = new Block(timestamp, previousBlock.hash, hash, data, nonce);
    expect(block.timestamp).toEqual(timestamp);
    expect(block.previousHash).toEqual(previousBlock.hash);
    expect(block.data).toEqual(data);
    expect(block.hash).toEqual(hash);
    expect(block.nonce).toEqual(nonce);
  });

  it('use static mine ', () => {
    const block = Block.mine(previousBlock, data);
    const { difficulty } = block;
    expect(block.hash.length).toEqual(64);
    expect(block.hash.substr(0, difficulty)).toEqual('0'.repeat(difficulty));
    expect(block.previousHash).toEqual(previousBlock.hash);
    expect(block.nonce).not.toEqual(0);

    expect(data).toEqual(data);
  });

  it('use static hash ', () => {
    hash = Block.hash(timestamp, previousBlock.hash, data, nonce);
    const hashOutput = '8c14ec1f8d87d565b964a248a2ea4088f72e9b19e409bf6e8aa157ac80d1a96f';
    expect(hash).toEqual(hashOutput);
  });

  it('use toString ', () => {
    const block = Block.mine(previousBlock, data);
    console.log(block.toString());
    expect(typeof block.toString()).toEqual('string');
  });
});
