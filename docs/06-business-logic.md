# Business Logic

## Core Workflows

### Registration
- Validate fields, ensure age >= 18.
- Generate account number with prefix `1234` and random digits.
- Hash password with bcrypt.
- Create user record and issue JWT.

### Login
- Find user by email.
- Compare bcrypt hash.
- Issue JWT.

### Beneficiary Management
- Ensure beneficiary is not self.
- Ensure uniqueness per user.
- If internal bank, resolve and store official name.

### Transfer
- Validate amount and minimum threshold.
- Ensure beneficiary belongs to user.
- Debit sender and optionally credit internal receiver.
- Insert transaction record.

### Purchase
- Validate card details.
- Apply card type discount.
- Enforce daily purchase limit by summing transactions.
- Debit balance and insert transaction.

### Tickets
- User can create and reply to tickets.
- Admin resolves tickets and sets status closed.

## Edge Cases and Gaps
- Update password stores plaintext and breaks login.
- Transfer and purchase are not atomic.
- Daily limit calculation is race prone under concurrent calls.
- Admin add money has no idempotency or approval flow.

## Hidden Coupling
- Card type limits come from `config.js` and are hardcoded.
- Admins are hardcoded in `src/constants/Admins.json`.
- `Transaction` model is used for both purchases and transfers with minimal schema enforcement.
