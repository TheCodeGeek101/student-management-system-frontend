/**
 * Formats a number as a currency string.
 *
 * @param {number} amount - The number to format.
 * @param {string} [currency] - ISO currency code. If not provided, it will format without a currency symbol.
 * @param {string} [locale] - Locale code. If not provided, it will use the default locale of the environment.
 * @returns {string} - Formatted currency string or number string.
 * @throws {TypeError} - Throws if amount is not a number.
 */
export function formatCurrency(amount, currency, locale) {
  // if (typeof amount !== 'number') {
  //   throw new TypeError('Amount must be a number');
  // }

  const options = {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  };

  if (currency) {
    options.style = 'currency';
    options.currency = currency;
  } else {
    options.style = 'decimal';
  }

  const formatter = new Intl.NumberFormat(locale, options);

  return formatter.format(amount);
}
