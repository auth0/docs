## Custom Domain

::: note
A custom domain is optional, and Auth0 SLAs do **not** cover this portion of the PSaaS Appliance infrastructure.
:::

You can configure a single custom domain name for your app tenants' domains. 

If you choose to use a custom domain, you'll need to manage the DNS name record, [SSL Certificate](/appliance/infrastructure/security#ssl-certificates), and add the appropriate DNS entry that alias the Auth0 identity.

For example, you'll need to map `identity.<your_name>.auth0.com` to `identity.<your_name>.com`.

::: warning
Webtask does not support custom domains.
:::

### Keep Reading

::: next-steps
* [Custom Domains on the PSaaS Appliance](/appliance/custom-domains)
:::