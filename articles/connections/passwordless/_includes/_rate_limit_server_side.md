
## Setting the `auth0-forwarded-for` header for rate-limit purposes

The `/passwordless/start` endpoint has a [rate limit](/policies/rate-limits#authentication-api) of 50 requests per hour per IP. If you call the API from the server-side, your backend's IP may easily hit these rate limits.

To avoid this issue, you can set the client's IP in the  `auth0-forwarded-for` header when invoking the endpoint, and [configure the web application to trust the that header](/api-auth/tutorials/using-resource-owner-password-from-server-side#configuring-the-auth0-application-to-receive-and-trust-the-ip-sent-by-your-server).
