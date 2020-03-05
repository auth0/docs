---
description: Apps can request any standard OIDC scopes such as profile and email as well as any scopes supported by the API they want to access.
topics:
  - api-authentication
  - oidc
  - scopes
  - user-profiles
  - claims
contentType: concept
useCase:
  - secure-api
  - call-api
---

# User Profile Claims and the `scope` Parameter

<%= include('./_about.md') %>

The behavior of the `scope` parameter has been changed to conform to the [OpenID Connect (OIDC) specification](https://openid.net/specs/openid-connect-core-1_0.html#ScopeClaims).

Instead of requesting arbitrary application-specific claims, applications can request any of the standard <dfn data-key="openid">OIDC</dfn> <dfn data-key="scope">scopes</dfn> such as `profile` and `email`, as well as any [scopes supported by the API they want to access](/api-auth/tutorials/adoption/api-tokens).

## Standard claims

The OIDC specification defines a [set of standard claims](https://openid.net/specs/openid-connect-core-1_0.html#StandardClaims) about users that can be returned in ID Tokens or in the response from /userinfo.

## Custom claims

To improve compatibility for applications, Auth0 now returns profile information in a [structured claim format as defined by the OIDC specification](https://openid.net/specs/openid-connect-core-1_0.html#StandardClaims). You can still add custom claims, but they must conform to a namespaced format to avoid possible collisions with standard OIDC claims. Otherwise, it is no longer possible to add arbitrary claims to ID Tokens or <dfn data-key="access-token">Access Tokens</dfn>. 

For example, suppose an identity provider returns a `favorite_color` claim as part of the user’s profile, and that we’ve used the Auth0 management API to set application-specific information for this user.

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

This is a [*normalized user profile*](/users/normalized), which is a protocol-agnostic representation of this user as defined by Auth0. When performing an OIDC conformant login, Auth0 would return the following ID Token claims to the application:

```json
{
  "iss": "https://my-domain.auth0.com/",
  "sub": "custom|123",
  "aud": "my_client_id",
  "exp": 1311281970,
  "iat": 1311280970,
  "email": "jane@example.com",
  "email_verified": true
}
```

Note that the `user_id` property is sent as `sub` in the ID Token, and that `favorite_color` and `user_metadata` are not present in the OIDC response from Auth0. This is because OIDC does not define standard claims to represent all the information in this user’s profile. We can, however, define a non-standard claim by namespacing it through a [rule](/rules):

```js
function (user, context, callback) {
  const namespace = 'https://myapp.example.com/';
  context.idToken[namespace + 'favorite_color'] = user.favorite_color;
  context.idToken[namespace + 'preferred_contact'] = user.user_metadata.preferred_contact;
  callback(null, user, context);
}
```

::: note 
If you need to add custom claims to the Access Token, you can use the code sample above with the following change: use `context.accessToken` in place of `context.idToken`.

Please note that adding custom claims to tokens through this method will also let you obtain them when calling the `/userinfo` endpoint. However, rules run when the user is authenticating, not when `/userinfo` is called.
:::

Any non-Auth0 HTTP or HTTPS URL can be used as a namespace identifier, and any number of namespaces can be used. The namespace URL does not have to point to an actual resource, it’s only used as an identifier and will not be called by Auth0. 

::: warning
`auth0.com`, `webtask.io` and `webtask.run` are Auth0 domains and therefore cannot be used as a namespace identifier.
:::

This follows a [recommendation from the OIDC specification](https://openid.net/specs/openid-connect-core-1_0.html#AdditionalClaims) stating that custom claim identifiers should be collision-resistant. While this is not mandatory according to the specification, Auth0 will always enforce namespacing when performing OIDC-conformant login flows, meaning that any custom claims without HTTP/HTTPS namespaces will be silently excluded from tokens.

::: note
Auth0 will allow non-OIDC claims without a namespace (the "legacy" user profile, from which we strongly recommend moving away) if:

* You are using the non-OIDC conformant pipeline (i.e., you are not using the <dfn data-key="audience">`audience`</dfn> parameter in the `/authorize` or token request and the application does not have the [**OIDC-Conformant** toggle](https://auth0.com/docs/api-auth/tutorials/adoption/oidc-conformant) enabled).
* You have the **Legacy User Profile** toggle turned on in the [tenant Advanced Settings](https://manage.auth0.com/#/tenant/advanced), under the **Migrations** section. This setting is only enabled for old tenants, but newly created tenants can't see or enable the **Legacy User Profile**. 

We strongly recommend moving away from the Legacy User Profile.
:::

## Token refresh flow and custom claims

When an application requests new tokens using a <dfn data-key="refresh-token">Refresh Token</dfn>, the new tokens will not automatically inherit any custom claims previously added. But since rules run on a token refresh flow as well, the same claim customization code will be executed in these cases. This gives the flexibility of adding or changing claims in newly issued tokens without forcing applications to obtain a new refresh token.

## Keep reading

<%= include('./_index.md') %>
