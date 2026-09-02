// Simplified provider-neutral payment normalization example.
// Real signature verification remains a separate fail-closed boundary.

const VALID_STATUS = new Set([
  'PAYMENT_SUCCEEDED',
  'PAYMENT_FAILED',
  'REFUND_SUCCEEDED',
  'CHARGEBACK_OPENED'
]);

export function normalizePaymentEvent(event) {
  if (!event?.externalEventId || !event?.externalTransactionId) {
    throw Object.assign(new Error('Payment event is incomplete.'), { code: 'EVENT_INVALID' });
  }

  if (!VALID_STATUS.has(event.canonicalType)) {
    throw Object.assign(new Error('Payment status is unsupported.'), { code: 'EVENT_INVALID' });
  }

  return Object.freeze({
    externalEventId: String(event.externalEventId),
    externalTransactionId: String(event.externalTransactionId),
    canonicalType: event.canonicalType,
    amountMinor: Number(event.amountMinor),
    currency: String(event.currency),
    verificationState: 'FIXTURE_VERIFIED'
  });
}

export function reconcilePayment(normalized, expected) {
  const reasons = [];
  if (!expected.productVersionId) reasons.push('UNKNOWN_PRODUCT');
  if (normalized.amountMinor !== expected.amountMinor) reasons.push('AMOUNT_MISMATCH');
  if (normalized.currency !== expected.currency) reasons.push('CURRENCY_MISMATCH');

  return {
    state: reasons.length ? 'REQUIRES_REVIEW' : 'MATCHED',
    reasons
  };
}
