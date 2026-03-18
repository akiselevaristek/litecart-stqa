export type CurrencyInput = number | string;
export type CurrencyString = `$${number}`;

export function parseCurrency(value: CurrencyInput): number {
  if (typeof value === 'number') {
    return value;
  }

  const normalizedValue = value.startsWith('$') ? value.slice(1) : value;
  return Number(normalizedValue);
}

export function formatCurrency(value: CurrencyInput): CurrencyString {
  return `$${parseCurrency(value).toFixed(2)}` as CurrencyString;
}
