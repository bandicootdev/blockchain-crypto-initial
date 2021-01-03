import crypto from 'crypto-js';

const { SHA256 } = crypto;

export default (data) => SHA256(JSON.stringify(data)).toString();
