---
description: How to develop and test Auth0 applications.
---

# Running and Developing Locally

 In most cases, authenticating users through Auth0 requires an Internet connection. However, you can still develop and test apps that use Auth0 locally. In some cases, you might not need access to an Internet connection.

:::panel-info Development Environments
Please see [Setting Up Multiple Environments](/dev-lifecycle/setting-up-env) for information on structuring your development, test, and production environments when using Auth0.
:::

## Client-Side Applications Using JSON Web Tokens (JWT)

Because [JSON Web Tokens (JWT)](/jwt) are stateless (that is, the app that consumes them cares only about its contents, not any of its previous states), this is one of the easiest scenarios to test locally.

You can obtain JWTs for testing using any of the following methods:

1. Manually [generate a JWT](https://jwt.io#libraries-io) with the needed data, and sign it with your [Auth0 client secret](${manage_url}/#/clients/${account.clientId}/settings). Omit the `exp` claim from a token; most JWT libraries will interpret it as a token which never expires (it's possible some libraries might reject a perpetual token). **This method doesn't require Internet access or Auth0 intervention.**

2. Create a test user for a database [connection](/identityproviders), and programatically log this user in by making the appropriate call to the Authentication API's [Resource Owner endpoint](/api/authentication/reference#resource-owner). To return a JWT, [set the correct `scope` value](/scopes). Using this approach, any rules you've configured will run.

```har
{
  "method": "POST",
  "url": "https://${account.namespace}/oauth/ro",
  "headers": [
    { "name": "Content-Type", "value": "application/json" }
  ],
  "postData": {
    "mimeType": "application/json",
    "text": "{\"client_id\": \"CLIENT_ID\",\"username\": \"USERNAME\", \"password\": \"PASSWORD\", \"connection\": \"CONNECTION\", \"grant_type\": \"GRANT_TYPE\", \"scope\":\"openid\" }"
  }
}
```

3. Use a browser bot (e.g. Selenium) to play the role of a user, log in and retrieve a JWT. While this is approach may take some effort to develop and maintain, it will allow you to test any [redirection rules](/rules/redirect) or [MFA prompts](/multifactor-authentication) that you have configured.

## Server-side applications and sessions

Unless your server-side application provides a way to generate "fake" sessions for testing, you will need to perform an actual login through Auth0.
The easiest way to do this is through the [resource owner endpoint](/api/authentication/reference#resource-owner).

## Logging in as any user for testing

If you need to simulate a user logging in to your application but don't have access to their credentials, you can use the [impersonation endpoint](/api/authentication/reference#impersonation) to generate a link which will log you in as any given user to your application.

## Auth0 and `localhost`

If you need to develop an application locally, it's possible to use `localhost` or other domains which Auth0 cannot access (e.g. intranets) as callback URLs.
Since Auth0 [uses OpenID Connect](/protocols) as its main identity protocol, it never makes a call directly to your application's server.
Instead, it redirects users in a browser to an endpoint of your application (which must be listed in the "Allowed Callback URLs" list) with specific information in the query string or hash fragment, depending on the type of application.
