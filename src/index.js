import bigInt from 'big-integer';


export const initialEnv = Object.freeze({
  q : bigInt(1),
  r : bigInt(0),
  t : bigInt(1),
  k : bigInt(1),
  n : bigInt(3),
  l : bigInt(3),
});


export const stringifyEnv = env =>
  JSON.stringify(env);


export const parseEnv = envString =>
  Object
    .entries(JSON.parse(envString))
    .reduce((acc, [k, v]) =>
      (acc[k] = bigInt(v), acc)
    , {});
