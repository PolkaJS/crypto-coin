const CryptoCoin = require('./lib/crypto-coin').default;

let coin = new CryptoCoin('5', 'kwei');

console.log(coin.add(5, 'kwei').toString('kwei'));
