---
title: Custom Domains
description: How to map custom domains
---
# Custom Domains

Auth0 allows you to map your the domain for your tenant to a custom domain of your choosing. This allows you maintain a consistent experience for your users by keeping them on your domain instead of redirecting or using Auth0's domain. For example, if your Auth0 domain is `northwind.auth0.com`, you can have your users to see, use, and remain on `login.northwind.com`.

## Prerequisites

You'll need to register and own the domain name to which you're mapping your Auth0 domain.

## How to Configure Custom Domains

Setting up your custom domain requires you to do the following steps:

1. Provide your domain name to Auth0 and verify ownership
1. Configure the reverse proxy
1. Configure the hosted login page
1. *Optional*: Enable custom domains in Auth0 emails

### Step 1: Configure Auth0

Log in to the Dashboard and go to [Tenant Settings](${manage_url}/#/tenant).

Enter your custom domain in the provided box and click **Add Domain**.

Before you can use this domain, you'll need to verify that you own your domain by adding the TXT verification record listed to your domain name's DNS record. When done, click **Verify**.

If Auth0 was able to verify your domain name, you'll see the following pop-up window. Be sure to save the information provided, especially the `cname-api-key` value, since this is the **only** time you'll see this value.

::: note
If you are unable to complete the verification process within three days, you'll need to start over.
:::

### Step 2: Configure the Reverse Proxy

You'll need to set up your reverse proxy. Currently, you can use [AWS CloudFront](#) or [Azure CDN](#)

### Step 3: Configure the Hosted Login Page

If you're using a [Hosted Login Page](/hosted-pages/login), you'll need to update it to use your custom domain. The changes that you'll need to make are regarding the initializing of Lock. The following code sample shows the lines reflected the necessary changes.

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

### Step 4: Enable Custom Domains in Auth0 Emails

This is an **optional** step.

If you would like your custom domain used with your Auth0 emails, you'll need to enable this feature in the [Dashboard](${manage_url}/#/tenant). You can do this by clicking the toggle associated with the **Use Custom Domain in Emails**. When the toggle is green, this feature is enabled.

## FAQ

1. **If I use a custom domain, will I still be able to use my `tenant.auth0.com` domain to access Auth0?**

	You can use `tenant.auth0.com` for centralized login as long as you have *not* updated your hosted login page to support the custom domain.

1. **Can I use my CNAME to access back-end flows?**

	We only support the use of your `tenant.auth0.com` domain for back-end flows (such as `/oauth/token`).
