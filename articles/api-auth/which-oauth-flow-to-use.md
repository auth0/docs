---
title: Which OAuth 2.0 flow should I use?
toc: true
description: Helps the user identify the proper OAuth 2.0 grant for each use case.
topics:
  - api-authentication
  - oidc
  - application-grants
contentType: discussion
useCase:
  - secure-api
  - call-api
---

# Which OAuth 2.0 flow should I use?

<%= include('../_includes/_pipeline2') %>

OAuth 2.0 supports several different **grants**. By grants, we mean ways of retrieving an Access Token. Deciding which one is suited for your case depends mostly on your Application's type, but other parameters weigh in as well, like the level of trust for the Application, or the experience you want your users to have.

Follow this flow to identify the grant that best matches your case.

![Flowchart for OAuth 2.0 Grants](/media/articles/api-auth/oauth2-grants-flow.png)

::: panel Quick refresher - OAuth 2.0 terminology
- **Resource Owner**: the entity that can grant access to a protected resource. Typically this is the end-user.
- **Application**: an application requesting access to a protected resource on behalf of the Resource Owner.
- **Resource Server**: the server hosting the protected resources. This is the API you want to access.
- **Authorization Server**: the server that authenticates the Resource Owner, and issues Access Tokens after getting proper authorization. In this case, Auth0.
- **User Agent**: the agent used by the Resource Owner to interact with the Application, for example a browser or a native application.
:::

## Is the Application the Resource Owner?

The first decision point is about whether the party that requires access to resources is a machine. In the case of machine-to-machine authorization, the Application is also the Resource Owner, so no end-user authorization is needed. An example is a cron job that uses an API to import information to a database. In this example, the cron job is the Application and the Resource Owner since it holds the Client ID and Client Secret and uses them to get an Access Token from the Authorization Server.

If this case matches your needs, then for more information on how this flow works and how to implement it, refer to [Machine-to-Machine (M2M) Flow (Client Credentials Grant)](/flows/concepts/m2m-flow).

## Is the Application a web app executing on the server?

If the Application is a regular web app executing on a server, then the **Regular Web App Login Flow (Authorization Code grant)** is the flow you should use. Using this the Application can retrieve an Access Token and, optionally, a Refresh Token. It's considered the safest choice since the Access Token is passed directly to the web server hosting the Application, without going through the user's web browser and risk exposure.

If this case matches your needs, then for more information on how this flow works and how to implement it, refer to [Regular Web App Login Flow](/flows/concepts/regular-web-app-login-flow).

## Is the Application absolutely trusted with user credentials?

This decision point may result in the **Resource Owner Password Credentials Grant**. In this flow, the end-user is asked to fill in credentials (username/password), typically using an interactive form. This information is sent to the backend and from there to Auth0. It is therefore imperative that the Application is absolutely trusted with this information.

This grant should **only** be used when redirect-based flows (like the [Regular Web App Login Flow](/flows/concepts/regular-web-app-login-flow)) are not possible. If this is your case, then for more information on how this flow works and how to implement it, refer to [Call APIs from Highly Trusted Applications](/api-auth/grant/password).

## Is the Application a SPA or Native/Mobile App?

### Is the Application a SPA?

If the Application is a Single-Page Application (meaning an application running in a browser using a scripting language like JavaScript), then the **Single-Page Login Flow (Implicit Grant)** should be used. In this case, instead of getting an authorization code that needs to be exchanged for an Access Token, the Application directly retrieves an Access Token. On the plus side, this is more efficient since it reduces the number of round trips required to get an Access Token. However, a security consideration is that the Access Token is exposed on the client side. Also, note that this flow does not return a Refresh Token because the browser cannot keep it private (read the __SPAs and Refresh Tokens__ panel for a workaround).

For more information on how this flow works and how to implement it, refer to [Single-Page Login Flow](/flows/concepts/single-page-login-flow).

::: panel SPAs and Refresh Tokens
While SPAs cannot use [Refresh Tokens](/tokens/refresh-token), they can take advantage of other mechanics that provide the same function. A workaround to improve user experience is to use `prompt=none` when you invoke [the /authorize endpoint](/api/authentication#implicit-grant). This will not display the login dialog or the consent dialog. For more information on this, refer to [Silent Authentication](/api-auth/tutorials/silent-authentication). In addition, if you call `/authorize` from a hidden iframe and extract the new [Access Token](/tokens/overview-access-tokens) from the parent frame, then the user will not see the redirects happening.
:::

### Is the Application a Native/Mobile App?

If the Application is a native app, then the **Native/Mobile Login Flow (Authorization Code Grant using Proof Key for Code Exchange)** should be used. This flow adds the concept of a `code_verifier` to the Regular Web App Login Flow. When at first the application asks for an **Authorization Code** it generates a `code_verifier` and its transformed value called `code_challenge`. The `code_challenge` and a `code_challenge_method` are sent along with the request. Afterwards, when the application wants to exchange the Authorization Code for an Access Token, it also sends along the `code_verifier`. The Authorization Server transforms this and if it matches the originally sent `code challenge`, it returns an Access Token.

For more information on how this flow works and how to implement it, refer to [Native/Mobile Login Flow](/flows/concepts/mobile-login-flow).
