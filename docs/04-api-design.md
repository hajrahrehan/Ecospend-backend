# API Design

## Structure and Consistency
- Base routes: `/auth`, `/product`, `/chatwoot`, `/user`, `/beneficiary`, `/transaction`, `/ticket`, `/admin`.
- Action verbs are embedded in paths, reducing REST consistency.
- No versioning (`/v1`).

## Endpoint Classification
- Auth: `POST /auth/login`, `POST /auth/register`, `POST /auth/admin-login`.
- User: `GET /user`, `GET /user/cards`, `PATCH /user/update/email`, `PATCH /user/update/password`.
- Beneficiary: `GET /beneficiary`, `POST /beneficiary`, `PATCH /beneficiary/:bid`, `DELETE /beneficiary/:bid`.
- Transaction: `POST /transaction/transfer/:id`, `GET /transaction/statement`.
- Product: `POST /product/buy`.
- Ticket: `GET /ticket`, `POST /ticket`, `PATCH /ticket/:id`.
- Admin: `GET /admin/users`, `GET /admin/tickets`, `POST /admin/resolve-ticket`, `POST /admin/issue-card/:userId`, `POST /admin/close-account/:userId`, `POST /admin/add-money/:userId`, `POST /admin/block-card`.

## Request and Response Formats
- Responses are JSON with `status`, `message`, and `data`.
- Error responses use `errors/index.json` and vary in status codes.

## Validation Gaps
- No centralized validation or schemas for request bodies.
- Numeric validation is partial and inconsistent.
- Path parameters are not validated for ObjectId format.

## Design Issues
- `POST /product/buy` is a transactional payment flow without auth.
- `POST /transaction/transfer/:id` uses beneficiary ID but not explicit resource scoping.
- Ticket reply is a `PATCH` on user ticket but resolves immediately without user scope check.
- Admin actions are not idempotent and have no audit trail.
