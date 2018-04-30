---
description: How to develop and test Auth0 applications.
---
# Work with Auth0 Locally

 In most cases, authenticating users through Auth0 requires an Internet connection. However, you can still develop and test apps that use Auth0 locally. In some cases, you might not need access to an Internet connection.

::: note
Please see [Setting Up Multiple Environments](/dev-lifecycle/setting-up-env) for information on structuring your development, test, and production environments when using Auth0.
:::

## Use JSON Web Tokens (JWT) with Client-Side Applications

Because [JSON Web Tokens (JWT)](/jwt) are stateless (that is, the app that consumes them cares only about its contents, not any of its previous states), this is one of the easiest scenarios to test locally.

You can obtain JWTs for testing using any of the following methods:

1. Create a test user for a database [connection](/identityproviders), and programatically log this user in. Essentially, you are using the recommended process for [calling an API using a highly-trusted application](/api-auth/grant/password). For detailed implementation instructions, see [Execute the Resource Owner Password Grant](/api-auth/tutorials/password-grant).

2. Use a browser bot (such as Selenium) to play the role of a user, log in and retrieve a JWT. While this approach may take some effort to develop and maintain, it will allow you to test any [redirection rules](/rules/redirect) or [MFA prompts](/multifactor-authentication) that you have configured.

## Use Sessions with Server-Side Applications

Unless your server-side application allows the generation of artificial sessions for testing, you'll need a way to perform a login through Auth0 manually.

For a high-level overview of how to do this, see [Calling APIs from Server-side Web Apps](/api-auth/grant/authorization-code). For detailed implementation instructions, see [Execute an Authorization Code Grant Flow](/api-auth/tutorials/authorization-code-grant).

## Use Local Domains with Auth0

If you're developing your application locally, you can use `localhost` and other domains inaccessible by Auth0 (such as those on an intranet) as callback URLs.

Because Auth0's main identity protocol is [OpenID Connect](/protocols), Auth0 never needs to directly call your application's server. Instead, Auth0 redirects users to your application's endpoint(s) with required information contained in a query string or hash fragment.
