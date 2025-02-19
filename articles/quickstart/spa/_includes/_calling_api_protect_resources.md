## Protect Your API Resources

To restrict access to the resources served by your API, check the incoming requests for valid authorization information. 
The authorization information is in the Access Token created for the user. To see if the token is valid, check it against the <a href="/tokens/concepts/jwks" target="_blank" rel="noreferrer">JSON Web Key Set (JWKS)</a> for your Auth0 account. To learn more about validating Access Tokens, see <a href="/tokens/guides/validate-access-tokens" target="_blank" rel="noreferrer">Validate Access Tokens</a>.

In each language and framework, you verify the Access Token differently.
Typically, you use a middleware function to verify the token. If the token is valid, the request proceeds and the user gets access to resources in your API. If the token is invalid, the request is rejected with a `401 Unauthorized` error. 

::: note
The sample project shows how to implement this functionality using Node.js with the Express framework. 
To learn how to implement API protection for your server-side technology, see the <a href="/quickstart/backend" target="_blank" rel="noreferrer">Backend/API quickstart documentation</a>.
:::