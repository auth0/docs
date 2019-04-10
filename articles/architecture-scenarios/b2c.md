---
order: 04
title: Business to Consumer Identity and Access Management Scenarios
image: /media/articles/architecture-scenarios/b2c.png
extract: Usually eCommerce or SAAS applications which have end users (consumers) as customers and the application typically used OpenID Connect as a protocol to communicate with Auth0.
description: Explains the architecture scenario B2C IAM with an eCommerce or SAAS application.
topics:
    - b2c
    - architecture
    - db-connections
    - passwordless
    - saml
    - CIAM
    - SDLC
contentType: concept
useCase:
  - invoke-api
  - secure-an-api
  - build-an-app
  - implementation
---

# Business to Consumer Identity and Access Management Scenarios

This scenario focuses on how to integrate Auth0 within a Consumer Identity and Access Management (CIAM) project. Auth0's recommendations are based on real-world customer implementation experience and by following the guidance provided, you will set up your project for success.

Customers using Auth0 for consumer-focused, also know as Business-to-Consumer (B2C),  projects typically share a common set of goals and objectives, and in the sections that follow, we'll focus on our experiences working with this shared set of expectations to help you deliver your solution efficiently.

::: note
The information provided is relevant to **all** project stakeholders. We recommend reading through this guidance in its entirety at least once, even if you've already started your journey with Auth0.
:::

## Ways to integrate Auth0 and how to choose

There are many different ways Auth0 can be integrated into the CIAM project architecture. Auth0's flexibility comprehensively supports many different use cases, however keep in mind that not every project requires 100% of the capabilities provided by Auth0.

When you embark on your journey to integrate with Auth0, there are many things for you to consider. Knowing what, when, and how best to implement something will help you focus on completing the necessary tasks at the right time. To help you with this, we've put together some [planning guidance](/architecture-scenarios/implementation/b2c/planning) that details our recommended strategies.

Auth0 also provides helpful implementation planning [checklists](/architecture-scenarios/checklists) that you can use organize your implementation tasks. There are six checklists that cover the following implementation steps:

* Analyze
* Design
* Build
* Test
* Deploy
* Monitor

In the following sections, we've provided recommendations and best practice suggestions, and any time you come across a panel similar to the one below, you should stop and consider the advice presented. These provide you with a set of high-level guidance and best practice recommendations, presented in on an *ad hoc* way.

::: note
You can find detailed guidance regarding specific functionality and use cases in our documentation or by speaking with your account representative or a member of our [Professional Services team](/services) here at Auth0.
:::

## Implementation overview

Phase 1 focuses on integrating your application(s) with Auth0. During phase 1 you’ll tackle the 10 key stages to Go-Live, across 3 key milestones, and, by tackling the main risk items, will address the most critical paths associated with integration. At the end of this phase you’ll have working implementation that can be taken into production - or at the very least be provided as part of an early adopter or Beta program. 

Phase 1 consists of a number of workstreams, with a number of topics in each. The workstreams, topics and the order in which you address each is important, so we recommend you follow the guidance prescribed. That’s not to say you can’t or shouldn’t tackle work in parallel: User Provisioning and User Authentication, for example, could be tackled independently and at the same time, and these could both be tackled in parallel with your Branding efforts. In the majority of successful integration cases we’ve also found that different teams tackle different streams, and that this can provide significant benefit: your design and development team(s) would typically tackle implementation whilst at the same time your branding team would tackle Auth0 asset customization thus reducing overall time to market.

The diagram below provides an overall view of the planning associated with Phase 1. By Milestone 1, you will have completed major work required to integrate an application, will have addressed the most significant risk items, and will also be able to provide demonstrable functionality to stakeholders. 

<img src="/media/articles/architecture-scenarios/b2c-project-plan-milestones.png" alt="B2C Project Plan Milestones" data-zoomable>

### Architecture

[Architecture](/architecture-scenarios/implementation/b2c/tenant-architecture) is the first workstream you will cover, with tenant provision being the precursor to all others. Other topics to address at this stage include: 

* Custom domains
* Tenant association
* Support for the Software Development Life Cycle (SDLC)
    
### User provisioning

[User provisioning](/architecture-scenarios/implementation/b2c/user-provisioning) is the next workstream, and this can be done in parallel with [user authentication](#user-authentication). We've found that the most successful implementations address the following topics at this state during phase 1, however precisely what you tackle will depend on your specific requirements. For example, you may not need user migration, or you may already have an existing sign up mechanism that can be leveraged. 

The user provisioning workstream includes setting up:

* User migration
* User sign up

::: panel Best Practice
The Auth0 Dashboard in conjunction with the [Delegated Administration Extension](/extensions/delegated-admin/v3) can be used out-of-the-box to provide for user provisioning and deprovisioning as described in this [Auth0 blog post](https://auth0.com/blog/delegated-admin-v2/). If you require more comprehensive deprovisioning functionality, for compliance reasons for example, then we recommend you do so in a later phase.
::: 

### Authentication

[Authentication](/architecture-scenarios/implementation/b2c/authentication) comes next and can be done in parallel with user provisioning. Topics to address at this point include:

* Universal login
* Username and password authentication
* Application integration

### Branding

[Branding](/architecture-scenarios/implementation/b2c/branding) can be done in parallel with user provisioning and authentication. Topics to address at this point will include:

* Universal Login page customization
* Naming for your custom domain
* Change Password page customization
* Error Page Customization
* Email template customization

From here on you’ll be working towards Milestone 2, and then on to Milestone 3 which will take you to production Go-Live. As you progress through the remaining workstreams and topics you can start to align your Auth0 tenants with your SDLC, and you’ll be steadily and progressively reducing risk as you go. You’ll also have the opportunity to demonstrate further functionality to stakeholders, which will also help you to garner feedback from the rest of the business:

### Automation

Up ‘till now you’ll most likely have been working with the one Auth0 development tenant created as part of provisioning. Auth0 tooling to automate deployment of assets will now allow you to utilize tenant provision for QA  in preparation for your testing effort, and also production - providing you with a stable environment which can be used for demonstration and evaluation. 

### Quality assurance

Quality assurance mechanism should now be employed to ensure any breakages due to defects or changes are detected early, and is where the Auth0 tenant provision for QA will be used. Topics to address here include:

* Unit testing
* Mock testing
* Integration testing

### User profile management

[User profile management](/architecture-scenarios/implementation/b2c/user-profile-mgmt) will address the most common cases for the changes users will want to make to their profiles. We've found the most successful implementations address the following topics at this point during Phase 1, however precisely what you tackle will depend on your specific requirements (for example, you won't need to provide for user metadata management if you're not using user metadata):

* Managing metadata
* Resetting passwords
* Verifying accounts
* Blocking users

### User Authorization

[User Authorization](/architecture-scenarios/implementation/b2c/user-authorization) is, for customers who have specific access control requirements, the next thing on the agenda, and the focus for Phase 1 will be centered on how custom ID Token Claims can be leveraged to support this.

### Logout

At some stage users will want to log out of your system, and you'll need to decide exactly what this looks like. This is tackled in the In the [Logout](/architecture-scenarios/implementation/b2c/logout) workstream. Auth0 supports several variations when it comes to logout, giving you flexibility to choose what works best for your implementation.

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
