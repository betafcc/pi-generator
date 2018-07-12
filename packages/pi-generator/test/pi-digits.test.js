import {expect} from 'chai';
import {take, PI} from './util';

import {
  piDigits,
  takeDigits,
  nextDigit,
  initialEnv,
  stringifyEnv,
  parseEnv,
} from '../src/index';


describe('piDigits', () => {
  it('Should correctly produce 100 digits', () =>
    expect(
      take(100, piDigits()).join('')
    ).to.equal(PI.slice(0, 100))
  )
});


describe('nextDigit', () => {
  it('Should produce Pi digits', () => {
    let digits = '';

    // Calculate 100 digits
    let env = initialEnv;
    for (let i = 0; i < 100; i+=1) {
      const [digit, nextEnv] = nextDigit(env);

      digits += digit;
      env = nextEnv;
    }

    expect(digits).to.equal(PI.slice(0, 100));
  })

});


describe('takeDigits', () => {
  it('Should correctly produce 100 digits in one go', () =>
    expect(
      takeDigits(100)[0]
    ).to.equal(PI.slice(0, 100))
  );

  it('Should correctly produce 100 digits in 10 steps', () => {
    let digits = '';
    let currentEnv = initialEnv;

    for (let i = 0; i < 10; i+=1) {
      const [chunk, nextEnv] = takeDigits(10, currentEnv);

      expect(chunk).to.equal(PI.slice(i * 10, (i + 1) * 10));

      digits += chunk;
      currentEnv = nextEnv;
    }

    expect(digits).to.equal(PI.slice(0, 100));
  });
});


describe('stringifyEnv and parseEnv', () => {
  it('Should be inverse', () => {
    const roundabout = parseEnv(stringifyEnv(initialEnv));

    expect(roundabout).to.deep.equal(initialEnv);
  })
});
