---
description: Custom Claims
topics:
  - scopes
  - claims
contentType:
  - how-to
  - concept
useCase:
  - development
  - add-login
  - call-api
  - secure-api
---
# Custom Claims

Custom claims are claims that you define, control, and add to a [token](/tokens). For example, you may want to add the email address to an Access Token and use that to uniquely identify a user, or you may want to add custom information stored in an Auth0 user profile to an ID Token.

Remember that all claims included in a token must have unique names. To keep your custom claims from colliding with standard OIDC claims, you must give them an identifier that [conforms to a namespaced format](/api-auth/tutorials/adoption/scope-custom-claims). For example, your custom claim could be named `http://www.myexample.com/favorite_color`. 

::: warning
Auth0 always enforces namespacing; any custom claims with non-namespaced identifiers will be silently excluded from tokens.
:::

Some rules:

* The namespace URL does not have to point to an actual resource because it's only being used as an identifier; it will not be called.
* Any non-Auth0 HTTP or HTTPS URL can be used as a namespace identifier, and any number of namespaces can be used.

::: warning
`auth0.com`, `webtask.io` and `webtask.run` are Auth0 domains and therefore cannot be used as a namespace identifier.
:::


## Example: Add custom claims

In this example, we will add a user's favorite color and a preferred contact method to the ID Token. Suppose that:

* The user logged in using an identity provider that returned a `favorite_color` claim as part of the user profile.
* At some point, the user selected a `preferred_contact` method of `email` in our application, and we saved it as part of the user's `user_metadata`.
* We've used the Auth0 Management API to set application-specific information for this user.

The Auth0-stored profile is:

```json
{
  "email": "jane@example.com",
  "email_verified": true,
  "user_id": "custom|123",
  "favorite_color": "blue",
  "user_metadata": {
    "preferred_contact": "email"
  }
}
```

We want to add the `favorite_color` and `preferred_contact` claims to the ID Token. To do this, we create a [rule](/rules) to customize the token by adding these claims using a namespaced format. Once added, you will also be able to obtain the custom claims when calling the `/userinfo` endpoint, but the rule will run only during the authentication process. 

Sample rule:

```js
function (user, context, callback) {
  const namespace = 'https://myapp.example.com/';
  context.idToken[namespace + 'favorite_color'] = user.favorite_color;
  context.idToken[namespace + 'preferred_contact'] = user.user_metadata.preferred_contact;
  callback(null, user, context);
}
```

::: note
This example shows a custom claim being added to an ID Token, which uses the `context.idToken` property. To add to an Access Token, use the `context.accessToken` property instead.
:::


## Token refresh flow and custom claims

As long as your rule is in place, your custom claims will appear in new tokens issued when using a [Refresh Token](/tokens/refresh-token/current). Although new tokens do not automatically inherit custom claims, rules run during the refresh token flow, so the same code will be executed. This allows you to add or change claims in newly-issued tokens without forcing previously-authorized applications to obtain a new refresh token.
