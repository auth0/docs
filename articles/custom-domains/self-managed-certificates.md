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

To set up your custom domain using self-managed certificates, you need to provide your domain name to Auth0, verify that you own that domain, configure the reverse proxy, and then complete additional configuration for the Auth0 features you are using.

## Create a new domain record (if you haven't already done so)

Configure a domain with your chosen domain management service, such as GoDaddy or Goggle Domains. 

The following steps may vary for your domain host provider.

1. Log in to your domain management service.

2. Create a new record:

  * For the record type, indicate **TXT**
  * For the **Name** field, enter your custom domain name (such as **login.travel0.com**)
  * Leave the **Time to Live (TTL)** field set to the default value
  * In the **Value** field, paste in the TXT value provided by the Auth0 Dashboard

3. When done, save your record.

  If Auth0 was able to verify your domain name, you'll see a confirmation window. 

  ![](/media/articles/custom-domains/api-key.png)

  This means the verification process is complete and within 1 to 2 minutes, your custom domain should be ready to use.

4. Save the information provided in this pop-up, especially the `cname-api-key` value, since this is the **only** time you'll see this value.

<%= include('./_provide-domain-name') %>

## Verify ownership

Before you can use the domain with Auth0, you'll need to verify that you own it. 

1. Go to [Dashboard > Tenant Settings](${manage_url}/#/tenant), add the TXT verification record listed in the Dashboard to your domain's DNS record.

  ![](/media/articles/custom-domains/self-managed.png)

2. Click **Verify** to proceed.

  It may take a few minutes before Auth0 can verify your TXT record, depending on your DNS settings.

  ![](/media/articles/custom-domains/api-key.png)

<%= include('./_warning-repeat-steps') %>

## Configure reverse proxy

The reverse proxy server retrieves resources on behalf of your client from one or more servers. These resources are then returned to the client, appearing as if they originated from the proxy server itself.

You can use a service such as Cloudflare, Azure CDN, or AWS Cloudfront and configure settings for your custom domain. You will add the new CNAME value to your DNS for your custom domain pointing to the reverse proxy server domain name for distribution. 

The way you configure the proxy server will vary depending on the service you use. You will likely need to configure the following types of settings:

* Distribution
* Origin custom headers
* Default cache behaviour

1. Distribution settings: 

 | Parameter | Value |
  | - | - |
  | Origin Domain Name | Set this to the **Origin Domain Name** value obtained from the Auth0 Dashboard during the Custom Domains setup process |
  | Origin ID | A description for the origin. This value lets you distinguish between multiple origins in the same distribution and therefore must be unique. |
  | Origin Protocol Policy | Set to `HTTPS Only` |
  | Alternate Domain Names (CNAMEs) | Set to your custom domain name (the same one your configured in the Auth0 Dashboard) |

2. Origin custom header settings: 

  | Parameter | Value |
  | -- | -- |
  | Header Name | Set to `cname-api-key` |
  | Value | Set to the CNAME API Key value that you were given immediately after you verified ownership of your domain name with Auth0 |

3. Default cache behavior settings:

 | Parameter | Value |
  | - | - |
  | Viewer Protocol Policy | Select **Redirect HTTP to HTTPS** |
  | Allowed HTTP Methods | Select **GET, HEAD, OPTIONS, PUT, POST, PATCH, DELETE** |
  | Cache Based on Selected Request Headers | Select **Whitelist** |
  | Whitelist Headers | Enter `User-Agent` and click **Add Custom >>** to add the custom whitelist header. Do the same for `Origin` and `Referer` headers. |
  | Forward Cookies | Select **All** |
  | Query String Forwarding and Caching | Select **Forward all, cache based on all** |

4. After you've created the reverse proxy settings on your service, go to [Dashboard > Tenant Settings](${manage_url}/#/tenant) **Custom Domains** tab, add a new CNAME record to your DNS for your custom domain pointing to the service (such as Cloudfront) domain name for your distribution. You can usually find this by looking for the **Distribution ID** on your reverse proxy server configuration. 

  ::: warning
  Once added, the CNAME record must be present at all times to avoid issues during certificate renewal.
  :::

  https://docs-content-staging-pr-8492.herokuapp.com/docs/media/articles/custom-domains/auth0-managed.png

See [Configure AWS CloudFront for Use as Reverse Proxy](/custom-domains/set-up-cloudfront) for an example.

<%= include('./_additional-steps') %>

## Keep reading

* [Troubleshooting Custom Domains](/custom-domains/troubleshoot-custom-domains)
* [Configure Custom Domains with Auth0-Managed Certificates](/custom-domains/auth0-managed-certificates)