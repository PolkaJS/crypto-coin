const test = require('tape');
const CryptoCoin = require('../lib/crypto-coin').default;

test('Check proper instanceof', function (t) {
    t.plan(9);

    let coin = new CryptoCoin(5);

    t.ok(coin instanceof CryptoCoin, 'properly created an instance');
    t.equals(coin.toNumber(), 5, 'evaluates to its original value');
    t.equals(coin.toString(), '5', 'evaluates to it\s string value');
    t.equals(coin.opts.DEFAULT_GAS, '21000', 'check opts.DEFAULT_GAS was update');
    t.equals(Object.keys(coin.opts.UNIT_MAP)[0], 'wei', 'check opts.UNIT_MAP was update');
    t.equals(coin.opts.COIN, 'ETH', 'check opts.COIN was update');
    t.equals(JSON.stringify(coin.opts.BIG_NUM_CONFIG), JSON.stringify({}), 'check opts.BIG_NUM_CONFIG was update');
    t.equals(coin.DEFAULT_GAS, '21000', 'check DEFAULT_GAS was update');
    t.equals(Object.keys(coin.UNIT_MAP)[0], 'wei', 'check UNIT_MAP was update');
});

test('Create a simple instance with a string', function (t) {
    t.plan(3);

    let coin = new CryptoCoin('5');

    t.ok(coin instanceof CryptoCoin, 'evaluates to true');
    t.equals(coin.toNumber(), 5, 'evaluates to its original value');
    t.equals(coin.toString(), '5', 'evaluates to it\s string value');
});

test('Default gas', function (t) {
    t.plan(3);

    let coin = new CryptoCoin().defaultGas();

    t.ok(coin instanceof CryptoCoin, 'evaluates to true');
    t.equals(coin.toNumber(), 21000, 'evaluates to its original value');
    t.equals(coin.toString(), '21000', 'evaluates to it\s string value');
});

test('working with different parameters', function (t) {
    t.plan(2);

    let coin = new CryptoCoin('5000', 'kwei');

    t.equals(coin.toNumber(), 5000000, 'evaluates to its original value');
    t.equals(coin.toString(), '5000000', 'evaluates to it\s string value');
});

test('working with different parameters 2 - denom is 3rd', function (t) {
    t.plan(5);

    let coin = new CryptoCoin('100', 10, 'satoshi', {
      COIN: 'BTC'
    });

    t.equals(coin.toNumber(), 100, 'evaluates to its original value');
    t.equals(coin.toString(), '100', 'evaluates to it\s string value');
    t.equals(coin.opts.COIN, 'BTC', 'the options flag was update');
    t.equals(Object.keys(coin.opts.UNIT_MAP)[0], 'satoshi', 'check that the UNIT_MAP was update (opts)');
    t.equals(Object.keys(coin.UNIT_MAP)[0], 'satoshi', 'check that the UNIT_MAP was update (opts)');
});

test('working with different parameters 3 - denom is 2nd param', function (t) {
    t.plan(5);

    let coin = new CryptoCoin('100', {
      COIN: 'BTC'
    });

    t.equals(coin.toNumber(), 100, 'evaluates to its original value');
    t.equals(coin.toString(), '100', 'evaluates to it\s string value');
    t.equals(coin.opts.COIN, 'BTC', 'the options flag was update');
    t.equals(Object.keys(coin.opts.UNIT_MAP)[0], 'satoshi', 'check that the UNIT_MAP was update (opts)');
    t.equals(Object.keys(coin.UNIT_MAP)[0], 'satoshi', 'check that the UNIT_MAP was update (coin)');
});

test('working with different parameters 4 - object is 2nd param', function (t) {
    t.plan(5);

    let coin = new CryptoCoin('1', 'babbage');

    t.equals(coin.toNumber(), 1000000, 'evaluates to its original value');
    t.equals(coin.toString(), '1000000', 'evaluates to it\s string value');
    t.equals(coin.opts.COIN, 'ETH', 'the options flag was update');
    t.equals(Object.keys(coin.opts.UNIT_MAP)[0], 'wei', 'check that the UNIT_MAP was update (opts)');
    t.equals(Object.keys(coin.UNIT_MAP)[0], 'wei', 'check that the UNIT_MAP was update (coin)');
});

