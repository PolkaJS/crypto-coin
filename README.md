# crypto-coin [![travis][travis-image]][travis-url] [![npm][npm-image]][npm-url] [![downloads][downloads-image]][downloads-url] [![Greenkeeper badge](https://badges.greenkeeper.io/PolkaJS/crypto-coin.svg)](https://greenkeeper.io/)

[travis-image]: https://travis-ci.org/PolkaJS/crypto-coin.svg?branch=master
[travis-url]: https://travis-ci.org/PolkaJS/crypto-coin
[npm-image]: https://img.shields.io/npm/v/@polkajs/crypto-coin.svg
[npm-url]: https://npmjs.org/package/@polkajs/crypto-coin
[downloads-image]: https://img.shields.io/npm/dm/@polkajs/crypto-coin.svg
[downloads-url]: https://npmjs.org/package/@polkajs/crypto-coin

## About

## Install

``` javascript
// npm
npm install --save @polkajs/crypto-coin
// yarn
yarn add @polkajs/crypto-coin

// GLOBAL
npm install -g @polkajs/crypto-coin
```

#### Global use:

`crypto-coin [from] [to] [value]`

- **help**    `crypto-coin -h`
- **types**   `crypto-coin -t ETH`
- **version** `crypto-coin -v`

``` javascript
crypto-coin ether satoshi 1

// OUTPUT: 1 ether = 1000000000000000000 satoshi
```

## Use

``` javascript
// ES6
import CryptoCoin from '@polkajs/CryptoCoin';
// Or standard
const CryptoCoin = require('@polkajs/CryptoCoin').default;


// Create a new Coin:
const coin = new CryptoCoin(21000);
```

### Basic Examples

**new CryptoCoin([num, [radix, [denom, [opts]]]])**
- num?: number | string | bigNum
- radix?: number
- denom?: string
- opts?: Object

``` javascript
// FULL SETUP OF THE DEFAULTS:
const coin = new CryptoCoin(0, 10, 'wei', {
  DEFAULT_GAS: '21000',      // an ethereum standard gas price
  UNIT_MAP:    UNIT_MAP_ETH, // scroll to the bottom to see
  COIN:        'ETH',        // which blockchain coin to use
  BIG_NUM_CONFIG: {}         // to update bignumber.js config
});
// simple:
const coin = new CryptoCoin(0, 'wei');
// options setting bitcoins denominations:
const coin = new CryptoCoin(10, {
  COIN: 'BTC'
});

// add to the coin:
coin.add(1);

// or add in a denomination:
coin.add(1, 'ether');

// print the total:
coin.toString();
// OUTPUT: 1000000000000000002      (wei)
coin.toString('ether');
// OUTPUT: 1.000000000000000002      (ether)

// subtract:
coin.sub(1);

// divide:
coin.div(1);

// multiply
coin.mul(1);

// get the default gas value:
const gas = new CryptoCoin().defaultGas(); // (bignumber)
```

**The CryptoCoin is persistent**
If the coin's value is 1 wei:
``` javascript
coin.add(1);
coin.add(1);
coin.toString(); // 3  wei
coin.add(7);
coin.toString(); // 10 wei
coin.sub(5);
coin.toString(); // 5  wei
```


## API

this module extends `bignumber.js` whose documentation can be found here:
[bignumber.js](https://mikemcl.github.io/bignumber.js/)

### Updated bignumber.js methods

#### addition

**add(num, [radix, [denom]]): CryptoCoin**
- num: string | number | bigNum
- radix: number
- denom: string

``` javascript
const coin = new CryptoCoin('5', 'kwei'); // 5000 (wei)

coin.add(2).toString();         // 5002   (wei)
// or add in a different denomination
coin.add(2, 'kwei').toString(); // 7      (wei)
// or print in a different denomination
coin.add(2).toString('kwei');   // 5.002 (kwei)
```

#### subtraction

**sub(num, [radix, [denom]]): CryptoCoin**
- num: string | number | bigNum
- radix: number
- denom: string

``` javascript
const coin = new CryptoCoin('5', 'kwei'); // 5000 (wei)

coin.sub(2).toString();         // 4998  (wei)
// or add in a different denomination
coin.sub(2, 'kwei').toString(); // 3000  (wei)
// or print in a different denomination
coin.sub(2).toString('kwei');   // 4.998 (kwei)
```

#### division

**div(num, [radix, [denom]]): CryptoCoin**
- num: string | number | bigNum
- radix: number
- denom: string

``` javascript
const coin = new CryptoCoin('5', 'kwei'); // 5000 (wei)

coin.div(2).toString();         // 2500     (wei)
// or add in a different denomination
coin.div(2, 'kwei').toString(); // 2.5      (wei)
// or print in a different denomination
coin.div(2).toString('kwei');   // 2.5      (kwei)
```

#### multiplication

**mul(num, [radix, [denom]]): CryptoCoin**
- num: string | number | bigNum
- radix?: number
- denom?: string

``` javascript
const coin = new CryptoCoin('5', 'kwei'); // 5000 (wei)

coin.mul(2).toString();         // 10000    (wei)
// or add in a different denomination
coin.mul(2, 'kwei').toString(); // 10000000 (wei)
// or print in a different denomination
coin.mul(2).toString('kwei');   // 10       (kwei)
```

### CryptoCoin methods

#### INSTANTIATE

**new CryptoCoin([num, [radix, [denom, [opts]]]])**
- num?: number | string | bigNum
- radix?: number
- denom?: string
- opts?: Object

``` javascript
// DEFAULTS:
const coin = new CryptoCoin('0', 10, 'wei', {
  DEFAULT_GAS: '21000',      // an ethereum standard gas price
  UNIT_MAP:    UNIT_MAP_ETH, // scroll to the bottom to see
  COIN:        'ETH',        // which blockchain coin to use
  BIG_NUM_CONFIG: {}         // to update bignumber.js config
});
```


#### TO_STRING

**toString([radix, [denom]]): string**
- radix: string | number = 10
- denom: string

``` javascript
const coin = new CryptoCoin('5', 'kwei'); // 5000 (wei)

coin.toString();           // 5000 (wei)
// or print in a different denomination
coin.toString('kwei');     // 5    (kwei)
// fill in every parameter
coin.toString(10, 'kwei'); // 5    (kwei)
```

#### DEFAULT_GAS

**defaultGas(): CryptoCoin**

``` javascript
const coin = new CryptoCoin().defaultGas(); // 21000 (wei)

coin.toString();  // 21000 (wei)
```

---

## ISC License (ISC)

Copyright 2017 <PolkaJS>
Copyright (c) 2004-2010 by Internet Systems Consortium, Inc. ("ISC")
Copyright (c) 1995-2003 by Internet Software Consortium


Permission to use, copy, modify, and/or distribute this software for any purpose with or without fee is hereby granted, provided that the above copyright notice and this permission notice appear in all copies.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
