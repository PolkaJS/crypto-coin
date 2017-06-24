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
```

## Use

``` javascript
// ES6
import CryptoCoin from '@polkajs/CryptoCoin';
// Or standard
const CryptoCoin = require('@polkajs/CryptoCoin');

const coin = new CryptoCoin(21000);
```

## API

this module extends `bignumber.js` whose documentation can be found here:
[bignumber.js](https://mikemcl.github.io/bignumber.js/)

## ISC License (ISC)

Copyright 2017 <PolkaJS>
Copyright (c) 2004-2010 by Internet Systems Consortium, Inc. ("ISC")
Copyright (c) 1995-2003 by Internet Software Consortium


Permission to use, copy, modify, and/or distribute this software for any purpose with or without fee is hereby granted, provided that the above copyright notice and this permission notice appear in all copies.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
