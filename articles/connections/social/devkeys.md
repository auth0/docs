---
description: Caveats you need to be aware of when using Auth0 Dev Keys for social providers.
---

# Using the Auth0 Developer Keys with Social Connections

When using any of the Social Identity Providers, you need to register your application with the relevant Identity Provider in order to obtain a Client ID and Client Secret. 

> The exact terminology of Client ID / Client Secret may differ between various Identity Providers. For example, Twitter refers to these as a Consumer Key / Consumer Secret and LinkedIn refers to an API Key / Secret Key.

Auth0 allows you to enable any Social Identity Provider without specifying your own Client ID and Client Secret. In this instance Auth0 will use its own developer keys when authorizing the user with these services. This allows you to quickly enable and test a specific Social Identity Provider, but it should definitely not be used in production. 

Using the Auth0 developer keys also has a few side effects. Some of these may cause your application to behave differently depending on whether you use your own Client ID and Client Secret, or whether you use the Auth0 developer keys.

1. When using the Auth0 developer keys, the conscent screen for the various Identity Providers will display Auth0's logo and information to your users. When you register you own application you have the opportunity to use your own logo and other application information.

    ![](/media/articles/connections/social/devkeys/conscent-screen.png)

2. [Single Sign On](/sso) will not function properly when using the Auth0 developer keys. The reason for this is that the Auth0 developer applications with all the relevant Identity Providers are configured to call back to the URL `https://login.auth0.com/login/callback` instead of the callback URL for your own tentant, i.e.  `https://${account.namespace}/login/callback`.

    This results in the SSO cookie not being set on your own tenant domain, so the next time a user authenticates no SSO cookie will be set, even if you configured your client to **Use Auth0 instead of the Identity Provider to do Single Sign On**.