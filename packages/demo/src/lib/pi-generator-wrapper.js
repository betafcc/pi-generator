/*
A quick and dirty module wrapper to conditionaly require based on browser support
*/

let piGenerator;


if (typeof BigInt !== 'undefined') {
  console.log('BigInt support detected, using native...')
  piGenerator = require('pi-generator')
}
else {
  console.log('BigInt support not detected, using legacy...')
  piGenerator = require('pi-generator-legacy')
}


export const initialEnv   = piGenerator.initialEnv
export const piDigits     = piGenerator.piDigits
export const takeDigits   = piGenerator.takeDigits
export const nextDigit    = piGenerator.nextDigit
export const stringifyEnv = piGenerator.stringifyEnv
export const parseEnv     = piGenerator.parseEnv
