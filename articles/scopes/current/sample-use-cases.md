---
title: Sample Use Cases - Scopes and Claims
description: Learn how to use scopes and claims with applications and APIs.
topics:
  - scopes
contentType:
  - how-to
useCase:
  - development
  - add-login
  - call-api
  - secure-api
---
# Sample Use Cases: Scopes and Claims

In these examples, we use the [Authorization Code Flow](/flows/concepts/auth-code) to authenticate a user and request the necessary permissions (<dfn data-key="scope">scopes</dfn>) and tokens. For details on the request parameters or to learn how to fully implement this flow, refer to our tutorial: [Add Login to Regular Web Applications](/flows/guides/auth-code/add-login-auth-code).

## Authenticate a user and request standard claims

In this example, we want to authenticate a user and get user details that will allow us to personalize our UI. To do this, we want to get an ID Token that contains the user's name, nickname, profile picture, and email information.

1. Initiate the authentication flow by sending the user to the authorization URL:

```text
https://${account.namespace}/authorize?
  response_type=code&
  client_id=${account.clientId}&
  redirect_uri=${account.callback}&
  scope=openid%20profile%20email&
  state=YOUR_STATE_VALUE
```

Notice that in this example: 

* the `response_type` parameter includes one value:
  * `code` (because we are using the regular web app flow, our initial request is for an authorization code; when we request our tokens using this code, we will receive the ID Token we need for authentication.)
