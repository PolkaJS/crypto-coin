const test = require('tape');
const CryptoCoin = require('../lib/crypto-coin').CryptoCoin;

test('check proper instanceof', function (t) {
    t.plan(1);

    let x = new CryptoCoin(5);

    t.ok(x instanceof CryptoCoin, 'evaluates to true');
});
