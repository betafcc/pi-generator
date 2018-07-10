// Super hard to use literal syntax with webpack
// use this for now
const BigInt =
  (typeof window !== 'undefined') ? window.BigInt :
  (typeof self !== 'undefined') ? self.BigInt :
  global.BigInt;


export const initialEnv = Object.freeze({
  q : BigInt(1),
  r : BigInt(0),
  t : BigInt(1),
  k : BigInt(1),
  n : BigInt(3),
  l : BigInt(3),
});


export const piDigits = function* () {
  let r,
      env = initialEnv;

  while (true) {
    [r, env] = nextDigit(env);
    yield r;
  }
};


export const takeDigits = (n, env=initialEnv) => {
  let digits = '';
  let currentEnv = env;

  for (let i = 0; i < n; i+=1) {
    const [digit, nextEnv] = nextDigit(currentEnv);

    digits += digit;
    currentEnv = nextEnv;
  }

  return [digits, currentEnv];
};


export const nextDigit = (env=initialEnv) =>
  shouldYield(env)
  ? [env.n.toString(), remainderEnv(env)]
  : nextDigit(recursiveEnv(env));


const shouldYield = ({q, r, t, n}) =>
  q * BigInt(4) + r - t < n * t;


const remainderEnv = ({q, r, t, k, n, l}) =>
  ({
    q: q * BigInt(10),
    r: (r - n * t) * BigInt(10),
    t,
    k,
    n: (((q * BigInt(3) + r) * BigInt(10)) / t) - n * BigInt(10),
    l,
  });


const recursiveEnv = ({q, r, t, k, n, l}) =>
  ({
    q: q * k,
    r: (q * BigInt(2) + r) * l,
    t: t * l,
    k: k + BigInt(1),
    n: (q * (BigInt(7) * k) + BigInt(2) + (r*l)) / (t*l),
    l: l + BigInt(2),
  });


export const stringifyEnv = env =>
  JSON.stringify(env);


export const parseEnv = envString =>
  Object
    .entries(JSON.parse(envString))
    .reduce((acc, [k, v]) =>
      (acc[k] = BigInt(v), acc)
    , {});
