import crypto from 'crypto-js';

const { SHA256 } = crypto;

const DIFFICULTY = 2;

class Block {
  constructor(timestamp, previousHash, hash, data, nonce) {
    this.timestamp = timestamp;
    this.previousHash = previousHash;
    this.hash = hash;
    this.data = data;
    this.nonce = nonce;
  }

  // eslint-disable-next-line getter-return
  static get genesis() {
    const timestamp = (new Date(2000, 0, 1)).getTime();
    return new this(timestamp, undefined, 'GenesisHash', 'Soy una prueba :)');
  }

  static mine(previousBlock, data) {
    const { hash: previousHash } = previousBlock;
    let timestamp;
    let hash;
    let nonce = 0;
    do {
      timestamp = Date.now();
      nonce += 1;
      hash = Block.hash(timestamp, previousHash, data, nonce);
    } while (hash.substring(0, DIFFICULTY) !== '0'.repeat(DIFFICULTY));
    return new this(timestamp, previousHash, hash, data, nonce);
  }

  static hash(timestamp, previousHash, data, nonce) {
    return SHA256(`${timestamp}${previousHash}${data}${nonce}`).toString();
  }

  toString() {
    const {
      timestamp, previousHash, hash, data, nonce,
    } = this;
    return `Block -
        timestamp     : ${timestamp}
        previousHash  : ${previousHash}
        hash          : ${hash}
        data          : ${data}
        nonce         : ${nonce}`;
  }
}

export { DIFFICULTY };
export default Block;
