const NumberFormatter  = new Intl.NumberFormat('en-US', {
  maximumFractionDigits: 10,
})

export const PI: number = 3.14159265358979323846264338327950288419716939937510582097494459230781640628620899;

export function formatNumber(number: number) {
  return NumberFormatter.format(number);
}

export function removeLastDigit(n: number) {
  return (n / 10) - (n % 10) / 10;
}

export function degreesToRadians(n: number): number {
  return n * PI / 180;
}

export function radiansToDegrees(n: number): number {
  return n * 180 / PI;
}