const NumberFormatter  = new Intl.NumberFormat('en-US')

export function formatNumber(number: number) {
  return NumberFormatter.format(number);
}

export function removeLastDigit(n: number) {
  return (n / 10) - (n % 10) / 10;
}