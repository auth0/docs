---
title: Scopes
description: Understand the principle of scopes and explore general examples of their use.
topics:
  - scopes
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

Scopes let you control the type of access your users need; they are a method of limiting the access given to a user by a [token](/tokens). 

When an app requests access to a resource through an authorization server, it uses the `scope` parameter to specify what type of access it desires, and the authorization server uses the `scope` parameter to respond with the type of access that was actually granted (if the granted access level was different from what was requested).

Generally, you use scopes in two ways:

* In an [application](/applications), to verify the identity of a user and get basic profile information about the user, such as their email or picture. In this scenario, the scopes available to you include those implemented by the [OpenID Connect](/protocols/oidc) protocol. For details, refer to [OpenID Connect Scopes](/scopes/current/oidc-scopes).

* In an [API](/apis), to implement granular access control. In this case, you need to define custom scopes for your API and then identify these scopes so that calling applications can use them. For details, refer to [API Scopes](/scopes/current/api-scopes).


## Best practices

Understand your use case and choose the most restrictive scope possible. Are you establishing a user's identity or asking the user to allow you to interact with their data? There's a big difference between importing a user's Facebook profile information and posting to their wall. Only request what you absolutely need. By doing so, you are also more likely to gain user consent since users are more likely to grant access for limited, clearly-specified scopes.


## Requested scopes versus granted scopes

Remember that a user gets to consent to the access level you are requesting. While usually the scopes returned will be identical to the scopes you requested, users can edit their scopes (both during and after initial consent), thereby granting your app less access than you requested. 

Be aware of this possibility and handle these cases in your app. For example, your app could warn the user that they will see reduced functionality. It could also send the user back through the authorization flow to ask for additional permissions. But again, remember that users can always say no.


## Keep reading

- [OpenID Connect Scopes](/scopes/current/oidc-scopes)
- [API Scopes](/scopes/current/api-scopes)
- [Sample Use Cases: Scopes and Claims](/scopes/current/sample-use-cases)
- [How to Represent Multiple APIs Using a Single Auth0 API](/api-auth/tutorials/represent-multiple-apis)
