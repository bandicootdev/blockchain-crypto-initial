import express from 'express';
import bodyParser from 'body-parser';
import Blockchain, { Block } from '../blockchain';

const { HTTP_PORT = 3000 } = process.env;

const app = express();
const blockchain = new Blockchain();

blockchain.addBlock('express');

app.use(bodyParser.json());

app.get('/blocks', (req, res) => {
  res.status(200).json(blockchain.blocks);
});

app.listen(HTTP_PORT, () => console.log(`server on port ${HTTP_PORT}`));
