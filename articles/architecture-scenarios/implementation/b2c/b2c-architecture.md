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

::: panel Best Practice
If you do have multiple applications, and you need to leverage SSO, then we recommend you check out our [How to Implement Single Sign On](https://auth0.com/learn/how-to-implement-single-sign-on/) training guidance before continuing.
:::

The value of investing time on the landscape of the architecture up-front is something that we have found pays dividends in the long run, and there are a number of things you will want to consider when looking at functionality and workflow:

* What should the URL look like when Auth0 needs to present a web page to a user?
* How can Auth0 be structured to support our SDLC (Software Development Lifecycle)?
* How can I ensure that my Auth0 Tenants are appropriately associated with my contract?
* What do I need to consider if there are other projects in my organization integrating with Auth0? Particularly projects that target their own, or a different domain of users (for example, applications that only employees will use)? 

Organizations often service more than one domain of user - customers, employees, and affiliates being the most frequently encountered, with typically little to no cross-over: employees, say, don’t use the same applications as customers and vice-versa. In some cases there can also be a need to partition further within a domain - separate groups of customers, say, who use different and unconnected products. Auth0 provides a way to segregate your users and the associated collateral, and [tenant provision](#tenant-provision) covers this in more detail. If you need to provision an independent tenant then you’ll also want to [associate this with your existing Auth0 account](#tenant-association), so that you can take full advantage of the benefits provided at your organization’s contracted subscription level.

::: panel Best Practice
It’s not uncommon for companies to have identity requirements that address multiple user communities: customers, partners, employees, etc. So be sure to consider other projects or future requirements when designing your architecture.
:::

In addition, you’ll undoubtedly have an established set of processes and procedures as part of your Software Development Lifecycle (SDLC). So you’ll want to check out our [SDLC support](#sdlc-support) guidance regarding Auth0 Tenant provision in support of that too. 

For customer facing applications we typically see [OpenID Connect (OIDC)](/protocols/oidc) as being the most frequently used protocol. OIDC makes use of web based workflows with browser URLs that are presented to the user. Out-of-the-box, client facing URLs as part of Auth0 OIDC support are Auth0 branded, however we recommend using the Auth0 [custom domain](#custom-domains) capability to provide for consistent corporate identity and to also address potential user confidence concerns before they arise. 

::: panel Best Practice
Other groups within your organisation may also be working with Auth0; it’s not uncommon for our customers to have disparate departments that serve different user communities. Identifying these will potentially influence your design choices, and doing so early could mitigate decisions that might prove costly later on.
:::

## Tenant provision

Everything starts with an Auth0 tenant. This is where you will be configuring your use of Auth0, and the where Auth0 assets - such as [Applications](/applications), [Connections](/connections) and [user profiles](/architecture-scenarios/implementation/b2c/b2c-profile-mgmt) are defined, managed and stored. Access to an Auth0 tenant is performed via the Auth0 [Dashboard](/dashboard), and via the Dashboard you can also create additional, associated tenants; you’re allowed to create more than one Auth0 tenant so that you can structure your tenants in a way that will isolate different domains of users and also support your [Software Development Life Cycle](#sdlc-support) (SDLC).

::: warning
Tenant names cannot be changed, nor reused once deleted. So, make sure you're happy with your name(s) before you create your Auth0 tenants.
:::

Determining the level of isolation you require when it comes to your user domains is an important step, and together with your branding requirements will subsequently help you determine the number of Auth0 tenants that will be required in your production environment. As we recommend you create a full suite of [SDLC supporting tenants](#sdlc-support) for every Auth0 tenant you will run in a production environment, the number of Auth0 tenants you will need to manage can quickly grow. Therefore you should consider carefully before creating multiple Auth0 tenants for production, and should consult our guidance on [Branding](/architecture-scenarios/implementation/b2c/b2c-branding) before making your final decision. 

## Custom domains

When you setup your Auth0 tenant, the URL for accessing that tenant will be of the form  `https://${account.tenant}.auth0.com`. Providing a [Custom Domain](/custom-domains) (also known as a vanity URL), for your Auth0 tenant is not only an important factor for supporting your Branding requirements, but more importantly will also provide you with security benefits too:

* Some browsers will, by default, make it [difficult to communicate in an iFrame if you don't have a shared domain](/api-auth/token-renewal-in-safari).
* It's [harder to phish your domain if you have a vanity URL](https://auth0.com/blog/introducing-custom-domains-preview-with-auth0/), as the phisher must also create a vanity URL to mimic yours. For example, with a custom domain you can use your own certificate to get an "Extended Validation", making phishing even harder.

::: note
You are allowed only one custom domain per Auth0 Tenant. This is because a tenant in Auth0 is intended to represent a “domain” of users. If you need more than one vanity URL, then you likely have more than one domain of users and should be using multiple tenants.
:::

Your custom domain name should also give the user confidence that this is the appropriate place to enter their credentials, and we recommend that you create your custom domain in all environments early on to ensure that you are testing consistently between environments. **It's extremely important to train your users to to look for suspicious URLs when entering their credentials!**

::: panel Best Practice
Create a custom domain (a.k.a. `CNAME`) for your Auth0 tenant, and also create one in development too so you can ensure you have managed the `CNAME` correctly. For example, you could create a `CNAME` which maps `login.mycompany.com` to `mycompany-prod.auth0.com`.
:::

In almost all cases, customers have been most successful when adopting a strategy of a centralised domain for authentication across multiple product or service brands. This strategy provides users with a consistent UX, and also mitigates the complexity of deploying and maintaining multiple Auth0 tenants in a production environment. If you are considering having multiple domains for different brands, please refer to the [Branding](/architecture-scenarios/implementation/b2c/b2c-branding) guidance before you begin implementing.

## SDLC support

Every company has some form of Software Development Life Cycle (SDLC), and throughout the development process you will want to align with that strategy. For instance, you need to be able to test your integration with Auth0 in a similar fashion as you test the applications themselves. It is therefore important to [structure Auth0 tenants to support your SDLC](/dev-lifecycle/setting-up-env), and there is a consistent pattern which our customers typically follow when it comes to the best practices associated with tenant layout for doing so:

| Environment | Sample Tenant Name | Description |
| - | - | - |
| Development | **company-dev** | A shared environment where most of your development work occurs |
| QA/Testing | **company-qa** or **company-uat** | An environment for formal testing of the changes you've made |
| Production | **company-prod** | The production tenant |

In some cases you may also want to create one or more sandboxes (e.g., **company-sandbox1**, **company-sandbox2**) so that you can test changes without compromising your development environment. This might be where you test deployment scripts and the like.

::: panel Best Practice
You can also take advantage of our [Implementation Checklists](/architecture-scenarios/checklists) that you can download and customize to meet your implementation project needs.
:::

::: warning
Though Auth0 allows you to create as many free tenants as you'd like, you may be limited for the number of tenants where all paid features are enabled. By default, you are provided with **three** tenants where all features are available.
:::

## Tenant association

To ensure that your [tenants are all associated with your Auth0 contractual agreement](/dev-lifecycle/child-tenants) and have the same features, ensure all your tenants are associated with your company account. If you have individual developers that want to create their own sandboxes for testing, make sure they get associated with your account so they have the same permissions too. To do this you should contact your Auth0 representative or the Auth0 Support Center at ${env.DOMAIN_URL_SUPPORT}.

## Planning

To help you with planning your implementation, we've put together some [planning guidance](https://drive.google.com/a/auth0.com/file/d/1lQU-uPTfwEi58WJMKL2azUhZhvy9h1IU/view?usp=sharing) that details our recommended strategies.

## Keep reading

* [Provisioning](/architecture-scenarios/implementation/b2c/b2c-provisioning)
* [Authentication](/architecture-scenarios/implementation/b2c/b2c-authentication)
* [Branding](/architecture-scenarios/implementation/b2c/b2c-branding)
* [Deployment Automation](/architecture-scenarios/implementation/b2c/b2c-deployment)
* [Quality Assurance](/architecture-scenarios/implementation/b2c/b2c-qa)
* [Profile Management](/architecture-scenarios/implementation/b2c/b2c-profile-mgmt)
* [Authorization](/architecture-scenarios/implementation/b2c/b2c-authorization)
* [Logout](/architecture-scenarios/implementation/b2c/b2c-logout)
* [Operations](/architecture-scenarios/implementation/b2c/b2c-operations)
