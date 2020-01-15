---
description: How to develop and test Auth0 applications.
topics:
    - dev-tools
    - local-env
contentType: how-to
useCase: development
---
# Work with Auth0 Locally

 In most cases, authenticating users through Auth0 requires an Internet connection. However, you can still develop and test apps that use Auth0 locally. In some cases, you might not need access to an Internet connection.

::: note
See [Setting Up Multiple Environments](/dev-lifecycle/setting-up-env) for information on structuring your development, test, and production environments when using Auth0.
:::

## Use JSON Web Tokens (JWT) with client-side applications

Because [JSON Web Tokens (JWT)](/tokens/concepts/jwts) are stateless (that is, the app that consumes them cares only about its contents, not any of its previous states), this is one of the easiest scenarios to test locally.

You can obtain JWTs for testing using any of the following methods:

1. Create a test user for a database [connection](/identityproviders), and programmatically log this user in. Essentially, you are using the recommended process for [calling an API using a highly-trusted application](/api-auth/grant/password). For detailed implementation instructions, see [Execute the Resource Owner Password Grant](/api-auth/tutorials/password-grant).

2. Use a browser bot (such as Selenium) to play the role of a user, log in and retrieve a JWT. While this approach may take some effort to develop and maintain, it will allow you to test any [redirection rules](/rules/redirect) or [MFA prompts](/multifactor-authentication) that you have configured.

## Use sessions with server-side applications

Unless your server-side application allows the generation of artificial sessions for testing, you'll need a way to perform a login through Auth0 manually.

For a high-level overview of how to do this, see [Authorization Code Flow](/flows/concepts/auth-code). For detailed implementation instructions, see our tutorial, [Call API Using the Authorization Code Flow](/flows/guides/auth-code/call-api-auth-code).

## Use local domains with Auth0

If you're developing your application locally, you can use `localhost` and other domains inaccessible by Auth0 (such as those on an intranet) as [callback URLs](/users/guides/redirect-users-after-login). For example, during development you could use `http://localhost:3000/callback` as the callback URL.

To set a callback URL, go to [Applications > Settings](${manage_url}/#/applications/${account.clientId}/settings) and add the URL to the **Allowed Callback URLs** list.

Because Auth0's main identity protocol is <dfn data-key="openid">OpenID Connect (OIDC)</dfn>, Auth0 never needs to directly call your application's server. Instead, Auth0 redirects users to your application's endpoint(s) with required information contained in a query string or hash fragment.

## Divert emails for testing

If you want to test your local application and do not want the emails (creation, validation, etc.) to be delivered to the actual email address of the users your application creates or validates, Auth0 recommends using a custom email provider. For example, a service like [Mailtrap](https://mailtrap.io/signin) or your own custom SMTP server implementation can apply whatever logic you require to trap the emails. This ensures that users do not receive emails but you can access them for validation and troubleshooting. 

<%= include('../_includes/_email-domain-blacklist') %>
