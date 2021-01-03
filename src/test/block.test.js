import Block from '../blockchain/Block';

describe('block', () => {
  let timestamp;
  let previousBlock;
  let data;
  let hash;

  beforeEach(() => {
    timestamp = new Date(2021, 0, 1);
    previousBlock = Block.genesis;
    data = 'test-data';
    hash = 'test-hash';
  });

  it('create an instance with parameters ', () => {
    const block = new Block(timestamp, previousBlock.hash, hash, data);
    expect(block.timestamp).toEqual(timestamp);
    expect(block.previousHash).toEqual(previousBlock.hash);
    expect(block.data).toEqual(data);
    expect(block.hash).toEqual(hash);
  });

  it('use static mine ', () => {
    const block = Block.mine(previousBlock, data);
    expect(block.hash.length).toEqual(64);
    expect(block.previousHash).toEqual(previousBlock.hash);
    expect(data).toEqual(data);
  });

  it('use static hash ', () => {
    hash = Block.hash(timestamp, previousBlock.hash, data);
    const hashOutput = 'dd8171f058dcd9f0444b37aa7f57397e5e66aabea3b42f73ca197197c791ee3b';
    expect(hash).toEqual(hashOutput);
  });

  it('use toString ', () => {
    const block = Block.mine(previousBlock, data);
    expect(typeof block.toString()).toEqual('string');
  });
});
