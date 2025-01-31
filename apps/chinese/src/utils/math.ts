export const roundToDecimal = (num: number, decimalPlaces = 1) => {
  const factor = Math.pow(10, decimalPlaces);
  return Math.round(num * factor) / factor;
};
