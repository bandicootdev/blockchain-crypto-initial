import Block from './Block';
import validate from '../utils/validate';

class Blockchain {
  constructor() {
    this.blocks = [Block.genesis];
  }

  addBlock(data) {
    const previousBlock = this.blocks[this.blocks.length - 1];
    const block = Block.mine(previousBlock, data);
    this.blocks.push(block);
    return block;
  }

  replace(newBlocks = []) {
    if (newBlocks.length < this.blocks.length) throw Error('received chain is not longer than current chain');
    try {
      validate(newBlocks);
    } catch (err) {
      throw Error('received chain is invalid');
    }
    this.blocks = newBlocks;
    return this.blocks;
  }
}

export default Blockchain;
