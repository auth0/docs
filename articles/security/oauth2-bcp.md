---
description: Current Best Practices in OAuth2
toc: true
crews: crew-security
topics:
  - security
  - OAuth2
  - Best Practice
  - users
contentType:
  - reference
useCase:
  - development
---

# OAuth2 Current Best Practice

We have compiled several security guidelines for the different grant types specified in the OAuth RFC.

Please be aware that this is not an exhaustive list; further readings and references may be found in the Keep reading section.

## Common Guidelines

* `redirect_uri` should be as strict as possible; http urls should not be allowed in a production application.

* [state parameter](/protocols/oauth2/oauth-state) should always be used to prevent CSRF attacks.

* Access tokens should be stored in-memory rather than utilizing local storage.


## Implicit Grant

Per the most current best practice, implicit flows are generally not recommended due to tokens being passed through user agents.
However, In many cases due to other restrictions, such as CORS not supported in the authorization server, implicit grants may be used.
The current recommended guideline is to reduce the the impact by allowing only id_tokens returned back from the authorization server and not the access tokens.

However, such recommendation is dependent on the risk profile of your application.


## Authorization Code Grant

Authorization code grant is the recommended method over implicit grant whenever possible. The security advantage of the grant prevents a user agent from accessing the tokens returned by the server, preventing an additional attack vector.

The current recommendation is to utilize [PKCE protocol](https://auth0.com/docs/api-auth/tutorials/authorization-code-grant-pkce) wherever applicable to prevent authorization code interception attacks; despite the initial design was for native applications.


## Resource Owner Password Grant

Resource Owner Password Grant is generally not recommended for external use since it provides no ability to present the option for consent to the user. A user providing her credentials to the application is presumed to grant consent of all scopes to the application. However, due to reasons such as user experience or backwards compatibility, ROPG may be used.

We recommend limiting the scopes to the minimal requirement to reduce the impact in case the application or tokens are compromised.  


## Keep reading

::: next-steps
* [IETF Current Best Practices](https://tools.ietf.org/html/draft-ietf-oauth-security-topics)
* [IETF Browser Based Apps Best Practices](https://tools.ietf.org/html/draft-ietf-oauth-browser-based-apps)
* [IETF Native Apps Best Practices](https://tools.ietf.org/html/rfc8252)
* [Auth0 Blog: OAuth2 Implicit Grant and SPA](https://auth0.com/blog/oauth2-implicit-grant-and-spa/)
:::
