import { factorial, pow } from "./trig";

export const LN2 = 0.6931471805599453;

export function ln(n: number) {
  let iter = 0;
  while (n >= 1.8) {
    n /= 2;
    iter++;
  }

  let val = 0;
  let sign = 1;

  n--;
  for (let i = 1; i <= 2000; i++) {
    val += sign * pow(n, i) / i;
    sign *= -1;
  }

  return val + iter * LN2;
}

export function exp(n: number) {
  let val = 1;
  for (let i = 1; i <= 150; i++) {
    val += pow(n, i) / factorial(i);
  }
  return val;
}