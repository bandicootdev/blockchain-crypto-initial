import Elliptic from 'elliptic';

// eslint-disable-next-line new-cap
const ec = new Elliptic.ec('secp256k1');

const INITIAL_BALANCE = 100;

class Wallet {
  constructor() {
    this.balance = INITIAL_BALANCE;
    this.keyPair = ec.genKeyPair();
    this.publickKey = this.keyPair.getPublic().encode('hex');
  }

  toString() {
    const { balance, publicKey } = this;
    return `Wallet -
    publicKey    :${publicKey}
    balance       :${balance}`;
  }
}

export default Wallet;
