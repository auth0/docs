:::warning
<dfn data-key="passwordless">Passwordless</dfn> is designed to be called from the client-side and has a [rate limit](/policies/rate-limits#authentication-api) of 50 requests per hour per IP. If you call it from the server-side, your backend's IP may easily hit these rate limits.
:::