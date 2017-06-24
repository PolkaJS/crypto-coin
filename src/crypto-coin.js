// @flow
import bigNum from 'bignumber.js';
import extend from 'extend';

const UNIT_MAP_ETH = {
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
};

const UNIT_MAP_BTC = {
    'satoshi':      '1',
    'microbit':     '1000',
    'uBTC':         '1000',
    'mBTC':         '100000',
    'bitcent':      '100000',
    'megabit':      '100000000',
    'XBT':          '100000000',
    'BTC':          '100000000',
    'bitcoin':      '100000000',
};

interface Options {
  DEFAULT_GAS:    string;
  UNIT_MAP:       Object;
  COIN:           string;
  BIG_NUM_CONFIG: Object;
}

export default class CryptoCoin {
  opts:         Options;
  bigNum:       bigNum;
  denomination: string;
  UNIT_MAP:     Object;
  DEFAULT_GAS:  string;
  // defaut
  constructor(num?: number | string | bigNum, radix?: string | number | Object, denom?: null | Object | string, opts?: null | Object) {
    if (!num)
      num = 0;
    // Handle missing arguments
    if (typeof radix === 'object'){
      // opts is the second argument
      opts = radix;
      radix = 10;
    }
    if (typeof denom === 'object'){
      // opts is the third argument
      opts  = denom;
      denom = null; // we havn't set which UNIT_MAP we are using yet..
    }
    if (typeof radix === 'string'){
      // denomination is the second argument
      denom = radix;
      radix  = 10;
    }
    // set the proper UNIT_MAP if COIN specified
    if (opts && 'COIN' in opts) {
      if (opts.COIN === 'ETH')
          opts.UNIT_MAP = UNIT_MAP_ETH;
      else if (opts.COIN === 'BTC')
          opts.UNIT_MAP = UNIT_MAP_BTC;
    }
    // track options incase of new instantiations (add, sub, div, ...);
    // set defaults and pull in new if opts has any
    this.opts = extend({
      DEFAULT_GAS:    '21000',
      UNIT_MAP:       UNIT_MAP_ETH,
      COIN:           'ETH',
      BIG_NUM_CONFIG: {}
    }, opts);
    // setup bigNum config incase a new config exists
    bigNum.config(this.opts.BIG_NUM_CONFIG);
    // default radix is 10
    this.bigNum = (num instanceof bigNum) ? num : new bigNum(num, radix);
    // setup the denomination map
    this.UNIT_MAP = this.opts.UNIT_MAP;
    // setup the DEFAULT_GAS
    this.DEFAULT_GAS  = this.opts.DEFAULT_GAS;
    // which is set in the _convert method
    this._convert(Object.keys(this.UNIT_MAP)[0], denom);
    // dynamically create methods named after the UNIT_MAP of choice:
    this.createProtoTypes(this);
  }

  /** Constructor Methods **/

  createProtoTypes(self: CryptoCoin) {
    Object.keys(this.UNIT_MAP).forEach((denomination: string) => {
      // $FlowFixMe
      self[denomination] = function () {
        self._convert(denomination, self.denomination);
        self.denomination = denomination;
        return self;
      }
    });
  }

  /** bigNum methods **/
  abs(): CryptoCoin {
    this.bigNum = this.bigNum.abs();
    return this;
  }

  absoluteValue(): CryptoCoin {
    this.bigNum = this.bigNum.absoluteValue();
    return this;
  }

  add(num: string | number | bigNum, radix?: number, denom?: string): CryptoCoin {
    if (typeof radix === 'string') {
      denom = radix;
      radix  = 10;
    }
    if (denom)
      num = new CryptoCoin(num, denom, this.opts);

    this.bigNum = this.bigNum.add(num, radix);
    return this;
  }

  ceil(): CryptoCoin {
    this.bigNum = this.bigNum.ceil();
    return this;
  }

  comparedTo(num: string | number | bigNum, radix?: number): CryptoCoin {
    this.bigNum = this.bigNum.comparedTo(num, radix);
    return this;
  }

  cmp(num: string | number | bigNum, radix?: number): CryptoCoin {
    this.bigNum = this.bigNum.cmp(num, radix);
    return this;
  }

  decimalPlaces(): CryptoCoin {
    return this.bigNum.decimalPlaces();
  }

  dp(): CryptoCoin {
    return this.bigNum.dp();
  }

  dividedBy(num: string | number | bigNum, radix?: number, denom?: string): CryptoCoin {
    if (typeof radix === 'string') {
      denom = radix;
      radix  = 10;
    }
    if (denom)
      num = new CryptoCoin(num, denom, this.opts);

    this.bigNum = this.bigNum.dividedBy(num, radix);
    return this;
  }

  div(num: string | number | bigNum, radix?: number, denom?: string): CryptoCoin {
    if (typeof radix === 'string') {
      denom = radix;
      radix  = 10;
    }
    if (denom)
      num = new CryptoCoin(num, denom, this.opts);

    this.bigNum = this.bigNum.div(num, radix);
    return this;
  }

