---
section: appliance
description: Custom domains and the Auth0-Hosted PSaaS Appliance
toc: false
topics:
    - appliance
    - private-cloud
contentType: reference
useCase: appliance
applianceId: appliance71
---
# Use Custom Domains with the Auth0-Hosted PSaaS Appliance

You can configure a single custom domain name for your app tenants' domains. 

::: note
Custom domains are **optional**, and Auth0 SLAs do **not** cover this portion of the PSaaS Appliance infrastructure.
:::

If you choose to use a custom domain, you'll need to:

* Manage the DNS name record
* Manage the [SSL Certificate](/appliance/infrastructure/security#ssl-certificates)
* Add the appropriate DNS entry that alias the Auth0 identity

For example, you'll need to map **identity.<your_name>.auth0.com** to **identity.<your_name>.com**.

**Please note that Webtasks do not support custom domains.**

## Keep Reading

::: next-steps
* [Custom Domains on the PSaaS Appliance](/appliance/custom-domains)
:::