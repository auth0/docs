By default, the URL associated with your tenant will include its name and possibly a region-specific identifier. For example, tenants based in the US have the a URL similar to `https://example.auth0.com` while those based in Europe have something that is of the fashion `https://example.eu.auth0.com`. A [Custom Domain](/custom-domains) offers a way of providing your users with a consistent experience by using a name that’s consistent with your organization's brand.

::: warning
Only one custom Domain Name can be applied per Auth0 Tenant, so if you absolutely must have independent domain name branding then you will require an [architecture](/architecture-scenarios/implementation/${platform}/${platform}-architecture) where multiple Auth0 Tenants are deployed to production.
:::

In addition, Custom Domain functionality offers you complete control over the [certificate management](/custom-domains#certificate-management) process. By default, Auth0 provides standard SSL certificates, but if you configure a custom domain, you can use Extended Validation (EV) SSL certificates or similar to provide the visual, browser-based cues that offer your visitors additional peace of mind.

In general, we see customers having the most success when they use a centralized domain for authentication - this is especially the case if the company offers multiple products or service brands. By using a centralized domain, you can provide end users with a consistent user experience while also minimizing the need to maintain multiple production tenants in Auth0.

<% if (platform === "b2b") { %>
::: warning
If your customer organizations will be isolated from each other, and you require that users are presented a login page for each organization via a custom domain URL, then your only option is to create a [separate tenant for each organization](/architecture-scenarios/${platform}/${platform}-architecture#tenant-provision-for-complex-organizations).
:::
<%  } %>
