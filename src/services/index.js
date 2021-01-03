import dotenv from 'dotenv';
import express from 'express';
import bodyParser from 'body-parser';
import Blockchain from '../blockchain';
import P2PService from './p2p';

dotenv.config();

const { HTTP_PORT } = process.env;
const app = express();
const blockchain = new Blockchain();
const p2pService = new P2PService(blockchain);

blockchain.addBlock('express');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/blocks', (req, res) => {
  res.status(200).json(blockchain.blocks);
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
