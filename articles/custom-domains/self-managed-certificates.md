---
title: Configure Custom Domains with Self-Managed Certificates
description: Learn how to configure custom domains where you are responsible for SSL/TLS certificates, the reverse proxy to handle SSL termination, and forwarding requests to Auth0. 
topics:
  - custom-domains
  - certificates
  - reverse-proxy
  - SSL/TLS-certificates
contentType: how-to
useCase: 
  - configure-customize-domains
  - forward-requests-to-auth0
  - configure-reverse-proxy
  - configure-self-managed-certificates
---
# Configure Custom Domains with Self-Managed Certificates

::: note
Custom Domains with the **Self-Managed Certificates** option is available for Aut0 Enterprise customers only.
:::

You can choose to manage the certificates for your custom domains yourself, which means that you are responsible for managing your SSL/TLS certificates and configuring a reverse proxy to handle SSL termination and forwarding requests to Auth0. 

Choose this option if:

* You want to have more control of your certificates (such as choosing your own CA or certificate expiration)
* You want to enable additional monitoring over your API calls to Auth0

::: note
You'll need to register and own the domain name to which you're mapping your Auth0 domain.
:::

To set up your custom domain using self-managed certificates, you need to provide your domain name to Auth0, verify that you own that domain, configure the reverse proxy, and then complete additional configuration for the Auth0 features you are using.

<%= include('./_provide-domain-name') %>

## Verify ownership

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

## Configure the reverse proxy

Configure your reverse proxy. **Writer's Note: need more here**

See [Configure AWS CloudFront for Use as Reverse Proxy](/custom-domains/set-up-cloudfront) for an example.

## Additional steps for specific Auth0 features

There are additional configuration steps you must complete depending on which Auth0 features you are using. See the [Configure Custom Domains for Specific Features](/custom-domains/additional-configuration) document for more information.

## Keep reading

* 