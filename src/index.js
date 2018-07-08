import bigInt from 'big-integer';


export const initialEnv = Object.freeze({
  q : bigInt(1),
  r : bigInt(0),
  t : bigInt(1),
  k : bigInt(1),
  n : bigInt(3),
  l : bigInt(3),
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


// q*4 + r - t < n*t
const shouldYield = ({q, r, t, n}) =>
  q.times(4).plus(r).minus(t).lesser(n.times(t));


const remainderEnv = ({q, r, t, k, n, l}) =>
  ({
    q: q.times(10),
    // (r - n * t) * 10
    r: r.minus(n.times(t)).times(10),
    t,
    k,
    // (((q * 3 + r) * 10) / t) - n * 10
    n: q.times(3).plus(r).times(10).divide(t).minus(n.times(10)),
    l,
  });


const recursiveEnv = ({q, r, t, k, n, l}) =>
  ({
    q: q.times(k),
    // (q * 2 + r) * l
    r: q.times(2).plus(r).times(l),
    t: t.times(l),
    k: k.plus(1),
    // (q * (7 * k) + 2 + (r*l)) / (t*l)
    n: q.times(7).times(k).plus(2).plus(r.times(l)).divide(t.times(l)),
    l: l.plus(2),
  });


export const stringifyEnv = env =>
  JSON.stringify(env);


export const parseEnv = envString =>
  Object
    .entries(JSON.parse(envString))
    .reduce((acc, [k, v]) =>
      (acc[k] = bigInt(v), acc)
    , {});
