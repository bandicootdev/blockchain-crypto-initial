import PKG from './package.json';
import Block from './src/blockchain/Block';

const { name, version } = PKG;
console.log(`${name} ${version}`);
const { genesis } = Block;
const block = new Block(Date.now(), genesis.hash, 'hash', 'data');

const block1 = Block.mine(genesis, 'data-1');
const block2 = Block.mine(block1, 'data-2');
console.log(block1.toString());
console.log(block2.toString());
