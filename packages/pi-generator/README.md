# pi-generator

Pausable/resumable pi digits generator.

See the demo: https://betafcc.github.io/pi-generator

This module was made to demonstrate the new [native BigInt](https://github.com/tc39/proposal-bigint) for JS.


## Install

For node version > 10.x and latest Chrome:

`npm install pi-generator`

For older node and browsers, this equivalent package uses [big-integer](https://www.npmjs.com/package/big-integer) instead of the native BigInt:

`npm install pi-generator-legacy`


## Usage

Print pi digits forever:

```js
import {piDigits} from 'pi-generator'

for (const digit of piDigits())
  console.log(digit)

// 3
// 1
// 4
// 1
// 5
// ...
```

Take some digits:

```js
import {takeDigits} from 'pi-generator'

// generates first 5 digits
const [digits, env] = takeDigits(5)

console.log(digits) // '31415'

```

Note there is an extra returned value, the 'environment' of the calculation:

```js
console.log(env)
// { q: 622702080000000n,
//   r: -434409300281250n,
//   t: 213458046676875n,
//   k: 14n,
//   n: 6n,
//   l: 29n }
```

This is what makes possible to resume the digits expansion:

```js
// generates the next 5 digits, continuing from 'env'
const [moreDigits, nextEnv] = takeDigits(5, env)

console.log(moreDigits) // '92653'
```

The stringify and parse functions are provided to save the calculation environment:

```js
import {takeDigits, stringifyEnv, parseEnv} from 'pi-generator'

const [digits, env] = takeDigits(100)

// can store this one in a json file or wtv
const envString = stringifyEnv(env)


// can parse and resume the expansion
takeDigits(100, parseEnv(envString))
```