test('create my own denominations', function(t) {
  t.plan(6);

  let coin = new CryptoCoin('100', 10, 'yellow', {
    UNIT_MAP: {
      red:             '1',
      orange:         '10',
      yellow:        '100',
      green:        '1000',
      blue:        '10000',
      purple:     '100000',
      black:     '1000000',
      brown:    '10000000',
      white:   '100000000',
      gold:   '1000000000'
    },
    COIN: 'Rainbow'
  });

  t.equals(coin.toNumber(), 10000, 'evaluates to its original value');
  t.equals(coin.toString(), '10000', 'evaluates to it\s string value');
  t.equals(coin.toString('yellow'), '100', 'evaluates to it\s string value');
  t.equals(coin.opts.COIN, 'Rainbow', 'the options flag was update');
  t.equals(Object.keys(coin.opts.UNIT_MAP)[0], 'red', 'check that the UNIT_MAP was update (opts)');
  t.equals(Object.keys(coin.UNIT_MAP)[0], 'red', 'check that the UNIT_MAP was update (coin)');
});

test('working with strings', function (t) {
    t.plan(4);

    let coin = new CryptoCoin('5000', 'kwei');

    t.equals(coin.toString(), '5000000', 'evaluates to it\s wei string value');
    t.equals(coin.toString(10), '5000000', 'evaluates to it\s wei string value with radix');
    t.equals(coin.toString(10, 'kwei'), '5000', 'evaluates to it\s kwei string value');
    t.equals(coin.toString('kwei'), '5000', 'evaluates to it\s kwei string value no radix');
});

test('addition (add)', function (t) {
    t.plan(8);

    let coin = new CryptoCoin('5000', 'kwei');

    t.equals(coin.add(5).toString(), '5000005', 'evaluates to it\s wei string value');

    coin = new CryptoCoin('5000', 'kwei');

    t.equals(coin.add(5000, 'kwei').toString(), '10000000', 'evaluates to it\s wei string value');

    coin = new CryptoCoin('5000', 'kwei');

    t.equals(coin.add(5).toString(10, 'kwei'), '5000.005', 'evaluates to it\s wei string value with radix');

    coin = new CryptoCoin('5000', 'kwei');

    t.equals(coin.add(5000, 'kwei').toString(10, 'kwei'), '10000', 'evaluates to it\s kwei string value');

    coin = new CryptoCoin('1', 'kwei');
    t.equals(coin.add(1, 'kwei').toString('kwei'), '2', 'adding first (persistance)');
    t.equals(coin.add(2, 'kwei').toString(), '4000', 'adding first (persistance 2)');
    t.equals(coin.add(1).toString(), '4001', 'adding first (persistance 3)');
    t.equals(coin.add(1).toString('kwei'), '4.002', 'adding first (persistance 4)');
});

test('addition (plus)', function (t) {
    t.plan(8);

    let coin = new CryptoCoin('5000', 'kwei');

    t.equals(coin.plus(5).toString(), '5000005', 'evaluates to it\s wei string value');

    coin = new CryptoCoin('5000', 'kwei');

    t.equals(coin.plus(5000, 'kwei').toString(), '10000000', 'evaluates to it\s wei string value');

    coin = new CryptoCoin('5000', 'kwei');

    t.equals(coin.plus(5).toString(10, 'kwei'), '5000.005', 'evaluates to it\s wei string value with radix');

    coin = new CryptoCoin('5000', 'kwei');

    t.equals(coin.plus(5000, 'kwei').toString(10, 'kwei'), '10000', 'evaluates to it\s kwei string value');

    coin = new CryptoCoin('1', 'kwei');
    t.equals(coin.plus(1, 'kwei').toString('kwei'), '2', 'plus-ing (persistance)');
    t.equals(coin.plus(2, 'kwei').toString(), '4000', 'plus-ing (persistance 2)');
    t.equals(coin.plus(1).toString(), '4001', 'plus-ing (persistance 3)');
    t.equals(coin.plus(1).toString('kwei'), '4.002', 'plus-ing (persistance 4)');
});

test('division (dividedBy)', function (t) {
    t.plan(8);

    let coin = new CryptoCoin('5000', 'kwei');

    t.equals(coin.dividedBy(5).toString(), '1000000', 'evaluates to it\s wei string value');

    coin = new CryptoCoin('5000', 'kwei');

    t.equals(coin.dividedBy(5000, 'kwei').toString(), '1', 'evaluates to it\s wei string value');

    coin = new CryptoCoin('5000', 'kwei');

    t.equals(coin.dividedBy(5).toString(10, 'kwei'), '1000', 'evaluates to it\s wei string value with radix');

    coin = new CryptoCoin('5000', 'kwei');

    t.equals(coin.dividedBy(5000, 'kwei').toString(10, 'kwei'), '0.001', 'evaluates to it\s kwei string value');

    coin = new CryptoCoin('1', 'kwei');
    t.equals(coin.dividedBy(1, 'kwei').toString('kwei'), '0.001', 'dividedBy-ing (persistance)');
    t.equals(coin.dividedBy(2, 'kwei').toString(), '0.0005', 'dividedBy-ing (persistance 2)');
    t.equals(coin.dividedBy(1).toString(), '0.0005', 'dividedBy-ing (persistance 3)');
    t.equals(coin.dividedBy(1).toString('kwei'), '0.0000005', 'dividedBy-ing (persistance 4)');
});

