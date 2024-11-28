export  function parseStrinForFloat(input: string): number{
  const numbersOnly = input.replace(/[^\d.,]/g, '');

  return parseFloat(parseFloat(numbersOnly).toFixed(2));
};