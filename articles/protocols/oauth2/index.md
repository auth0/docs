---
description: OAuth 2.0 Authorization Framework.
---
# OAuth 2.0

[OAuth 2.0](https://oauth.net/2/) is a protocol that allows a user to grant limited access to their resources on one site, to another site. This is done without the users having to expose their credentials. According to [OAuth‘s website](http://oauth.net/about/) the protocol is not unlike a valet key.

> Many luxury cars today come with a valet key. It is a special key you give the parking attendant and unlike your regular key, will not allow the car to drive more than a mile or two. Some valet keys will not open the trunk, while others will block access to your onboard cell phone address book. Regardless of what restrictions the valet key imposes, the idea is very clever. You give someone limited access to your car with a special key, while using your regular key to unlock everything.

This is exactly why this protocol was designed: to provide a standard way for developers to offer a service via an API without forcing the users to expose their passwords.

## OAuth Roles

The [OAuth 2.0 Authorization Framework specification](https://tools.ietf.org/html/rfc6749) defines a set of roles.

- **Resource Owner**: the entity that can grant access to a protected resource. Typically this is the end-user.

- **Resource Server**: the server hosting the protected resources. This is the API you want to access.

- **Client**: an application requesting access to a protected resource on behalf of the Resource Owner.

- **Authorization Server**: the server that authenticates the Resource Owner, and issues access tokens after getting proper authorization. In this case, Auth0.

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

- Authorization Code
- Implicit
- Resource Owner Password Credentials
- Client Credentials

The specification also provides an extensibility mechanism for defining additional types.

For details on how each grant type works and when it should be used refer to [API Authorization](/api-auth).

## Scopes

An API can offer different access levels based on the value of the request parameter **scope**. It is part of the access token and it lists the "rights" that the Client holding the token should be granted. For example, you may have a contacts API that can be used to read, create or delete contacts. If the Client should have read only access then the request parameter could be `scope=read`. If it should be able to create new contacts as well it could be `scope=read create`.

For details refer to [Scopes](/scopes).
