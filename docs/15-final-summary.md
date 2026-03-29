# Final Summary

## Maturity Assessment
- Security maturity is low due to missing token lifecycle, weak admin auth, and PCI violations.
- Reliability is moderate but at risk due to non-atomic updates and synchronous error logging.
- Scalability is low due to lack of caching, pagination, and async processing.

## Top Risks
1. JWTs have no expiry and may use an empty secret.
2. Full card data and CVC stored in database.
3. Money movement is non-transactional and race prone.
4. Unauthenticated purchase endpoint is exposed to abuse.
5. Static admin credentials and weak admin authorization.

## Final Recommendations
- Prioritize auth hardening, card data removal, and transactional money movement.
- Introduce validation, error normalization, and pagination.
- Add observability and audit logging before scaling.

## Architecture Scorecard
- Security: 2/10
- Reliability: 4/10
- Performance: 4/10
- Scalability: 3/10
- Maintainability: 4/10
