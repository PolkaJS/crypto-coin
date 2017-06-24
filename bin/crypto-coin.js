#!/usr/bin/env node

const CryptoCoin = require("../lib/crypto-coin.js").default;
const chalk      = require("chalk");
const OPTIONS    = require("./options.json");
const VERSION    = require("../package.json").version;

let from  = process.argv[2];
let to    = process.argv[3];
let value = process.argv[4];

if (process.argv[2] === '--v' || process.argv[2] === '-v' || process.argv[2] === '--version' || process.argv[2] === '-version') {
  console.log(`
PolkaJS - CryptoCoin
version:  ${VERSION}
year:     2017

Created by Craig O'Connor
`);
return;
}

if (process.argv[2] === '--h' || process.argv[2] === '-h') {
  print_tutorial();
  return;
}

if (process.argv[2] === '--t' || process.argv[2] === '-t') {
  print_denominations(process.argv[3]);
  return;
}

if (process.argv[2] === undefined || process.argv[3] === undefined || process.argv[4] === undefined) {
  console.log(chalk.red("Invalid Arguments"));
  console.log();
  print_tutorial()
  return;
}

const coin = new CryptoCoin(value, from, OPTIONS);

const result = coin.toString(to);

console.log(`${value} ${from} = ${result} ${to}`);


function print_tutorial() {
  console.log(`
crypto-coin - (version ${VERSION})

usage:            crypto-coin [from] [to] [value]

Arguments:
  -v              version
  -h              help
  -t <ETH | BTC>  types
`);
}

function print_denominations(type) {
  if (type === 'BTC') {
    console.log();
    console.log({
        'satoshi':      '1',
        'microbit':     '1000',
        'uBTC':         '1000',
        'mBTC':         '100000',
        'bitcent':      '100000',
        'megabit':      '100000000',
        'XBT':          '100000000',
        'BTC':          '100000000',
        'bitcoin':      '100000000'
    });
  }
  else if (type === 'ETH') {
    console.log();
    console.log({
        'wei':          '1',
        'kwei':         '1000',
        'ada':          '1000',
        'femtoether':   '1000',
        'mwei':         '1000000',
        'babbage':      '1000000',
        'picoether':    '1000000',
        'gwei':         '1000000000',
        'shannon':      '1000000000',
        'nanoether':    '1000000000',
        'nano':         '1000000000',
        'szabo':        '1000000000000',
        'microether':   '1000000000000',
        'micro':        '1000000000000',
        'finney':       '1000000000000000',
        'milliether':   '1000000000000000',
        'milli':        '1000000000000000',
        'ether':        '1000000000000000000',
        'kether':       '1000000000000000000000',
        'grand':        '1000000000000000000000',
        'einstein':     '1000000000000000000000',
        'mether':       '1000000000000000000000000',
        'gether':       '1000000000000000000000000000',
        'tether':       '1000000000000000000000000000000'
    });
  }
}
