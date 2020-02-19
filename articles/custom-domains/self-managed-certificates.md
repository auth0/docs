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

<%= include('./_subscription') %>

If you choose to manage the certificates for your custom domains yourself, it requires multiple DNS records on the domain. You have to purchase or provide the certificates from any known Certificate Authority and manage the renewals yourself. You will also need a reverse proxy, where the certificate will be installed. Once the domain is verified, we will accept traffic from the proxy.

Choose this option if:

* You want to have more control of your certificates (such as choosing your own CA or certificate expiration)
* You want to enable additional monitoring over your API calls to Auth0

To set up your custom domain using self-managed certificates, you need to provide your domain name to Auth0, verify that you own that domain, and configure the reverse proxy. Once your custom domain has been set up, you will need to configure your Auth0 features to start using your custom domain.

<%= include('./_provide-domain-name', { platform: 'self' }) %>

## Verify ownership

Before you can use the domain with Auth0, you'll need to verify that you own it. 

1. Go to [Dashboard > Tenant Settings](${manage_url}/#/tenant), copy the TXT verification record listed in the Dashboard to your domain's DNS record.

  ![DSN Record](/media/articles/custom-domains/self-managed.png)

::: panel Add the TXT verification record to your domain's DNS record
The following steps may vary for your domain host provider.

1. Log in to your domain management service.

2. Create a new record:

  | Parameter | Value |
  | -- | -- |
  | **Record type** | **TXT** |
  | **Name** | Enter your custom domain name (such as **login.northwind.com**). |
  | **Time to Live (TTL)** | Use default value |
  | **Value** | Paste in the **TXT** value provided by the Auth0 Dashboard for your domain's DNS record. |

3. When done, save your record.
:::

  It may take a few minutes before Auth0 can verify your TXT record, depending on your DNS settings.

2. Click **Verify** to proceed.

  If Auth0 was able to verify your domain name, you'll see a confirmation window. 

  ::: note
  Save the information provided in this window, specifically the `cname-api-key` value, since this is the **only** time you'll see this value.
  :::

  ![Domain Verification](/media/articles/custom-domains/api-key.png)

  The verification process is complete and within 1 to 2 minutes, your custom domain should be ready to use.

<%= include('./_warning-repeat-steps') %>

## Configure reverse proxy

The reverse proxy server retrieves resources on behalf of your client from one or more servers. These resources are then returned to the client, appearing as if they originated from the proxy server itself.

You can use a service such as [Cloudflare](/custom-domains/set-up-cloudflare), [Azure CDN](/custom-domains/set-up-azure-cdn), or [AWS Cloudfront](/custom-domains/set-up-cloudfront) and configure settings for your custom domain. You will add the new CNAME value to your DNS for your custom domain pointing to the reverse proxy server domain name for distribution. 

::: note
Cloudflare has a feature called CNAME Flattening which affects the Auth0 verification and certificate renewal processes due to the way it handles DNS records. We recommend turning off CNAME Flattening unless it's strictly necessary, according to the [Cloudflare documentation](https://support.cloudflare.com/hc/en-us/articles/200169056-Understand-and-configure-CNAME-Flattening).
:::

The way you configure the proxy server will vary depending on the service you use. You will likely need to configure the following types of settings:

* [Distribution](#distribution-settings)
* [Origin custom headers](#origin-custom-header-settings)
* [Default cache behaviour](#default-cache-behavior-settings)

After you've created the reverse proxy settings on your service, go to [Dashboard > Tenant Settings](${manage_url}/#/tenant) **Custom Domains** tab, add a new CNAME record to your DNS for your custom domain pointing to the service (such as Cloudfront) domain name for your distribution. You can usually find this by looking for the **Distribution ID** on your reverse proxy server configuration. 

::: warning
Once added, the CNAME record must be present at all times to avoid issues during certificate renewal.
:::

### Distribution settings

  | Setting | Value |
  | - | - |
  | Origin Domain Name | Set this to the **Origin Domain Name** value obtained from the Auth0 Dashboard during the Custom Domains setup process |
  | Origin ID | A description for the origin. This value lets you distinguish between multiple origins in the same distribution and therefore must be unique. |
  | Origin Protocol Policy | Set to `HTTPS Only` |
  | Alternate Domain Names (CNAMEs) | Set to your custom domain name (the same one your configured in the Auth0 Dashboard) |

### Origin custom header settings

  | Setting | Value |
  | -- | -- |
  | Header Name | Set to `cname-api-key` |
  | Value | Set to the CNAME API Key value that you were given immediately after you verified ownership of your domain name with Auth0 |

### Default cache behavior settings

  | Setting | Value |
  | - | - |
  | Viewer Protocol Policy | Select **Redirect HTTP to HTTPS** |
  | Allowed HTTP Methods | Select **GET, HEAD, OPTIONS, PUT, POST, PATCH, DELETE** |
  | Cache Based on Selected Request Headers | Select **Whitelist** |
  | Whitelist Headers | Enter `User-Agent` and click **Add Custom >>** to add the custom whitelist header. Do the same for `Origin` and `Referer` headers. |
  | Forward Cookies | Select **All** |
  | Query String Forwarding and Caching | Select **Forward all, cache based on all** |

<%= include('./_additional-steps') %>

## Keep reading

* [Troubleshooting Custom Domains](/custom-domains/troubleshoot)
* [Configure Cloudflare for Use as Reverse Proxy](/custom-domains/set-up-cloudflare)
* [Configure AWS CloudFront for Use as Reverse Proxy](/custom-domains/set-up-cloudfront)
* [Configure Azure CDN for Use as Reverse Proxy](/custom-domains/set-up-azure-cdn)
* [Configure Custom Domains with Auth0-Managed Certificates](/custom-domains/auth0-managed-certificates)
