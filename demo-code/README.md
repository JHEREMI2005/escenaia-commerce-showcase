# Technical Samples

These files are **sanitized portfolio samples derived from the private EscenaIA Commerce/Core implementation**.

They demonstrate provider selection, payment-event normalization, reconciliation and fail-closed QA patterns without publishing live credentials, webhook secrets, production mappings, customer data, Shopify private theme code or payment configuration.

## Samples

- `provider-selection.mjs` — deterministic provider routing with a production guard for TEST payments.
- `payment-event-normalization.mjs` — canonical event normalization and mismatch review.
- `commerce-qa.test.mjs` — runnable Node.js tests for provider and reconciliation behavior.

## Run the public tests

```bash
node --test demo-code/commerce-qa.test.mjs
```

## Important

These examples are reduced and sanitized for portfolio review. Real signature verification, provider credentials, product mappings, checkout configuration and customer/order data remain private.
