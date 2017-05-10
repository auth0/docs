A common need for any client-side application is to access resources from a data API. Authentication and authorization wouldn't be worth very much if it didn't allow you to reserve that data access to only those users who have proven their identity. In traditional web applications, this is typically acheieved by setting a session for the user on the server and issuing them a cookie which is then sent back on subsequent requests to assert the user's identity. While this approach can be made to work in single page applications, it has many drawbacks which are remedied by using [JSON Web Tokens (JWT)](https://jwt.io).

When using JWT for authentication and authorization, the API endpoints that your server exposes can be protected with some logic that looks for an incoming JWT in the request. If one exists, it is verified against your Auth0 [JSON Web Key Set (JWKS)](). If the JWT is valid, the API may return the requested resource.

## Create an API in the Auth0 Dashboard

The **Getting Started** step of this tutorial set covers how to create a new client in your Auth0 dashboard. This client represents the single page application that you are implementing Auth0 in. The ID assigned to this client and the domain for your Auth0 account were used when initializing the Lock widget and/or Auth0 in the previous steps.

In a similar way, you must create a record for a resource server, or **API**, in your Auth0 dashboard. The identifier for this API will now need to be included as the `audience` parameter when you initialize Lock and/or auth0.js.

Navigate to the **APIs** section and choose "Create API". Give your API a name and identifier, and then choose **Create**.