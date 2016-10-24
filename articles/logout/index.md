---
description: How to logout a user and optionally redirect them to an authorized URL.
---

# Logout

## Overview

When you are implementing the logout functionality of your app there are typically three layers of sessions you need to consider:

- __Application Session__: The first is the session inside the application. Even though your application uses Auth0 to authenticate users, you will still need to keep track of the fact that the user has logged in to your application. In a normal web application this is achieved by storing information inside a cookie. You need to log out the user from your application, by clearing their session.

- __Auth0 session__: Next, Auth0 will also keep a session and store the user's information inside a cookie. Next time when a user is redirected to the Auth0 Lock screen, the user's information will be remembered. In order to logout a user from Auth0 you need to clear the SSO cookie.

- __Identity Provider session__: The last layer is the Identity Provider, for example Facebook or Google. When you allow users to sign in with any of these providers, and they are already signed into the provider, they will not be prompted to sign in. They may simply be required to give permissions to share their information with Auth0 and in turn your application.

This document explains how to logout a user from the Auth0 session and optionally from the Identity Provider session. Keep in mind though that you should handle also the Application Session in your app!

## Log Out a User

The logout endpoint in Auth0 can work in two ways:
- Clear the SSO cookie in Auth0
- Clear the SSO cookie in Auth0 and sign out from the IdP (for example, ADFS or Google)

To force a logout, redirect the user to the following URL:

```text
https://${account.namespace}/v2/logout
```

Redirecting the user to this URL clears all single sign-on cookies set by Auth0 for the user.

Although this is not common practice, you can force the user to also log out of their identity provider. To do this add a `federated` querystring parameter to the logout URL:

```text
https://${account.namespace}/v2/logout?federated
```

::: panel-warning Clear your application session
The Auth0 logout endpoint logs you out from Auth0, and optionally from your identity provider. It does not log you out of your application! This is something that you should implement on your side. You need to log out the user from your application, by clearing their session. You might find [this video](/videos/session-and-cookies) helpful.
:::


## Redirect Users After Logout

To redirect a user after logout, add a `returnTo` querystring parameter with the target URL as the value. It is suggested that you URL Encode the target URL being passed in, for example to redirect the user to `http://www.example.com`, you can make the following request:

```text
https://${account.namespace}/v2/logout?returnTo=http%3A%2F%2Fwww.example.com
```

You will need to add the non URL Encoded `returnTo` URL (i.e. for these examples it is `http://www.example.com`) as an `Allowed Logout URLs` in one of two places:

* For logout requests that do not include the `client_id` parameter, for example:

    ```text
    https://${account.namespace}/v2/logout?returnTo=http%3A%2F%2Fwww.example.com
    ```

  you must add the `returnTo` URL (i.e. `http://www.example.com`) to the `Allowed Logout URLs` list in the *Advanced* tab of your **Account settings** page. See [Set the Allowed Logout URLs at the Account Level](#set-the-allowed-logout-urls-at-the-account-level) for more information.

* For logout requests that include the `client_id` parameter, for example:

    ```text
    https://${account.namespace}/v2/logout?returnTo=http%3A%2F%2Fwww.example.com&client_id=CLIENT_ID
    ```

  you must add the `returnTo` URL (i.e. `http://www.example.com`) to the `Allowed Logout URLs` list in the **Settings** tab of your Auth0 app that is associated with the specified `CLIENT_ID`. See [Set the Allowed Logout URLs at the App Level](#set-the-allowed-logout-urls-at-the-app-level) for more information.


### Set the *Allowed Logout URLs* at the Account Level

To add a list of URLs that the user may be redirected to after logging out at the account level, go to the [Account Settings > Advanced](${manage_url}/#/account/advanced) of the **Auth0 Management Console**.

![Account level logout screen](/media/articles/logout/account-level-logout.png)

When providing the URL list, you can:

* Specify multiple, valid, comma-separated URLs
* Use `*` as a wildcard for subdomains (e.g. `http://*.example.com`)


### Set the *Allowed Logout URLs* at the App Level

To redirect the user after they log out from a specific app, you must add the URL used in the `returnTo` parameter of the redirect URL to the `Allowed Logout URLs` list in the **Settings** tab of your Auth0 app that is associated with the `CLIENT_ID` parameter.

![Application level logout screen](/media/articles/logout/app-level-logout.png)

When providing the URL list, you can:

* Specify multiple, valid, comma-separated URLs
* Use `*` as a wildcard for subdomains (e.g. `http://*.example.com`)

> In order to avoid validation errors, make sure that you do include the protocol part of the URL. For example, setting the value to `*.example.com` will result in a validation error, you should use `http://*.example.com` instead.


#### Limitations

* The validation of URLs provided as values to the `returnTo` parameter, the querystring and hash information provided as part of the URL are not taken into account.

* The `returnTo` parameter does not function for all social providers. Please check your social provider's settings to ensure that they will accept the `redirectTo` parameter.

> If you are working with social identity providers such as Google or Facebook, you must set your `Client ID` and `Secret` for these providers in the **Auth0 Management Console** for the logout to function.


#### Facebook Users

If you are using Facebook, please be aware of the additional requirements (including encoding the `returnTo` parameter) when triggering a logout:

```text
https://${account.namespace}/v2/logout?federated&
      returnTo=url_encode(https://${account.namespace}/logout?returnTo=http://www.example.com)
      &access_token=[facebook access_token]
```


### Supported Providers

Auth0 supports use of the `logout` endpoint with the following providers:

- AOL
- Auth0
    - AD/LDAP
- Custom (Passport/WS-Fed/SAML)
- Facebook
- FitBit
- GitHub
- Google
    - Apps
    - OAuth2
- LinkedIn
- Microsoft
    - Active Directory (AD)
    - Active Directory Federation Services (ADFS)
    - Office 365
    - Windows Live
- OAuth
    - 1.0
    - 2.0
- Salesforce
    - Salesforce Community
    - Salesforce Sandbox
- Samlp
- Twitter
- Waad
- WS-Fed
- Yahoo
- Yammer


## SAML Logout

To logout users from an external SAML identity provider, a [SAML logout URL](/saml-sp-generic#1-obtain-information-from-idp) must be configured in the the SAML connection settings.

If a logout URL is not configured, Auth0 will use the SAML login URL.

To log out a user from both Auth0 and their SAML identity provider, they must be redirected to the logout endpoint with a URL that includes the `federated` querystring parameter as [described above](#logging-out-a-user).

The external SAML identity provider will need to know where to send SAML logout responses. The SingleLogout service URL that will consume this response is the following:

```text
https://${account.namespace}/logout
```

### Unable to Logout Using a SAML Identity Provider

When logging in, the SAML identity provider uniquely identifies the user's session with a `SessionIndex` attribute in the `AuthnStatement` element of the SAML assertion. The `SessionIndex` value must be used again when the user logs out.

Occasionally, the `SessionIndex` value may not be present in the initial login assertion. When the user logs out, the request to the SAML identity provider will fail due to the missing value.

In these cases, Auth0 may not be able to complete a logout request to the SAML identity provider even if the logout URL has been configured correctly.
