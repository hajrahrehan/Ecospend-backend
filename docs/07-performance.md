# Performance

## Bottlenecks
- Daily purchase limit sums transactions in memory.
- Statement and admin list endpoints return unbounded datasets.
- Synchronous error logging writes to disk per error.

## N+1 Patterns
- User card listing is direct, no N+1 but lacks projection.
- Ticket listing does not paginate or filter with indexes.

## Blocking Operations
- `config/error.js` uses `fs.readFileSync` and `fs.writeFileSync` for each error.
- Chatwoot webhook waits on external API and Groq response per request.

## Missing Caching
- User profile and card list are read frequently and never cached.
- Beneficiary lists and transaction statements are computed per request.

## Optimization Opportunities
- Use aggregation pipeline for daily spend totals.
- Introduce pagination and projection for list endpoints.
- Replace sync file logging with async logging or external sink.
- Cache static admin data and config in memory, but move admin auth to DB.
