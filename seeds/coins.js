exports.seed = function(knex) {
  return knex('coins').del()
    .then(function () {
      return knex('coins').insert([
        { name: 'Bitcoin', code: 'btc-usd', order: 1 },
        { name: 'Ether', code: 'eth-usd', order: 2 },
        { name: 'Litecoin', code: 'ltc-usd', order: 3 },
        { name: 'Monero', code: 'xmr-usd', order: 4 },
        { name: 'Ripple', code: 'xrp-usd', order: 5 },
        { name: 'Dogecoin', code: 'doge-usd', order: 6 },
        { name: 'Dash', code: 'dash-usd', order: 7 },
        { name: 'MaidSafeeCoin', code: 'maid-usd', order: 8 },
        { name: 'Lisk', code: 'lsk-usd', order: 9 },
        { name: 'Storjcoin X', code: 'sjcx-usd', order: 10 },
      ]);
    });
};
