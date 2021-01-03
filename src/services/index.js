import dotenv from 'dotenv';
import express from 'express';
import bodyParser from 'body-parser';
import Blockchain from '../blockchain';
import P2PService, { MESSAGE } from './p2p';
import Wallet from '../wallet';

dotenv.config();

const { HTTP_PORT } = process.env;
const app = express();
const blockchain = new Blockchain();
const wallet = new Wallet(blockchain);
const p2pService = new P2PService(blockchain);

blockchain.addBlock('express');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/blocks', (req, res) => {
  res.status(200).json(blockchain.blocks);
});

app.get('/transactions', (req, res) => {
  const { memoryPool: { transactions } } = blockchain;
  res.status(200).json(transactions);
});

app.post('/transactions', (req, res) => {
  try {
    const { body: { recipient, amount } } = req;
    const tx = wallet.createTransaction(recipient, amount);
    p2pService.broadcast(MESSAGE.TX, tx);
    return res.status(200).json(tx);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
app.post('/mine', (req, res) => {
  const { body: { data } } = req;
  const block = blockchain.addBlock(data);
  p2pService.sync();
  res.status(200).json({
    blocks: blockchain.blocks.length,
    block,
  });
});

app.listen(HTTP_PORT || 3000, () => {
  console.log(`server on port ${HTTP_PORT}`);
  p2pService.listen();
});
