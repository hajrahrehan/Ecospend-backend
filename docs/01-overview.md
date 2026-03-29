# Overview

## Purpose
This backend implements a banking-style system with user accounts, cards, beneficiaries, transactions, support tickets, and a Chatwoot AI support webhook. It exposes REST endpoints for authentication, account management, transfers, card issuance, purchases, and ticketing.

## Core Features
- User registration, login, and profile updates.
- Admin actions: user listing, add balance, issue or block cards, close accounts, resolve tickets.
- Beneficiary management and transfers.
- Purchase flow using stored card details.
- Ticket creation and resolution.
- Chatwoot webhook that generates AI responses.

## High-Level Architecture Summary
- Express server bootstraps routes and middleware in `config/server.js`.
- Controllers in `src/controllers` contain request validation and business logic.
- Services in `src/services` wrap Mongoose models with thin CRUD helpers.
- Models in `src/models` map to MongoDB collections.
- Error handling is centralized via `errors/error-manager.js` and `errors/index.json`.

## Key Modules
- Auth: `src/controllers/AuthController.js`, `src/cors/Middleware.js`.
- User: `src/controllers/UserController.js`, `src/models/User.js`.
- Admin: `src/controllers/AdminController.js`, `src/constants/Admins.json`.
- Transactions: `src/controllers/TransactionController.js`, `src/models/Transaction.js`.
- Cards: `src/models/Card.js`, `src/services/CardService.js`.
- Beneficiaries: `src/controllers/BeneficiaryController.js`, `src/models/Beneficiary.js`.
- Tickets: `src/controllers/TicketController.js`, `src/models/Ticket.js`.
- Chatwoot: `src/controllers/ChatwootController.js`.

## System Boundaries
- External systems: MongoDB, Chatwoot API, Groq API.
- Trust boundary is the HTTP API; all requests are untrusted.
- Admin boundary is enforced by JWT with static admin credentials.

## Production Posture Summary
- Stateless JWT auth without expiration.
- Sensitive card data stored in DB.
- No transactional guarantees for balance updates.
- No rate limiting, no structured input validation layer.
