---
title: Planning Your Consumer Identity and Access Management Integration
description: Why it's important to plan your Consumer Identity and Access Management Implementation prior to beginning the integration
toc: false
topics:
    - b2c
    - ciam
contentType: concept
useCase:
  - implementation
---
# Planning Your Business to Consumer Identity and Access Management Integration

In our experience, customers who establish clear objectives and align those objectives to requirements early on benefit the most from their integration with Auth0. Regardless of the project type, we recommend that you plan your project using a phased approach across multiple workstreams. In most cases, we see the most success with those adopting a three-phase project structure.

::: note
Identifying your primary objectives early on during the project will also help you focus on the specifics important to building out your solution. For instance, if your primary objective is to avoid disruption to end users, then you should not adopt a "big bang" approach when integrating with Auth0.
:::

The evidence we've collected suggests that customers who also adopt an iterative release process make better progress. For example, let's say that you have 3-4 applications you want to integrate with Auth0. Rather than integrating all at once and shipping only when that's done, you might consider completing the integration for one application before moving on to the next. This way, your teams can benefit from the experience of working with Auth0 and leverage this experience to help increase the velocity of each iteration.

::: warning
While adopting an iterative release process will improve your time to market when integrating multiple applications, there are additional considerations for you to review if you want to support [Single Sign-On (SSO)](/sso/current).
:::

In addition, there may be other groups within your organization who have worked with Auth0 and from whom you can go to for first-hand experience - it's not uncommon for us to work with different parts of the same company at different points in time. We may be able to help you identify these groups prior to the beginning of your project, which might help you as you structure your initial project plans.

## Phase 1

Phase 1 focuses on integrating your application(s) with Auth0. During phase 1 you’ll tackle the 10 key stages to Go-Live, across 3 key milestones, and, by tackling the main risk items, will address the most critical paths associated with integration. At the end of this phase you’ll have working implementation that can be taken into production - or at the very least be provided as part of an early adopter or Beta program. 

Phase 1 consists of a number of workstreams, with a number of topics in each. The workstreams, topics and the order in which you address each is important, so we recommend you follow the guidance prescribed. That’s not to say you can’t or shouldn’t tackle work in parallel: User Provisioning and User Authentication, for example, could be tackled independently and at the same time, and these could both be tackled in parallel with your Branding efforts. In the majority of successful integration cases we’ve also found that different teams tackle different streams, and that this can provide significant benefit: your design and development team(s) would typically tackle implementation whilst at the same time your branding team would tackle Auth0 asset customization thus reducing overall time to market.

The diagram below provides an overall view of the planning associated with Phase 1. By Milestone 1, you will have completed major work required to integrate an application, will have addressed the most significant risk items, and will also be able to provide demonstrable functionality to stakeholders. 

<img src="/media/articles/architecture-scenarios/b2c-project-plan-milestones.png" alt="B2C Project Plan Milestones" data-zoomable>

### Architecture

[Architecture](/architecture-scenarios/implementation/b2c/architecture) is the first workstream you will cover, with tenant provision being the precursor to all others. Other topics to address at this stage include: 

