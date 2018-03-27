---
title: Feature-Specific Setup with Custom Domains
description: How to set up custom domains with feature-specific instructions
---
# Feature-Specific Setup

There are additional steps you must complete depending on which Auth0 features you are using.

:::warning
If you have been using Auth0 for some time and decide to enable a custom domain, you will have to migrate your existing apps and update the settings as described below. Note that existing sessions created at `tenant.auth0.com` will no longer be valid once you start using your custom domain, so users will have to login again.
:::

## Configure the Login Page

When using custom domains with [universal login](/hosted-pages/login), you will need to determine which of the following apply to you:

* If you're using the **default** login page without customization, you will not need to make any changes. Your custom domain will work right out of the box.
* If you're using a **customized** login page, you'll need to update the code in your [Dashboard](${manage_url}) to use your custom domain. The changes that you'll need to make are regarding the initializing of Lock. The following code sample shows the lines reflecting the necessary changes.

```js
var lock = new Auth0Lock(config.clientID, config.auth0Domain, {
...
	configurationBaseUrl: config.clientConfigurationBaseUrl,
	overrides: {
		__tenant: config.auth0Tenant,
		__token_issuer: config.auth0Domain
	},
...
});
```

## Embedded Lock

If you're using Embedded Lock (Lock v11), you need to use your custom domain when initializing Lock. You will also need to set the **configurationBaseUrl** to the appropriate CDN URL:

```js
var lock = new Auth0Lock('your-client-id', 'login.northwind.com', {
...
    configurationBaseUrl: 'https://cdn.auth0.com'
...
});
```

:::note
The CDN URL varies by region. For regions outside of the US, use `https://cdn.{region}.auth0.com`.
:::

## SDKs

If you are using [Auth0.js](/libraries/auth0js) or other SDKs, you will have to initialize the SDK using your custom domain. For example, if you are using the auth0.js SDK, you'll need to set the following:

```js
webAuth = new auth0.WebAuth({
  domain:       'login.northwind.com',
  clientID:     'your-client-id'
});
```

Note that the Management API only accepts Auth0 domains. If you use a [custom domain](/custom-domains) and also intend to perform [Management API actions with Auth0.js](/libraries/auth0js/v9#user-management), you must instantiate a new copy of `webAuth` using your Auth0 domain.

## Auth0 emails

If you would like your custom domain used with your Auth0 emails, you'll need to enable this feature in the [Dashboard](${manage_url}/#/tenant). You can do this by clicking the toggle associated with the **Use Custom Domain in Emails**. When the toggle is green, this feature is enabled.

![](/media/articles/custom-domains/cd_email_toggle.png)

## Social identity provider configuration

If you want to use social identity providers with your custom domain, you must update the allowed callback URLs to include your custom domain (such as `https://login.northwind.com/login/callback`).

:::warning
You cannot use [Auth0 developer keys](/connections/social/devkeys) with custom domains.
:::

## SAML identity provider configuration

If you want to use SAML identity providers with your custom domain, you must obtain the service provider metadata from Auth0 (such as `https://login.northwind.com/samlp/metadata?connection=CONNECTION_NAME`). This includes updated Assertion Consumer Service (ACS) URLs. You will then need to manually update this value in your IdP(s). This change to your IdP(s) will need to happen at the same time as you begin using your custom domain in your applications. This can pose a problem if there are multiple IdPs to configure.

Alternatively, you can use signed requests to fulfill this requirement. Once your custom domain is set up, in the [Dashboard](${manage_url}/#/tenant/custom_domains), you will need to download the certificate from the link under the “Sign Request” toggle. You can then give the certificate to the IdP(s) to upload. This enables the IdP to validate the signature on the AuthnRequest message that Auth0 sends to the IdP. The certificate needs to be imported into the IdP and, if necessary, signature verification should be enabled (exact steps vary by IdP).

You should then turn on the “Sign Request” toggle in the Dashboard under **Connections > Enterprise > SAMLP > CONNECTION**. This will trigger Auth0 to sign the SAML AuthnRequest messages it sends to the IdP.

Once this is done, and you use your custom domain when interacting with Auth0, the IdP will receive that custom domain in your signed request. Because your application is trusted, the IdP should automatically override whatever was configured as your ACS URL and replace it with the value sent in the signed request. This will prevent you from having to change one or many IdP settings all at the same time, instead allowing you to prepare them to accept your signed requests ahead of time. you can then at a later date have the IdPs change the ACS URL as well.

## SAML client configuration

If you want to use SAML clients with your custom domain, you should update your SP with new IdP metadata from Auth0 (such as `https://login.northwind.com/samlp/metadata/CLIENT_ID`). Note that the issuer entity ID will change when using a custom domain (from something like `urn:northwind.auth0.com` to the custom domain such as `urn:login.northwind.com`).

## APIs

If you are using Auth0 with a custom domain to issue Access Tokens for your APIs, then you must validate the JWT issuer(s) against your custom domains. For example, if using the [express-jwt](https://github.com/auth0/express-jwt) middleware:

```js
app.use(jwt({ 
	issuer: 'https://login.northwind.com', 
	... additional params ...
}));
```

:::note
If you are using built-in Auth0 APIs, such as the Management API, the API identifier will use your default tenant domain name (such as `https://northwind.auth0.com/userinfo** and **https://northwind.auth0.com/api/v2/`)
:::