  dividedToIntegerBy(num: string | number | bigNum, radix?: number, denom?: string): CryptoCoin {
    if (typeof radix === 'string') {
      denom = radix;
      radix  = 10;
    }
    if (denom)
      num = new CryptoCoin(num, denom, this.opts);

    this.bigNum = this.bigNum.dividedToIntegerBy(num, radix);
    return this;
  }

  divToInt(num: string | number | bigNum, radix?: number, denom?: string): CryptoCoin {
    if (typeof radix === 'string') {
      denom = radix;
      radix  = 10;
    }
    if (denom)
      num = new CryptoCoin(num, denom, this.opts);

    this.bigNum = this.bigNum.divToInt(num, radix);
    return this;
  }

  eq(num: string | number | bigNum, radix?: number): bool {
    return this.bigNum.eq(num, radix);
  }

  equals(num: string | number | bigNum, radix?: number): bool {
    return this.bigNum.equals(num, radix);
  }

  floor(): CryptoCoin {
    this.bigNum = this.bigNum.floor();
    return this;
  }

  greaterThan(num: string | number | bigNum, radix?: number): bool {
    return this.bigNum.greaterThan(num, radix);
  }

  gt(num: string | number | bigNum, radix?: number): bool {
    return this.bigNum.gt(num, radix);
  }

  greaterThanOrEqualTo(num: string | number | bigNum, radix?: number): bool {
    return this.bigNum.greaterThanOrEqualTo(num, radix);
  }

  gte(num: string | number | bigNum, radix?: number): bool {
    return this.bigNum.gte(num, radix);
  }

  isFinite(): bool {
    return this.bigNum.isFinite();
  }

  isInteger(): bool {
    return this.bigNum.isInteger();
  }

  isInt(): bool {
    return this.bigNum.isInt();
  }

  isNaN(): bool {
    return this.bigNum.isNaN();
  }

  isNegative(): bool {
    return this.bigNum.isNegative();
  }

  isZero(): bool {
    return this.bigNum.isZero();
  }

  lessThan(num: string | number | bigNum, radix?: number): bool {
    return this.bigNum.lessThan(num, radix);
  }

  lt(num: string | number | bigNum, radix?: number): bool {
    return this.bigNum.lt(num, radix);
  }

  lessThanOrEqualTo(num: string | number | bigNum, radix?: number): bool {
    return this.bigNum.lessThanOrEqualTo(num, radix);
  }

  lte(num: string | number | bigNum, radix?: number): bool {
    return this.bigNum.lte(num, radix);
  }

  minus(num: string | number | bigNum, radix?: number, denom?: string): CryptoCoin {
    if (typeof radix === 'string') {
      denom = radix;
      radix  = 10;
    }
    if (denom)
      num = new CryptoCoin(num, denom, this.opts);

    this.bigNum = this.bigNum.minus(num, radix);
    return this;
  }

  modulo(num: string | number | bigNum, radix?: string | number): CryptoCoin {
    this.bigNum = this.bigNum.modulo(num, radix);
    return this;
  }

  mod(num: string | number | bigNum, radix?: number): CryptoCoin {
    this.bigNum = this.bigNum.mod(num, radix);
    return this;
  }

  mul(num: string | number | bigNum, radix?: number, denom?: string): CryptoCoin {
    if (typeof radix === 'string') {
      denom = radix;
      radix  = 10;
    }
    if (denom)
      num = new CryptoCoin(num, denom, this.opts);
      
    this.bigNum = this.bigNum.mul(num, radix);
    return this;
  }

  negated(num: string | number | bigNum, radix?: number): CryptoCoin {
    this.bigNum = this.bigNum.negated(num, radix);
    return this;
  }

  neg(num: string | number | bigNum, radix?: number): CryptoCoin {
    this.bigNum = this.bigNum.neg(num, radix);
    return this;
  }

  plus(num: string | number | bigNum, radix?: number, denom?: string): CryptoCoin {
    if (typeof radix === 'string') {
      denom = radix;
      radix  = 10;
    }
    if (denom)
      num = new CryptoCoin(num, denom, this.opts);

    this.bigNum = this.bigNum.plus(num, radix);
    return this;
  }

  precision(z?: bool | number): CryptoCoin {
    // 0, 1 or true, false
    this.bigNum = this.bigNum.precision(z);
    return this;
  }

  sd(z?: bool | number): CryptoCoin { // (precision)
    // 0, 1 or true, false
    this.bigNum = this.bigNum.sd(z);
    return this;
  }

  round(dp?: number, rm?: number): CryptoCoin {
    // dp: number: integer, 0 to 1e+9 inclusive
    // rm: number: integer, 0 to 8 inclusive
    // if dp is omitted, or is null or undefined, the return value is n rounded to a whole number.
    // if rm is omitted, or is null or undefined, ROUNDING_MODE is used.
    this.bigNum = this.bigNum.round(dp, rm);
    return this;
  }

  shift(num: number): CryptoCoin {
    // num: integer, -9007199254740991 to 9007199254740991 inclusive
    this.bigNum = this.bigNum.shift(num);
    return this;
  }

