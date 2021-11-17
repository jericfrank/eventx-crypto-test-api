import * as Queue from 'bull';
import axios, { AxiosPromise, AxiosResponse } from 'axios';
import db from './db';
import { Coin, CoinPrice, CoinPricePayload, CryptonatorRes } from './entities';
import { bulkInsertCoin } from './features';
import { CRYPTO_API_UPDATE, CRYPTO_URI, PUSH_COINS_UPDATE, REDIS_URI } from './constants';

export const cryptonatorApiQueue = new Queue(CRYPTO_API_UPDATE, REDIS_URI);
cryptonatorApiQueue.process(async () => {
  const coins = await db('coins')
    .select('id', 'code', 'name')
    .orderBy('order', 'DESC');

  const getCoinPromises: AxiosPromise[] = coins.map(({ code }: Coin) => {
    return axios.get(`${ CRYPTO_URI }/api/ticker/${ code }`);
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

const pushCoinUpdateQueue = new Queue(PUSH_COINS_UPDATE, REDIS_URI);
export async function pushLiveConversationUpdate (data: CoinPrice[]) {
  pushCoinUpdateQueue.add(data);
}
