---
description: Overview of Custom Claims
topics:
  - scopes
contentType:
  - how-to
useCase:
  - development
---
# Custom Claims

When adding custom claims to ID or Access Tokens, they must [conform to a namespaced format](/api-auth/tutorials/adoption/scope-custom-claims). This is to avoid any possible collision with standard OIDC claims.

## Example: add custom claims

Suppose that:

* The identity provider returns a `favorite_color` claim as part of the user's profile
* We've used the Auth0 Management API to set application-specific information for this user
* We've saved the `preferred_contact` information as part of the `user_metadata`

This would be the profile stored by Auth0:

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

In order to add these claims to the ID Token, we need to create a [rule](/rules) to:

* Customize the token
* Add these claims using namespaced format in the rule

Sample Rule:

```js
function (user, context, callback) {
  const namespace = 'https://myapp.example.com/';
  context.idToken[namespace + 'favorite_color'] = user.favorite_color;
  context.idToken[namespace + 'preferred_contact'] = user.user_metadata.preferred_contact;
  callback(null, user, context);
}
```

Any non-Auth0 HTTP or HTTPS URL can be used as a namespace identifier, and any number of namespaces can be used.

::: warning
`auth0.com`, `webtask.io` and `webtask.run` are Auth0 domains and therefore cannot be used as a namespace identifier.
:::

The namespace URL does not have to point to an actual resource, since it’s only used as an identifier and will not be called by Auth0. This follows the [recommendation from the OIDC specification](https://openid.net/specs/openid-connect-core-1_0.html#AdditionalClaims) stating that custom claim identifiers should be collision-resistant. While this is not required by the specification, Auth0 will always enforce namespacing, which means that any non-namespaced claims will be silently excluded from tokens.

::: note
Adding custom claims to the Access Token is very similar to the process of adding custom claims to the ID Token. However, you would use `context.accessToken` instead of `context.idToken`.
:::

Custom claims added to ID Tokens using this method allows you to obtain them when calling the `/userinfo` endpoint. However, note that rules run during the user authentication process only, not when `/userinfo` is called.

## Token refresh flow and custom claims

When an application requests new tokens using a [Refresh Token](/tokens/refresh-token/current), the new tokens will not automatically inherit any custom claims previously added. But since rules run on a token refresh flow as well, the same claim customization code will be executed in these cases. This gives the flexibility of adding or changing claims in newly issued tokens without forcing applications to obtain a new refresh token.
