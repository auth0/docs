---
title: Configure Custom Domains with Self-Managed Certificates
description: How to create custom domains with self-managed certificates
toc: true
topics:
  - custom-domains
  - certificates
contentType: how-to
useCase: customize-domains
---
# Custom Domains with Self-Managed Certificates

Custom Domains with the **Self-Managed Certificates** option is available for enterprise customers only. Choosing this option means that you are responsible for managing your SSL/TLS certificates and configuring a reverse proxy to handle SSL termination and forwarding requests to Auth0. 

Choose this option if:

* You want to have more control of your certificates (such as choosing your own CA or certificate expiration)
* You want to enable additional monitoring over your API calls to Auth0

## Prerequisites

You'll need to register and own the domain name to which you're mapping your Auth0 domain.

## How to Configure Custom Domains with Self-Managed Certificates

Setting up your custom domain with Self-managed certificates requires you to do the following steps:

1. Provide your domain name to Auth0
1. Verify ownership
1. Configure the reverse proxy
1. Complete feature-specific setup

### Step 1: Provide Your Domain Name to Auth0

Log in to the Dashboard and go to [Tenant Settings](${manage_url}/#/tenant). Click over to the **Custom Domains** tab.

![](/media/articles/custom-domains/custom-domains-self-managed.png)

Enter your custom domain in the provided box and select **Self-managed certificates**. Click **Add Domain**.

### Step 2: Verify Ownership

Before you can use this domain, you'll need to verify that you own your domain. To do this, you will need to add the TXT verification record listed in the Dashboard to your domain's DNS record.

![](/media/articles/custom-domains/self-managed.png)

When you've done so, click **Verify** to proceed.

::: note
It may take a few minutes before Auth0 is able to verify your TXT record, depending on your DNS settings.
:::

::: panel TL;DR
Here's how to add the TXT verification record to your domain's DNS record. The steps specified may vary by domain host provider, but generally speaking, you will need to:

1. Log in to your domain management service (such as GoDaddy or Google Domains)

1. Create a new record:

  * For the record type, indicate **TXT**
  * For the **Name** field, enter your custom domain name (such as **login.northwind.com**)
  * Leave the **Time to Live (TTL)** field set to the default value
  * In the **Value** field, paste in the TXT value provided by the Auth0 Dashboard

When done, save your record.
:::

If Auth0 was able to verify your domain name, you'll see a confirmation window. 

Save the information provided in this pop-up, especially the `cname-api-key` value, since this is the **only** time you'll see this value.

![](/media/articles/custom-domains/api-key.png)

This means the verification process is complete and within 1 to 2 minutes, your custom domain should be ready to use.

::: warning
If you are unable to complete the verification process within three days, you'll need to start over.
:::

### Step 3: Configure the Reverse Proxy

Next you will need  to [set up your reverse proxy using AWS CloudFront](/custom-domains/set-up-cloudfront).

### Step 4: Complete Feature-Specific Setup

There are additional steps you must complete depending on which Auth0 features you are using. Refer to our [custom domains documentation](/custom-domains#step-3-complete-feature-specific-setup) for more details.

