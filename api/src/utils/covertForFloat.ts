export function convertForFloat(number: number, floatPoints: number): number {
  return parseFloat(number.toFixed(floatPoints));
}
