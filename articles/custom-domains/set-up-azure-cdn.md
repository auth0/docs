---
name: Setup Azure CDN as a Reverse Proxy for Custom Domains
description: How to set up Azure CDN for use as the custom domain proxy for Auth0
topics:
  - custom-domains
  - azure
  - cdn
contentType: how-to
useCase: customize-domains
toc: true
---

# Setup Azure CDN as a Reverse Proxy for Custom Domains

::: warning
This feature requires a paid subscription to the **Enterprise** plan (see [Pricing](https://auth0.com/pricing)).
:::

1. Login to the [Azure Portal](https://portal.azure.com/).
2. [Create a new Azure CDN Profile](https://docs.microsoft.com/en-us/azure/cdn/cdn-create-new-endpoint#create-a-new-cdn-profile).
3. [Create a new Azure CDN endpoint](https://docs.microsoft.com/en-us/azure/cdn/cdn-create-new-endpoint#create-a-new-cdn-endpoint) using the CDN Profile you just created. For the CDN endpoint settings, use the following values:

| Setting | Value |
|---------|-------|
| Name | We recommend naming your CDN endpoint like your custom domain name, replacing dots with dashes. For example: **login-mydomain-com.azureedge.net**. |
| Origin type | Select **Custom Origin** |
| Origin hostname | Enter **${account.tenant}.custom_domain_id.edge.tenants.auth0.com**. If your tenants are not in the US region you have to use one of the following: <ul><li>EU: **${account.tenant}.custom_domain_id.edge.tenants.eu.auth0.com**</li><li>AU: **${account.tenant}.custom_domain_id.edge.tenants.au.auth0.com**</li></ul> |
| Origin path | Leave this blank. |
| Origin host header | Use the name you provided for the Origin hostname. |
| Protocol | Disable HTTP so only HTTPS is enabled. |

4. [Add your custom domain to your Azure CDN endpoint](https://docs.microsoft.com/en-us/azure/cdn/cdn-map-content-to-custom-domain).
5. [Configure HTTPS for your Azure CDN custom domain](https://docs.microsoft.com/en-us/azure/cdn/cdn-custom-ssl?tabs=option-1-default-enable-https-with-a-cdn-managed-certificate). This process requires you to verify ownership of the domain and after that it may take up to 6 hours to deploy the certificate to all the CDN pop locations.
6. Now you need to setup the configuration for the custom domain communication with Auth0 by using the [Azure CDN Rules Engine](https://docs.microsoft.com/en-us/azure/cdn/cdn-verizon-premium-rules-engine). Create [a new Azure CDN Rule](https://docs.microsoft.com/en-us/azure/cdn/cdn-verizon-premium-rules-engine#tutorial) with the following settings:

| Setting | Value |
|---------|-------|
| Name/Description | Auth0 Custom Domain |
| Type of requests | Select the **Edge CName** option then select your custom domain name from the list. |

7. Add the following **Features** to your Azure CDN Rule:

| Feature | Value |
|---------|-------|
| Bypass Cache | **Enabled** |
| Modify Client Request Header | Select **Override**, enter **cname-api-key** for the name, and enter the CNAME API Key provided by Auth0 as the value.

::: note
We recommend creating another Azure CDN Rule to deny the usage of the **azureedge.net** CNAME.
:::

8. Once the Azure CDN Rule is approved, the status will change from Pending XML to Active XML. At this point Azure CDN will be publishing the rules and certificates. When Azure finishes processing all changes you can access your Auth0 custom domain.