* the `scope` parameter includes three values, the requested OIDC scopes: 
  * `openid` (to indicate that the application intends to use OIDC to verify the user's identity)
  * `profile` (to get `name`, `nickname`, and `picture`)
  * `email` (to get `email` and `email_verified`)

2. After the user consents (if necessary) and Auth0 redirects back to your app, request tokens. (For details, refer to [Add Login to Regular Web Applications: Request Tokens](/flows/guides/auth-code/add-login-auth-code#request-tokens).)

3. Extract the ID Token from the response and [decode it](/tokens/id-tokens#id-token-payload).

You should see the following claims:

```json
{
  "name": "John Doe",
  "nickname": "john.doe",
  "picture": "https://myawesomeavatar.com/avatar.png",
  "updated_at": "2017-03-30T15:13:40.474Z",
  "email": "john.doe@test.com",
  "email_verified": false,
  "iss": "https://${account.namespace}/",
  "sub": "auth0|USER-ID",
  "aud": "${account.clientId}",
  "exp": 1490922820,
  "iat": 1490886820,
  "nonce": "crypto-value",
  "at_hash": "IoS3ZGppJKUn3Bta_LgE2A"
}
```

Your app now can retrieve the user attributes and use them to personalize your UI.


## Request custom API access

In this example, we request a custom scope for a calendar API that will authorize the calling application to read appointments for the user. To do this, we want to get an Access Token containing the proper scope to read appointments from the API. Note that requesting an Access Token is not dependent on requesting an ID Token.

::: note
Before using a custom API, you need to know what scopes are available for the API you are calling. If the custom API is under your control, you need to register both your application and API with Auth0 and [define the scopes for your API using the Auth0 Dashboard](/scopes/current/guides/define-api-scope-dashboard). You can also use defined permissions to [customize the consent prompt](/scopes/current/guides/customize-consent-prompt) for your users.
:::

1. Initiate the authorization flow by sending the user to the authorization URL:

```text
https://${account.namespace}/authorize?
  response_type=code&
  client_id=${account.clientId}&
  redirect_uri=${account.callback}& 
  scope=read:appointments&
  audience=YOUR_API_AUDIENCE&
  state=YOUR_STATE_VALUE
```

Notice that in this example:

* the `response_type` parameter still includes one value:
  * `code` (because we are using the regular web app flow, our initial request is for an authorization code; when we request our tokens using this code, we will receive the Access Token that we can use to call our API.)
* the `scope` parameter includes one value, the requested API scope: 
  * `read:appointments` (to allow us to read the user's appointments from the API)
* the `audience` parameter is new and includes one value:
  * the unique identifier of the API from which we want to read the user's appointments

2. As in the previous example, after the user consents (if necessary) and Auth0 redirects back to your app, request tokens. (For details, refer to [Add Login to Regular Web Applications: Request Tokens](/flows/guides/auth-code/add-login-auth-code#request-tokens).)

3. Extract the Access Token from the response, and call the API using the Access Token as credentials.


## Authenticate a user and request standard claims and custom API access

In this example, we combine our previous two examples to authenticate a user, request standard claims, and also request a custom scope for a calendar API that will allow the calling application to read appointments for the user. To do this, we want to get two tokens--an ID Token that contains the user's name, nickname, profile picture, and email information, and an Access Token containing the proper scope to read appointments from the API. Note that requesting an Access Token is not dependent on requesting an ID Token.

::: note
Before using a custom API, you need to know what scopes are available for the API you are calling. If the custom API is under your control, you need to register both your application and API with Auth0 and [define the scopes for your API using the Auth0 Dashboard](/scopes/current/guides/define-api-scope-dashboard). You can also use defined permissions to [customize the consent prompt](/scopes/current/guides/customize-consent-prompt) for your users.
:::

1. Initiate the authentication flow by sending the user to the authorization URL:

```text
https://${account.namespace}/authorize?
  response_type=code&
  client_id=${account.clientId}&
  redirect_uri=${account.callback}& 
  scope=openid%20profile%20email%20read:appointments&
  audience=YOUR_API_AUDIENCE&
  state=YOUR_STATE_VALUE
```

Notice that in this example:

* the `response_type` parameter still includes one value:
  * `code` (because we are using the regular web app flow, our initial request is for an authorization code; when we request our tokens using this code, we will receive both the ID Token we need for authentication and the Access Token that we can use to call our API.)
* the `scope` parameter is used for both OIDC scopes and API scopes, so now includes four values: 
  * `openid` (to indicate that the application intends to use OIDC to verify the user's identity)
  * `profile` (to get `name`, `nickname`, and `picture`)
  * `email` (to get `email` and `email_verified`)
  * `read:appointments` (to allow us to read the user's appointments from the API)
* the `audience` parameter includes one value:
  * the unique identifier of the API from which we want to read the user's appointments

2. As in the previous examples, after the user consents (if necessary) and Auth0 redirects back to your app, request tokens. (For details, refer to [Add Login to Regular Web Applications: Request Tokens](/flows/guides/auth-code/add-login-auth-code#request-tokens).)

3. Extract the ID Token from the response, [decode it](/tokens/id-tokens#id-token-payload), and retrieve the user attributes and use them to personalize your UI.

4. Extract the Access Token from the response, and call the API using the Access Token as credentials.


## Add custom claims to a token

In this example, we add a user's favorite color and preferred contact method to the ID Token. To do this, we create a [rule](/rules) to customize the token by adding these claims using a [namespaced format](/tokens/guides/create-namespaced-custom-claims). Once added, we will also be able to obtain the custom claims when calling the `/userinfo` endpoint (though the rule will run only during the authentication process).

<%= include('../../_includes/_enforce-claim-namespacing') %>

Suppose that:

* The user logged in using an identity provider that returned a `favorite_color` claim as part of their user profile.
* At some point, the user selected a `preferred_contact` method of `email`, and we saved it as part of the [user's `user_metadata`](/users/concepts/overview-user-metadata).
* We've used the Auth0 Management API to set application-specific information for this user.

In this case, the Auth0-stored [normalized user profile](/users/normalized) is:

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

For this profile, Auth0 would normally return the following ID Token claims to your application:

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

Notice that in this example:

 * the `sub` claim contains the value of the `user_id` property
 * neither the `favorite_color` or `user_metadata` properties are present because OpenID Connect (OIDC) does not define standard claims that represent `favorite_color` or `user_metadata`
 
To receive the custom data, create a rule to customize the token with [namespaced](/tokens/guides/create-namespaced-custom-claims) [custom claims](/tokens/concepts/jwt-claims#custom-claims) that represent these properties from the user profile:

```js
function(user, context, callback) {
  const namespace = 'https://myapp.example.com/';
  context.idToken[namespace + 'favorite_color'] = user.favorite_color;
  context.idToken[namespace + 'preferred_contact'] = user.user_metadata.preferred_contact;
  callback(null, user, context);
}
```

::: note
This example shows a custom claim being added to an ID Token, which uses the `context.idToken` property. To add to an Access Token, use the `context.accessToken` property instead. For more information, see [Context Object in Rules](/rules/references/context-object).
:::

::: warning
When creating your rule, make sure to set some logic that determines when to include additional claims. Injecting custom claims into every ID Token that is issued is not ideal.
:::

## Keep reading

- [Scopes](/scopes)
- [OpenID Connect (OIDC) Scopes](/scopes/current/oidc-scopes)
- [Custom Claims](/tokens/concepts/jwt-claims#custom-claims)
- [API Scopes](/scopes/current/api-scopes)
- [Add API Permissions (Scopes)](/dashboard/guides/apis/add-permissions-apis)
- [Customize the Consent Prompt](/scopes/current/guides/customize-consent-prompt)
- [Represent Multiple APIs Using a Single Logical API in Auth0](/api-auth/tutorials/represent-multiple-apis)
- [Restrict Access to APIs](/api-auth/restrict-access-api)
- [SPA + API Architecture Scenario: Restrict API Scopes Based on Authorization Extension Groups](/architecture-scenarios/spa-api/part-2#configure-the-authorization-extension)

