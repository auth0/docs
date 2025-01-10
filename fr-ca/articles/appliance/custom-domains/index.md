---
url: /appliance/custom-domains
section: appliance
description: How to set up custom domains for your PSaaS Appliance
topics:
    - appliance
    - custom-domains
contentType: 
    - index
useCase: appliance
applianceId: appliance16
sitemap: false
---

# Private SaaS (PSaaS) Appliance: Custom Domains

::: warning
Private SaaS Deployments (beginning with release 1905) must use the Auth0 [Custom Domains](/custom-domains) feature instead of the PSaas Custom Domains feature when creating new Custom Domains (regardless of whether they have existing Custom Domains using the PSaaS Custom Domains feature or not). **The PSaaS Custom Domains feature is deprecated.** Please contact your Auth0 MSE if you have any questions.
:::

If you are using **PSaaS Appliance Build 5XXX** or later, you may configure custom domains using the Management Dashboard.

Custom domains allow you to expose one arbitrary DNS name for a tenant. Conventionally, the PSaaS Appliance uses a three-part domain name for access, and it is the first portion of the domain name that varies depending on the tenant.

The root tenant authority (RTA) is a special domain that is configured when the PSaaS Appliance cluster(s) are first set up. It is a privileged tenant from which certain manage operations for the cluster are available. The RTA is sometimes called the configuration domain, and all users that have access to the Management Dashboard belong to an application in the RTA.

::: note
  All tenant domain names derive from the root tenant authority, and any changes to this will result in the deletion of all tenants.
:::

## Custom Domains Features

The follow is a list of custom domain features that differ in behavior from their implementation in the Auth0 Public Cloud or have yet to be released to PSaaS Appliance implementations.

| Feature | Currently Supported in the PSaaS Appliance? |
| - | - |
| Use of custom domain in emails | No |
| Custom domain protection via API keys | No |
| Custom domain registration | Yes; accessible via PSaaS Appliance Dashboard |
| Token issuer used as custom domain | No |
| Auth0-managed certificates | No |


## Use Example

Suppose that your RTA is `config.example.com`. From this point on, all of your new tenants' domain names must derive from the base name, `example.com`:

```text
site1.example.com
site2.example.com
```

However, you might want to expose other domain names to your end users, such as:

* `auth.site2.com`
* `auth.site1.com`
* `auth.site1.example.com`

You may do so by utilizing the PSaaS Appliance's custom domains feature, which sets the domain used for authentication endpoints.

## Certificates Required for Custom Domains

Custom domains map one external DNS to a tenant that follows the standard naming convention.

Suppose that we have a tenant with the following domain:

`auth.example.com`

Suppose that we want the following domain to map to `auth.example.com`:

```text
auth.site2.com
```

The custom domain has its own certificate, which is stored separately.

## Configuring Custom Domains

You may configure custom domains for your tenants via the [custom domains set-up area](/appliance/dashboard/tenants#custom-domains) of the [tenants page in the PSaaS Appliance configuration area](/appliance/dashboard/tenants).

## Custom Domains for PSaaS Appliance's Hosted in Auth0’s Private Cloud

If your PSaaS Appliance is hosted in Auth0’s private cloud, your domains will end in *auth0.com*. If you want to use a custom domain with your customer-facing applications, see [Information Requirements for Setting Up the PSaaS Appliance in Auth0's Private Cloud](/appliance/private-cloud-requirements).
