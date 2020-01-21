---
description: Caveats you need to be aware of when using Auth0 Dev Keys for social providers.
topics:
  - connections
  - social
  - dev-keys
contentType: reference
useCase:
    - customize-connections
    - add-idp
---

# Test Social Connections with Auth0 Developer Keys

When using any of the available [Social Identity Providers](/connections/identity-providers-social), you need to register your application with the relevant Identity Provider in order to obtain a Client ID and Client Secret.

Auth0 allows you to test a Social Identity Provider without specifying your own Client ID and Client Secret by using Auth0 developer keys. This allows you to quickly enable and test a specific Social Identity Provider, but it should **not be used in production**. 

Auth0 developer keys are not available in [Private Cloud deployments](/private-cloud).

For production environments, make sure to [follow the steps for your chosen provider](/identityproviders) to obtain the Client ID and Client secret from the provider, this will avoid the [limitations](#limitations-of-developer-keys) of using developer keys.

::: panel-warning Custom Developer keys
One or more connections are using Auth0 development keys which are only intended for use in development and testing. The connections should be configured with your own Developer Keys to enable the consent page to show your logo instead of Auth0's and to configure <dfn data-key="single-sign-on">Single Sign-on (SSO)</dfn> for these connections. Auth0 development keys are not recommended for Production environments.
:::

::: panel Client ID and Client Secret
The exact terminology of a Client ID / Client Secret may differ between various Identity Providers. For example, Twitter refers to these as a Consumer Key / Consumer Secret and LinkedIn refers to an API Key / Secret Key.
:::

## Limitations of Developer Keys

The Auth0 developer keys are to be used for testing purposes so there are a few caveats you need to be aware of when using them. These may cause your application to behave differently - or some functionality to not work at all - depending on whether you use your own Client ID and Client Secret, or whether you use the Auth0 developer keys.

When using the Auth0 developer keys, the authentication flow for the various Identity Providers will at times display Auth0's name, logo and information to your users. When you register your own application, you have the opportunity to use your own logo and other application information instead.

![Consent Screen](/media/articles/connections/social/devkeys/login-screen.png)

## Limitations of Developer Keys when using Classic Universal Login

If you are using the [Classic Universal Login experience](/universal-login/classic), these limitations also apply:

1. You cannot use developer keys with [custom domains](/custom-domains).

2. [Single Sign-on](/sso) will not function properly when using the Auth0 developer keys. The reason for this is that the Auth0 developer applications with all the relevant Identity Providers are configured to call back to the URL `https://login.auth0.com/login/callback` instead of the <dfn data-key="callback">callback URL</dfn> for your own tenant, for example `https://${account.namespace}/login/callback`.

    This results in the SSO cookie not being set on your own tenant domain, so the next time a user authenticates no SSO cookie will be detected, even if you configured your application to **Use Auth0 instead of the Identity Provider to do Single Sign-on** (legacy tenants only).

3. [Redirecting users from Rules](/rules/redirect) will not function properly. This is because redirect rules are resumed on the endpoint `https://${account.namespace}/continue`. When using Auth0's developer keys, the session is established on a special endpoint that is generic and tenant agnostic, and calling `/continue` will not find your previous session, resulting in an error.

4. [Federated Logout](/logout#log-out-a-user) does not work. When using the Auth0 developer keys, calling `/v2/logout?federated` will sign the user out of Auth0, but not out of the Social Identity Provider.

5. `prompt=none` won't work on the [/authorize](/api/authentication/reference#social) endpoint. [Auth0.js' checkSession() method](/libraries/auth0js#using-checksession-to-acquire-new-tokens) uses `prompt=none` internally, so that won't work either.

6. If Auth0 is acting as a <dfn data-key="security-assertion-markup-language">SAML</dfn> Identity Provider and you use a social connection with the Auth0 developer keys, the generated SAML response will have some errors, like a missing `InResponseTo` attribute or an empty `AudienceRestriction` element.
