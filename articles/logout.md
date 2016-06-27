---
description: How to logout a user and optionally redirect them to an authorized URL.
---

# Logout

You can log out a user and immediately redirect them to an authorized URL.

## Logging Out a User

To force a logout, redirect the user to the following URL:

```text
https://${account.namespace}/v2/logout
```

Redirecting the user to this URL clears all single sign-on cookies set by Auth0 for the user.

To force the user to also log out of their identity provider, add a `federated` querystring parameter to the logout URL:

```text
https://${account.namespace}/v2/logout?federated
```

## Redirecting Users After Logout

To redirect a user after logout, add a `returnTo` querystring parameter with the target URL as the value:

```text
https://${account.namespace}/v2/logout?returnTo=http://www.example.com
```

You will need to add the `returnTo` URL as an `Allowed Logout URLs` in one of two places:

* For logout requests that do not include the `client_id` parameter, for example:

    ```text
    https://${account.namespace}/v2/logout?returnTo=http://www.example.com
    ```

  you must add the `returnTo` URL to the `Allowed Logout URLs` list in the *Advanced* tab of your **Account settings** page. See [Setting Allowed Logout URLs at the Account Level](#setting-allowed-logout-urls-at-the-account-level) for more information.

* For logout requests that include the `client_id` parameter, for example:

    ```text
    https://${account.namespace}/v2/logout?returnTo=http://www.example.com&client_id=CLIENT_ID
    ```

  you must add the `returnTo` URL to the `Allowed Logout URLs` list in the **Settings** tab of your Auth0 app that is associated with the specified `CLIENT_ID`. See [Setting Allowed Logout URLs at the App Level](#setting-allowed-logout-urls-at-the-app-level) for more information.


### Setting *Allowed Logout URLs* at the Account Level

To add a list of URLs that the user may be redirected to after logging out at the account level, go to the [Account Settings > Advanced](${uiURL}/#/account/advanced) of the **Auth0 Management Console**.

![](/media/articles/logout/account-level-logout.png)

When providing the URL list, you can:

* Specify multiple, valid, comma-separated URLs
* Use `*` as a wildcard for subdomains (e.g. `http://*.example.com`)


### Setting *Allowed Logout URLs* at the App Level

To redirect the user after they log out from a specific app, you must add the URL used in the `returnTo` parameter of the redirect URL to the `Allowed Logout URLs` list in the **Settings** tab of your Auth0 app that is associated with the `CLIENT_ID` parameter.

![](/media/articles/logout/app-level-logout.png)

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
- Sampl
- Twitter
- Waad
- WS-Fed
- Yahoo
- Yammer


## SAML Logout

To logout users from an external SAML identity provider, a [SAML logout URL](/saml-sp-generic#1-obtain-information-from-idp) must be configured in the the SAML connection settings.

If a logout URL is not configured, Auth0 will use the SAML login URL.

To log out a user from both Auth0 and their SAML identity provider, they must be redirected to the logout endpoint with a URL that includes the `federated` querystring parameter as [described above](#logging-out-a-user).

### Unable to Logout Using a SAML Identity Provider

When logging in, the SAML identity provider uniquely identifies the user's session with a `SessionIndex` attribute in the `AuthnStatement` element of the SAML assertion. The `SessionIndex` value must be used again when the user logs out.

Occasionally, the `SessionIndex` value may not be present in the initial login assertion. When the user logs out, the request to the SAML identity provider will fail due to the missing value.

In these cases, Auth0 may not be able to complete a logout request to the SAML identity provider even if the logout URL has been configured correctly.
