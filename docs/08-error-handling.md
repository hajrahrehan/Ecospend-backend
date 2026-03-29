# Error Handling

## Current Strategy
- `errors/index.json` defines error payloads and status codes.
- `errors/error-manager.js` formats and returns JSON.
- `config/error.js` logs unhandled errors to `Errorlog.json` in production mode.

## Weaknesses
- Status codes are inconsistent and in some cases incorrect.
- Controllers call `ErrorManager` and then throw in production, risking double responses.
- No centralized Express error middleware for consistent formatting.

## Logging Issues
- Synchronous file writes for each error block the event loop.
- Error data includes stack and raw error fields, potentially leaking sensitive data if returned.

## Failure Recovery Gaps
- No retry logic on DB writes.
- No circuit breaker on Chatwoot or Groq calls.
- No graceful degradation path for external service failures.

## Recommended Changes
- Add global error middleware that maps known error types to standardized status codes.
- Standardize error schema across all endpoints.
- Replace sync file logging with async logging and external aggregator.
