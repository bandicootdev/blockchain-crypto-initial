import PKG from './package.json';
import Block from './src/blockchain/Block';

const { name, version } = PKG;
const block = new Block(Date.now(), 'prevHash', 'hash', 'data');

console.log(block.toString());

console.log(`${name} ${version}`);
