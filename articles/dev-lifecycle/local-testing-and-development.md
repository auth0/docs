---
description: How to develop and test Auth0 applications.
---

# Work with Auth0 Locally

 In most cases, authenticating users through Auth0 requires an Internet connection. However, you can still develop and test apps that use Auth0 locally. In some cases, you might not need access to an Internet connection.

:::panel-info Development Environments
Please see [Setting Up Multiple Environments](/dev-lifecycle/setting-up-env) for information on structuring your development, test, and production environments when using Auth0.
:::

## Use JSON Web Tokens (JWT) with Client-Side Applications

Because [JSON Web Tokens (JWT)](/jwt) are stateless (that is, the app that consumes them cares only about its contents, not any of its previous states), this is one of the easiest scenarios to test locally.

You can obtain JWTs for testing using any of the following methods:

1. Manually [generate a JWT](https://jwt.io#libraries-io) with the needed data, and sign it with your [Auth0 client secret](${manage_url}/#/clients/${account.clientId}/settings). Omit the `exp` claim from a token; most JWT libraries will interpret it as a token which never expires (it's possible some libraries might reject a perpetual token). **This method doesn't require Internet access.**

2. Create a test user for a database [connection](/identityproviders), and programatically log this user in. Essentially, you are using the recommended process for [calling an API using a highly-trusted client](/api-auth/grant/password). For detailed implementation instructions, see [Execute the Resource Owner Password Grant](/api-auth/tutorials/password-grant).

3. Use a browser bot (e.g. Selenium) to play the role of a user, log in and retrieve a JWT. While this is approach may take some effort to develop and maintain, it will allow you to test any [redirection rules](/rules/redirect) or [MFA prompts](/multifactor-authentication) that you have configured.

## Use Sessions with Server-Side Applications

Unless your server-side application allows the generation of artificial sessions for testing, you'll need a way to perform a login through Auth0 manually.

For a high-level overview of how to do this, see [Calling APIs from Server-side Web Apps](/api-auth/grant/authorization-code). For detailed implementation instructions, see [Execute an Authorization Code Grant Flow](/api-auth/tutorials/authorization-code-grant).

## Log In as a User for Testing

If you need to simulate the user login process to your application, but you don't have access to a set of user credentials, you can use the [impersonation endpoint](/api/authentication/reference#impersonation) to generate a link allowing you to log in as a specific user.

```har
{
  "method": "POST",
  "url": "https://${account.namespace}/users/{user_id}/impersonate",
  "headers": [
    { "name": "Content-Type", "value": "application/json" }
  ],
  "postData": {
    "mimeType": "application/json",
    "text": "{\"protocol\": \"PROTOCOL\",\"impersonator_id\": \"IMPERSONATOR_ID\", \"client\": \"CLIENT_ID\", \"additionalParameters\": [\"response_type\": \"CODE\",\"state\": \"STATE\"]}"
  }
}
```

## Use Local Domains with Auth0

If you're developing your application locally, you can use `localhost` and other domains inaccessible by Auth0 (such as those on an intranet) as callback URLs.

Because Auth0's main identity protocol is [OpenID Connect](/protocols), Auth0 never needs to directly call your application's server. Instead, Auth0 redirects users to your application's endpoint(s) with required information contained in a query string or hash fragment.
