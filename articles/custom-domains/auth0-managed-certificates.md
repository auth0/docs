---
title: Configure Custom Domains with Auth0-Managed Certificates
description: Learn how to configure custom domains where Auth0 manages the SSL/TLS certificates. 
topics:
  - custom-domains
  - certificates
  - SSL/TLS-certificates
contentType: how-to
useCase: 
  - configure-customize-domains
  - configure-auth0-managed-certificates
---

# Configure Custom Domains with Auth0-Managed Certificates

<%= include('./_subscription') %>

To set up your custom domain using Auth0-managed certificates, you need to provide your domain name to Auth0, verify that you own that domain, and then complete additional configuration for the Auth0 features you are using.

## Create domain record (if you haven't already done so)

Before you can use this domain with Auth0, you'll need to verify that you own your domain. To do that, you will need to configure your domain with your chosen domain management service, such as GoDaddy or Goggle Domains. 

The following steps may vary for your domain host provider.

1. Log in to your domain management service.

2. Create a new record.

	* For the record type, indicate **CNAME**
	* For the **Name** field, enter your custom domain name (such as `login.travel0.com`)
	* Leave the **Time to Live (TTL)** field set to the default value
	* In the **Value** field, paste in the CNAME value provided by the Auth0 Dashboard

3. When done, save your record.

  ::: important
  Once added, the CNAME record must be present at all times to avoid issues during certificate renewal.
  :::

<%= include('./_provide-domain-name') %>

## Verify ownership

1. In the Auth0 Dashboard, under **Tenant Settings**, add the CNAME verification record listed in the Dashboard to your domain's DNS record.

  ![](/media/articles/custom-domains/auth0-managed.png)

2. Click **Verify** to proceed.

  It may take a few minutes before Auth0 is able to verify your CNAME record, depending on your DNS settings. If Auth0 was able to verify your domain name, you'll see a confirmation window. This means the verification process is complete and within 1 to 2 minutes, your custom domain should be ready to use.

  ![](/media/articles/custom-domains/domain-verification.png)

<%= include('./_warning-repeat-steps') %>

<%= include('./_additional-steps') %>

## Keep reading

* [Troubleshooting Custom Domains](/custom-domains/troubleshoot-custom-domains)
* [Configure Custom Domains with Self-Managed Certificates](/custom-domains/self-managed-certificates)