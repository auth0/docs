---
title: Operations
description: Operationalization of your Auth0 tenant environments
toc: true
topics:
    - b2c
    - ciam
    - tenants
    - operations
contentType: concept
useCase:
  - tenant-operations
---

# Operations

Operationalization requires configuring or setting up infrastructure to support the scalable, measurable and quantifiable operation that’s necessary for business continuity. In Auth0, this includes configuring supporting services such as email providers, monitoring services for your deployment, detecting anomalous situations and making preparations to recover quickly and smoothly when something goes wrong in a production environment. 

Establishing effective operational behaviors is something that successful customers have found pays dividends, and there are a number of things you will want to consider when looking at your workflow:

*	What should I be doing to proactively detect failures?
*	What do I need to know regarding how to obtain data on Auth0’s operational status?
*	What should I be doing about Auth0 security bulletins related to the Auth0 service
*	Does Auth0 provide information regarding impending changes in the Auth0 service?
*	How can I check for important notices from Auth0?
*	Where should I be doing about Auth0 log data so that I can analyze it and keep it for longer than Auth0’s limited data retention period?
*	Can I scan Auth0 logs to determine if peak loads in my application trigger any rate limits or other errors?
*	What email services should I be using use to support production volumes of email messages to users? Why can’t I use Auth0 out of box email provider in my production environment?
*	Why would I need to configure my firewall, and what firewall ports will I need to open for internal services that need to receive communications from Auth0 (such as custom databases, web services and email servers)?

