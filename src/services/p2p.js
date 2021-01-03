import dotenv from 'dotenv';
import webSocket from 'ws';

dotenv.config();

const { P2P_PORT, PEERS } = process.env;

const peers = PEERS ? PEERS.split(',') : [];
class P2PService {
  constructor(blockchain) {
    this.blockchain = blockchain;
    this.sockets = [];
  }

  listen() {
    const server = new webSocket.Server({ port: P2P_PORT || 5000 });
    server.on('connection', (socket) => this.onConnection(socket));
    peers.forEach((peer) => {
      // eslint-disable-next-line new-cap
      const socket = new webSocket(peer);
      socket.on('open', () => this.onConnection(socket));
    });
    console.log(`server ws in ${P2P_PORT}`);
  }

  onConnection(socket) {
    console.log('[ws:socket] connected');
    this.sockets.push(socket);
  }
}

export default P2PService;
