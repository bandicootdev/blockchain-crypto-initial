class Block {
  constructor(timestamp, previousHash, hash, data) {
    this.timestamp = timestamp;
    this.previousHash = previousHash;
    this.hash = hash;
    this.data = data;
  }

  // eslint-disable-next-line getter-return
  static get genesis() {
    const timestamp = (new Date(2000, 0, 1)).getTime();
    return new this(timestamp, undefined, 'GenesisHash', 'Soy una prueba :)');
  }

  toString() {
    const {
      timestamp, previousHash, hash, data,
    } = this;
    return `Block -
        timestamp     : ${timestamp}
        previousHash  : ${previousHash}
        hash          : ${hash}
        data          : ${data}`;
  }
}

export default Block;
