export function convertMetersPerKilometer(metros: number): number {
  const quilometros = metros / 1000;
  return parseFloat(quilometros.toFixed(2));
}
