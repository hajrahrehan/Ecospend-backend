# Auth and Security

## Authentication Flow
- User login uses email and password in `AuthController.Login` and returns a JWT.
- Registration creates user and returns a JWT.
- Admin login compares static admin credentials in `src/constants/Admins.json` and returns a JWT.

## Authorization Model
- User routes guarded by `Middleware.UserAuth` and `req.user`.
- Admin routes guarded by `Middleware.AdminAuth` which validates admin email only.
- No role or permission checks inside controllers.

## Token and Session Handling
- JWTs have no `exp` and no refresh token flow.
- `JwtKey` default is empty string in `config.js`.
- No token revocation or session invalidation on password change.

## Security Vulnerabilities
- Plaintext admin credentials in repository.
- Admin JWT validated against static list, not a database identity.
- Password update writes plaintext password and breaks bcrypt validation.
- `/product/buy` is unauthenticated and processes card data.
- Stored card `cvc` and `cardnumber` violate PCI and allow full compromise on DB leak.
- Chatwoot webhook lacks signature validation and can be abused for spam.
- No rate limiting or brute-force defense.

## Zero Trust Analysis
- Clients can forge or replay tokens without expiry.
- Internal services assume database writes always succeed without rollback.
- External webhook input is treated as trusted.

## Attack Scenarios and Mitigations
- Token theft yields permanent access. Mitigation: short-lived access tokens, refresh tokens, rotation, revocation.
- Admin takeover via leaked credentials. Mitigation: admin users in DB with bcrypt, MFA, and RBAC.
- Card brute-force via `/product/buy`. Mitigation: require auth, tokenize cards, rate limit.
- Balance race condition. Mitigation: Mongo transactions and idempotency keys.
