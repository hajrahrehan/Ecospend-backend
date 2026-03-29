# Migration Guide

## Migration Goals
- Preserve API contracts while hardening security and data model.
- Avoid downtime for balance operations and ticketing.

## Stepwise Migration
1. Introduce new JWT with expiration alongside old tokens.
2. Add refresh token storage and rotate on login.
3. Add new card token fields while keeping existing card schema.
4. Backfill tokenized card references and remove CVC storage.
5. Add transactional transfer and purchase flows with feature flags.

## Backward Compatibility
- Accept both old and new JWTs during transition.
- Support old card schema until migration finishes.
- Keep response shapes stable until consumers are updated.

## Rollout Phases
- Phase 1: Auth hardening and rate limiting.
- Phase 2: Data model changes with backfill jobs.
- Phase 3: Cutover to transactional money movement.
- Phase 4: Remove deprecated fields and endpoints.

## Risk Mitigation
- Use idempotency keys for all transfers and purchases.
- Add audit logs for admin actions.
- Monitor error rates and rollback quickly if anomalies occur.
