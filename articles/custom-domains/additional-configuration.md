---
title: Configure Features to Use Custom Domains
description: Describes the configuration steps you might need to follow in order to set up custom domains, depending on the Auth0 features you are using
toc: true
topics:
  - custom-domains
contentType: how-to
useCase: customize-domains
---
# Configure Features to Use Custom Domains

To configure Auth0 features to use your custom domain, you may need to complete additional steps depending on the features you are using. For example, you may need to make changes before you can use your custom domain in your login page or to call your APIs.

If you have been using Auth0 for some time and decide to enable a custom domain, you will have to migrate your existing apps and update the settings as described below. Note that existing sessions created at `${account.namespace}` will no longer be valid once you start using your custom domain, so users will have to log in again.

## Prerequisite

You should have already configured and verified your custom domain. To learn how, see [Verify ownership](/custom-domains/auth0-managed-certificates#verify-ownership).

## Features

| **Feature** | **Section to read** |
|-|-|
| <dfn data-key="universal-login">Universal Login</dfn> with a customized login page | [Universal Login](#universal-login) |
| Lock embedded in your application | [Embedded Lock](#embedded-lock) |
| Auth0 SPA SDK, Auth0.js, or other Auth0 SDKs | [Auth0 SPA SDK, Auth0.js, and other SDKs](#auth0-spa-sdk-auth0-js-and-other-sdks) |
| Custom domain with Auth0 emails | [Use custom domains in emails](#use-custom-domains-in-emails) |
| Social identity providers | [Configure social identity providers](#configure-social-identity-providers) |
| G Suite connections with your custom domain | [Configure G Suite connections](#configure-g-suite-connections) |
| Issue Access Tokens for your APIs or access Auth0 APIs from your application | [APIs](#apis) |
| <dfn data-key="security-assertion-markup-language">SAML</dfn> Identity Providers | [Configure SAML identity providers](#configure-saml-identity-providers) |
| SAML applications | [Configure SAML applications](#configure-saml-applications) |
| WS-Fed applications | [Configure WS-Fed applications](#configure-ws-fed-applications) |
| Azure AD connections | [Configure Azure AD connections](#configure-azure-ad-connections) |
| ADFS connections | [Configure ADFS connections](#configure-adfs-connections) |
| AD/LAP connections with Kerberos support | [Configure AD/LAP connections](#configure-ad-ldap-connections) |

## Universal Login

If you use [Universal Login](/hosted-pages/login) and you have customized the login page, you must update the code to use your custom domain. If you use the **default** login page without customization, you do not need to make any changes.

If you are using [Lock](/libraries/lock), you must set the `configurationBaseUrl` and `overrides` options as seen in the following sample script:

```js
var lock = new Auth0Lock(config.clientID, config.auth0Domain, {
  //code omitted for brevity
  configurationBaseUrl: config.clientConfigurationBaseUrl,
  overrides: {
  	__tenant: config.auth0Tenant,
  	__token_issuer: config.authorizationServer.issuer
  },
  //code omitted for brevity
});
```

If you use [Auth0.js](/libraries/auth0js) on the Universal Login page, you must set the `overrides` option.

```js
var webAuth = new auth0.WebAuth({
  clientID: config.clientID, 
  domain: config.auth0Domain, 
  //code omitted for brevity
  overrides: {
  	__tenant: config.auth0Tenant,
  	__token_issuer: config.authorizationServer.issuer
  },
  //code omitted for brevity
});
```

::: note
For most, the Auth0.js and Lock libraries retrieve the tenant name (required for `/usernamepassword/login`) and the issuer (required for `id_token` validation) from the domain. However, if you're a Private Cloud customer who uses a proxy or a custom domain name where the domain name is different from the tenant/issuer, you can use `__tenant` and `__token_issuer` to provide your unique values.
:::

## Embedded Lock

If you use [Lock](/libraries/lock) v11 embedded in your application, you must update the code to use your custom domain when initializing Lock. You will also need to set the `configurationBaseUrl` to the appropriate CDN URL.

```js
var lock = new Auth0Lock('${account.clientId}', 'YOUR_CUSTOM_DOMAIN', {
  //code omitted for brevity
  configurationBaseUrl: 'https://cdn.auth0.com'
  //code omitted for brevity
});
```

The CDN URL varies by region. For regions outside of the US, use `https://cdn.[eu|au].auth0.com` (`eu` for Europe or `au` for Australia).

## Auth0 SPA SDK, Auth0.js, and other SDKs

If you use the [Auth0 SPA SDK](/libraries/auth0-spa-js), [Auth0.js](/libraries/auth0js), or [other SDKs](/support/matrix#auth0-sdks), you will have to initialize the SDK using your custom domain. For example, if you are using the Auth0.js SDK, you must set the following:

```js
webAuth = new auth0.WebAuth({
  domain: 'YOUR_CUSTOM_DOMAIN',
  clientID: '${account.clientId}'
});
```

And for the Auth0 SPA SDK:

```js
const auth0 = await createAuth0Client({
  domain: 'YOUR_CUSTOM_DOMAIN',
  client_id: '${account.clientId}'
});
```

::: note
Note that the Management API only accepts Auth0 domains. If you use a custom domain and also intend to perform [Management API actions with Auth0.js](/libraries/auth0js/v9#user-management), you must instantiate a new copy of `webAuth` using your Auth0 domain.
:::

## Use custom domains in emails

If you want to use your custom domain with your Auth0 emails, you must enable this feature. 

Go to [Dashboard > Tenant Settings > Custom Domains](${manage_url}/#/tenant/custom_domains), and enable the **Use Custom Domain in Emails** toggle. When the toggle is green, this feature is enabled.

![Use Custom Domain in Emails toggle](/media/articles/custom-domains/cd_email_toggle.png)

## Configure social identity providers

If you want to use your custom domain with social identity providers, you must update your applications' [Allowed Callback URLs](${manage_url}/#/applications/${account.clientId}/settings) to include your custom domain (such as `https://login.northwind.com/login/callback`).

::: warning
You cannot use [Auth0 developer keys](/connections/social/devkeys) with custom domains unless you are using the [New Universal Login Experience](/universal-login/new).
:::
  
## Configure G Suite connections

If you want to use your custom domain with G Suite connections, you must update the Authorized redirect URI in your OAuth Client Settings. In the Google Developer Console, go to **Credentials**, choose your OAuth client in the list, and you will see a settings page with the app Client ID, secret, and other fields. In the **Authorized redirect URIs** field, add a URL in the format `https://<YOUR-CUSTOM-DOMAIN>/login/callback` that includes your custom domain (such as `https://login.northwind.com/login/callback`).

## APIs

If you use Auth0 with a custom domain to issue Access Tokens for your APIs, you must validate the JWT issuer(s) against your custom domain. For example, if you use the [express-jwt](https://github.com/auth0/express-jwt) middleware, you must make the following change:

```js
app.use(jwt({ 
  issuer: 'https://<YOUR-CUSTOM-DOMAIN>',
  //code omitted for brevity
}));
```

## Configure SAML identity providers

To use your custom domain with SAML Identity Providers (IdPs), you must update your **Assertion Consumer Service (ACS) URL(s)** with the Identity Provider(s). Depending on what is supported by the IdP, you can do this in one of two ways:

1. You can get the service provider metadata from Auth0 at `https://<YOUR-CUSTOM-DOMAIN>/samlp/metadata?connection=<YOUR-CONNECTION-NAME>`. This will include the updated ACS URL. Then, you must manually update this value in your IdP(s) settings. This change to your IdP(s) must happen at the same time as you begin using your custom domain in your applications. This can pose a problem if there are multiple IdPs to configure.

2. If supported by the IdP, you can use signed requests to fulfill this requirement:

  - Download the signing certificate from `https://<TENANT>.auth0.com/pem`. Note that `https://<YOUR-CUSTOM-DOMAIN>.com/pem` will return the same certificate
  - Give the certificate to the IdP(s) to upload. This enables the IdP to validate the signature on the `AuthnRequest` message that Auth0 sends to the IdP
  - The IdP will import the certificate and, if necessary, signature verification should be enabled (exact steps vary by IdP)
  - Turn on the **Sign Request** toggle in the Dashboard under **Connections > Enterprise > SAML > CONNECTION**. This will trigger Auth0 to sign the SAML `AuthnRequest` messages it sends to the IdP.

Once this is done, and you start using your custom domain when you initiate an authentication request in your application, the IdP will receive that custom domain in your signed request. Because your application’s signed request is trusted, the IdP should automatically override whatever was configured as your ACS URL and replace it with the value sent in the signed request. However, there are IdPs that do **not** accept the ACS URL in the signed request, so you must check with yours first to confirm whether this is supported or not.

If this is supported, it will prevent you from having to change one or many IdP settings all at the same time and allow you to prepare them to accept your signed requests ahead of time. You can then change the statically configured ACS URL in your IdP settings at a later date as well.

Note that if your SAML identity provider is configured to use your custom domain, testing the connection via the **Try** button in the Dashboard will **not** work and the default links for downloading metadata from Auth0 will always show the default domain, not the custom domain.

If you have an IdP-initiated authentication flow, you will need to update the IdP(s) and your application(s) at the same time to use the custom domain.

## Configure SAML applications

If you want to use your custom domain with SAML applications (when Auth0 is the IdP), you must update your service provider with new identity provider metadata from Auth0. You can obtain the updated metadata reflecting the custom domain from `https://<YOUR-CUSTOM-DOMAIN>/samlp/metadata/<YOUR-CLIENT-ID>`. Note that the issuer entity ID for the assertion returned by Auth0 will change when using a custom domain (from something like `urn:northwind.auth0.com` to one with the custom domain, such as `urn:login.northwind.com`).

If you have an IdP-initiated authentication flow, you will need to update the URL used to invoke the IdP-initiated authentication flow to reflect the custom domain. Instead of `https://<TENANT>.auth0.com/samlp/<YOUR-CLIENT-ID>`, you should use `https://<YOUR-CUSTOM-DOMAIN>/samlp/<YOUR-CLIENT-ID>`.

If you use the Auth0 APIs, such as the Management API, the API identifier will use your default tenant domain name (such as `https://${account.namespace}/userinfo` and `https://${account.namespace}/api/v2/`).

## Configure WS-Fed applications

If you want to use your custom domain with WS-Fed applications with Auth0 as the IdP, you must update your Service Provider with new identity provider metadata from Auth0. You can obtain the metadata reflecting the custom domain from `https://<YOUR-CUSTOM-DOMAIN>/wsfed/FederationMetadata/2007-06/FederationMetadata.xml`.

## Configure Azure AD connections

If you want to use your custom domain with Azure AD connections, you must update the Allowed Reply URL in your Azure AD settings. In your Azure Active Directory, go to **Apps registrations** and select your app. Then click **Settings -> Reply URLs** and add a URL with your custom domain in the format `https://<YOUR-CUSTOM-DOMAIN>/login/callback` (such as `https://login.northwind.com/login/callback`).

## Configure ADFS connections

If you want to use your custom domain with ADFS connections, you must update the endpoint in your ADFS settings. This will need to be updated to use your custom domain in the callback URL in the format `https://<YOUR-CUSTOM-DOMAIN>/login/callback` (such as `https://login.northwind.com/login/callback`).

## Configure AD/LDAP connections

If you do not need Kerberos support, AD/LDAP connections do not require further configuration.

In order to use AD/LDAP connections with Kerberos support, you will need to update the ticket endpoint to work with the custom domain. As mentioned in the [Auth0 AD/LDAP connector documentation](/connector/modify#point-an-ad-ldap-connector-to-a-new-connection), the `config.json` file needs to be modified, with the `PROVISIONING_TICKET` value changed to use your custom domain in the format `https://<YOUR-CUSTOM-DOMAIN>/p/ad/jUG0dN0R`.

Once this change is saved, you need to restart the AD/LDAP Connector service for the change to take effect.

## Keep reading

* [Configure Custom Domains with Auth0-Managed Certificates](/custom-domains/auth0-managed-certificates)
* [Configure Custom Domains with Self-Managed Certificates](/custom-domains/self-managed-certificates)
* [Troubleshooting Custom Domains](/custom-domains/troubleshoot)
