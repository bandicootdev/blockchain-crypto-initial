import Block from '../blockchain/Block';

export default (blockchain) => {
  const [genesisBlock, ...blocks] = blockchain;
  if (JSON.stringify(genesisBlock) !== JSON.stringify(Block.genesis)) throw Error('invalid Genesis Block');
  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < blocks.length; i++) {
    const {
      previousHash, timestamp, hash, data, nonce,
    } = blocks[i];
    const previousBlock = blockchain[i];
    if (previousHash !== previousBlock.hash) throw Error('invalid previous Hash');
    if (hash !== Block.hash(timestamp, previousHash, data, nonce)) throw Error('invalid Hash');
  }
  return true;
};
