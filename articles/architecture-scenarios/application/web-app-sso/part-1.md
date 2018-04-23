---
description: Regular web app scenario solution overview
toc: true
---

# SSO for Regular Web Apps: Solution Overview

In this section, we'll cover the solution we're implementing, including details on identity management, protocols to use, and the authentication flow required.

## Identity Management

ExampleCo decided to use Auth0 as their Identity as a Service (IDaaS) provider. The reasoning behind this decision was that the company did not want to commit resources on  training, implementation and maintenance of identity and access management. Furthermore, the company plans on building into this solution in the future, possibly adding a mobile native app and an API to push approved timesheets to their internal systems. Auth0 provides the flexibility to incorporate such changes in their architecture with minimum effort.

::: note
Identity-as-Service ("IDaaS") is a cloud-based service for identity and access management. The offered services often include SSO, federated identity, password management, and more.
:::

## Which protocol to use

The next decision has to do with which protocol to use, OAuth 2.0 with OpenID Connect (OIDC) or SAML.

::: note
Auth0 implements proven, common and popular identity protocols, both for consumer oriented web products (OAuth 2.0, OAuth 1.0, OpenID) and for enterprise deployments (SAML, WS-Federation, LDAP). You have complete freedom to use the one that best meets your business needs.
:::

__OpenID Connect__ is an authentication protocol, based on the OAuth 2.0 family of specifications. It uses simple JSON identity tokens (JWT) delivered via the OAuth 2.0 protocol.

::: panel OAuth vs OpenID Connect (OIDC)
OAuth 2.0 and OpenID Connect (OIDC) are often mistaken for the same thing, but this is not exact.
__OAuth 2.0__ is a protocol that lets you authorize one website (the consumer or application) to access your data from another website (the resource server or provider). For example, you want to authorize a website to access some files from your Dropbox account. The website will redirect you to Dropbox which will ask you whether it should provide access to your files. If you agree the website will be authorized to access your files from Dropbox. At the core, OAuth 2.0 is about resource access and sharing.
__OpenID Connect__, on the other hand, is a simple identity layer built on top of the OAuth 2.0 protocol. It gives you one login for multiple sites. Each time you need to log in to a website using OIDC, you are redirected to your OpenID site where you login, and then taken back to the website. At the core, OIDC is concerned with user authentication.
:::

__SAML__ is an XML-based protocol, that provides both authentication and authorization between trusted parties.

Compared to SAML, OpenID Connect is lighter weight and simpler to deal with. SAML is proven, powerful and flexible, but for the requirements of this app, that flexibility and power is not required. Identity federation (one of the most compelling reasons for adopting SAML) is not required here either, And if it ever became a requirement, it can be easily handled by Auth0, in the same way it deals with AD (that uses LDAP).

For these reasons, ExampleCo will use OpenID Connect for their implementation.

## Authentication Flow

OpenID Connect supports more than one flow for authentication. Since our scenario involves a regular web app we will use the __Authorization Code Flow__.

The flow goes as follows:
1. The web app (called the __Client__ in OIDC terms) initiates the authentication request by redirecting the __user-agent__ (browser) to Auth0 (the __Authorization Server__ in OIDC terms).
1. Auth0 authenticates the user (via the user-agent). The first time the user goes through this flow a consent page will be shown where the permissions that will be given to the Application are listed (for example, post messages, list contacts). The user logs in to the service (unless they are already logged in) and authorizes the application access.
1. Assuming the user grants access, Auth0 redirects the __user-agent__ back to the __Application__, along with an _authorization code_ in the querystring.
1. The Application sends the _authorization code_ to Auth0, along with the application credentials (`client_id` and `client_secret`), and asks for a token.
1. Auth0 authenticates the __Application__ (using the `client_id` and `client_secret`) and validates the _authorization code_. If valid, Auth0 responds back with an __ID Token__.

![Diagram of the Authorization Code Flow](/media/articles/architecture-scenarios/web-app-sso/authz-code-flow.png)

