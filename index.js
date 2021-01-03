import PKG from './package.json';
import Block from './src/blockchain/Block';

const { name, version } = PKG;
const { genesis } = Block;
const block = new Block(Date.now(), genesis.hash, 'hash', 'data');

console.log(genesis);
console.log(block.toString());

console.log(`${name} ${version}`);
