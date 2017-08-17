## How Do I Protect my API Resources?

To restrict access to the resources served by your API, you need to check if the incoming request contains vailid authorization information. 
This information is in the `access_token` created for your user. To see if the token is valid, you need to check it against the [JSON Web Key Set (JWKS)](https://auth0.com/blog/navigating-rs256-and-jwks/) for your Auth0 account.

Depending on the languages and frameworks you use for your application, the way the access token is verified varies. Typically, you would use a middleware function to verify the token. If the token is valid, the request proceeds and the user gets access to resources in your API. If the token is not invalid, the request is rejected with a `401 Unauthorized` error. 

::: note
The sample project you can download from the top of this page shows how to implement this functionality using Node.js with the Express framework. 
To learn how to implement API protection for your server-side technology, see the [Backend/API quickstart documentation](/quickstart/backend).
:::