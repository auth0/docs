---
title: Architecture
description: Understand how Auth0 lets you create Auth0 tenants for one or more environments
toc: true
topics:
    - b2c
    - ciam
    - tenants
contentType: concept
useCase:
  - tenant-architecture
---

# Architecture

Understanding your application is key to understanding how Auth0 can be leveraged to meet your needs. From experience, our most successful customers start with a visualization of their proposed - or in many cases existing - architecture and use this as a basis for reference as they progress. Understanding where your application fits within your organization is also important; Auth0 [Accounts and Tenants](/getting-started/the-basics#account-and-tenants) form the basis for the grouping and structuring of Auth0 assets, and it may be that you’ll need to leverage an existing Auth0 deployment in order to integrate with Single Sign On ([SSO](/sso/current/introduction)), centralized user [Profile Management](/architecture-scenarios/implementation/b2c/b2c-profile-mgmt), consolidated billing, or the like.

<%= include('../_includes/_bp-sso-training.md') %>

## Design considerations

The value of investing time on the landscape of the architecture up-front is something that we have found pays dividends in the long run, and there are a number of things you will want to consider when looking at functionality and workflow:

* What should the URL look like when Auth0 needs to present a web page to a user?
* How can Auth0 be structured to support our SDLC (Software Development Lifecycle)?
* How can I ensure that my Auth0 Tenants are appropriately associated with my contract?
* What do I need to consider if there are other projects in my organization integrating with Auth0? Particularly projects that target their own, or a different domain of users (for example, applications that only employees will use)? 

### How your domains and user community impact architecture

Organizations often service more than one domain of user - customers, employees, and affiliates being the most frequently encountered, with typically little to no cross-over: employees, say, don’t use the same applications as customers and vice-versa. In some cases there can also be a need to partition further within a domain - separate groups of customers, say, who use different and unconnected products. Auth0 provides a way to segregate your users and the associated collateral, and [tenant provision](#tenant-provision) covers this in more detail. 

<%= include('../_includes/_bp-user-communities.md') %>

If you need to provision an independent tenant then you’ll also want to [associate this with your existing Auth0 account](#tenant-association), so that you can take full advantage of the benefits provided at your organization’s contracted subscription level.

::: panel Best Practice
Other groups within your organization may also be working with Auth0; it’s not uncommon for our customers to have disparate departments that serve different user communities. Identifying these will potentially influence your design choices, and doing so early could mitigate decisions that might prove costly later on.
:::

### How your development process impacts architecture

In addition, you’ll undoubtedly have an established set of processes and procedures as part of your Software Development Lifecycle (SDLC). So you’ll want to check out our [SDLC support](#sdlc-support) guidance regarding Auth0 Tenant provision in support of that too. 

### How the protocol you choose impacts architecture

For customer facing applications we typically see [OpenID Connect (OIDC)](/protocols/oidc) as being the most frequently used protocol. OIDC makes use of web based workflows with browser URLs that are presented to the user. Out-of-the-box, client facing URLs as part of Auth0 OIDC support are Auth0 branded, however we recommend using the Auth0 [custom domain](#custom-domains) capability to provide for consistent corporate identity and to also address potential user confidence concerns before they arise. 

## Tenant provision

Everything starts with an Auth0 tenant. This is where you will be configuring your use of Auth0, and the where Auth0 assets - such as [Applications](/applications), [Connections](/connections) and [user profiles](/architecture-scenarios/implementation/b2c/b2c-profile-mgmt) are defined, managed and stored. Access to an Auth0 tenant is performed via the Auth0 [Dashboard](/dashboard), and via the Dashboard you can also create additional, associated tenants; you’re allowed to create more than one Auth0 tenant so that you can structure your tenants in a way that will isolate different domains of users and also support your [Software Development Life Cycle](#sdlc-support) (SDLC).

::: warning
Tenant names cannot be changed, nor reused once deleted. So, make sure you're happy with your name(s) before you create your Auth0 tenants.
:::

Determining the level of isolation you require when it comes to your user domains is an important step, and together with your branding requirements will subsequently help you determine the number of Auth0 tenants that will be required in your production environment. As we recommend you create a full suite of [SDLC supporting tenants](#sdlc-support) for every Auth0 tenant you will run in a production environment, the number of Auth0 tenants you will need to manage can quickly grow. Therefore you should consider carefully before creating multiple Auth0 tenants for production, and should consult our guidance on [Branding](/architecture-scenarios/implementation/b2c/b2c-branding) before making your final decision. 

## Custom domains

<%= include('../_includes/_custom-domains.md') %>

## SDLC support

<%= include('../_includes/_sdlc-support.md') %>

## Tenant association

<%= include('../_includes/_tenant-association.md') %>

## Planning

To help you with planning your implementation, we've put together some [planning guidance](https://drive.google.com/a/auth0.com/file/d/1lQU-uPTfwEi58WJMKL2azUhZhvy9h1IU/view?usp=sharing) that details our recommended strategies.

## Keep reading

* [Provisioning](/architecture-scenarios/b2c/b2c-provisioning)
* [Authentication](/architecture-scenarios/b2c/b2c-authentication)
* [Branding](/architecture-scenarios/b2c/b2c-branding)
* [Deployment Automation](/architecture-scenarios/b2c/b2c-deployment)
* [Quality Assurance](/architecture-scenarios/b2c/b2c-qa)
* [Profile Management](/architecture-scenarios/b2c/b2c-profile-mgmt)
* [Authorization](/architecture-scenarios/b2c/b2c-authorization)
* [Logout](/architecture-scenarios/b2c/b2c-logout)
* [Operations](/architecture-scenarios/b2c/b2c-operations)