test('division (div)', function (t) {
    t.plan(8);

    let coin = new CryptoCoin('5000', 'kwei');

    t.equals(coin.div(5).toString(), '1000000', 'evaluates to it\s wei string value');

    coin = new CryptoCoin('5000', 'kwei');

    t.equals(coin.div(5000, 'kwei').toString(), '1', 'evaluates to it\s wei string value');

    coin = new CryptoCoin('5000', 'kwei');

    t.equals(coin.div(5).toString(10, 'kwei'), '1000', 'evaluates to it\s wei string value with radix');

    coin = new CryptoCoin('5000', 'kwei');

    t.equals(coin.div(5000, 'kwei').toString(10, 'kwei'), '0.001', 'evaluates to it\s kwei string value');

    coin = new CryptoCoin('1', 'kwei');
    t.equals(coin.div(1, 'kwei').toString('kwei'), '0.001', 'div-ing (persistance)');
    t.equals(coin.div(2, 'kwei').toString(), '0.0005', 'div-ing (persistance 2)');
    t.equals(coin.div(1).toString(), '0.0005', 'div-ing (persistance 3)');
    t.equals(coin.div(1).toString('kwei'), '0.0000005', 'div-ing (persistance 4)');
});

test('division (dividedToIntegerBy)', function (t) {
    t.plan(8);

    let coin = new CryptoCoin('5000', 'kwei');

    t.equals(coin.dividedToIntegerBy(5).toString(), '1000000', 'evaluates to it\s wei string value');

    coin = new CryptoCoin('5000', 'kwei');

    t.equals(coin.dividedToIntegerBy(5000, 'kwei').toString(), '1', 'evaluates to it\s wei string value');

    coin = new CryptoCoin('5000', 'kwei');

    t.equals(coin.dividedToIntegerBy(5).toString(10, 'kwei'), '1000', 'evaluates to it\s wei string value with radix');

    coin = new CryptoCoin('5000', 'kwei');

    t.equals(coin.dividedToIntegerBy(5000, 'kwei').toString(10, 'kwei'), '0.001', 'evaluates to it\s kwei string value');

    coin = new CryptoCoin('1', 'kwei');
    t.equals(coin.dividedToIntegerBy(1, 'kwei').toString('kwei'), '0.001', 'dividedToIntegerBy-ing (persistance)');
    t.equals(coin.dividedToIntegerBy(2, 'kwei').toString(), '0', 'dividedToIntegerBy-ing (persistance 2)');
    t.equals(coin.dividedToIntegerBy(1).toString(), '0', 'dividedToIntegerBy-ing (persistance 3)');
    t.equals(coin.dividedToIntegerBy(1).toString('kwei'), '0', 'dividedToIntegerBy-ing (persistance 4)');
});

test('division (divToInt)', function (t) {
    t.plan(8);

    let coin = new CryptoCoin('5000', 'kwei');

    t.equals(coin.divToInt(5).toString(), '1000000', 'evaluates to it\s wei string value');

    coin = new CryptoCoin('5000', 'kwei');

    t.equals(coin.divToInt(5000, 'kwei').toString(), '1', 'evaluates to it\s wei string value');

    coin = new CryptoCoin('5000', 'kwei');

    t.equals(coin.divToInt(5).toString(10, 'kwei'), '1000', 'evaluates to it\s wei string value with radix');

    coin = new CryptoCoin('5000', 'kwei');

    t.equals(coin.divToInt(5000, 'kwei').toString(10, 'kwei'), '0.001', 'evaluates to it\s kwei string value');

    coin = new CryptoCoin('1', 'kwei');
    t.equals(coin.divToInt(1, 'kwei').toString('kwei'), '0.001', 'divToInt-ing (persistance)');
    t.equals(coin.divToInt(2, 'kwei').toString(), '0', 'divToInt-ing (persistance 2)');
    t.equals(coin.divToInt(1).toString(), '0', 'divToInt-ing (persistance 3)');
    t.equals(coin.divToInt(1).toString('kwei'), '0', 'divToInt-ing (persistance 4)');
});

