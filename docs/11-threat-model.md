# Threat Model

## Threat Actors
- External attackers probing auth and payment endpoints.
- Insiders with access to repository or database dumps.
- Automated bots targeting brute-force on login.

## Attack Surfaces
- Auth endpoints and JWT validation.
- Admin endpoints with static credentials.
- Payment and transfer endpoints.
- Chatwoot webhook.

## Exploit Scenarios
- JWT forging if `JWT_KEY` is unset.
- Permanent session hijack with stolen token.
- Card data exfiltration from DB.
- Webhook abuse to trigger outbound spam.
- Balance manipulation via concurrent requests.

## Abuse Cases
- Repeated transfer calls with race conditions.
- Large statement requests for denial of service.
- Replaying purchase requests without idempotency.

## Severity Ranking
1. JWT secret misconfiguration and no expiry.
2. PCI violations storing CVC and PAN.
3. Non-atomic money movement.
4. Unauthenticated purchase endpoint.
5. Static admin credentials.

## Zero Trust Violations
- Trusting webhook input without signature.
- Trusting internal state without transactional guardrails.
