---
description: What is the OpenID Connect protocol and how it works.
---
# OpenID Connect

**OpenID Connect (OIDC)** is an authentication protocol, based on the OAuth 2.0 family of specifications. It uses simple [JSON identity tokens (JWT)](/jwt) delivered via the OAuth 2.0 protocol.

While OAuth 2.0 is about resource access and sharing, OIDC is all about user authentication. Its purpose is to give you one login for multiple sites. Each time you need to log in to a website using OIDC, you are redirected to your OpenID site where you login, and then taken back to the website. For example, if you chose to sing in to Auth0 using your Google account then you used OIDC. Once you successfully authenticate with Google and authorize Auth0 to access your information, Google will send back to Auth0 information about the user and the authentication performed. This information is returned in a [JSON Web Token (JWT)](/jwt) called an **ID Token**.


## ID Token

The ID token (usually referred to as `id_token`) is a [JSON Web Token (JWT)](/jwt) that contains identity data. It is consumed by the client and used to get user information like the user's name, email, and so forth, typically used for UI display.

The ID Token conforms to an industry standard (IETF [RFC 7519](https://tools.ietf.org/html/rfc7519)) and contains three parts: A header, a body and a signature.

- The header contains the type of token and the hash algorithm used on the contents of the token.
- The body, also called the payload, contains identity claims about a user. There are some standard claims with registered names but any number of additional claims with other names can be added, though care must be taken to keep the JWT within the browser size limitations for URLs. The registered claims are:
  - `iss`: the issuer of the token.
  - `sub`: the subject of the token (a unique identifier for the user).
  - `aud`: the audience that the token is intended for.
  - `exp`: the time the token expires (in seconds).
  - `iat`: the time the token was issued (in seconds).
- The signature is used by the recipient of a JWT to validate the integrity of the information conveyed in the JWT.

To get an ID Token using `/authorize` you need to populate the `scope` request parameter with the value `openid` (`scope=openid`).

For more information on ID tokens refer to [Auth0 id_token](/tokens/id_token).

## Claims

Each ID Token contains claims, which are statements about an entity (typically, the user) and additional metadata. A claim can be the user's name, email address, or roles.

There are three types of claims: reserved, public, and private claims. For details you can refer to [JSON Web Tokens (JWT) in Auth0](/jwt#payload).

The [OpenID Connect specification](https://openid.net/specs/openid-connect-core-1_0.html) defines a set of standard claims, like `name`, `email`, `picture`, `address`, `updated_at`, and more. For the complete list refer to the [paragraph 5.1 of the OpenID Connect specification](https://openid.net/specs/openid-connect-core-1_0.html#StandardClaims).

In addition to these standard claims, other claims may be used as well.

For example, we could add an extra property at our client's users using [User Metadata](/metadata). This property would be called `roles` and it would have either the value `ROLE_ADMIN` or the value `ROLE_USER`. The plan is to get this value upon user login and depending on the value customize the UI so the user can or cannot take admin actions.

All we have to do now is specify this new metadata as part of the `scope` request parameter (`scope=openid roles`). Once we decode our ID Token the body payload will contain the property `roles` with the corresponding value for the logged in user.

## How the protocol works

Let's use the example we mentioned earlier, signing to Auth0 using your Google account, for a high level overview on how the flow works:

1. When you choose to sign in to Auth0 using your Google account, Auth0 sends an **Authorization Request** to Google.
1. Google authenticates your credentials or asks you to login if you are not already signed in, and asks for your authorization (lists all the permissions that Auth0 wants, for example read your email address, and asks you if you are ok with that).
1. Once you authenticate and authorize the sign in, Google sends an ID Token, and usually an Access Token, back to Auth0.
1. Auth0 can retrieve user information from the ID Token or use the Access Token to invoke a Google API.
