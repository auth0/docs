---
description: Describes the Authentication API Code Grant using Proof Key for Code Exchange.
---

# API Auth: Authorization Code Grant using Proof Key for Code Exchange.
<%=include('../_preview-warning') %>

The Proof Key for Code Exchange (PKCE), defined in [RFC 7636](https://tools.ietf.org/html/rfc7636), is a technique used to mitigate the authorization code interception attack when using the [Authorization Code Grant](/api-auth/grant/authorization-code) since the attacker can intercept the `authorization_code` returned by the Authorization Server and exchange it for an `access_token` (and possibly a `refresh_token`).
To mitigate this attack, the Client creates, for every authorization request, a cryptographically random key called `code_verifier` and it's transformed value called `code_challenge`, which is sent to the Authorization Server to obtain the `authorization_code`. When the Client receives the `authorization_code`, it will send the code and the `code_verifier` to the Authorization Server token endpoint to exchange them for the requested tokens.

![](/media/articles/api-auth/authorization-code-grant-pkce.png)

 1. The Client initiates the flow and redirects the user to the Authorization Server sending the `code_challenge` and `code_challenge_method` parameters
 2. The Authorization Server redirects the user to the Client with an `authorization_code` in the querystring
 3. The Client sends the `authorization_code` and `code_verifier` together with the Redirect Uri and the Client Id to the Authorization Server
 4. The Authorization Server validates this information and returns an `access_token` (and optionally a `refresh_token`)

## Use Case

 - Allow a Public Client to use the Authorization Code Grant without being susceptible to authorization code interception attack.
 - The Client is typically an Android or iOS Application.

 ## Tutorials

  - [Executing an Authorization Code Grant with PKCE flow](/api-auth/tutorials/authorization-code-grant-pkce)