* [Tenant provision](/architecture-scenarios/implementation/b2c/architecture#tenant-provision)
* [Custom domains](/architecture-scenarios/implementation/b2c/architecture#custom-domains)
* [Software Development Life Cycle (SDLC) support](/architecture-scenarios/implementation/b2c/architecture#sdlc-support)
* [Tenant association](/architecture-scenarios/implementation/b2c/architecture#tenant-association)
    
### Provisioning

[User provisioning](/architecture-scenarios/implementation/b2c/user-provisioning) is the next workstream, and this can be done in parallel with [user authentication](#user-authentication). We've found that the most successful implementations address the following topics at this state during phase 1, however precisely what you tackle will depend on your specific requirements. For example, you may not need user migration, or you may already have an existing sign up mechanism that can be leveraged. The user provisioning workstream includes setting up:

* [Store user data](/architecture-scenarios/implementation/b2c/user-provisioning#store-user-data)
* [User migration](/architecture-scenarios/implementation/b2c/user-provisioning#user-migration)
* [User sign up](/architecture-scenarios/implementation/b2c/user-provisioning#user-signup)

::: panel Best Practice
The Auth0 Dashboard in conjunction with the [Delegated Administration Extension](/extensions/delegated-admin/v3) can be used out-of-the-box to provide for user provisioning and deprovisioning as described in this [Auth0 blog post](https://auth0.com/blog/delegated-admin-v2/). If you require more comprehensive deprovisioning functionality, for compliance reasons for example, then we recommend you do so in a later phase.
::: 

### Authentication

[Authentication](/architecture-scenarios/implementation/b2c/authentication) comes next and can be done in parallel with user provisioning. Topics to address at this point include:

* [Universal login](/architecture-scenarios/implementation/b2c/authentication#universal-login)
* [Username and password authentication](/architecture-scenarios/implementation/b2c/authentication#username-and-password-authentication)
* [Anomaly detection](/architecture-scenarios/implementation/b2c/authentication#anomaly-detection)
* [Application integration](/architecture-scenarios/implementation/b2c/authentication#application-integration)

### Branding

[Branding](/architecture-scenarios/implementation/b2c/branding) can be done in parallel with user provisioning and authentication. Topics to address at this point will include:

* [Universal Login page customization](/architecture-scenarios/implementation/b2c/branding#universal-login-and-login-pages)
* [Change Password page customization](/architecture-scenarios/implementation/b2c/branding#change-password-page-customization)
* [Error page customization](/architecture-scenarios/implementation/b2c/branding#error-page-customization)
* [Custom domain naming](/architecture-scenarios/implementation/b2c/branding#custom-domain-naming)
* [Email template customization](/architecture-scenarios/implementation/b2c/branding#email-template-customization)

From here on you’ll be working towards Milestone 2, and then on to Milestone 3 which will take you to production Go-Live. As you progress through the remaining workstreams and topics you can start to align your Auth0 tenants with your SDLC, and you’ll be steadily and progressively reducing risk as you go. You’ll also have the opportunity to demonstrate further functionality to stakeholders, which will also help you to garner feedback from the rest of the business:

### Automation

Up until now you’ve most likely been working with the one Auth0 development tenant created as part of provisioning. Auth0 tooling to automate deployment of assets will now allow you to utilize tenant provision for QA  in preparation for your testing effort, and also production - providing you with a stable environment which can be used for demonstration and evaluation. 

### Quality assurance

Quality assurance mechanism should now be employed to ensure any breakages due to defects or changes are detected early, and is where the Auth0 tenant provision for QA will be used. Topics to address here include:

* Unit testing
* Mock testing
* Integration testing

### Profile management

[Profile management](/architecture-scenarios/implementation/b2c/profile-mgmt) will address the most common cases for the changes users will want to make to their profiles. We've found the most successful implementations address the following topics at this point during Phase 1, however precisely what you tackle will depend on your specific requirements (for example, you won't need to provide for user metadata management if you're not using user metadata):

* [Managing metadata](/architecture-scenarios/implementation/b2c/user-profile-mgmt#metadata)
* [Resetting passwords](/architecture-scenarios/implementation/b2c/user-profile-mgmt#password-reset)
* [Verifying accounts](/architecture-scenarios/implementation/b2c/user-profile-mgmt#account-verification)
* [Blocking users](/architecture-scenarios/implementation/b2c/user-profile-mgmt#blocking-users)

### Authorization

[Authorization](/architecture-scenarios/implementation/b2c/authorization) is, for customers who have specific access control requirements, the next thing on the agenda, and the focus for Phase 1 will be centered on how custom [ID Token Claims](/architecture-scenarios/implementation/b2c/authorization#id-token-claims) can be leveraged to support this.

### User logout

At some stage users will want to log out of your system, and you'll need to decide exactly what this looks like. This is tackled in the [Logout](/architecture-scenarios/implementation/b2c/logout) workstream. Auth0 supports several variations when it comes to logout, giving you flexibility to choose what works best for your implementation.

### Operations

Operations can be addressed in parallel, though we'd recommend you setup your email provider early on as this will enable you to minimize disruption moving forward as well as allow you to quality test specific functionality not possible to do with out-of-the-box email provision. Topics to cover here will include:

* Email Provider Setup
* Monitoring
* Logging
* Firewall configuration
* Notifications

::: panel Go-Live!
Congratulations! Reaching this point you are read for Go-Live. If you've not already done so, you can align your Auth0 production tenant via deployment automation and run any final QA in preparation for production release. As you move forward you'll want to keep a watch for [Auth0 status notifications](/monitoring/guides/check-status) which may contain important information that could impact your tenant(s) and/or project(s).
:::

## Keep reading

* [Implementation Checklists](/architecture-scenarios/checklists)
* [Design Your Auth0 Implementation](/design)
* [Production Checks](/pre-deployment)
* [Services](/services)
