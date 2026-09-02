// Sanitized commerce routing example derived from EscenaIA Commerce.
// Selection is deterministic and local TEST payments are blocked outside development.

export function selectCommerceProvider({ country, currency, preference = null, isProduction = false }) {
  if (preference === 'TEST') {
    if (isProduction) {
      throw Object.assign(new Error('TEST payments are disabled in production.'), {
        code: 'TEST_PROVIDER_DISABLED'
      });
    }
    return 'TEST';
  }

  if (preference === 'QR_BOLIVIA_MANUAL') {
    if (country !== 'BO' || currency !== 'BOB') {
      throw Object.assign(new Error('QR Bolivia requires BO / BOB.'), {
        code: 'PROVIDER_CURRENCY_MISMATCH'
      });
    }
    return 'QR_BOLIVIA_MANUAL';
  }

  if (preference === 'HOTMART') return 'HOTMART';
  if (preference === 'OCEANPAYMENT') return 'OCEANPAYMENT';

  return country === 'BO' && currency === 'BOB'
    ? 'QR_BOLIVIA_MANUAL'
    : 'HOTMART';
}
