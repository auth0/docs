---
description: What is the OpenID Connect protocol and how it works.
---
# OpenID Connect

**OpenID Connect (OIDC)** is an authentication protocol, based on the OAuth 2.0 family of specifications. It uses simple [JSON identity tokens (JWT)](/jwt) delivered via the OAuth 2.0 protocol.

While OAuth 2.0 is about resource access and sharing, OIDC is all about user authentication. Its purpose is to give you one login for multiple sites. Each time you need to log in to a website using OIDC, you are redirected to your OpenID site where you login, and then taken back to the website.

## ID Token

The ID Token is a security token that contains Claims about the Authentication of an End-User by an Authorization Server when using a Client, and potentially other requested Claims. The ID Token is a [JSON Web Token (JWT)](https://tools.ietf.org/html/draft-ietf-oauth-json-web-token-32).

The following information are always present in the payload of an ID Token:
- **iss**:
- **sub**:
- **aud**:
- **exp**:
- **iat**:

To get an ID Token you need to populate the `scope` request parameter with the value `openid` (`scope=openid`).

## Claims

Each ID Token contains claims, which are statements about an entity (typically, the user) and additional metadata. A claim can be the user's name, email address, or roles.

There are three types of claims: reserved, public, and private claims. For details you can refer to [JSON Web Tokens (JWT) in Auth0](/jwt#payload).

The [OpenID Connect specification](https://openid.net/specs/openid-connect-core-1_0.html) defines a set of standard claims, like `name`, `email`, `picture`, `address`, `updated_at`, and more. For the complete list refer to the [paragraph 5.1 of the OpenID Connect specification](https://openid.net/specs/openid-connect-core-1_0.html#StandardClaims).

In addition to these standard claims, other claims may be used as well.

For example, we could add an extra property at our client's users using [User Metadata](/metadata). This property would be called `roles` and it would have either the value `ROLE_ADMIN` or the value `ROLE_USER`. The plan is to get this value upon user login and depending on the value customize the UI so the user can or cannot take admin actions.

All we have to do now is specify this new metadata as part of the `scope` request parameter (`scope=openid roles`). Once we decode our ID Token the body payload will contain the property `roles` with the corresponding value for the logged in user.
