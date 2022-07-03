---
section: appliance
description: Overview of the PSaaS Appliance Dashboard Rate Limiting page
topics:
    - appliance
    - dashboard
    - rate-limiting
conceptType: concept
useCase: appliance
applianceId: appliance23
sitemap: false
---

# Auth0 Appliance Dashboard: Rate Limiting

::: note
  For additional information on navigating to and using the PSaaS Appliance Dashboard, please see the section on [PSaaS Appliance Controls](/appliance/dashboard#appliance-controls).
:::

While the Auth0-managed cloud instances automatically includes rate limiting to ensure quality service, you must manually enable rate limiting if you are using Auth0 PSaaS Appliance instances.

![](/media/articles/appliance/dashboard/rate-limiting.png)

## Settings

* **Enabled**: to enable rate limiting, check this box. Auth0 will then limit requests to services like API and logins to help mitigate malicious attacks;
* **Configuration of Buckets**: if you have enabled rate limiting, you will be presented with the various "buckets" that set the limits on calls to the API and logins. You may adjust these as necessary.
