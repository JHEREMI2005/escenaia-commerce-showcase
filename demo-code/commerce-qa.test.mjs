import test from 'node:test';
import assert from 'node:assert/strict';
import { selectCommerceProvider } from './provider-selection.mjs';
import { normalizePaymentEvent, reconcilePayment } from './payment-event-normalization.mjs';

test('Bolivia BOB defaults to manual QR', () => {
  assert.equal(selectCommerceProvider({ country: 'BO', currency: 'BOB' }), 'QR_BOLIVIA_MANUAL');
});

test('TEST provider is blocked in production', () => {
  assert.throws(() => selectCommerceProvider({
    country: 'BO',
    currency: 'BOB',
    preference: 'TEST',
    isProduction: true
  }), (error) => error.code === 'TEST_PROVIDER_DISABLED');
});

test('payment mismatch requires review instead of granting access', () => {
  const payment = normalizePaymentEvent({
    externalEventId: 'evt-1',
    externalTransactionId: 'tx-1',
    canonicalType: 'PAYMENT_SUCCEEDED',
    amountMinor: 1000,
    currency: 'USD'
  });

  const result = reconcilePayment(payment, {
    productVersionId: 'product-v1',
    amountMinor: 1500,
    currency: 'USD'
  });

  assert.equal(result.state, 'REQUIRES_REVIEW');
  assert.deepEqual(result.reasons, ['AMOUNT_MISMATCH']);
});
