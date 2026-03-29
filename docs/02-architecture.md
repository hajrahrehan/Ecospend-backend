# Architecture

## System Design
- Single Express app with route modules under `src/api`.
- Controllers hold validation and orchestration logic.
- Services are thin wrappers around Mongoose models.
- Database access is synchronous to request lifecycle.

## Folder Structure
- `config` contains server, database, and error setup.
- `src/api` contains route binding.
- `src/controllers` contains HTTP handlers and business logic.
- `src/services` contains data access wrappers.
- `src/models` contains Mongoose schemas.
- `src/utils` contains helper utilities.
- `errors` contains error dictionary and error manager.

## Request Lifecycle
1. `config/server.js` creates Express app and global middleware.
2. Route modules attach middleware and controller handlers.
3. Auth middleware sets `req.user` or rejects.
4. Controller validates input and calls `DBService`.
5. Mongoose returns docs and controller formats response.

## Data Flow Diagrams

### Login Flow
```
Client -> POST /auth/login -> AuthController.Login
AuthController -> UserService.FindOne -> MongoDB
AuthController -> bcrypt.compare -> jwt.sign
AuthController -> JSON response
```

### Transfer Flow
```
Client -> POST /transaction/transfer/:id -> Middleware.UserAuth
TransactionController -> BeneficiaryService.FindOne -> MongoDB
TransactionController -> UserService.UpdateUser (debit)
TransactionController -> UserService.UpdateUser (credit if internal)
TransactionController -> TransactionService.Create
```

## Component Relationships
- Controllers depend on `DBService` modules directly.
- Auth middleware depends on JWT and `DBService.User`.
- Admin auth depends on `src/constants/Admins.json`.

## Architectural Risks
- No explicit domain boundary between controller and persistence.
- No transactional boundary for money movement.
- No validation layer or schema enforcement at API boundary.
