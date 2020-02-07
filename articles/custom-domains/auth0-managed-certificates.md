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

If you choose to have Auth0 manage the certificates for your custom domain, it requires only that you add a CNAME record on the domain. Auth0 validates the record and the generates the certificate on Auth0 servers using Let’s Encrypt. These certificates are renewed automatically every three months. You can configure this easily and you won't have to maintain the certificates yourself. 

To set up your custom domain using Auth0-managed certificates, you need to provide your domain name to Auth0 and verify that you own that domain. Once verified, you will need to configure your Auth0 features to start using your custom domain.

<%= include('./_provide-domain-name', { platform: 'auth0' }) %>

## Verify ownership

Before you can use the domain with Auth0, you'll need to verify that you own it. 

1. Go to [Dashboard > Tenant Settings](${manage_url}/#/tenant), add the CNAME verification record listed in the Dashboard to your domain's DNS record.

  ![DSN Record](/media/articles/custom-domains/auth0-managed.png)

2. Click **Verify** to proceed.

  It may take a few minutes before Auth0 is able to verify your CNAME record, depending on your DNS settings. If Auth0 was able to verify your domain name, you'll see a confirmation window. This means the verification process is complete and within 1 to 2 minutes, your custom domain should be ready to use.

::: panel Add the CNAME verification record to your domain's DNS record
Once added, the CNAME record must be present at all times to avoid issues during certificate renewal.

The following steps may vary for your domain host provider.

1. Log in to your domain management service.

2. Create a new record.

  | Parameter | Value |
  | -- | -- |
  | **Record type** | **CNAME** |
  | **Name** | Enter your custom domain name (such as **login.northwind.com**). |
  | **Time to Live (TTL)** | Use default value |
  | **Value** | Paste in the **CNAME** value provided by the Auth0 Dashboard for your domain's DNS record. |

3. When done, save your record.
:::

If Auth0 was able to verify your domain name, you'll see a confirmation window. This means the verification process is complete and within 1 to 2 minutes, your custom domain should be ready to use.

  ![Domain Verification](/media/articles/custom-domains/domain-verification.png)

<%= include('./_warning-repeat-steps') %>

<%= include('./_additional-steps') %>

## Keep reading

* [Troubleshooting Custom Domains](/custom-domains/troubleshoot)
* [Configure Custom Domains with Self-Managed Certificates](/custom-domains/self-managed-certificates)
