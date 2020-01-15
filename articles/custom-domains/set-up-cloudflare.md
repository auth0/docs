---
name: Configure Cloudflare for Use as Reverse Proxy
description: Learn how to set up Cloudflare for use as the custom domain proxy for Auth0.
topics:
  - custom-domains
  - cloudflare
  - reverse-proxy
contentType: how-to
useCase: 
  - customize-domains
  - self-managed-certificates
---

# Configure Cloudflare for Use as Reverse Proxy

<%= include('./_subscription') %>

To set up Cloudflare as a reverse proxy, a Cloudflare Enterprise Plan with the following features is required:

* Host Header Override: [Using Page Rules to Re-Write Host Headers (Cloudflare Support)](https://support.cloudflare.com/hc/en-us/articles/206652947-Using-Page-Rules-to-Re-Write-Host-Headers)
* True-Client-IP Header: [What is True-Client-IP? (Cloudflare Support)](https://support.cloudflare.com/hc/en-us/articles/206776727-What-is-True-Client-IP-)

1. Complete the steps on [Configure Custom Domains with Self-Managed Certificates](/custom-domains/self-managed-certificates) if you haven't already. Make note of the **Origin Domain Name** and **cname-api-key** values since you'll need these later.
2. [Configure a CNAME setup](https://support.cloudflare.com/hc/en-us/articles/360020615111-Configuring-a-CNAME-setup) with Cloudflare.
3. Once Cloudflare has verified your domain, log in to the [Cloudflare Dashboard](https://dash.cloudflare.com/login).
4. [Create a new Cloudflare Page Rule](https://support.cloudflare.com/hc/en-us/articles/200172336-Creating-Page-Rules) with the following settings:

  | Setting | Value |
  |---------|-------|
  | Host Header Override | Enter `${account.tenant}.<CUSTOM_DOMAIN_ID>.edge.tenants.auth0.com`, replacing `<CUSTOM_DOMAIN_ID>` with the custom domain ID from the **Origin Domain Name** you received from Auth0. If your tenants are not in the US region, use one of the following: <ul><li>EU: `${account.tenant}.<CUSTOM_DOMAIN_ID>.edge.tenants.eu.auth0.com`</li><li>AU: `${account.tenant}.<CUSTOM_DOMAIN_ID>.edge.tenants.au.auth0.com`</li></ul> |
  | True-Client-IP | Select **Enable**. |

5. Next, create and deploy a new [Cloudflare Worker](https://developers.cloudflare.com/workers/) for the configured CNAME using the following script. Replace `<CNAME_API_KEY_VALUE>` below with the **cname-api-key** you received from Auth0:

  ```js
  addEventListener('fetch', event => {
      event.respondWith(handleRequest(event.request))
  })
  
  async function handleRequest(request) {
      request = new Request(request)
      request.headers.set('cname-api-key', '<CNAME_API_KEY_VALUE>')
      return await fetch(request)
  }
  ```

## Configure Auth0

Once you've configured Cloudflare, you'll need to [contact Auth0](https://support.auth0.com/). Auth0 will enable your tenant to accept the **True-Client-IP** header as the remote client IP address.

## Keep reading

* [Troubleshooting Custom Domains](/custom-domains/troubleshoot)
* [Configure Custom Domains with Self-Managed Certificates](/custom-domains/self-managed-certificates)
