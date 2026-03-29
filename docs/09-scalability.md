# Scalability

## Current Limitations
- No stateless session strategy beyond JWT.
- No cache layer and no distributed locks.
- No asynchronous job processing.
- Unbounded list endpoints create memory and time pressure.

## Horizontal Scaling Readiness
- Stateless JWT allows scaling, but no token revocation store.
- No request correlation IDs or structured logging for distributed tracing.

## Queue and Event Gaps
- Transfers and purchases are processed inline.
- No event stream for auditing, fraud detection, or notifications.

## Load Handling Risks
- Auth and payment endpoints are vulnerable to brute-force and abuse.
- Purchase flow does not enforce idempotency under retries.

## Recommended Changes
- Add Redis for rate limiting and caching.
- Introduce job queue for post-transaction workflows.
- Add idempotency keys for balance-affecting endpoints.
- Add pagination on all list endpoints.
