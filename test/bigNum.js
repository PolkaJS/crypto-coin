const test = require('tape');
const CryptoCoin = require('../lib/crypto-coin').default;

test('Check proper instanceof', function (t) {
  t.plan(1);

  let coin = new CryptoCoin(5);

  t.ok(coin instanceof CryptoCoin, 'properly created an instance');
});
