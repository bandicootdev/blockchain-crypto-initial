import express from 'express';
import bodyParser from 'body-parser';
import Blockchain, { Block } from '../blockchain';

const { HTTP_PORT = 3000 } = process.env;

const app = express();
const blockchain = new Blockchain();

blockchain.addBlock('express');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/blocks', (req, res) => {
  res.status(200).json(blockchain.blocks);
});

app.post('/mine', (req, res) => {
  const { body: { data } } = req;
  const block = blockchain.addBlock(data);

  res.status(200).json({
    blocks: blockchain.blocks.length,
    block,
  });
});

app.listen(HTTP_PORT, () => console.log(`server on port ${HTTP_PORT}`));
