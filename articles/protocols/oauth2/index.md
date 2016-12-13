---
description: What is the OAuth 2.0 Authorization Framework and how it works.
---
# OAuth 2.0

[OAuth 2.0](https://oauth.net/2/) is a protocol that allows a user to grant limited access to their resources on one site, to another site, without having to expose their credentials.

According to [OAuth‘s website](http://oauth.net/about/) the protocol is not unlike a valet key.

> Many luxury cars today come with a valet key. It is a special key you give the parking attendant and unlike your regular key, will not allow the car to drive more than a mile or two. Some valet keys will not open the trunk, while others will block access to your onboard cell phone address book. Regardless of what restrictions the valet key imposes, the idea is very clever. You give someone limited access to your car with a special key, while using your regular key to unlock everything.

To get access to the protected resources OAuth 2.0 uses **access tokens**. An access token is a string in [JSON Web Token (JWT)](/jwt) format, that contains the list of authorized permissions.

::: panel-info Access Token Format
By default, Auth0 generates access tokens in [JSON Web Token (JWT)](/jwt) format, an industry standard. JWTs contain three parts: a header, a payload, and a signature:
 - The header contains metadata about the type of token and the cryptographic algorithms used to secure its contents.
 - The payload contains a set of claims, which are statements about the permissions that should be allowed, and other information like the intended audience and the expiration time.
 - The signature is used to validate that the token is trustworthy and has not been tampered with.

 For more information refer to [JSON Web Tokens (JWT) in Auth0](/jwt).
:::

The permissions contained in the access token, in OAuth 2.0 terms are known as **scopes**. When a client authenticates with Auth0, it specifies the scopes it wants. If those scopes are authorized by the user, then the access token will contain a list of authorized scopes.

For example, a Contacts API may accept four different levels of authorization: reading contacts (scope `read:contacts`), creating contacts (scope `create:contacts`) and deleting contacts (scope `delete:contacts`). When a client asks the API to create a new contact, then the access token should contain the `create:contacts` scope. In a similar fashion, in order to delete existing contacts, the access token should contain the `delete:contacts` scope.

::: panel-info Scope Request Parameter
The reason why we refer to the permissions as scopes is because these permissions are sent to the relevant endpoints using the `scope` request parameter. The value of this parameter is expressed as a list of space-delimited, case-sensitive, predefined strings.

For more information refer to [Scopes](/scopes).
:::


## OAuth Roles

In any OAuth 2.0 flow we can identify the following roles:

- **Resource Owner**: the entity that can grant access to a protected resource. Typically this is the end-user.

- **Resource Server**: the server hosting the protected resources. This is the API you want to access.

- **Client**: an application requesting access to a protected resource on behalf of the Resource Owner.

- **Authorization Server**: the server that authenticates the Resource Owner, and issues access tokens after getting proper authorization. In this case, Auth0.


## Protocol Flow

We will now have a more detailed look on how the protocol works. As we will see in a while, OAuth has many "flavors" (called authorization grant types) that you can use. For now we will have a more generic look into the flow.

![Generic OAuth Flow](/media/articles/protocols/oauth2-generic-flow.png)

1. The Client asks for authorization from the Resource Owner in order to access the resources.

1. Provided that the Resource Owner authorizes this access, the Client receives an **Authorization Grant**. This is a credential representing the Resource Owner's authorization.

1. The Client requests an **access token** by authenticating with the Authorization Server and giving the Authorization Grant.

1. Provided that the Client is successfully authenticated and the Authorization Grant is valid, the Authorization Server issues an access token and sends it to the Client.

1. The Client requests access to the protected resource by the Resource Server, and authenticates by presenting the access token.

1. Provided that the access token is valid, the Resource Server serves the Client's request.


## Authorization Grant Types

The [OAuth 2.0 Authorization Framework specification](https://tools.ietf.org/html/rfc6749) defines four flows to get an access token. These flows are called **grant types**. Deciding which one is suited for your case depends mostly on the type of your client.

- [Authorization Code](/api-auth/grant/authorization-code): used by Web Apps executing on a server. This is also used by mobile apps, using the [Proof Key for Code Exchange (PKCE) technique](/api-auth/grant/authorization-code-pkce).
- [Implicit](/api-auth/grant/implicit): used by JavaScript-centric apps (Single Page Applications) executing on the user's browser.
- [Resource Owner Password Credentials](/api-auth/grant/password): used by trusted apps.
- [Client Credentials](/api-auth/grant/client-credentials): used for machine-to-machine communication.

The specification also provides an extensibility mechanism for defining additional types.

For details on how each grant type works and when it should be used refer to [API Authorization](/api-auth).


## OAuth Endpoints

OAuth 2.0 utilizes two endpoints: the **Authorization** endpoint and the **Token** endpoint.

### Authorization Endpoint

### Token Endpoint
