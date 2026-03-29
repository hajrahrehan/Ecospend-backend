# Observability

## Logging Strategy
- Current logging uses Pino with optional pretty output in dev.
- Error logging writes to `Errorlog.json` synchronously.

## Metrics
- No metrics collection for latency, error rates, or DB performance.

## Monitoring
- No health or readiness endpoints.
- No alerting strategy for auth or payment failures.

## Tracing
- No request correlation IDs.
- No distributed tracing across external services.

## Debugging Gaps
- Lack of structured error codes for client correlation.
- No audit trail for admin actions or balance changes.

## Recommendations
- Add request IDs and include in all logs.
- Add metrics for p95 latency, error rate, DB query time.
- Add audit logs for admin actions and money movement.
- Add external log aggregation and alerting.
