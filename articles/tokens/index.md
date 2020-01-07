---
title: Tokens
description: Learn about the types of tokens referenced in Auth0, what each is used for, and how to use it.
classes: topic-page
toc: true 
topics:
  - tokens
  - jwt
  - access-tokens
contentType:
  - index
useCase:
  - tokens
---
# Tokens

There are basically two types of tokens that are related to identity:

* The **ID Token** is a <dfn data-key="json-web-token">JSON Web Token (JWT)</dfn>, and it is meant for use by the application only. For example, if there's an app that uses Google to log in users and to sync their calendars, Google sends an ID Token to the app that includes information about the user. The app then parses [the token's contents](https://openid.net/specs/openid-connect-core-1_0.html#StandardClaims) and uses the information (including details like name and profile picture) to customize the user experience.

  <%= include('../_includes/_validate-id-token') %>

* **Access Tokens** (which aren't always a JWT) are used to inform an API that the bearer of the token has been authorized to access the API and perform a predetermined set of actions (specified by the <dfn data-key="scope">**scopes**</dfn> granted). 

  In the Google example above, Google sends an Access Token to the app after the user logs in and provides consent for the app to read or write to their Google Calendar. Whenever the app wants to write to Google Calendar, it sends a request to the Google Calendar API, including the Access Token in the HTTP **Authorization** header.

  ::: note
  Your applications should treat Access Tokens as opaque strings since they are meant for APIs. Your application should *not* attempt to decode them or expect to receive tokens in a particular format.
  :::

## Token examples

To better clarify the concepts we covered above, let's look at the contents of some sample ID and Access Tokens.

The (decoded) contents of our sample ID Token look like the following:

```json
{
  "iss": "http://${account.namespace}/",
  "sub": "auth0|123456",
  "aud": "${account.clientId}",
  "exp": 1311281970,
  "iat": 1311280970,
  "name": "Jane Doe",
  "given_name": "Jane",
  "family_name": "Doe",
  "gender": "female",
  "birthdate": "0000-10-31",
  "email": "janedoe@example.com",
  "picture": "http://example.com/janedoe/me.jpg"
}
```

This token is meant to **authenticate the user to the application**. The audience (the **aud** claim) of the token is set to the application's identifier, which means that only this specific application should consume this token.

For comparison, let's look at the contents of an Access Token:

```json
{
  "iss": "https://${account.namespace}/",
  "sub": "auth0|123456",
  "aud": [
    "my-api-identifier",
    "https://${account.namespace}/userinfo"
  ],
  "azp": "${account.clientId}",
  "exp": 1489179954,
  "iat": 1489143954,
  "scope": "openid profile email address phone read:appointments"
}
```

Note that the token does not contain any information about the user itself besides their ID (**sub** claim). It only contains authorization information about which actions the application is allowed to perform at the API (**scope** claim). This is what makes it useful for securing an API, but not for authenticating a user.

In many cases, you might find it useful to retrieve additional user information at the API, so the Access Token is also valid for calling [the /userinfo API](/api/authentication#user-profile), which returns the user's profile information. The intended audience (indicated by the **aud** claim) for this token is both your custom API as specified by its identifier (such as `https://my-api-identifier`) and the **/userinfo** endpoint (such as `https://${account.namespace}/userinfo`).

## Token types used by Auth0

There are five primary tokens used in Auth0's token-based authentication scenarios:

<%= include('../_includes/_topic-links', { links: [
  'tokens/concepts/id-tokens',
  'tokens/concepts/access-tokens',
  'tokens/concepts/idp-access-tokens',
  'tokens/concepts/refresh-tokens',
  'api/management/v2/tokens'
] }) %>

## Restrictions and limitations

Now that we've seen some ways in which we can use tokens, let's talk about when they should **not** be used.

* **Access Tokens must never be used for authentication.** Access Tokens cannot tell us if the user has authenticated. The only user information the Access Token possesses is the user ID, located in the **sub** claim.

* **ID Tokens should not be used to gain access to an API**. Each token contains information for the intended <dfn data-key="audience">audience</dfn> (which is usually the recipient). Per the OpenID Connect specification, the audience of the ID Token (indicated by the **aud** claim) must be the **client ID** of the application making the authentication request. If this is not the case, you should not trust the token. Conversely, an API expects a token with the **aud** value to equal the API's unique identifier. Therefore, unless you maintain control over both the application and the API, sending an ID Token to an API will generally not work. Since the ID Token is not signed by the API, the API would have no way of knowing if the application had modified the token (e.g., adding more scopes) if it were to accept the ID Token.
