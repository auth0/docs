---
description: Caveats you need to be aware of when using Auth0 Dev Keys for social providers.
---

# Using the Auth0 Developer Keys with Social Connections

When using any of the Social Identity Providers, you need to register your application with the relevant Identity Provider in order to obtain a Client ID and Client Secret. 

Auth0 allows you to enable any Social Identity Provider without specifying your own Client ID and Client Secret. In this instance Auth0 will use its own developer keys when authorizing the user with these providers. This allows you to quickly enable and test a specific Social Identity Provider, but it should definitely not be used in production. 

::: panel-info Client ID and Client Secret
The exact terminology of Client ID / Client Secret may differ between various Identity Providers. For example, Twitter refers to these as a Consumer Key / Consumer Secret and LinkedIn refers to an API Key / Secret Key.
:::

## Caveats

When using the Auth0 developer keys, there are a few caveats you need to be aware of. These may cause your application to behave differently - or some functionality to not work at all - depending on whether you use your own Client ID and Client Secret, or whether you use the Auth0 developer keys.

1. When using the Auth0 developer keys, the consent screen for the various Identity Providers will display Auth0's logo and information to your users. When you register your own application you have the opportunity to use your own logo and other application information.

    ![](/media/articles/connections/social/devkeys/consent-screen.png)

2. [Single Sign On](/sso) will not function properly when using the Auth0 developer keys. The reason for this is that the Auth0 developer applications with all the relevant Identity Providers are configured to call back to the URL `https://login.auth0.com/login/callback` instead of the callback URL for your own tentant, i.e.  `https://${account.namespace}/login/callback`.

    This results in the SSO cookie not being set on your own tenant domain, so the next time a user authenticates no SSO cookie will be detected, even if you configured your client to **Use Auth0 instead of the Identity Provider to do Single Sign On**.

3. [Redirecting users from Rules](/rules/redirect) will not function properly. This is because redirect rules are resumed on the endpoint `https://${account.namespace}/continue`. When using Auth0's developer keys, the session is established on a special endpoint that is generic and tenant agnostic, and calling `/continue` will not find your previous session, resulting in an error.

4. [Federated Logout](/logout#log-out-a-user) does not work. When using the Auth0 developer keys, calling `/v2/logout?federated` will sign the user out of Auth0, but not out of the Social Identity Provider.

5. `prompt=none` won't work on the [/authorize](/api/authentication#!#get--authorize_social) endpoint. [Auth0.js' `silentAuthentication` method](https://github.com/auth0/auth0.js#silent-authentication) uses `prompt=none` internally, so that won't work either.