  squareRoot(): CryptoCoin {
    this.bigNum = this.bigNum.squareRoot();
    return this;
  }

  sqrt(num: string | number | bigNum): CryptoCoin {
    this.bigNum = this.bigNum.sqrt(num);
    return this;
  }

  sub(num: string | number | bigNum, radix?: number, denom?: string): CryptoCoin {
    if (typeof radix === 'string') {
      denom = radix;
      radix  = 10;
    }
    if (denom)
      num = new CryptoCoin(num, denom, this.opts);

    this.bigNum = this.bigNum.sub(num);
    return this;
  }

  times(num: string | number | bigNum, radix?: number, denom?: string): CryptoCoin {
    if (typeof radix === 'string') {
      denom = radix;
      radix  = 10;
    }
    if (denom)
      num = new CryptoCoin(num, denom, this.opts);

    this.bigNum = this.bigNum.times(num);
    return this;
  }

  toDigits(sd?: number, rd?: number): CryptoCoin {
    // sd: number: integer, 0 to 1e+9 inclusive
    // rd: number: integer, 0 to 8 inclusive
    // if sd is omitted, or is null or undefined, the return value is n roundeded to a whole number.
    // if rd is omitted, or is null or undefined, ROUNDING_MODE is used.
    this.bigNum = this.bigNum.toDigits(sd, rd);
    return this;
  }

  toExponential(dp?: number, rm?: number): CryptoCoin {
    // dp: number: integer, 0 to 1e+9 inclusive
    // rm: number: integer, 0 to 8 inclusive
    // if dp is omitted, or is null or undefined, the return value is n roundeded to a whole number.
    // if rm is omitted, or is null or undefined, ROUNDING_MODE is used.
    this.bigNum = this.bigNum.toExponential(dp, rm);
    return this;
  }

  toFixed(dp?: number, rm?: number): CryptoCoin {
    // dp: number: integer, 0 to 1e+9 inclusive
    // rm: number: integer, 0 to 8 inclusive
    // if dp is omitted, or is null or undefined, the return value is n roundeded to a whole number.
    // if rm is omitted, or is null or undefined, ROUNDING_MODE is used.
    this.bigNum = this.bigNum.toFixed(dp, rm);
    return this;
  }

  toFormat(dp?: number, rm?: number): CryptoCoin {
    // dp: number: integer, 0 to 1e+9 inclusive
    // rm: number: integer, 0 to 8 inclusive
    // if dp is omitted, or is null or undefined, the return value is n roundeded to a whole number.
    // if rm is omitted, or is null or undefined, ROUNDING_MODE is used.
    this.bigNum = this.bigNum.toFormat(dp, rm);
    return this;
  }

  toFraction(num: string | number | bigNum): Array<string> {
    return this.bigNum.toFraction(num);
  }

  toJSON(num: string | number | bigNum): string {
    return this.bigNum.toJSON(num);
  }

  toNumber(): number {
    return this.bigNum.toNumber();
  }

  toPower(n: number, m?: string | number | bigNum): CryptoCoin {
    // n: integer, -9007199254740991 to 9007199254740991 inclusive
    // BigNumber raised to the power n, and optionally modulo a modulus m.
    this.bigNum = this.bigNum.toPower(n, m);
    return this;
  }

  pow(n: number, m?: string | number | bigNum): CryptoCoin {
    // n: integer, -9007199254740991 to 9007199254740991 inclusive
    // BigNumber raised to the power n, and optionally modulo a modulus m.
    this.bigNum = this.bigNum.pow(n, m);
    return this;
  }

  toPrecision(sd?: number, rd?: number): CryptoCoin {
    // sd: number: integer, 0 to 1e+9 inclusive
    // rd: number: integer, 0 to 8 inclusive
    // if sd is omitted, or is null or undefined, the return value is n roundeded to a whole number.
    // if rd is omitted, or is null or undefined, ROUNDING_MODE is used.
    this.bigNum = this.bigNum.toPrecision(sd, rd);
    return this;
  }

  truncated(): CryptoCoin {
    this.bigNum = this.bigNum.truncated();
    return this;
  }

  trunc(): CryptoCoin {
    this.bigNum = this.bigNum.trunc();
    return this;
  }

  toString(radix: string | number = 10, denom?: string): string {
    // if denom is set, lets add the denom type:
    if (typeof radix === 'string'){
      denom = radix;
      radix = 10;
    }
    // lets not edit the actual value (persistance)
    let ts = new CryptoCoin(this.bigNum, this.opts);
    return (denom)
      ? ts[denom]().toString(radix)
      : ts.bigNum.toString(radix);
  }

  defaultGas() {
    this.bigNum = new bigNum(this.DEFAULT_GAS);
    return this;
  }

  _convert(to: string, from?: null | string = Object.keys(this.UNIT_MAP)[0]) {
    let from_num   = new bigNum(this.UNIT_MAP[from]);
    let to_num     = new bigNum(this.UNIT_MAP[to]);
    let multiplier = from_num.div(to_num);
    this.bigNum    = this.bigNum.mul(multiplier);
  }
}
