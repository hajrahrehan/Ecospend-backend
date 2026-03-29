# Refactor Plan

## Phase 1: Security Stabilization
- Enforce JWT expiry and validation of `iss` and `aud`.
- Add refresh tokens and server-side revocation.
- Remove stored CVC and migrate PAN to payment token.
- Implement rate limiting for auth and payment endpoints.
- Add webhook signature validation for Chatwoot.

## Phase 2: Consistency and Reliability
- Introduce centralized input validation with schemas.
- Fix password update to bcrypt hash and rotate tokens.
- Add global error handler and normalize status codes.
- Add pagination to all list endpoints.

## Phase 3: Domain Architecture
- Create domain services for transfer and purchase.
- Add repository layer with explicit projections.
- Introduce idempotency keys for balance-affecting operations.

## Phase 4: Scalability
- Add Redis for caching and rate limiting.
- Add job queue for notifications, auditing, and fraud checks.
- Introduce structured logging and metrics.
