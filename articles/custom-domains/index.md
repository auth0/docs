---
title: Custom Domains
description: How to map custom domains
toc: true
---
# Custom Domains

Auth0 allows you to map the domain for your tenant to a custom domain of your choosing. This allows you to maintain a consistent experience for your users by keeping them on your domain instead of redirecting or using Auth0's domain. For example, if your Auth0 domain is **northwind.auth0.com**, you can have your users to see, use, and remain on **login.northwind.com**.

Using custom domains with universal login is the most seamless and secure experience for developers and end users. For more information, please see our docs on [universal login](/hosted-pages/login).

## Prerequisites

You'll need to register and own the domain name to which you're mapping your Auth0 domain.

## Features supporting use of custom domains

Currently, the following Auth0 features and flows support the use of custom domains:

* OAuth 2.0/OIDC-Compliant Flows (those using the [`/authorize`](/api/authentication#authorize-client) and [`/oauth/token`](https://auth0.com/docs/api/authentication#get-token) endpoints)
* Guardian (MFA Widget Version 1.3.0/Guardian.js Version 1.3.0 or later”)
* Emails (the links included in the emails will use your custom domain)
* Database and Social connections
* Lock 11 with Cross Origin Authentication

:::warning
Features not in the list are **not supported** by Auth0 with custom domains.
:::

::: panel Token issuance
Auth0 issues tokens with the **iss** claim of whichever domain you used with the request. For example, if you used **https://northwind.auth0.com/authorize...** to obtain an Access Token, the **iss** claim of the token you receive will be **https://northwind.auth0.com/**. If you used your custom domain **https://login.northwind.com/authorize...**, the **iss** claim value will be **https://login.northwind.com/**. 

If you get an Access Token for the [Management API](/api/management/v2) using an authorization flow with your custom domain, you **must** call the Management API using the custom domain (your token will be considered invalid otherwise).
:::

## Certificate management

Auth0 offers two certificate management options.

* **Auth0-Managed Certificates**: Auth0-managed certificates are those where Auth0 will manage the creation and renewal of the certificates for your custom domain. This is the simplest custom domains deployment option, and the scope of this document

* **Self-Managed Certificates**: [Self-managed certificates](/custom-domains/self-managed-certificates) are available for enterprise customers only. Choosing this option means that you are responsible for managing your SSL/TLS certificates and configuring a reverse proxy to handle SSL termination and forwarding requests to Auth0.

## How to configure custom domains

Setting up your custom domain using Auth0-managed certificates requires you to do the following steps:

1. Provide your domain name to Auth0
1. Verify ownership
1. Complete feature-specific setup

### Step 1: Provide your domain name to Auth0

Log in to the Dashboard and go to [Tenant Settings](${manage_url}/#/tenant). Click over to the **Custom Domains** tab.

![](/media/articles/custom-domains/custom-domains.png)

Enter your custom domain in the provided box and select **Auth0-managed certificates**. Click **Add Domain**.

### Step 2: Verify ownership

Before you can use this domain, you'll need to verify that you own your domain. To do this, you need to add the CNAME verification record listed in the Dashboard to your domain's DNS record.

![](/media/articles/custom-domains/auth0-managed.png)

When you've done so, click **Verify** to proceed.

::: note
It may take a few minutes before Auth0 is able to verify your CNAME record, depending on your DNS settings.
:::

::: panel TL;DR;
Here's how to add the CNAME verification record to your domain's DNS record. The steps specified may vary by domain host provider, but generally speaking, you will need to:

1. Log in to your domain management service (such as GoDaddy or Google Domains)

1. Create a new record:

	* For the record type, indicate **CNAME**
	* For the **Name** field, enter your custom domain name (such as `login.northwind.com`)
	* Leave the **Time to Live (TTL)** field set to the default value
	* In the **Value** field, paste in the CNAME value provided by the Auth0 Dashboard

When done, save your record.
:::

If Auth0 was able to verify your domain name, you'll see a confirmation window. 

This means the verification process is complete and within 1 to 2 minutes, your custom domain should be ready to use.

![](/media/articles/custom-domains/domain-verification.png)

::: warning
If you are unable to complete the verification process within three days, you'll need to start over.
:::

### Step 3: Complete feature-specific setup

There are additional steps you must complete depending on which Auth0 features you are using.

:::warning
If you have been using Auth0 for some time and decide to enable a custom domain, you will have to migrate your existing apps and update the settings as described below. Note that existing sessions created at `tenant.auth0.com` will no longer be valid once you start using your custom domain, so users will have to login again.
:::

#### Configure the Login Page

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

#### Embedded Lock

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

#### SDKs

If you are using [Auth0.js](/libraries/auth0js) or other SDKs, you will have to initialize the SDK using your custom domain. For example, if you are using the auth0.js SDK, you'll need to set the following:

```js
webAuth = new auth0.WebAuth({
  domain:       'login.northwind.com',
  clientID:     'your-client-id'
});
```

Note that the Management API only accepts Auth0 domains. If you use a [custom domain](/custom-domains) and also intend to perform [Management API actions with Auth0.js](/libraries/auth0js/v9#user-management), you must instantiate a new copy of `webAuth` using your Auth0 domain.

#### Auth0 emails

If you would like your custom domain used with your Auth0 emails, you'll need to enable this feature in the [Dashboard](${manage_url}/#/tenant). You can do this by clicking the toggle associated with the **Use Custom Domain in Emails**. When the toggle is green, this feature is enabled.

![](/media/articles/custom-domains/cd_email_toggle.png)

#### Social identity provider configuration

If you want to use social identity providers with your custom domain, you must update the allowed callback URLs to include your custom domain (such as `https://login.northwind.com/login/callback`).

:::warning
You cannot use [Auth0 developer keys](/connections/social/devkeys) with custom domains.
:::

#### APIs

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

## FAQ

1. **If I use a custom domain, will I still be able to use my ${account.namespace} domain to access Auth0?**
  
Yes, you will be able to use either the default `${account.namespace}` or your custom domain. There are however a few exceptions:
- If you are using embedded lock or an SDK, the configuration is pre-defined as using either your custom domain or the `${account.namespace}` domain, so you have to use one or the other
- If you start a session in `${account.namespace}`, and go to `custom-domain.com`, the user will have to login again

2. **What about support for other features?**
  
We are planning to support several additional features in the future, including SAML and WS-Fed clients and enterprise and Passwordless connections.

## Troubleshooting

If you are seeing errors, refer to the following troubleshooting steps.

### Custom domain is still pending verification

If you continue to see this error in the Dashboard, make sure that the CNAME record is properly configured in your domain management service.

You can confirm the configuration of your CNAME record using:

* A tool like [Mxtoolbox](https://mxtoolbox.com/CNAMELookup.aspx) or [Google](https://dns.google.com)
* The `dig` command in your terminal

Please remember that it can take up to 48 hours for the DNS to be propagated.

### CNAME flattening

Cloudflare has a service called CNAME Flattening. During the verification process, turn off the CNAME flattening process until the domain verification steps are complete to prevent IP address confusion.

### Domains with existing CAA records

If your domain, or the parent domain, already has a **Certification Authority Authorization** (CAA) record, then you  have to add another one for `letsencrypt.org`.

The reason for that is that Auth0 uses `letsencrypt.org` to sign certificates so if it's not authorized to issue certificates for your domain, the custom domain functionality will not work for you.

To add a new CAA record and whitelist `letsencrypt.org` use the following:

```text
"0 issue \"letsencrypt.org\""
```
