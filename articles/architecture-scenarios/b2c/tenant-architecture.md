---
title: Consumer Identity and Access Management Tenant Architecture
description: Learn how to create Auth0 tenants for one or more environments
toc: true
topics:
    - b2c
    - ciam
    - tenants
contentType: concept
useCase:
  - tenant-architecture
---
# Tenant Architecture

Everything at Auth0 begins with the creation of a tenant. The tenant is where you will configure everything related to your use of Auth0.

You can (and are encouraged to) create more than one tenant. In addition to using different tenants for different environments (for example, you can have a tenant for development and a tenant for production), you can use different tenants to isolate your user domains (determining which user domains you'll need is an important step of the tenant architecture process).

::: warning
Tenant names cannot be changed or reused (even if the original tenant has been deleted). Make sure that you are happy with your names before you set up the tenants.
:::

## Design considerations

When you begin the process of designing your tenant architecture, consider the following questions:

1. What should the URL be when the Authorization Server (Auth0) presents a page to the user? You tenant name is part of the URL, and as part of Phase 1, you may be setting up [custom domains](#custom-domains).

1. How will you support the Software Development Life Cycle? Do you have development, QA, and production environments, with each needing its own tenant? Do you have an additional staging environment, or are you working with a minimalist setup featuring just development and production environments?

1. Are there any other projects that might impact your Auth0 integration? For example, if there are future projects in the pipeline, consider your setup carefully to minimize the likelihood that you'll have to migrate your existing tenant to another at that time.

1. How do you make sure that all of your tenants are appropriately associated with your Auth0 contract? Auth0 has a [set of procedures](#associating-tenants) for you to follow if you want all of your tenants associated with each other.

## Custom domains

When you set up your tenant, the URL to access that tenant will be `https://YOUR_TENANT_NAME.auth0.com` where `YOUR_TENANT_NAME` is the name of your tenant. 

::: note
You can create one custom domain for each tenant. If you need to use more than one domain name, please see [Customization](#).
:::

However, you can implement a [custom domain](/custom-domains) for your tenant (which is the authorization server). This is more than a branding task -- it also provides you with security benefits:

1. You'll find it easier to facilitate communications within an iFrame, which some browsers [make difficult to do](/api-auth/token-renewal-in-safari) if you have a shared domain name

1. It's [hard for malicious parties to phish](https://auth0.com/blog/introducing-custom-domains-preview-with-auth0/) using your domain with a custom URL. If you have a custom URL, the phisher must also create a custom URL to match yours.

1. It will be easier for your users to recognize suspicious URLs whenever they need to enter passwords.

Create a custom domain in all of your environments early on in the implementation process to make sure that you are testing consistently between the environments. Your custom domain should give your users confidence that the site they're on is the one where they should be entering their credentials.

### Best practice for custom domains

We recommend creating similar domain and tenant names for your associated tenants. For example, let's say that your production tenant uses `example.com`. Your development environment would therefore use `example-dev.com`.

We also recommend creating CNAME records for your Auth0 tenants to make sure that everything is begin managed correctly (e.g., `login.example.com` does go to `example-prod.auth0.com`).

## Support the Software Development Life Cycle with tenants

To help support each stage of your company's Software Development Life Cycle, you'll want to structure your tenants appropriately. This makes it simpler to test as you build your Auth0 integration and to move changes from one environment to another when appropriate.

::: panel TL;DR
Create separate Auth0 tenants for use with your development, staging/QA, and production environments.
:::

Generally speaking, we recommend creating the the following environments and corresponding tenants:

| Environment | Sample Tenant Name | Description |
| - | - | - |
| Development | **company-dev** | A shared environment where most of your development work occurs |
| QA/Testing | **company-qa** or **company-uat** | An environment for formal testing of the changes you've made |
| Production | **company-prod** | The production tenant |

You may also want to create one or more sandboxes (e.g., **company-sandbox1**, **company-sandbox2**) so that you can test changes without compromising your development environment. This might be where you test deployment scripts and the like.

::: warning
Though Auth0 allows you to create as many free tenants as you'd like, you can only have **three** tenants with paid features enabled.
:::

### Associating tenants

To make sure that all of the [tenants](dev-lifecycle/child-tenants) you create are associated with your Auth0 contractual agreement and have the same feature set, you'll need to associate your tenants with your company. This includes any sandboxes your developers create for testing purposes.