---
section: appliance
title: Configure Webtask with Dedicated Domains
description: How to use dedicated domains with your PSaaS Appliance Webtask
toc: true
topics:
    - appliance
    - webtask
    - domains
contentType: 
    - concept
    - reference
    - how-to
useCase: appliance
applianceId: appliance50
sitemap: false
---
# PSaaS Appliance: Webtask with Dedicated Domains

In order to use extensions, such as the [Authorization Extension](/extensions/authorization-extension/v2), you will need to configure Webtasks on a dedicated domain in PSaaS Appliance environments. This enables you to safely use extensions in multi-tenant environments (the behavior is akin to that of the Auth0 Public Cloud Service).

::: note
If you are planning on using [Extensions](/appliance/extensions), you must implement Webtask dedicated domains.
:::

## Background

Auth0 Extensions provide extra functionality to the core Auth0 services (Auth0 Platform) using the Webtask extensibility platform. By running these extensions in Webtask, we ensure that the extensions do not impact the regular operations of the Auth0 tenant. 

The PSaaS Appliance is a multi-tenant platform, which means that you can host and run multiple tenants in the same environment. Each of your tenants has full functionality of the Auth0 Platform, including use of the different extensions provided by Auth0.

We found that extension developers needed what we call the **Full Trust mode** to improve the usability and functionality of the extensions they created. By enabling Full Trust mode, Webtask and extensions can create cookies and get increased control over the response sent to the browser.

However, Full Trust mode raises security-related implications. More specifically, we want to ensure that enabling Full Trust mode did not overstep the boundaries established by individual tenants when it came to Webtask and extensions. As such, we ask that customers create a new root domain for Webtask that allows each tenant to have a dedicated domain.

Essentially, this allows tenants to use extensions without providing access to cookies in the authentication domain.

## Requirements

For each environment (such as Development, Testing, or Production), you will need:

* A certificate for your Webtask dedicated domain
    * Dedicated and non-dedicated host names must be unique.
* A DNS zone for each domain to manage the name records of your tenants

### Sample Architecture

To clarify the requirements, let's look at a sample setup.

The following are applicable to your environment as it current exists:

* Your Production environment is accessible via `example.com`
* Your primary Auth0 tenant is `identity.example.com`
* Your current certificate is `identity.example.com` (or similar)

You plan to implement the following change:

* You want a Webtask dedicated domain configured to be `wt.example.com`

To implement your change, you'll need:

* A DNS zone for `wt.example.com`
* A certificate with the names of all your tenants *or* a wildcard certificate for `*.wt.example.com`

Once complete, you'll be able to use the following for all containers under your primary tenant:

```text
identity.wt.example.com/your-container-name
```

## Configuration

To configure Webtask on a dedicated domain, you will need to set up a DNS zone to host the name entries for *each* tenant. As with the authentication domain, the Webtask dedicated domain requires a valid certificate issued by a public certificate authority (CA). If you're not certain how many tenants you'll be hosting, we recommend using a wildcard certificate such as `*.your-webtask-dedicated-domain`.

This will give to each container a URL of the form:

```text
tenant-name.webtask-dedicated-domain/container-name
```

For example, let's say that your tenant name is `acme` and your Webtask dedicated domain is `wt.example.com`. If you create a container named `hello`, your Webtask URL will be `acme.wt.example.com/hello`.

Note that you can still use the original Webtask URL (for example, `webtask.example.com/api/run/acme/hello`). The primary difference is that, during runtime, the Webtask will remove any headers bearing cookies from the request.

## Frequently Asked Questions

**Can I use the same root domain for Auth0 and Webtask?**

No. Because the tenant name is used in the first part of the domains for the Auth0 tenant and Webtask tenants, the *root* domain must differ.

**Do I have to enable Webtask Dedicated Domains?**

Yes, if you are planning on using Extensions, you must implement Webtask dedicated domains.

**Can the Webtask tenant names differ from the one used by the Auth0 tenant?**

No. The Webtask tenant name has to be the same as the Auth0 tenant name.
