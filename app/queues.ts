import * as Queue from 'bull';
import axios, { AxiosPromise, AxiosResponse } from 'axios';
import db from './db';
import { Coin, CoinPricePayload, CryptonatorRes } from './entities';
import { bulkInsertCoin } from './features';

const redisURI = 'redis://127.0.0.1';

export const cryptonatorApiQueue = new Queue('cryptonatorApiQueue', redisURI);

cryptonatorApiQueue.process(async () => {
  const coins = await db('coins')
    .select('id', 'code', 'name')
    .orderBy('order', 'DESC');

  const getCoinPromises: AxiosPromise[] = coins.map(({ code }: Coin) => {
    return axios.get(`https://api.cryptonator.com/api/ticker/${ code }`);
  });

  Promise.all(getCoinPromises)
    .then(async (values: AxiosResponse<CryptonatorRes>[]) => {
      const insertCoinData = [];

      for (let i = 0; i < values.length; i++) {
        const coin = coins[i];
        const value = values[i].data;

        if (value.success) {
          const { ticker } = value;
          const coinData: CoinPricePayload = {
            coin_id: coin.id,
          };

          if (ticker.base) coinData.base = ticker.base;
          if (ticker.target) coinData.target = ticker.target;
          if (ticker.price) coinData.price = ticker.price;
          if (ticker.volume) coinData.volume = ticker.volume;
          if (ticker.change) coinData.change = ticker.change;

          insertCoinData.push(coinData);
        }
      }

      await bulkInsertCoin(insertCoinData);
    })
    .catch(err => {
      console.error(err);
    });
});
