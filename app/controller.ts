import { Request, Response } from 'express';
import { getCoins } from './features';

export async function getCoinController (_: Request, res: Response) {
  try {
    const coins = await getCoins();

    res.status(200).send(coins);
  } catch (e) {
    console.error(e);
  }
}
