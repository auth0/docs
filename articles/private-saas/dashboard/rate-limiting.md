---
section: private-saas
description: Overview of the Private SaaS Dashboard Rate Limiting page
---

# Auth0 Private SaaS Dashboard: Rate Limiting

::: panel-info Private SaaS Dashboard Navigation

For additional information on navigating to and using the Private SaaS Dashboard, please see the section on [Private SaaS Controls](/private-saas/dashboard#private-saas-controls).

:::

While the Auth0-managed cloud instances automatically includes rate limiting to ensure quality service, you must manually enable rate limiting if you are using Auth0 Private SaaS.

![](/media/articles/private-saas/dashboard/rate-limiting.png)

## Settings

* **Enabled**: to enable rate limiting, check this box. Auth0 will then limit requests to services like API and logins to help mitigate malicious attacks;
* **Configuration of Buckets**: if you have enabled rate limiting, you will be presented with the various "buckets" that set the limits on calls to the API and logins. You may adjust these as necessary.
