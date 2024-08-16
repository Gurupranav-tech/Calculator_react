import { formatNumber, PI } from './formatter'

const cache: Map<number, number> = new Map();

export function factorial(n: number): number {
  if (cache.has(n)) return cache.get(n) || 1;
  if (n <= 1) return 1;
  return n * factorial(n-1);
}

export function pow(a: number, n: number) {
  let b=1;
  for (let i = 0; i < n; i++) b *= a;
  return b;
}

function getInDomain(n: number): number {
  if (n >= 0) {
    while (n >= 7) n -= PI * 2;
    return n;
  } else {
    while (n <= -7) n += PI * 2;
    return n;
  }
}

export function sin(n: number) {
  n = getInDomain(n);
  let val = 0;
  let sign = 1;

  for (let i = 0; i < 150; i++) {
    let a = 2 * i + 1;
    val += sign * pow(n, a) / factorial(a);
    sign *= -1;
  }

  return val;
}

export function cos(n: number) {
  n = getInDomain(n);
  let val = 1;
  let sign = -1;

  for (let i = 1; i <= 150; i++) {
    let a = 2 * i;
    val += sign * pow(n, a) / factorial(a);
    sign *= -1;
  }

  return val;
}

export function tan(n: number) { 
  if (formatNumber(cos(n)) === "0") return Infinity * sin(n);

  return sin(n) / cos(n); 
}

export function csc(n: number) { 
  if (n === 0) return Infinity;
  if (Number.isFinite(cot(n)))
    return 1 / sin(n);
  return Infinity * sin(n);
}

export function sec(n: number) { 
  if (formatNumber(sin(n)) === "1" || formatNumber(sin(n)) === "-1") return Infinity * sin(n);
  return 1 / cos(n); 
}

export function cot(n: number) { 
  if (formatNumber(cos(n)) === "1" || formatNumber(cos(n)) === "-1") return Infinity * cos(n);
  return 1 / tan(n);
}
