// 100 digits of PI
export const PI = [
  '3141592653',
  '5897932384',
  '6264338327',
  '9502884197',
  '1693993751',
  '0582097494',
  '4592307816',
  '4062862089',
  '9862803482',
  '5342117067',
].join('');


export const take = (n, iterator) =>
  Array(n)
    .fill()
    .map(() => iterator.next().value);
