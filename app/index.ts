import * as express from 'express';
import * as http from 'http';
import * as cors from 'cors';
import { cryptonatorApiQueue } from './queues';
import { getCoinController } from './controller';

const NAME = 'EventX Cypto api';
const PORT = 3001;
const app = express();

app.use(cors());

app.get('/', (_req, res) => res.status(200).send('hi there from server'));
app.get('/coins', getCoinController);

const server = new http.Server(app);

(async function () {
  await server.listen(PORT);

  const cronOption = {
    repeat: {
      cron: '*/30 * * * * *'
    }
  };
  await cryptonatorApiQueue.add({}, cronOption);

  console.log(`${ NAME } listening @ :${ PORT }`);
}());
