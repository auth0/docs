---
title: Public and confidential clients
---

# Client and application types

<%= include('../_includes/_pipeline2') %>

The OAuth 2.0 specification [defines two types of clients](https://tools.ietf.org/html/rfc6749#section-2.1): public and confidential.
When creating a client through the management dashboard, Auth0 will ask you what type of application it represents and use that information to determine the client type.

## Confidential clients

Confidential clients are able to hold credentials, i.e. a client ID and secret, in a secure way without exposing it to users or attackers.
This means that a trusted backend server is needed to store the secrets.
The following application types are confidential clients:

* Web applications with a secure backend using the [Authorization Code grant](/api-auth/grant/authorization-code), [Password](/api-auth/grant/password) or [Password Realm](/api-auth/tutorials/password-grant#realm-support) grants
* Non-interactive clients using the [Client Credentials grant](/api-auth/grant/client-credentials)

Both of these grants require clients to authenticate by specifying their client ID and secret when calling the token endpoint.

Since confidential clients are able to hold secrets, they can choose to have ID tokens issued to them signed symmetrically with their client secret (HS256) or asymmetrically using a private key (RS256).

## Public clients

Public clients are not able to hold credentials in a secure way without exposing them to users or attackers.
The following application types are confidential clients:

* Native desktop or mobile applications using the [Authorization Code grant with PKCE](/api-auth/grant/authorization-code-pkce)
* JavaScript-based client-side web applications (i.e. single-page apps) using the [Implicit](/api-auth/grant/implicit) grant

Since public clients are unable to hold secrets, ID tokens issued to them must be signed asymmetrically using a private key (RS256) and verified by using the corresponding public key.
