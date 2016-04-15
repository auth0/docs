# Logout

You can log out a user and immediately redirect them to an authorized URL.

## Logging Out a User

To force the user to log out, redirect the user to the following URL:

```text
https://${account.namespace}/v2/logout
```
Redirecting the user to this URL clears any single sign-on cookies set by Auth0 for the user.

If you would also like to force the user to log out of their identity provider, you may add a `federated` query string parameter to the logout URL:

```text
https://${account.namespace}/v2/logout?federated
```

## Redirecting Users After Logout

To redirect a user after logout, you may specify a `returnTo` parameter that contains the specific URL:

```text
https://${account.namespace}/v2/logout?returnTo=http://www.example.com
```

### Setting Allowed Logout URLs at the Account Level

To provide the list of URLs that the user may be redirected to after logging out at the account level, go to Management Portal's Account Settings > Advanced.

![](/media/articles/logout/account-level-logout.png)

When providing the URL list, you may:

- Specify multiple, valid comma-separated URLs;
- Use `*` as a wildcard for subdomains (e.g. `http://*.example.com`).

### Setting Allowed Logout URLs at the App Level

![](/media/articles/logout/app-level-logout.png)

If you would like to redirect the user after they log out from a specific app, you must provide the URL used in the `returnTo` parameter here.

When providing the URL list, you may:

- Specify multiple, valid comma-separated URLs;
- Use `*` as a wildcard for subdomains (e.g. `http://*.example.com`).

When performing a redirect, the URL provided as part of the `redirectTo` parameter must be in the list of valid URLs provided in the Management Portal. The URLs included in the list may include scope information regarding the `client` or `tenant`. To clarify which URL pertains to which client, you must include the `client_id`.

To specify the `client_id` on the `logout` endpoint, pass the value as a request parameter: `?client_id=foobar`.

If you do not have a `client_id` specified on the `logout` endpoint, Auth0 will use the set of [Allowed Logout URLs provided at the Account level](#Setting-Allowed-Logout-URLs-at-the-App-Level).

#### Limitations

When validating URLs provided as values to the `returnTo` parameter, query strings and hash information provided as part of the URL are not taken into account.

The `returnTo` parameter does not work for all social providers. Please check your social provider's settings to ensure that they will accept the `redirectTo` parameter.

> If you are working with social identity providers such as Google or Facebook, you must set your Client ID and Secret in the Dashboard of the Auth0 Management Portal for the logout to function correctly.

#### For Facebook Users
If you are using Facebook, please be aware of the additional requirements (including encoding the `returnTo` parameter) when triggering a logout:

```text
https://${account.namespace}/v2/logout?federated&
      returnTo=url_encode(https://${account.namespace}/logout?returnTo=http://www.example.com)
      &access_token=[facebook access_token]
```

### Supported Providers

Auth0 supports use of the `logout` endpoint for the following providers:

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

To logout users from an external SAML identity provider, a [SAML logout URL](https://auth0.com/docs/saml-sp-generic#1-obtain-information-from-idp) must be configured in the settings for the SAML connection.

If a logout URL is not configured, Auth0 will use the SAML login URL.
To log out a user from both Auth0 and their SAML identity provider, they must be redirected to the logout endpoint including the `federated` query string parameter as described above.

Even if a logout URL has been correctly configured, there is a possibility that Auth0 will not be able to make a logout request to the SAML identity provider.

### Unable to Logout Using a SAML Identity Provider

When logging in, the SAML identity provider uniquely identifies the user's session with a `SessionIndex` attribute in the `AuthnStatement` element of the SAML assertion. The `SessionIndex` value must be used again when the user logs out.

Occasionally, the `SessionIndex` value may not be present in the initial login assertion. When the user logs out, the request to the SAML identity provider will fail due to the missing value.

As such, there is a possibility that Auth0 will not be able to make a logout request to the SAML identity provider even if a logout URL has been correctly configured.
