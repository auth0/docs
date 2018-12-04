---
title: Call My API from a Regular Web App
description: Learn how to call your API from Regular Web Apps.
template: microsite
---

# Call My API from a Regular Web App

Using Auth0 in your applications means that you will be "outsourcing" the authentication process to a centralized login page in the same way that Gmail, YouTube, and any other Google property redirects to accounts.google.com whenever a user signs in.

Your user will authenticate, and Auth0 will generate an ID Token and Access Token that will be passed back to your application. The Access Token can then be used to call an API and extract attributes for that user (such as name, email, role, or a custom attribute).

## How it works

In a regular web application:

::: steps 
  1. The user clicks your **Login** button or link.
  2. Our SDK redirects the user to your Auth0 Authorization Server.
  3. The user authenticates with Auth0 using one of your configured login options (e.g., username/password, social identity provider, SAML).
  4. Auth0 responds with the user's ID Token.
:::

For security in server-side web apps, Auth0 uses the OAuth 2.0 Regular Web App Login Flow.

*insert flow diagram here*

## How to implement it

Before you can proceed with calling your API, you will need to get an Access Token. This implementation assumes you've already registered your application with Auth0. 

::: steps
  1. Configure your API. 
     - Once the application has been created you will need to configure the Scopes which applications can request during authorization.
  2. Get an Access Token. 
     - When your application receives the authorization code, it exchanges it for an Access Token. It sends the authorization code and the code verifier to Auth0's token endpoint.
  3. Call your API.
     - To include the Access Token that grants you the right to call the API, Auth0 and the OAuth 2.0 specification recommends for its inclusion in the [HTTP Authorization header](/api-auth/tutorials/authorization-code-grant#3-call-the-api) whenever possible.
  4. Refresh your Access Token.
     - Your Access Token has a limited lifetime and therefore your Access Token will eventually expire. Use Refresh Tokens to get new Access Tokens without having to bother the end user for permissions again.
     - We recommend that you request Auth0 send a Refresh Token whenever it grants an Access Token. You can use it to refresh your Access Token without going through the authorization process again.
:::

:::: further-reading
::: concepts
  * [Application Grant Types](/applications/application-grant-types)
  * [Access Tokens](/tokens/access-token)
  * [Scopes](/scopes/current)
:::

::: guides
  * [Register Web Applications](/applications/webapps)
  * [Refresh Your Access Tokens](/tokens/refresh-token/current#use-a-refresh-token)
  * [Authorization Code Grant](/api-auth/tutorials/authorization-code-grant)
:::

::: references
  * [API Authorization](/api-auth)
  * [Authentication API](/api/authentication)
  * [0Auth 2.0](/protocols/oauth2)
:::
::::

::: whats-next
  * [Protect My API](/microsites/protect-my-api)
  * Mobile Login Flow
  * [Manage My Users](/microsites/manage-my-users/manage-users-and-user-profiles)
:::
