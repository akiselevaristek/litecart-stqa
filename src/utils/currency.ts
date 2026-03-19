export type CurrencyInput = number | string;
export type CurrencyString = `$${number}`;

// Examples: parseCurrency(18) -> 18, parseCurrency('$18') -> 18, parseCurrency('$18.50') -> 18.5
export function parseCurrency(value: CurrencyInput): number {
  if (typeof value === 'number') {
    return value;
  }

  const normalizedValue = value.startsWith('$') ? value.slice(1) : value;
  return Number(normalizedValue);
}

// Examples: formatCurrencyFixed(18) -> '$18.00', formatCurrencyFixed('$18') -> '$18.00'
export function formatCurrencyFixed(value: CurrencyInput): CurrencyString {
  return `$${parseCurrency(value).toFixed(2)}` as CurrencyString;
}

// Examples: formatCurrencyCompact(18) -> '$18', formatCurrencyCompact(18.5) -> '$18.50'
export function formatCurrencyCompact(value: CurrencyInput): CurrencyString {
  const amount = parseCurrency(value);

  if (Number.isInteger(amount)) {
    return `$${amount}` as CurrencyString;
  }

  return formatCurrencyFixed(amount);
}
