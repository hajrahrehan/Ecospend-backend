# Database Design

## Schema Review
- Users contain PII, account number, and balance in `src/models/User.js`.
- Cards store full `cardnumber` and `cvc` in `src/models/Card.js`.
- Transactions store both sender userId and receiver account number in `src/models/Transaction.js`.
- Beneficiaries store `account_no` and `bank` in `src/models/Beneficiary.js`.

## Indexing Issues
- No explicit indexes for `transactions.userId`, `transactions.account_no`, `transactions.time`.
- No composite index for beneficiary uniqueness by `(userId, account_no)`.
- Tickets queries filter by `status` and `userId` without indexes.

## Consistency and Integrity Risks
- Balances are updated in separate calls without transactions.
- Transfers can partially update sender balance without creating receiver credit if failure occurs.
- Account numbers are generated randomly without uniqueness guarantee.

## Transaction Handling
- No MongoDB session usage or retry handling.
- No idempotency key support for transfer or purchase.

## Query Performance Problems
- Daily limit check loads all transactions into memory and sums in code.
- Statement endpoint can return unbounded results and no pagination.
