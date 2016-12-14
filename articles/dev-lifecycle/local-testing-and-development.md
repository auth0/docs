---
description: How to develop and test Auth0 applications.
---

# Running and Developing Locally

Authenticating users through Auth0 in most cases requires an Internet connection, but it's still possible to develop and test applications that use Auth0 locally, even without Internet access in some cases.

> For more information about structuring separate Auth0 environments for development, testing and production, [please refer to this document](/dev-lifecycle/setting-up-env).

## Client-side applications and JWT

This is usually the easiest scenario to test.
One of the benefits of [JSON Web Tokens](/jwt) is that they are stateless, which means that an application that consumes them only cares about the JWT's contents and not any previous state such as a session cookie.

There are mainly three approaches to obtaining JWTs for testing:

1. Manually generate a JWT with the needed data, and sign it with your Auth0 application's client secret.
   If you omit the `exp` claim from a token, most JWT libraries will interpret it as a token which never expires, though it's possible some libraries might reject it.
   The benefit of this approach is that it does not require Internet access or intervention from Auth0 at all.

2. Create a dummy user in a database connection, and programatically log in with this user through the [resource owner endpoint](/auth-api#!#post--oauth-ro).
   In order to get a JWT back, [make sure to set the correct `scope` value](/scopes).
   The benefit of this approach is that it will [execute any rules](/rules) that you have configured on your Auth0 account.

3. Use a browser bot (e.g. Selenium) which logs a dummy user in and retrieves a JWT.
   This approach may take some effort to develop and maintain, but it will also execute any [redirection rules](/rules/redirect) or [MFA prompts](/multifactor-authentication) that you have configured on your Auth0 account.

## Server-side applications and sessions

Unless your server-side application provides a way to generate "fake" sessions for testing, you will need to perform an actual login through Auth0.
The easiest way to do this is through the [resource owner endpoint](/auth-api#!#post--oauth-ro).

## Logging in as any user for testing

If you need to simulate a user logging in to your application but don't have access to their credentials, you can use the [impersonation endpoint](auth-api#!#post--users--user_id--impersonate) to generate a link which will log you in as any given user to your application.

## Auth0 and `localhost`

If you need to develop an application locally, it's possible to use `localhost` or other domains which Auth0 cannot access (e.g. intranets) as callback URLs.
Since Auth0 [uses OpenID Connect](/protocols) as its main identity protocol, it never makes a call directly to your application's server.
Instead, it redirects users in a browser to an endpoint of your application (which must be listed in the "Allowed Callback URLs" list) with specific information in the query string or hash fragment, depending on the type of application.
