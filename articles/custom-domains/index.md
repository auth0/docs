---
title: Custom Domains
description: How to map custom domains
toc: true
---
# Custom Domains (Beta)

Auth0 allows you to map the domain for your tenant to a custom domain of your choosing. This allows you maintain a consistent experience for your users by keeping them on your domain instead of redirecting or using Auth0's domain. For example, if your Auth0 domain is `northwind.auth0.com`, you can have your users to see, use, and remain on `login.northwind.com`.

Using custom domains with centralized login is the most seamless and secure experience for developers and end users. For more information about centralized login and customizing the hosted login pages, refer to [our documentation](https://auth0.com/docs/hosted-pages/login).

::: warning
Custom Domains is a beta feature.
:::

## Prerequisites

You'll need to register and own the domain name to which you're mapping your Auth0 domain.

## Features Supporting Use of Custom Domains

Currently, the following Auth0 features and flows support use of custom domains:

* OAuth 2.0/OIDC-Compliant Flows (using the [`/authorize`](/api/authentication#authorize-client) and [`/oauth/token`](https://auth0.com/docs/api/authentication#get-token) endpoints)
* Guardian (Version 1.3.3 or later)
* Emails (the links included in the emails will use your custom domain)

::: note
If you obtain an access token for APIv2 using an authorization flow with your custom domain, then you must call APIv2 using the custom domain. Otherwise, the token will not be considered valid.
:::

## Certificate Management

Auth0 offers two options for certificate management: You can manage the certificates for your custom domains yourself, or you can have Auth0 manage them on your behalf.

### Auth0-Managed Certificates

Auth0 will manage the creation and renewal of the certificates for your custom domain. This is the simplest custom domains deployment option.

### Self-Managed Certificates

You are responsible for managing your SSL/TLS certificates and configuring a reverse proxy to handle SSL termination and the forwarding of requests to Auth0. Choose this option if you wish to have more control of your certificates (such as choosing your own CA or certificate expiration), or if you want to have more monitoring over your API calls to Auth0.

If you opt to manage your own certificates, you'll need to use a reverse proxy that you configure using AWS CloudFront.

::: note
Self-Managed Certificates is only available for enterprise customers.
:::

::: note
The only vendor we officially support is AWS CloudFront. In the future, support for other vendors may be added.
:::

## How to Configure Custom Domains

Setting up your custom domain requires you to do the following steps:

1. Provide your domain name to Auth0
1. Verify ownership
1. Configure the reverse proxy (if using self-managed certificates)
1. *Optional*: Configure the hosted login page
1. *Optional*: Enable custom domains in Auth0 emails

### Step 1: Configure Auth0

Log in to the Dashboard and go to [Tenant Settings](${manage_url}/#/tenant). Click over to the **Custom Domains** tab.

![](/media/articles/custom-domains/custom-domains.png)

Enter your custom domain in the provided box. Indicate whether you're using **Self-managed certificates** or **Auth0-managed certificates**. Click **Add Domain**.

### Step 2: Verify Ownership

Before you can use this domain, you'll need to verify that you own your domain. The verification method depends on whether you are using Auth0-Managed or Self-Managed certificates:

* **Auth0-Managed Certificates**: Add the CNAME verification record listed in the Dashboard to your domain's DNS record

	![](/media/articles/custom-domains/auth0-managed.png)

* **Self-Managed Certificates**: Add the TXT verification record listed in the Dashboard to your domain's DNS record.

	![](/media/articles/custom-domains/self-managed.png)

When you've done so, click **Verify** to proceed.

::: note
It may take a few minutes before Auth0 is able to verify your TXT or CNAME record, depending on your DNS settings.
:::

::: panel TL;DR
Here's how to add the TXT verification record to your domain's DNS record. The steps specified may vary by domain host provider, but generally speaking, you will need to:

1. Log in to your domain management service (such as GoDaddy or Google Domains)

1. Create a new record and add the verification:

	* For the record type, indicate **TXT**
	* For the **Name** field, enter your custom domain name (such as login.acme.com**)
	* Leave the **Time to Live (TTL)** field set to the default value
	* In the **Value** field, paste in the verification value provided by the Auth0 Dashboard

When done, save your record.
:::

If Auth0 was able to verify your domain name, you'll see a pop-up window. Its contents will differ depending on whether you are using Auth0-Managed or Self-Managed certificates:

* **Auth0-Managed Certificates**: This means the verification process is complete and within 1 to 2 minutes, your custom domain should be ready to use.

![](/media/articles/custom-domains/domain-verification.png)

* **Self-Managed Certificates**: Save the information provided in this pop-up, especially the `cname-api-key` value, since this is the **only** time you'll see this value.

![](/media/articles/custom-domains/api-key.png)

::: warning
If you are unable to complete the verification process within three days, you'll need to start over.
:::

### Step 3: Configure the Reverse Proxy

If you are using the Self-Managed Certificates option for your custom domain, you'll need to set up your reverse proxy.

::: note
This step is not necessary for those using Auth0-managed certificates.
:::

Currently, you can use [AWS CloudFront](/custom-domains/set-up-cloudfront).

### Step 4: Configure the Hosted Login Page

This is an **optional** step.

If you're using the Default Hosted Login Page, without customization, you will not need to make any changes - your custom domain will work right out of the box.

If you're using a Custom [Hosted Login Page](/hosted-pages/login), you'll need to update it to use your custom domain. The changes that you'll need to make are regarding the initializing of Lock. The following code sample shows the lines reflected the necessary changes.

::: note
These same changes also apply to Embedded Lock.
:::

```js
    var lock = new Auth0Lock(config.clientID, config.customDomain, {
		...
	      configurationBaseUrl: config.configurationBaseUrl
	      overrides: {
	        __tenant: config.auth0tenant,
	        __token_issuer: config.tokenIssuer
	      },
		...
    });
```

### Step 5: Enable Custom Domains in Auth0 Emails

This is an **optional** step.

If you would like your custom domain used with your Auth0 emails, you'll need to enable this feature in the [Dashboard](${manage_url}/#/tenant). You can do this by clicking the toggle associated with the **Use Custom Domain in Emails**. When the toggle is green, this feature is enabled.

## FAQ

1. **If I use a custom domain, will I still be able to use my `tenant.auth0.com` domain to access Auth0?**

	You can use `tenant.auth0.com` for centralized login as long as you have *not* customized your hosted login page to support the custom domain. If you are using the default hosted login page, it will support both domains. For other flows, you can use both domains.

1. **What about support for SAML or WS-Fed clients?**
  
  We are planning support for additional features, including SAML and WS-Fed clients, in the future.

