## How Do I Protect my API Resources?

To restrict access to the resources served by your API, you need to check the incoming requests for valid authorization information. 
The authorization information is in the `access_token` created for the user. To see if the token is valid, check it against the [JSON Web Key Set (JWKS)](https://auth0.com/blog/navigating-rs256-and-jwks/) for your Auth0 account.

Depending on the languages and frameworks you use for your application, you verify the access token differently.
You can use a middleware function to verify the token. If the token is valid, the request proceeds and the user gets access to resources in your API. If the token is invalid, the request is rejected with a `401 Unauthorized` error. 

::: note
The sample project you can download from the top of this page shows how to implement this functionality using Node.js with the Express framework. 
To learn how to implement API protection for your server-side technology, see the [Backend/API quickstart documentation](/quickstart/backend).
:::