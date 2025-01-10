::: panel Handle Rate Limits when calling Auth0 APIs from within Hooks
If you call Auth0 APIs from within a Hook's script, you will need to handle rate limits. To do so, check the `X-RateLimit-Remaining` header and act appropriately when the number returned nears 0.

Additionally, add logic to handle cases in which you exceed the provided rate limits and receive the `429` HTTP Status Code (`Too Many Requests`). In this case, if a re-try is needed, it is best to allow for a back-off to avoid going into an infinite re-try loop. To learn more about rate limits, see [Rate Limit Policy For Auth0 APIs](/policies/rate-limits).
:::