Auth0 supports functionality for [monitoring](#monitoring) Auth0 service operation as well as providing information regarding Auth0 [service status](#service-status). In addition, Auth0 makes available security related bulletins as well as information regarding upcoming changes to the Auth0 service via various [notifications](#notifications). Auth0 [logging](#logging) services also provide extensive functionality for tracing and identifying operational anomalies, including restrictions encountered due to rate limiting and/or excessive loading.

Out-of-box, Auth0 provides email delivery services to help you accelerate your integration. These services however are not meant for scale of use in production environments, and do not provide for any specific service level or guarantee when it comes to email delivery. Our best practice recommendation which customers typically follow involves configuring your own email service provided as discussed in the guidance provided [here](#email-provider-setup).

You may also need to make changes to [infrastructure](#infrastructure) configuration in order to support integration with Auth0 and to support use of Auth0 extensibility. For example, if you need to provided call backs to your internal or even external infrastructure (e.g. if you need to make external API calls in Rules or Hooks, or via custom database scripts if you need to leverage existing legacy identity storage) then you may need to configure your Firewall settings.

## Monitoring

You should establish mechanisms for [monitoring Auth0 implementations](/monitoring) so your support or operations team receives the timely information needed to proactively handle service outages. Auth0 provides monitoring endpoints that can be incorporated into your monitoring infrastructure. These endpoints are designed to provide a response suitable for consumption by monitoring services. It should be noted that they only provide data on Auth0. For complete end-to-end monitoring, which is essential for checking the ability of users to log in, we recommend that you set up synthetic transaction monitoring. This will provide greater granularity for your monitoring and enable you to detect outages unrelated to Auth0 as well as degradation of performance, so you can respond more proactively.

::: panel Best Practice
You should set up the ability to send synthetic login transactions to facilitate end-to-end monitoring of authentication. You can do this with a simple application that uses the [Resource Owner Password Grant](/api-auth/tutorials/password-grant) in combination with a test user that has no privileges, and don’t forget about [Auth0 rate limiting policies](/policies/rate-limits) too. 
:::

## Service Status

The Auth0 status dashboard (https://status.auth0.com/) together with the Auth0 uptime dashboard (http://uptime.auth0.com/) shows current and past status of the Auth0 service in a human-readable format. If any monitoring alerts are triggered, and as a first step in troubleshooting, your operations staff should check the status dashboard to see if there is a current outage. The public cloud status page also provides a facility for subscribing to outage notifications, and we also recommend that you check the status of any 3rd party, [external services](/monitoring/guides/check-external-services) you depend on - such as Social Providers. Having this information handy can help quickly eliminate possible causes when troubleshooting an issue and should be at the top of a troubleshooting checklist for developers as well as the helpdesk staff.

::: panel Best Practice
Information on how to check the status of Auth0 as well as any dependent services such as Social Providers should be at the top of a troubleshooting checklist for both developers and helpdesk staff, and we recommend you subscribe via the Auth0 status page to set up notification of any status updates. 
:::

In the event of an outage to the public cloud service, Auth0 performs a Root Cause Analysis (RCA) and publishes the results on the [Auth0 status page](/support#auth0-status). Auth0 performs a thorough investigation after an outage - including a determination of root cause, as well as contributing factors and how to prevent the issue from occurring again - and as a result an RCA document can take a few weeks to be published.

## Notifications

There are several different types of notifications from Auth0 that you should watch for as they contain important information that could impact your tenant(s) and project.







Organizations often service more than one domain of user - customers, employees, and affiliates - being the most frequently encountered, and typically there’s little to no cross-over: employees, say,  don’t use the same applications as customers and vice-versa. In some cases there can also be a need to partition further within a domain - separate groups of customers, say, who use different and unconnected products. Auth0 provides a way to segregate your users and the associated collateral, and [tenant provision](#tenant-provision) covers this in more detail. If you need to provision an independent tenant then you’ll also want to [associate this with your existing Auth0 account](/dev-lifecycle/child-tenants), so that you can take full advantage of the benefits provided at your organization’s contracted subscription level.


In addition, you’ll undoubtedly have an established set of processes and procedures as part of your Software Development Lifecycle (SDLC), so you’ll want to check out our [SDLC support](#sdlc-support) guidance regarding Auth0 Tenant provision in support of that too. 

For customer facing applications we typically see [OpenID Connect (OIDC)](/protocols/oidc) as being the most frequently used protocol. OIDC makes use of web based workflows with browser URLs that are presented to the user. Out-of-the-box, client facing URLs as part of Auth0 OIDC support are Auth0 branded, however we recommend using the Auth0 custom domain capability to provide for consistent corporate identity and to also address potential user confidence concerns before they arise. 

::: panel Best Practice
Other groups within your organisation may also be working with Auth0; it’s not uncommon for our customers to have disparate departments that serve different user communities. Identifying these will potentially influence your design choices, and doing so early could mitigate decisions that might prove costly later on.
:::

## Tenant provision

Everything starts with an Auth0 tenant. This is where you will be configuring your use of Auth0, and the where Auth0 assets - such as [Applications](/applications), [Connections](/connections) and [User Profiles](articles/architecture-scenarios/implementation/b2c/b2c-profile-mgmt) are defined, managed and stored. Access to an Auth0 tenant is performed via the Auth0 [Dashboard](/dashboard), and via the Dashboard you can also create additional, associated tenants; you’re allowed to create more than one Auth0 tenant so that you can structure your tenants in a way that will isolate different domains of users and also support your [Software Development Life Cycle](#sdlc-support)(SDLC).

::: warning
Tenant names cannot be changed or reused once deleted. So, make sure you're happy with your name(s) before you create your Auth0 tenants.
:::

Determining the level of isolation you require when it comes to your user domains is an important step, and together with your branding requirements will subsequently help you determine the number of Auth0 tenants that will be required in your production environment. As we recommend you create a full suite of [SDLC supporting tenants](#sdlc-support) for every Auth0 tenant you will run in a production environment, the number of Auth0 tenants you will need to manage can quickly grow. Therefore you should consider carefully before creating multiple Auth0 tenants for production, and should consult our guidance on [Branding](/architecture-scenarios/implementation/b2c/b2c-branding) before making your final decision. 

## Custom domains

When you setup your Auth0 tenant, the URL for accessing that tenant will be of the form  `https://${account.tenant}.auth0.com`. Providing a custom domain, also known as a [vanity URL](/custom-domains), for your Auth0 tenant is not only an important factor for supporting your Branding requirements, but more importantly will also provide you with security benefits too:

* Some browsers will, by default, make it difficult to communicate in an iFrame if you don't have a shared domain (see [here](/api-auth/token-renewal-in-safari) for further information).
* It's harder to phish your domain if you have a vanity URL as the phisher must also create a vanity URL to mimic yours (see [here](https://auth0.com/blog/introducing-custom-domains-preview-with-auth0/) for further information). For example, with a custom domain, you can use your own certificate to get an "Extended Validation", making phishing even harder.

::: note
You are allowed only one custom domain per Auth0 Tenant. This is because a tenant in Auth0 is intended to represent a “domain” of users. If you need more than one vanity URL, then you likely have more than one domain of users and should be using multiple tenants.
:::

Your custom domain name should also give the user confidence that this is the appropriate place to enter their credentials, and we recommend that you create your custom domain in all environments early on to ensure that you are testing consistently between environments. **It's extremely important to train your users to to look for suspicious URLs when entering their credentials**

::: panel Best Practice
Create a custom domain (a.k.a. `CNAME`) for your Auth0 tenant, and also create one in development too so you can ensure you have managed the `CNAME` correctly. For example, youc could create a `CNAME` which maps `login.mycompany.com` to `mycompany-prod.auth0.com`.
:::

In almost all cases, customers have been most successful when adopting a strategy of a centralised domain for authentication across multiple product or service brands. This strategy provides users with a consistent UX, and also mitigates the complexity of deploying and maintaining multiple Auth0 tenants in a production environment. If you are considering having multiple domains for different brands, please refer to the [Branding](/architecture-scenarios/implementation/b2c/b2c-branding) guidance before you begin implementing.

## SDLC support

Every company has some form of software development life cycle, and throughout the development process you will want to align with that strategy. For instance, you we need to be able to test your integration with Auth0 in a similar fashion as you test the applications themselves. It is therefore important to [structure Auth0 tenants to support your SDLC](/dev-lifecycle/setting-up-env), and there is a consistent pattern which our customers typically follow when it comes to the best practices associated with tenant layout for doing so:

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

## Keep reading

* [Provisioning](/architecture-scenarios/implementation/b2c/b2c-provisioning)
* [Authentication](/architecture-scenarios/implementation/b2c/b2c-authentication)
* [Branding](/architecture-scenarios/implementation/b2c/b2c-branding)
* [Profile Management](/architecture-scenarios/implementation/b2c/b2c-profile-mgmt)
* [Authorization](/architecture-scenarios/implementation/b2c/b2c-authorization)
* [Logout](/architecture-scenarios/implementation/b2c/b2c-logout)