::: panel Form Post Response Mode
Another option is to use the __OAuth 2.0 Form Post Response Mode__ with `response_type=id_token&response_mode=form_post`. Due to the `response_type=id_token` request parameter, the response contains the `id_token` directly, instead of the authorization code, while the `response_mode=form_post` encodes the `id_token` with the rest of the Authorization Response parameters as HTML form values that are auto-submitted in the User Agent. This way you can have an optimized authentication flow (no need to exchange the code for an `id_token`), however you have to make sure that it is supported by the technology you are using to implement your app (ASP .NET Core middleware does support it). For more details refer to the [OAuth 2.0 Form Post Response Mode specification](https://openid.net/specs/oauth-v2-form-post-response-mode-1_0.html).
:::

The __ID Token__ (usually referred to as `id_token`) is a __JSON Web Token (JWT)__ that contains identity data. It is consumed by the application and used to get user information like the user's name, email, and so forth, typically used for UI display.

::: panel More on tokens
Tokens are alphanumeric strings used in token-based authentication. They allow users to authenticate with a username and password once and get a token in return which they can use from that point on. They have a limited lifetime duration.

__JSON Web Tokens (JWTs)__ are tokens that conform to the [JSON Web Token Standard](https://tools.ietf.org/html/rfc7519) and contain information about an identity in the form of claims. They are self-contained in that it is not necessary for the recipient to call a server to validate the token. JWTs can be signed using a secret (with the __HMAC__ algorithm) or a public/private key pair using __RSA__. You can find more information on JWT [here](/jwt).

The ID Token, which is a JWT, conforms to an industry standard (IETF [RFC 7519](https://tools.ietf.org/html/rfc7519)) and contains three parts: A header, a body and a signature.
- The header contains the type of token and the hash algorithm used on the contents of the token.
- The body, also called the payload, contains identity claims about a user. There are some claims with registered names, for things like the issuer of the token, the subject of the token (who the claims are about), and the time of issuance.  Any number of additional claims with other names can be added, though care must be taken to keep the JWT within the browser size limitations for URLs.
- The signature is used by the recipient of a JWT to validate the integrity of the information conveyed in the JWT.
:::

### How to validate an ID Token

The validation of an ID Token requires several steps:
1. If the ID Token is encrypted, decrypt it using the keys and algorithms that the Application specified.
1. The Issuer Identifier for the OpenID Provider must match the value of the `iss` (issuer) claim.
1. The `aud` (audience) claim should contain the Application's `client_id` value. The ID Token must be rejected if the ID Token does not list the Application as a valid audience, or if it contains additional audiences not trusted by the Application.
1. If the ID Token contains multiple audiences, the Application should verify that an `azp` claim is present.
1. If an `azp` (authorized party) claim is present, the Application should verify that its `client_id` is the claim value.
1. The Application must validate the signature of ID Tokens according to JWS using the algorithm specified in the JWT `alg` header parameter. The Application must use the keys provided by the Issuer.
1. The `alg` value should be the default of `RS256` or the algorithm sent by the Application in the `id_token_signed_response_alg` parameter during registration.
1. If the JWT `alg` header parameter uses a MAC based algorithm such as `HS256`, `HS384`, or `HS512`, the octets of the UTF-8 representation of the client_secret corresponding to the `client_id` contained in the `aud` (audience) claim are used as the key to validate the signature. For MAC based algorithms, the behavior is unspecified if the `aud` is multi-valued or if an `azp` value is present that is different than the `aud` value.
1. The current time must be before the time represented by the `exp` claim.
1. The `iat` claim can be used to reject tokens that were issued too far away from the current time, limiting the amount of time that nonces need to be stored to prevent attacks. The acceptable range is Application specific.
1. If a `nonce` value was sent in the Authentication Request, a `nonce` claim must be present and its value checked to verify that it is the same value as the one that was sent in the Authentication Request. The Application should check the `nonce` value for replay attacks. The precise method for detecting replay attacks is Application specific.
1. If the `acr` claim was requested, the Application should check that the asserted claim value is appropriate.
1. If the `auth_time` claim was requested, either through a specific request for this claim or by using the `max_age` parameter, the Application should check the `auth_time` claim value and request re-authentication if it determines too much time has elapsed since the last End-User authentication.

::: note
If you store ID Tokens on your server, you must do so securely.
:::

<%= include('./_stepnav', {
 prev: ["Introduction", "/architecture-scenarios/application/web-app-sso"],
 next: ["2. Auth0 Configuration", "/architecture-scenarios/application/web-app-sso/part-2"]
}) %>
