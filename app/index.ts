import * as express from 'express';
import * as http from 'http';
import * as cors from 'cors';
import { cryptonatorApiQueue } from './queues';
import { getCoinController } from './controller';
import { init as initWebSocket } from './ws';

const NAME = 'EventX Cypto api';
const PORT = 3001;
const app = express();

app.use(cors());

app.get('/', (_req, res) => res.status(200).send('hi there from server'));
app.get('/coins', getCoinController);

const server = new http.Server(app);

const io = require('socket.io')(server, {
  cors: '*'
});
initWebSocket(io);

const cronOption = {
  repeat: {
    cron: '*/30 * * * * *'
  }
};
cryptonatorApiQueue.add({}, cronOption);

(async function () {
  await server.listen(PORT);
  console.log(`${ NAME } listening @ :${ PORT }`);
}());
