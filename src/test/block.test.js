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
    const hashOutput = '8c7beb14f8d0d7ae1e03c11833a8acfc8c328004ae838c350faa91f710b8c9b1';
    expect(hash).toEqual(hashOutput);
  });

  it('use toString ', () => {
    const block = Block.mine(previousBlock, data);
    console.log(block.toString());
    expect(typeof block.toString()).toEqual('string');
  });
});
