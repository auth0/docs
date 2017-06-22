## How Do I Protect my API Resources?

To restrict access to the resources served by your API, a check needs to be made to determine whether the incoming request contains valid authorization information. When you implement Auth0 in your client-side application and data API, that authorization information is the `access_token` issued for your user. This token must be checked against the [JSON Web Key Set (JWKS)](https://auth0.com/blog/navigating-rs256-and-jwks/) for your Auth0 account to verify that it is valid.

The exact way in which `access_token` verification is implemented on your server will vary between languages and frameworks; however, a common pattern involves placing the token verification logic in a middleware function. If the `access_token` is valid, the request should proceed. If it is invalid, the request should be rejected with a `401 Unauthorized` error.

The downloadable sample linked above demonstrates how to accomplish this implementation using Node.js with the Express framework. For instructions on how to implement API protection for the specific server-side technology you are using, see the [Backend/API quickstart documentation](/quickstart/backend).
