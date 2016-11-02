---
description: What is the OAuth 2.0 Authorization Framework and how it works.
---
# OAuth 2.0

[OAuth 2.0](https://oauth.net/2/) is a protocol that allows a user to grant limited access to their resources on one site, to another site. This is done without the users having to expose their credentials. According to [OAuth‘s website](http://oauth.net/about/) the protocol is not unlike a valet key.

> Many luxury cars today come with a valet key. It is a special key you give the parking attendant and unlike your regular key, will not allow the car to drive more than a mile or two. Some valet keys will not open the trunk, while others will block access to your onboard cell phone address book. Regardless of what restrictions the valet key imposes, the idea is very clever. You give someone limited access to your car with a special key, while using your regular key to unlock everything.

The protocol's purpose is to provide a standard way for developers to offer a service via an API without forcing the users to expose their passwords.


## OAuth Roles

The [OAuth 2.0 Authorization Framework specification](https://tools.ietf.org/html/rfc6749) defines a set of roles.

- **Resource Owner**: the entity that can grant access to a protected resource. Typically this is the end-user.

- **Resource Server**: the server hosting the protected resources. This is the API you want to access.

- **Client**: an application requesting access to a protected resource on behalf of the Resource Owner.

- **Authorization Server**: the server that authenticates the Resource Owner, and issues access tokens after getting proper authorization. In this case, Auth0.


## Access Token

The Access Token, commonly referred to as `access_token` in code samples, is a credential that can be used by a client to access an API. The `access_token` should be used as a `Bearer` credential and transmitted in an HTTP `Authorization` header to the API. Auth0 uses access tokens to protect access to the Auth0 Management API.

By default, Auth0 generates access tokens in [JSON Web Token (JWT)](/jwt) format, an industry standard. JWTs contain three parts: a header, a set of claims, and a signature:
 - The header contains metadata about the type of token and the cryptographic algorithms used to secure its contents.
 - The set of claims contains verifiable security statements such as the identity of the user and the permissions they are allowed.
 - The signature is used to validate that the token is trustworthy and has not been tampered with.

It should be noted that other token formats are also available. For example, Auth0 Management API v1 (which has been deprecated) uses an opaque token format in which claims are referenced in a separate database, rather than directly in the token. Simple Web Token is an example of another token format, although it has not seen widespread adoption. Support for future tokens formats will be implemented if and when industry consensus develops around them.

## Scopes

Each access token may include a list of the permissions that have been granted to the client. When a client authenticates with Auth0, it will specify the list of scopes (or permissions) it is requesting. If those scopes are authorized, then the access token will contain a list of authorized scopes.

For example, a Contacts API may accept four different levels of authorization: reading contacts (scope `read:contacts`), creating contacts (scope `create:contacts`) and deleting contacts (scope `delete:contacts`).

When a client asks the API to create a new contact, then the access token should contain the `create:contacts` scope. In a similar fashion, in order to delete existing contacts, the access token should contain the `delete:contacts` scope.

For more information refer to [Scopes](/scopes).


## Protocol Flow

We will now have a more detailed look on how the protocol works. As we will see in a while, OAuth has many "flavors" (actually called authorization grant types) that you can use. For now we will have a more generic look into the flow.

![Generic OAuth Flow](/media/articles/protocols/oauth2-generic-flow.png)

1. The Client asks for authorization from the Resource Owner in order to access the resources.

1. Provided that the Resource Owner authorizes this access, the Client receives an **Authorization Grant**. This is a credential representing the Resource Owner's authorization.

1. The Client requests an **access token** by authenticating with the Authorization Server and giving the Authorization Grant.

1. Provided that the Client is successfully authenticated and the Authorization Grant is valid, the Authorization Server issues an access token and sends it to the Client.

1. The Client requests access to the protected resource by the Resource Server, and authenticates by presenting the access token.

1. Provided that the access token is valid, the Resource Server serves the Client's request.


## Authorization Grant Types

The [OAuth 2.0 Authorization Framework specification](https://tools.ietf.org/html/rfc6749) defines four grant types.

- **Authorization Code**
- **Implicit**
- **Resource Owner Password Credentials**
- **Client Credentials**

The specification also provides an extensibility mechanism for defining additional types.

For details on how each grant type works and when it should be used refer to [API Authorization](/api-auth).
