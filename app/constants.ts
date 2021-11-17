import * as config from 'config';

export const REDIS_URI: string = config.get('queues.redisUri');
export const CRYPTO_URI: string = config.get('cryptoUri');

export const CRYPTO_API_UPDATE = 'CRYPTO_API_UPDATE';
export const PUSH_COINS_UPDATE = 'PUSH_COINS_UPDATE';
export const UPDATE_COINS = 'UPDATE_COINS';
