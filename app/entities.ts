export interface Ticker {
  base: string;
  target: string;
  price: number;
  volume: number;
  change: number;
}

export interface Coin {
  id: number;
  name: string;
  code: string;
}

export interface CoinPrice extends Ticker {
  id: number;
  coin_id: number;
}

export interface CoinPricePayload {
  base?: string;
  target?: string;
  price?: number;
  volume?: number;
  change?: number;
  coin_id?: number;
}

export interface CryptonatorRes {
  ticker: Ticker,
  success: boolean;
  error: string;
}
