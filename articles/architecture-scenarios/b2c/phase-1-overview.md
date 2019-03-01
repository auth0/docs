---
title: Consumer Identity and Access Management Phase 1 - Overview
description: An overview of the steps involved with Phase 1 of a Consumer Identity and Access Management implementation
toc: false
topics:
    - b2c
    - ciam
contentType: concept
useCase:
  - implementation
---
# Consumer Identity and Access Management: Phase 1 Overview

During phase 1, you'll address some of the most critical aspects of integrating with Auth0. When done, you'll have a fully-functional implementation that can be used in your Production environment (or, at the very least, used as part of an early adopter or beta program).

Phase 1 consists of multiple workstreams, and each focuses on a specific aspect of the integration. The order in which you carry out the workstreams is important, and we recommend that you follow the order provided. However, certain workstreams can be tackled in parallel; if that is the case, we mention such in the descriptions below.

1. Tenant Architecture

    Tenant architecture is the first workstream you should complete. You will address:

    * Software Development Life Cycle (SDLC) Tenant Provisioning
    * Custom Domains
    * Tenant Association
    
2. User Provisioning

    After you've set up your tenant architecture, you're ready to tackle the User Provisioning steps. The User Provisioning workstream may be completed simultaneously with the User Authentication and the Customization workstreams.

    The User Provisioning workstream includes setting up:

    * User Sign Up
    * User Migration

3. User Authentication

    User Authentication can be completed at the same time as the previous workstream, User Provisioning, as well as the subsequent workstream, Customization. In this workstream, you will cover:

    * Universal Login
    * Username and Password Authentication
    * Application Integration
    * Anomaly Detection

4. Customization

    The Customization workstream can be completed at the same time as the User Provisioning and User Authentication workstreams. The Customization workstream is typically handled by those who usually handle branding-related activities, and it includes:

    * Universal Login Page Customization
    * Change Password Page Customization
    * Email Template Customization
    * Error Page Customization
    * Custom Domains

::: panel Phase 1 Milestone
At this point, you'll have sufficient functionality implemented that you can provide demos to key stakeholders.
:::

5. Deployment Automation

    Up until this point, you'll have been working with a single development tenant, which you created as part of the SDLC provisioning in workstream 1. In this step, you'll add automation to aid in the deployment of assets. This means that you can use tenant provisioning for QA, reducing effort and eliminating transcription errors as changes are moved from one environment to another.

6. Quality Assurance

    We recommend beginning the quality assurance process at this point to allow ample time to detect and fix any issues that may be present. In this step, you'll find the tenant provisioning for QA (implemented in the previous workstream) helpful.

    Topics you'll address in this section include:

    * Unit Testing
    * Mock Testing
    * Integration Testing

7. User Profile Management

    The User Profile Management workstream addresses how you can handle changes to the information contained in user profiles. We will show you how to handle:

    * Resetting passwords
    * Managing metadata
    * Verifying accounts
    * Blocking users

8. User Authorization

    For customers who have specific access control requirements that need to be implemented, the User Authorization workstream covers ID Tokens and ID Token Claims.

9. User Logout

    In this workstream, you'll define how the user logout process looks for your integration. Auth0 offers multiple user logout options, so you have flexibility when it comes time to choose.

::: panel Phase 1 Milestone
Congratulations! At this point, you are nearing the point where you can go live with your Production integration. If you haven't already done so, you can begin provisioning your production tenant and setting up the automation to facilitate this process.
:::

10. Operations

    This is the final workstream that you need to complete before deploying to production. To be clear, this workstream can be completed at any time, though we recommend waiting until you've completed workstream 5 (Deployment Automation) at the very least. In this workstream, you'll cover:

    Monitoring
    Logging
    Email Provider Setup
    Firewall Configuration
    Notifications