test('subtract (minus)', function (t) {
    t.plan(8);

    let coin = new CryptoCoin('5000', 'kwei');

    t.equals(coin.minus(5).toString(), '4999995', 'evaluates to it\s wei string value');

    coin = new CryptoCoin('5000', 'kwei');

    t.equals(coin.minus(5000, 'kwei').toString(), '0', 'evaluates to it\s wei string value');

    coin = new CryptoCoin('5000', 'kwei');

    t.equals(coin.minus(5).toString(10, 'kwei'), '4999.995', 'evaluates to it\s wei string value with radix');

    coin = new CryptoCoin('5000', 'kwei');

    t.equals(coin.minus(1000, 'kwei').toString(10, 'kwei'), '4000', 'evaluates to it\s kwei string value');

    coin = new CryptoCoin('10', 'kwei');
    t.equals(coin.minus(1, 'kwei').toString('kwei'), '9', 'minus-ing (persistance)');
    t.equals(coin.minus(2, 'kwei').toString(), '7000', 'minus-ing (persistance 2)');
    t.equals(coin.minus(1).toString(), '6999', 'minus-ing (persistance 3)');
    t.equals(coin.minus(1).toString('kwei'), '6.998', 'minus-ing (persistance 4)');
});

test('subtract (sub)', function (t) {
    t.plan(8);

    let coin = new CryptoCoin('5000', 'kwei');

    t.equals(coin.sub(5).toString(), '4999995', 'evaluates to it\s wei string value');

    coin = new CryptoCoin('5000', 'kwei');

    t.equals(coin.sub(5000, 'kwei').toString(), '0', 'evaluates to it\s wei string value');

    coin = new CryptoCoin('5000', 'kwei');

    t.equals(coin.sub(5).toString(10, 'kwei'), '4999.995', 'evaluates to it\s wei string value with radix');

    coin = new CryptoCoin('5000', 'kwei');

    t.equals(coin.sub(1000, 'kwei').toString(10, 'kwei'), '4000', 'evaluates to it\s kwei string value');

    coin = new CryptoCoin('10', 'kwei');
    t.equals(coin.sub(1, 'kwei').toString('kwei'), '9', 'sub-ing (persistance)');
    t.equals(coin.sub(2, 'kwei').toString(), '7000', 'sub-ing (persistance 2)');
    t.equals(coin.sub(1).toString(), '6999', 'sub-ing (persistance 3)');
    t.equals(coin.sub(1).toString('kwei'), '6.998', 'sub-ing (persistance 4)');
});

test('multplication (times)', function (t) {
    t.plan(8);

    let coin = new CryptoCoin('5', 'kwei');

    t.equals(coin.times(2).toString(), '10000', 'evaluates to it\s wei string value');

    coin = new CryptoCoin('5', 'kwei');

    t.equals(coin.times(2, 'kwei').toString(), '10000000', 'evaluates to it\s wei string value');

    coin = new CryptoCoin('5', 'kwei');

    t.equals(coin.times(2).toString(10, 'kwei'), '10', 'evaluates to it\s wei string value with radix');

    coin = new CryptoCoin('5', 'kwei');

    t.equals(coin.times(2, 'kwei').toString(10, 'kwei'), '10000', 'evaluates to it\s kwei string value');

    coin = new CryptoCoin('10', 'kwei');
    t.equals(coin.times(2, 'kwei').toString('kwei'), '20000', 'times-ing (persistance)');
    t.equals(coin.times(2, 'kwei').toString(), '40000000000', 'times-ing (persistance 2)');
    t.equals(coin.times(2).toString(), '80000000000', 'times-ing (persistance 3)');
    t.equals(coin.times(2).toString('kwei'), '160000000', 'times-ing (persistance 4)');
});

test('multplication (mul)', function (t) {
    t.plan(8);

    let coin = new CryptoCoin('5', 'kwei');

    t.equals(coin.mul(2).toString(), '10000', 'evaluates to it\s wei string value');

    coin = new CryptoCoin('5', 'kwei');

    t.equals(coin.mul(2, 'kwei').toString(), '10000000', 'evaluates to it\s wei string value');

    coin = new CryptoCoin('5', 'kwei');

    t.equals(coin.mul(2).toString(10, 'kwei'), '10', 'evaluates to it\s wei string value with radix');

    coin = new CryptoCoin('5', 'kwei');

    t.equals(coin.mul(2, 'kwei').toString(10, 'kwei'), '10000', 'evaluates to it\s kwei string value');

    coin = new CryptoCoin('10', 'kwei');
    t.equals(coin.mul(2, 'kwei').toString('kwei'), '20000', 'mul-ing (persistance)');
    t.equals(coin.mul(2, 'kwei').toString(), '40000000000', 'mul-ing (persistance 2)');
    t.equals(coin.mul(2).toString(), '80000000000', 'mul-ing (persistance 3)');
    t.equals(coin.mul(2).toString('kwei'), '160000000', 'mul-ing (persistance 4)');
});
