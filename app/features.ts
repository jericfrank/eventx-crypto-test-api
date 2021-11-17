import db from './db';
import { CoinPrice, CoinPricePayload } from './entities';
import { pushLiveConversationUpdate } from './queues';

export async function getCoins (): Promise<CoinPrice[]> {
  const coins = await db('coins')
    .leftJoin(
      'coin_prices',
      'coin_prices.id',
      db.raw(
        '(SELECT id FROM coin_prices WHERE coin_prices.coin_id = coins.id ORDER BY coin_prices.created_at DESC LIMIT 1)',
      ),
    )
    .select(
      'coins.id',
      'coins.name',
      'coin_prices.base',
      'coin_prices.target',
      'coin_prices.price',
      'coin_prices.volume',
      'coin_prices.change',
    )
    .distinctOn('coin_prices.coin_id');

  return coins;
}

export async function bulkInsertCoin (coinPrices: CoinPricePayload[]): Promise<void> {
  await db('coin_prices').insert(coinPrices);
  const coins = await getCoins();
  pushLiveConversationUpdate(coins);
}
