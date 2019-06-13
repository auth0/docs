---
url: /scopes/current
section: articles
classes: topic-page
title: Scopes
description: Understand the principle of scopes and explore general examples of their use.
topics:
  - scopes
  - permissions
contentType:
  - concept
  - index
useCase:
  - development
  - add-login
  - secure-api
  - call-api
---
# Scopes

Different pieces of user information are often stored across a number of online resources. Users may upload and store photos with a service like Flickr, keep digital files on Dropbox, and store contacts and events in Google Calendar or on Facebook.

Often, new applications will want to make use of the information that has already been created in an online resource. To do so, the application must ask for authorization to access this information on a user's behalf. _Scopes_ define the specific actions applications can be allowed to do on a user's behalf.

## Ways to use scopes

When an app requests permission to access a resource through an authorization server, it uses the `scope` parameter to specify what access it needs, and the authorization server uses the `scope` parameter to respond with the access that was actually granted (if the granted access was different from what was requested).

Generally, you use scopes in three ways:

* From an [application](/applications), to verify the identity of a user and get basic profile information about the user, such as their email or picture. In this scenario, the scopes available to you include those implemented by the [OpenID Connect](/protocols/oidc) protocol. For details, refer to [OpenID Connect Scopes](/scopes/current/oidc-scopes).

* In an [API](/apis), to implement access control. In this case, you need to define custom scopes for your API and then identify these scopes so that calling applications can use them. For details, refer to [API Scopes](/scopes/current/api-scopes).

* From an application, to call an API that has implemented its own custom scopes. In this case, you need to know which custom scopes are defined for the API you are calling. For an example of calling a custom API from an application, see [Sample Use Cases: Scopes and Claims](/scopes/current/sample-use-cases#request-custom-API-access)

## Best practices

Understand your use case and choose the most restrictive scopes possible. 

If you are requesting scopes, make sure you ask for enough access for your application to function, but only request what you absolutely need. Are you establishing a user's identity or asking the user to allow you to interact with their data? There's a big difference between importing a user's Facebook profile information and posting to their wall. By only requesting what you need, you are more likely to gain user consent when required since users are more likely to grant access for limited, clearly-specified scopes. 

Similarly, when creating custom scopes for an API, consider what levels of granular access applications may need and design accordingly.

## Requested scopes versus granted scopes

In certain cases, users get to consent to the access being requested. While usually the scopes returned will be identical to those requested, users can edit granted scopes (both during initial consent and sometimes after, depending on the resource), thereby granting an app less access than it requested. 

As an application developer, you should be aware of this possibility and handle these cases in your app. For example, your app could warn the user that they will see reduced functionality. It could also send the user back through the authorization flow to ask for additional permissions. But again, remember that when asked for consent, users can always say no.

::: note
<<<<<<< HEAD
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
=======
By default, Auth0 skips user consent for first-party applications, which are applications that are registered under the same Auth0 domain as the API they are calling; however, you can configure your API in Auth0 to require user consent from first-party applications. Third-party applications, which are external applications, require user consent.
>>>>>>> master
:::

## Keep reading

<<<<<<< HEAD
This approach is discussed in more depth in some of our [Architecture Scenarios](/architecture-scenarios). Specifically, you can review the entire [Configure the Authorization Extension](/architecture-scenarios/application/spa-api/part-2#configure-the-authorization-extension) section of our SPA+API Architecture Scenario which demonstrates how to configure the Authorization Extension, and also create a custom Rule which will ensure scopes are granted based on the permissions of a user.
=======
- [OpenID Connect Scopes](/scopes/current/oidc-scopes)
- [API Scopes](/scopes/current/api-scopes)
- [Sample Use Cases: Scopes and Claims](/scopes/current/sample-use-cases)
- [Represent Multiple APIs Using a Single Logical API in Auth0](/api-auth/tutorials/represent-multiple-apis)
- [Restrict Access to APIs](/api-auth/restrict-access-api)
- [SPA + API Architecture Scenario: Restrict API Scopes Based on Authorization Extension Groups](/architecture-scenarios/spa-api/part-2#configure-the-authorization-extension)
>>>>>>> master
