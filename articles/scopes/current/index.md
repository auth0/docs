---
title: Scopes
description: Overview of scopes.
toc: true
---

# Scopes

The OAuth2 protocol is a delegated authorization mechanism, where an application requests access to resources controlled by the user (the resource owner) and hosted by an API (the resource server), and the authorization server issues the application a more restricted set of credentials than those of the user.

The `scope` parameter allows the application to express the desired scope of the access request. In turn, the `scope` parameter can be used by the authorization server in the response to indicate which scopes were actually granted (if they are different than the ones requested).

You can use scopes to:

- Let an application authenticate users and get additional information about them, such as their email or picture. For details, refer to [OpenID Connect Scopes](#openid-connect-scopes).

- Implement granular access control to your API. In this case, you need to define custom scopes for your API and add these newly-created scopes to your `scope` request parameter: `scope=read:contacts`. For details, refer to [API Scopes](#api-scopes).

## OpenID Connect Scopes

OpenID Connect (OIDC) is an authentication protocol that sits on top of OAuth2, and allows the application to verify the identity of the users and obtain basic profile information about them in a interoperable way. This information can be returned in the `id_token` and/or in the response from [the /userinfo endpoint](/api/authentication#get-user-info) (depending on the type of request).

The basic (and required) scope for OpenID Connect is the `openid` scope. This scope represents the intent of the application to use the OIDC protocol to verify the identity of the user.

In OpenID Connect (OIDC), we have the notion of __claims__. There are two types of claims:

* [Standard](#standard-claims) (which means that they meet OIDC specification)
* [Custom](#custom-claims)

### Standard Claims

OpenID Connect specifies a set of [standard claims](https://openid.net/specs/openid-connect-core-1_0.html#StandardClaims). These claims are user attributes and are intended to provide the application with user details such as email, name and picture.

The basic claim returned for the `openid` scope is the `sub` claim, which uniquely identifies the user (`iss`, `aud`, `exp`, `iat` and `at_hash` claims will also be present in the `id_token`). Applications can ask for additional scopes, separated by spaces, to request more information about the user. The following additional scopes apply:

- `profile`: will request the claims representing basic profile information. These are `name`, `family_name`, `given_name`, `middle_name`, `nickname`, `picture` and `updated_at`.
- `email`: will request the `email` and `email_verified` claims.

### Example: Ask for Standard Claims

In this example, we will use the [OAuth 2.0 Implicit Grant](/api-auth/grant/implicit) to authenticate a user and retrieve an `id_token` that contains the user's name, nickname, profile picture, and email information.

To initiate the authentication flow, send the user to the authorization URL and request an `id_token`:

```text
https://${account.namespace}/authorize?
  scope=openid%20profile%20email&
  response_type=id_token&
  client_id=${account.clientId}&
  redirect_uri=${account.callback}&
  nonce=YOUR_CRYPTOGRAPHIC_NONCE
  state=YOUR_OPAQUE_VALUE
```

::: note
For details on the params and how to implement this flow refer to [How to implement the Implicit Grant](/api-auth/tutorials/implicit-grant).
:::

Notice that we included three values at the `scope` param: `openid`, `profile` (to get `name`, `nickname` and `picture`) and email (to get the `email` claim).

After Auth0 has redirected back to the app, you can extract the `id_token` from the hash fragment of the URL.

When decoded, the `id_token` contains the following claims:

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

Your app now can retrieve these values and use them to personalize the UI.

## Custom Claims

When adding custom claims to ID or Access Tokens, they must [conform to a namespaced format](/api-auth/tutorials/adoption/scope-custom-claims). This is to avoid any possible collision with standard OIDC claims.

### Example: Add Custom Claims

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

In order to add these claims to the `id_token`, we need to create a [rule](/rules) to: 

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

The namespace URL does not have to point to an actual resource, since it’s only used as an identifier and will not be called by Auth0. This follows the [recommendation from the OIDC specification](https://openid.net/specs/openid-connect-core-1_0.html#AdditionalClaims) stating that custom claim identifiers should be collision-resistant. While this is not required by the the specification, Auth0 will always enforce namespacing, which means that any non-namespaced claims will be silently excluded from tokens.

::: note
Adding custom claims to the Access Token is very similar to the process of adding custom claims to the ID Token. However, you would use `context.accessToken` instead of `context.idToken`.
:::

Custom claims added to ID Tokens using this method allows you to obtain them when calling the `/userinfo` endpoint. However, note that rules run during the user authentication process only, not when `/userinfo` is called.

## API Scopes

Scopes allow you to define the API data accessible to your applications. When you [create an API in Auth0](/apis), you'll need to define one scope for each API represented and action. For example, if you want to `read` and `delete` contact information, you would create two scopes: `read:contacts` and `delete:contacts`.

Once you create an API and define the scopes, the applications can request these defined permissions when they initiate an authorization flow and include them in the Access Token as part of the scope request parameter.

If you wanted to expand [our example](#example-asking-for-standard-claims) to include also the `read:contacts` permission, then you would using something like the following sample URL to initiate the authentication flow using the Implicit grant:

```text
https://${account.namespace}/authorize?
  audience=YOUR_API_AUDIENCE&
  scope=openid%20profile%20email%20read:contacts&
  response_type=id_token%20token&
  client_id=${account.clientId}&
  redirect_uri=${account.callback}&
  nonce=YOUR_CRYPTOGRAPHIC_NONCE
  state=YOUR_OPAQUE_VALUE
```

Note the differences between the two examples. In the latest, we want to get an `access_token`, that will allow us to access the API, with the rights to do specific actions. To do so, we changed two parameters and added a new one:

- `audience`: New parameter added for this example. Its value is the unique identifier of the API we want to get access to.

- `scope`: We appended the value `read:contacts`. This denotes the rights that we want to be granted at the API (in this case, read contact information).

- `response_type`: We appended the value `token`. This tells the Authorization Server (Auth0 in our case) to issue an `access_token` as well, not only an `id_token`. The `access_token` will be sent to the API as credentials.

### Define Scopes Using the Dashboard

::: warning
By default, any user of any application can ask for any scope defined here. You can implement access policies to limit this behaviour via [Rules](/rules).
:::

You can define API scopes using the [Dashboard](${manage_url}/#/apis). Select the API you want to edit, and open up its **Scopes** tab.

Provide the following parameters:

| Parameter | Description |
| - | - |
| Name | The name of your scope |
| Description | A friendly description for your scope |

Click **Add** when you've provided the requested values.

![API Scopes](/media/articles/scopes/api-scopes.png)

### Limiting API Scopes being Issued

An application can request any scope and the user will be prompted to approve those scopes during the authorization flow. This may not be a desirable situation, as you may want to limit the scopes based on, for example, the permissions (or role) of a user.

You can make use of the [Authorization Extension](/extensions/authorization-extension) in conjunction with a custom [Rule](/rules) to ensure that scopes are granted based on the permissions of a user.

This approach is discussed in more depth in some of our [Architecture Scenarios](/architecture-scenarios). Specifically, you can review the entire [Configure the Authorization Extension](/architecture-scenarios/application/spa-api/part-2#configure-the-authorization-extension) section of our SPA+API Architecture Scenario which demonstrates how to configure the Authorization Extension, and also create a custom Rule which will ensure scopes are granted based on the permissions of a user. 
