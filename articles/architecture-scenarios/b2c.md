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
contentType: concept
useCase:
  - invoke-api
  - secure-an-api
  - build-an-app
---

# Business to Consumer Identity and Access Management Scenarios

This scenario focuses on how to integrate Auth0 within a Consumer Identity and Access Management (CIAM) project. Auth0's  recommendations are based on real-world customer implementation experience, and we hope that the advice we provide helps you set your project up for success.

Customers implementing Auth0 for consumer-focused or B2C projects typically share a common set of goals and objectives. In the sections that follow, we focus on our experiences working with this shared set of expectations. We hope our experience can help you deliver your solution effectively.

::: note
The information provided is relevant to **all** project stakeholders. We recommend reading through this in its entirety at least once, even if you've already started your journey with Auth0.
:::

## Ways to integrate Auth0 and how to choose

There are many different ways Auth0 can be integrated into the CIAM project architecture. Auth0's flexibility comprehensively supports many different use cases. However, keep in mind that not every project requires 100% of the capabilities provided by Auth0.

![Diagram](#)

When you embark on your journey to integrate with Auth0, there are many things for you to consider. Knowing what, when, and how best to implement something will help you focus on completing the necessary tasks at the right time. To help you with this, we put together [planning guidance](/architecture-scenarios/implementation/b2c/planning) that details our recommended strategies.

Auth0 also provides helpful implementation planning [checklists](/architecture-scenarios/checklists) that you can use organize your implementation tasks. There are six checklists that cover the following implementation steps:

* Analyze
* Design
* Build
* Test
* Deploy
* Monitor

## Implementation overview

In the following sections, we provide recommendations and best practice suggestions. These will be offset appropriately, and any time you come across one of these panels, you should stop and consider the advice presented. We are presenting you a set of high-level guidance and best practice recommendations on an ad hoc basis.

::: note
You can find detailed guidance regarding specific functionality and use cases in our [documentation](/docs) or by speaking with a member of our [Professional Services team](/services).
:::

During first part of your implementation, you'll address some of the most critical aspects of integrating with Auth0. When done, you'll have a fully-functional implementation that can be used in your Production environment (or, at the very least, used as part of an early adopter or beta program). There are multiple workstreams that focus on a specific aspect of the integration. The order in which you carry out the workstreams is important, and we recommend that you follow the order provided. However, certain workstreams can be tackled in parallel; if that is the case, we mention such in the descriptions below.

### Tenant architecture

[Tenant architecture](/architecture-scenarios/implementation/b2c/tenant-architecture) is the first workstream you should complete. You will address:

* Software Development Life Cycle (SDLC) Tenant Provisioning
* Custom Domains
* Tenant Association
    
### User provisioning

After you've set up your tenant architecture, you're ready to tackle the [user provisioning](/architecture-scenarios/implementation/b2c/user-provisioning) steps. The user provisioning workstream may be completed simultaneously with the user authentication and the branding workstreams.

The user provisioning workstream includes setting up:

* User Sign Up
* User Migration

### User authentication

[User authentication](/architecture-scenarios/implementation/b2c/authentication) can be completed at the same time as the previous workstream, user provisioning, as well as the subsequent workstream, branding. In this workstream, you will cover:

* Universal Login
* Username and Password Authentication
* Application Integration
* Anomaly Detection

### Branding

The [branding](/architecture-scenarios/implementation/b2c/branding) workstream can be completed at the same time as the user provisioning and authentication workstreams. The branding workstream is typically handled by those who usually handle branding-related activities, and it includes:

* Universal Login Page Customization
* Change Password Page Customization
* Email Template Customization
* Error Page Customization
* Custom Domains

::: panel Phase 1 Milestone
At this point, you'll have sufficient functionality implemented that you can provide demos to key stakeholders.
:::

### Deployment automation

Up until this point, you'll have been working with a single development tenant, which you created as part of the SDLC provisioning in tenant architecture workstream. In this step, you'll add automation to aid in the deployment of assets. This means that you can use tenant provisioning for QA, reducing effort and eliminating transcription errors as changes are moved from one environment to another.

### Quality assurance

We recommend beginning the quality assurance process at this point to allow ample time to detect and fix any issues that may be present. In this step, you'll find the tenant provisioning for QA (implemented in the previous workstream) helpful.

Topics you'll address in this section include:

* Unit Testing
* Mock Testing
* Integration Testing

### User profile management

The [user profile management](/architecture-scenarios/implementation/b2c/user-profile-mgmt) workstream addresses how you can handle changes to the information contained in user profiles. We will show you how to handle:

* Resetting passwords
* Managing metadata
* Verifying accounts
* Blocking users

### User authorization

For customers who have specific access control requirements that need to be implemented, the [user authorization](/architecture-scenarios/implementation/b2c/user-authorization) workstream covers ID Tokens and ID Token Claims.

### User logout

In the [user logout](/architecture-scenarios/implementation/b2c/user-logout) workstream, you'll define how the user logout process looks for your integration. Auth0 offers multiple user logout options, so you have flexibility when it comes time to choose.

::: panel Phase 1 Milestone
Congratulations! At this point, you are nearing the point where you can go live with your Production integration. If you haven't already done so, you can begin provisioning your production tenant and setting up the automation to facilitate this process.
:::

### Operations

This is the final workstream that you need to complete before deploying to production. To be clear, this workstream can be completed at any time, though we recommend waiting until you've completed deployment automation at the very least. In this workstream, you'll cover:

* Monitoring
* Logging
* Email Provider Setup
* Firewall Configuration
* Notifications
