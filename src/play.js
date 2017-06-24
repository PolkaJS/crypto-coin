// @flow
import CryptoCoin from './crypto-coin';

let x = new CryptoCoin('5', 'uBTC', {
  COIN: 'BTC'
});

console.log(x.add(5, 'uBTC').toString('uBTC'));
