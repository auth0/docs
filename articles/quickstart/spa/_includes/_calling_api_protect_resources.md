## Protect Your API Resources

To restrict access to the resources served by your API, check the incoming requests for valid authorization information. 
The authorization information is in the Access Token created for the user. To see if the token is valid, check it against the [JSON Web Key Set (JWKS)](/tokens/concepts/jwks) for your Auth0 account. To learn more about validating Access Tokens, see [Validate Access Tokens](/tokens/guides/validate-access-tokens).

In each language and framework, you verify the Access Token differently.
Typically, you use a middleware function to verify the token. If the token is valid, the request proceeds and the user gets access to resources in your API. If the token is invalid, the request is rejected with a `401 Unauthorized` error. 

::: note
The sample project shows how to implement this functionality using Node.js with the Express framework. 
To learn how to implement API protection for your server-side technology, see the [Backend/API quickstart documentation](/quickstart/backend).
:::