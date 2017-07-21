---
title: Public and confidential, first vs. third-party clients
---
# Client Types

<%= include('../_includes/_pipeline2') %>

When working with Auth0 clients, which are used to represent your applications, there are several terms you should know in terms of how clients are classified:

* Confidential vs. public
* First vs. third-party

## Confidential vs. Public Clients

The OAuth 2.0 specification [defines two types of clients](https://tools.ietf.org/html/rfc6749#section-2.1): public and confidential.

When creating a client through the [Dashboard](${manage_url}/#/clients), Auth0 will ask you what type of application it you want the client to represent and use that information to determine the client type.

### Confidential Clients

Confidential clients are able to hold credentials, such as a client ID and secret, in a secure way without exposing it to unauthorizated parties. This means that you will need a trusted backend server to store the secret(s).

The following application types use confidential clients:

* Web applications with a secure backend using the [Authorization Code grant](/api-auth/grant/authorization-code), [Password](/api-auth/grant/password) or [Password Realm](/api-auth/tutorials/password-grant#realm-support) grants
* Non-interactive clients using the [Client Credentials grant](/api-auth/grant/client-credentials)

All of these grants require clients to authenticate by specifying their client ID and secret when calling the token endpoint.

Since confidential clients are capable of holding secrets, you can choose to have ID token issues to them that have been signed:

* Symmetrically using their client secret (`HS256`)
* Asymmetrically using a private key (`RS256`)

### Public Clients

Public clients **cannot** hold credentials securely. The following application types use public clients:

* Native desktop or mobile applications using the [Authorization Code grant with PKCE](/api-auth/grant/authorization-code-pkce)
* JavaScript-based client-side web applications (i.e. single-page apps) using the [Implicit](/api-auth/grant/implicit) grant

Since public clients are unable to hold secrets, [ID tokens](/tokens/id-token) issued to them must be:

* Signed asymmetrically using a private key (`RS256`)
* Verified using the public key corresponding to the private key used to sign the token

## First vs. Third-Party Clients

First-party and third-party refer to the ownership of the application. This has implications in terms of whom has administrative access to your Auth0 domain.

### First-Party Client

First-party clients are those controlled by the same organization or person who owns the Auth0 domain. For example, if you wanted to access the Contoso API, you'd use a first-party client to log into `contoso.com`.

All clients created via the [Dashboard](${manage_url}/#/clients) are, by default, first-party.

### Third-Party Client

Third-party clients are controlled by someone who most likely should *not* have administrative access to your Auth0 domain. Third-party clients enable external parties or partners to access protected resources behind your API securely. For example, if you create a developer center that allows users to obtain credentials to integrate their apps with your API (this functionality is similar to those provided by well-known APIs such as Facebook, Twitter, and GitHub), you'd use a third-party client. 

Third-party clients must be created through the [Management API](/api/management/v2#!/Clients/post_clients) by setting `is_first_party` to `false`. Additionally, Auth0 considers all clients created via [Dynamic Client Registration](/api-auth/dynamic-client-registration) to be third-party.
