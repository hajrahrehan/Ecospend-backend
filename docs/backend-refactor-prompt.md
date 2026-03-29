# 🧠 Backend Refactor Prompt (Zero Trust + Scalable Architecture)

**Use this prompt to analyze and refactor a backend system into a secure, scalable, production-grade architecture.**

---

## 🔧 Prompt

You are a senior backend architect reviewing and refactoring a production backend system.

Your task is to produce a **comprehensive backend engineering report + refactor blueprint** focused on:

* Security (Zero Trust backend principles)
* API design and correctness
* Authentication & authorization
* Data modeling
* Performance and scalability
* Code structure and modularity
* Reliability and failure handling
* Migration strategy

Treat the system as if it is running in a hostile environment where:

* all clients are untrusted
* requests can be forged
* tokens can be stolen
* internal services may fail

---

# 📌 Output Requirements

Generate a **single structured document** with the following sections:

---

# 1. Security First (Backend Zero Trust Analysis)

* Authentication mechanism (JWT/session/OAuth/etc.)
* Token lifecycle (expiry, refresh, revocation)
* Authorization model (RBAC/ABAC/role claims)
* Endpoint-level security issues
* Trust boundaries (what is incorrectly trusted)
* Injection risks (SQL, NoSQL, command injection)
* Data exposure risks (overfetching, leaking sensitive fields)
* Rate limiting / abuse prevention gaps

Include:

* attack scenarios
* real-world bypass examples
* mitigation strategies

---

# 2. API Design & Architecture Review

Analyze:

* REST/GraphQL design quality
* route structure consistency
* controller/service separation
* duplication of logic across endpoints
* request/response structure consistency
* error handling patterns

Identify:

* inconsistent endpoints
* missing validations
* poor abstraction boundaries
* tightly coupled controllers

---

# 3. Data Layer & Database Design

Evaluate:

* schema design quality
* normalization vs denormalization issues
* missing indexes
* query inefficiencies
* N+1 query problems
* transaction safety
* data consistency risks

Include:

* scaling bottlenecks
* recommended schema improvements

---

# 4. Performance & Scalability Analysis

Check:

* blocking synchronous operations
* lack of caching (Redis opportunities)
* slow DB queries
* missing pagination
* excessive payload sizes
* no async job handling

Suggest:

* background jobs (queues like BullMQ/RabbitMQ/Kafka)
* caching strategies
* horizontal scaling readiness

---

# 5. Error Handling & Reliability

Analyze:

* inconsistent error formats
* missing global error handler
* leaking stack traces
* retry logic absence
* timeout handling
* graceful degradation

Recommend:

* centralized error middleware
* standard error schema
* circuit breaker patterns (if applicable)

---

# 6. Codebase Architecture Review

Evaluate structure:

* controllers
* services
* repositories
* middleware
* utils
* config

Identify:

* tight coupling
* duplicated business logic
* missing service layer abstraction
* god controllers

Recommend:

* clean architecture or layered architecture
* domain-driven design (if applicable)
* modular separation

---

# 7. Authentication & Authorization Deep Dive

Analyze:

* login flow security
* password hashing strength
* session/token storage strategy
* refresh token design
* role enforcement consistency

Identify:

* privilege escalation risks
* missing backend enforcement (frontend-only checks)
* insecure defaults

---

# 8. Event-Driven & Async Design (if applicable)

Evaluate:

* lack of event system
* missing background processing
* synchronous heavy operations

Suggest:

* event-driven architecture
* job queues
* pub/sub systems

---

# 9. Refactor Plan (Step-by-Step)

Break into phases:

## Phase 1: Critical Security Fixes

* auth hardening
* input validation
* sensitive data masking

## Phase 2: Stability Improvements

* error handling
* API consistency
* DB query fixes

## Phase 3: Architecture Refactor

* service layer introduction
* repository pattern
* modularization

## Phase 4: Scalability Enhancements

* caching
* queues
* async processing

---

# 10. Target Backend Architecture

Define final structure:

Example:

```
/src
  /controllers
  /services
  /repositories
  /models
  /middlewares
  /routes
  /utils
  /config
  /jobs
  /events
```

Explain:

* request flow
* service boundaries
* auth flow
* data flow
* event/job flow

---

# 11. Risk Summary

List:

* top 5 backend vulnerabilities
* performance bottlenecks
* scaling limitations
* security threats

Rank by:

* likelihood
* impact

---

# 12. Implementation Checklist

Provide:

* immediate fixes
* medium-term refactor tasks
* long-term architecture upgrades

Each must be:

* actionable
* code-level meaningful
* ordered by priority

---

# 📌 Final Instruction

This report should be:

* implementation-ready
* not theoretical
* written like a senior backend RFC
* focused on real-world production systems

Avoid vague advice. Every issue should map to a real fix.
