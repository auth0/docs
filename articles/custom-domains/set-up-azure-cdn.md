---
name: Configure Azure CDN for Use as Reverse Proxy
description: Learn how to set up Azure CDN for use as the custom domain proxy for Auth0.
topics:
  - custom-domains
  - azure
  - cdn
  - reverse-proxy
contentType: how-to
useCase: 
  - customize-domains
  - self-managed-certificates
---

# Configure Azure CDN for Use as Reverse Proxy

<%= include('./_subscription') %>

To set up Azure CDN as a reverse proxy, an Azure CDN Premium plan is required.

1. Complete the steps on [Configure Custom Domains with Self-Managed Certificates](/custom-domains/self-managed-certificates) if you haven't already. Make note of the **Origin Domain Name** and **cname-api-key** values since you'll need these later.
2. Login to the [Azure Portal](https://portal.azure.com/).
3. [Create a new Azure CDN Profile](https://docs.microsoft.com/en-us/azure/cdn/cdn-create-new-endpoint#create-a-new-cdn-profile).
4. [Create a new Azure CDN endpoint](https://docs.microsoft.com/en-us/azure/cdn/cdn-create-new-endpoint#create-a-new-cdn-endpoint) using the CDN Profile you just created. For the CDN endpoint settings, use the following values:

  | Setting | Value |
  |---------|-------|
  | Name | We recommend naming your CDN endpoint like your custom domain name, replacing dots with dashes. For example: **login-mydomain-com.azureedge.net**. |
  | Origin type | Select **Custom Origin** |
  | Origin hostname | Enter `${account.tenant}.<CUSTOM_DOMAIN_ID>.edge.tenants.auth0.com`, making sure to replace `<CUSTOM_DOMAIN_ID>` with the custom domain ID from the **Origin Domain Name** you received from Auth0. If your tenants are not in the US region, use one of the following: <ul><li>EU: `${account.tenant}.<CUSTOM_DOMAIN_ID>.edge.tenants.eu.auth0.com`</li><li>AU: `${account.tenant}.<CUSTOM_DOMAIN_ID>.edge.tenants.au.auth0.com`</li></ul> |
  | Origin path | Leave blank. |
  | Origin host header | Use the name you provided for the Origin hostname. |
  | Protocol | Disable HTTP so that only HTTPS is enabled. |

5. [Add your custom domain to your Azure CDN endpoint](https://docs.microsoft.com/en-us/azure/cdn/cdn-map-content-to-custom-domain).
6. [Configure HTTPS for your Azure CDN custom domain](https://docs.microsoft.com/en-us/azure/cdn/cdn-custom-ssl?tabs=option-1-default-enable-https-with-a-cdn-managed-certificate). This process requires you to verify ownership of the domain. Once done, it may take up to 6 hours to deploy the certificate to all of the CDN pop locations.
7. Set up the configuration for the custom domain communication with Auth0 using the [Azure CDN Rules Engine](https://docs.microsoft.com/en-us/azure/cdn/cdn-verizon-premium-rules-engine). Create [a new Azure CDN Rule](https://docs.microsoft.com/en-us/azure/cdn/cdn-verizon-premium-rules-engine#tutorial) with the following settings:

  | Setting | Value |
  |---------|-------|
  | Name/Description | Auth0 Custom Domain |
  | Type of requests | Select the **Edge CName** option, then select your custom domain name from the list. |

8. Add the following **Features** to your Azure CDN Rule:

  | Setting | Value |
  |---------|-------|
  | Bypass Cache | **Enabled** |
  | Modify Client Request Header | Select **Override**, enter **cname-api-key** for the name, and enter the CNAME API Key provided by Auth0 as the value.

::: note
We recommend creating another Azure CDN Rule to deny the usage of the **azureedge.net** CNAME.
:::

9. Once the Azure CDN Rule is approved, the status will change from Pending XML to Active XML. At this point, Azure CDN will be publishing the rules and certificates. When Azure finishes processing all changes, you can use your custom domain.

## Keep reading

* [Troubleshooting Custom Domains](/custom-domains/troubleshoot)
* [Configure Custom Domains with Self-Managed Certificates](/custom-domains/self-managed-certificates)
