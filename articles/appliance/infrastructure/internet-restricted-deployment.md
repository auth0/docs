---
title: Internet-Restricted PSaaS Appliance Deployments
description: Operating the PSaaS Appliance in an Internet-Restricted Environment
contentType: reference
useCase: appliance
applianceId: appliance37
sitemap: false
---
# PSaaS Appliance Deployments with Limited Internet Connectivity

The Auth0 PSaaS Appliance is delivered as a managed service that can run in:

* A data center that you own
* A cloud-based environment that you own
* Auth0's private cloud

The PSaaS Appliance is designed to mirror the solutions offered via the Auth0 Public Cloud as closely as possible to ensure that features *and* issue fixes can be readily applied to PSaaS Appliance. Though there are differences between the Public Cloud product and the PSaaS Appliance, these are primarily due to technical limitations posed by the PSaaS Appliance environments.

## Internet-Restricted Environments

While we make an effort to create PSaaS Appliances that are encapsulated for normal operation, there are several features that require access to external resources for normal functionality. These resources are primarily located on the Auth0 Content Delivery Network (CDN), which is accessed via **cdn.auth0.com**.

::: warning
The PSaaS Appliance **must** have access to the internet during [update periods](https://auth0.com/docs/appliance/infrastructure/ip-domain-port-list#external-connectivity).
:::

Operating the PSaaS Appliance in an internet-restricted environment results in the loss of the following features/functionality:

* Analytics (including usage statistics)
* Authentication API Explorer
* [Extensions](/extensions)
* [Hooks](/hooks)
* Lock
* Management API Explorer
* Management Dashboard
* Quickstarts
* Social Connections

### Management Dashboard

The browser that you are using to manage your PSaaS Appliance requires internet access to navigate to the Management Dashboard (located at **manage.your-domain**). 

You may, however, restrict server-side access to the Management Dashboard.

To properly render the Dashboard, it accesses the following sites:

* **cdn.auth0.com**: resources loaded from this CDN are well-known and include CSS, JavaScript, and images.
* **fonts.googleapis.com**: resources loaded include CSS and font files.
* **s.gravatar.com** and **i2.wp.com**: resources include user profile images loaded from WordPress' Gravatar service.
* **fast.fonts.net**: resources include CSS files for font support.

### Multi-factor Authentication (MFA)

When using multi-factor authentication (MFA), you will need internet access for Guardian MFA (both SMS and push notifications require internet connectivity).

For limited connectivity options, you may choose from:

* One-time password with Google Authenticator, Authy or similar apps
* A custom MFA implementation using redirect rules
* Duo (on-premise versions only)

## Summary

The PSaaS Appliance requires access to specific external resources for normal functionality, and we do not recommend restricting access to these resources for optimal function. These resources are primarily located on the Auth0 CDN.

Currently, there are no plans to reduce the reliance of the PSaaS Appliance on the Auth0 CDN.
