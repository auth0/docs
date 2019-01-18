---
title: Additional Configuration for Custom Domains
description: Describes the configuration steps you might need to follow in order to set up custom domains, depending on the Auth0 features you are using
toc: true
topics:
  - custom-domains
contentType: how-to
useCase: customize-domains
---
# Additional Configuration for Custom Domains

In order to set up custom domains, and depending on the Auth0 features you are using, there might be additional configuration steps you must follow. This article lists the required configuration you must do per feature.

If you have been using Auth0 for some time and decide to enable a custom domain, you will have to migrate your existing apps and update the settings as described below. Note that existing sessions created at `${account.namespace}` will no longer be valid once you start using your custom domain, so users will have to login again.

## Prerequisites

You have already configured and verified your custom domain. If not, see [How to configure custom domains](/custom-domains#how-to-configure-custom-domains).

## Which section is relevant to me?

| **Feature** | **Section to read** |
|-|-|
| You use [Universal Login](/hosted-pages/login) and you have customized the login page | [Universal Login](#universal-login) |
| You use Lock embedded in your application | [Embedded Lock](#embedded-lock) |
| You use Auth0.js or other Auth0 SDKs | [Auth0.js and other SDKs](#auth0-js-and-other-sdks) |
| You want to use your custom domain with Auth0 emails | [Use custom domains in emails](#use-custom-domains-in-emails) |
| You want to use social identity providers with your custom domain | [Configure social identity providers](#configure-social-identity-providers) |
| You want to use Google Apps connections with your custom domain | [Configure Google Apps connections](#configure-google-apps-connections) |
| You issue Access Tokens for your APIs or you access the Auth0 APIs from your application | [APIs](#apis) |
| You want to use SAML identity providers with your custom domain| [Configure SAML identity providers](#configure-saml-identity-providers) |
| You want to use SAML applications with your custom domain | [Configure your SAML applications](#configure-your-saml-applications) |
| You want to use WS-Fed Clients with your custom domain | [Configure your WS-Fed Clients](#configure-your-ws-fed-clients) |
| You want to use Azure AD connections with your custom domain | [Configure Azure AD connections](#configure-azure-ad-connections) |
| You want to use ADFS connections with your custom domain | [Configure ADFS connections](#configure-adfs-connections) |
| You want to use AD/LAP connections with Kerberos support with your custom domain | [Configure AD/LAP connections](#configure-ad-lap-connections) |

## Universal Login

If you use [Universal Login](/hosted-pages/login) and you have customized the login page, you must update the code to use your custom domain. 

If you are using [Lock](/libraries/lock), the additional values required in the initialization can be seen in the following sample script:

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

If you use [Auth0.js](/libraries/auth0js) on the hosted login page, you need to set the `overrides` option like this:

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

If you use the **default** login page without customization, you do not need to make any changes.

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

## Auth0.js and other SDKs

If you use [Auth0.js](/libraries/auth0js) or [other SDKs](/support/matrix#auth0-sdks), you will have to initialize the SDK using your custom domain. For example, if you are using the auth0.js SDK, you need to set the following.

```js
webAuth = new auth0.WebAuth({
  domain: 'YOUR_CUSTOM_DOMAIN',
  clientID: '${account.clientId}'
});
```

Note that the Management API only accepts Auth0 domains. If you use a custom domain and also intend to perform [Management API actions with Auth0.js](/libraries/auth0js/v9#user-management), you must instantiate a new copy of `webAuth` using your Auth0 domain.

## Use custom domains in emails

If you want to use your custom domain with your Auth0 emails, you must enable this feature. 

Go to [Dashboard > Tenant Settings > Custom Domains](${manage_url}/#/tenant/custom_domains) and enable the **Use Custom Domain in Emails** toggle. When the toggle is green, this feature is enabled.

![Use Custom Domain in Emails toggle](/media/articles/custom-domains/cd_email_toggle.png)

## Configure social identity providers

If you want to use social identity providers with your custom domain, you must update the [Allowed Callback URLs](${manage_url}/#/applications/${account.clientId}/settings) to include your custom domain (such as `https://login.northwind.com/login/callback`).

::: warning
You cannot use [Auth0 developer keys](/connections/social/devkeys) with custom domains.
:::
  
## Configure Google Apps connections

If you want to use Google Apps connections with your custom domain, you must update the Authorized redirect URI in your OAuth Client Settings. In the Google Developer Console, go to **Credentials**, choose your OAuth client in the list, and you will see a settings page with the app Client ID, secret, and other fields. In the **Authorized redirect URIs** field, add a URL in the format `https://<CUSTOM DOMAIN>/login/callback` that includes your custom domain (such as `https://login.northwind.com/login/callback`).

## APIs

If you use Auth0 with a custom domain to issue Access Tokens for your APIs, then you must validate the JWT issuer(s) against your custom domains. For example, if you use the [express-jwt](https://github.com/auth0/express-jwt) middleware, you must do the following change.

```js
app.use(jwt({ 
  issuer: 'https://<YOUR-CUSTOM-DOMAIN>',
  //code omitted for brevity
}));
```

## Configure SAML identity providers

If you want to use SAML identity providers (IdPs) with your custom domain, you must get the service provider metadata from Auth0 (such as `https://<YOUR-CUSTOM-DOMAIN>/samlp/metadata?connection=<YOUR-CONNECTION-NAME>`). This includes updated **Assertion Consumer Service (ACS) URLs**. Then, you have to manually update this value in your IdP(s). This change to your IdP(s) must happen at the same time as you begin using your custom domain in your applications. This can pose a problem if there are multiple IdPs to configure.

Alternatively, you can use signed requests to fulfill this requirement:

- Download the signing certificate from `https://<TENANT>.auth0.com/pem`. Note that `https://<YOUR-CUSTOM-DOMAIN>.com/pem` will return the same certificate.
- Give the certificate to the IdP(s) to upload. This enables the IdP to validate the signature on the `AuthnRequest` message that Auth0 sends to the IdP
- The IdP will import the certificate and if necessary, signature verification should be enabled (exact steps vary by IdP)
- Turn on the **Sign Request** toggle in the Dashboard under **Connections > Enterprise > SAMLP > CONNECTION**. This will trigger Auth0 to sign the SAML `AuthnRequest` messages it sends to the IdP

Once this is done, and you start using your custom domain when you initiate an authentication request in your application, the IdP will receive that custom domain in your signed request. Because your application’s signed request is trusted, the IdP should automatically override whatever was configured as your ACS URL and replace it with the value sent in the signed request. However, there are IdPs that do **not** accept the ACS URL in the signed request, so you must check with yours to confirm whether this is supported or not.

If this is supported, it will prevent you from having to change one or many IdP settings all at the same time, and allow you to prepare them to accept your signed requests ahead of time, one by one. You can then at a later date have the IdPs change the statically configured ACS URL as well.

Note that if your Identity Provider is configured to use the Auth0 custom domains, testing the connection via the **Try** button in the Dashboard will **not** work and the default links for downloading metadata from Auth0 will always show the default domain, not the custom domain.

If you have an IdP-initiated authentication flow, you will need to update the IdP(s) and your application(s) at the same time to use the custom domain.

## Configure your SAML applications

If you want to use SAML applications with your custom domain, you must update your Service Provider with new Identity Provider metadata from Auth0 (You can obtain the metadata reflecting the custom domain from: `https://<YOUR-CUSTOM-DOMAIN>/samlp/metadata/<YOUR-CLIENT-ID>`). Note that the issuer entity ID for the assertion returned by Auth0 will change when using a custom domain (from something like `urn:northwind.auth0.com` to the custom domain such as `urn:login.northwind.com`).

If you have an IdP-initiated authentication flow, you will need to update the URL used to invoke the IdP-initiated authentication flow to reflect the custom domain. Instead of `https://<TENANT>.auth0.com/samlp/<CLIENTID>` you should use `https://<CNAME>/samlp/<CLIENTID>`.

If you use the Auth0 APIs, such as the Management API, the API identifier will use your default tenant domain name (such as `https://${account.namespace}/userinfo` and `https://${account.namespace}/api/v2/`)

## Configure your WS-Fed Clients

If you want to use your WS-Fed applications with your custom domain with Auth0 as the IDP, you must update your Service Provider with new Identity Provider metadata from Auth0 (You can obtain the metadata reflecting the custom domain from: `https://<CUSTOM DOMAIN>/wsfed/FederationMetadata/2007-06/FederationMetadata.xml`).

## Configure Azure AD connections

If you want to use Azure AD connections with your custom domain, you must update the Allowed Reply URL in your Azure AD settings. In your Azure Active Directory, go to **Apps registrations** and select your app. Then click **Settings -> Reply URLs** and add a URL in the format `https://<CUSTOM DOMAIN>/login/callback` that includes your custom domain (such as `https://login.northwind.com/login/callback`).

## Configure ADFS connections

The process is the same as [setting up the ADFS connection normally](/connections/enterprise/adfs) except that your callback URL needs to be changed from this format `https://<TENANT>.auth0.com/login/callback` to this one use `https://<YOUR-CUSTOM-DOMAIN>/login/callback`.

## Configure AD/LDAP connections

If Kerberos support is not needed, AD/LDAP connections should not require further configuration.

In order to use AD/LDAP connections with Kerberos support, you will need to update the ticket endpoint to work with the custom domain. As mentioned in the [Auth0 AD/LDAP connector documentation](/connector/modify#point-an-ad-ldap-connector-to-a-new-connection), the `config.json` file needs to be modified, with the `PROVISIONING_TICKET` value changed from this format `https://<TENANT>.auth0.com/p/ad/jUG0dN0R/info` to `https://<CUSTOM DOMAIN>/p/ad/jUG0dN0R/info`.

Once this change is saved, be sure to restart the AD/LDAP Connector service.
