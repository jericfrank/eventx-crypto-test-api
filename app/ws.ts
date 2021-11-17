import * as Queue from 'bull';
import { Namespace, Server } from 'socket.io';
import { PUSH_COINS_UPDATE, REDIS_URI, UPDATE_COINS } from './constants';

let io: Server;
let wsIo: Namespace;

function subscribeToCoinsQueue () {
  const pushCoinUpdateQueue = new Queue(PUSH_COINS_UPDATE, REDIS_URI);
  pushCoinUpdateQueue.process(async (job) => {
    wsIo
      .emit(UPDATE_COINS, job.data);
  });
}

// eslint-disable-next-line
export function init (newIo: Server) {
  io = newIo;
  wsIo = io.of('/ws');

  subscribeToCoinsQueue();
}
