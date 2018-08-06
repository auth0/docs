---
sitemap: false
section: appliance
description: Outlines additional support procedure information for enterprise subscription customers with an Auth0 PSaaS Appliance.
topics:
    - appliance
    - support
contentType: 
    - how-to
    - concept
useCase: appliance
applianceId: appliance54
---

# Critical Support Issue Guidance for Appliance Customers

This document outlines additional support procedure information for enterprise subscription customers with an PSaaS Appliance and shoud be read in conjunction with the general [Enterprise Support Guidance document](/onboarding/enterprise-support).

PSaaS Appliance customers must have [Enterprise Support](/onboarding/enterprise-support#premium-enterprise-support) as a minimum. Refer to your subscription agreement to confirm if other custom support or SLA coverage has been included.

Below are special procedures PSaaS Appliance customers should follow for Critical Support Issues.  All other information as outlined in the [Enterprise Support Guidance document](/onboarding/enterprise-support) is still valid and should be followed.

## What is a Critical Issue

A Critical Issue is defined as an Auth0 issue severely impacting your live or in-production systems where:

- major business processes and functions are severely impaired or stopped;
- the majority of users are adversely impacted;
- there is no workaround

::: note
Please do *not* submit an Urgent ticket for non-production environments. Urgent (critical) tickets are reserved for production environments.
:::

## Special procedures for critical issues impacting production applications for PSaaS Appliance customers

PSaaS Appliance customers should use the [Auth0 Support Center](${env.DOMAIN_URL_SUPPORT}) as a primary method of logging a critical support issue. As part of the onboarding procedure a cloud account should be created that gives administrators the possibility to log in to Support Center and create new tickets. Set the ticket severity to **Urgent** if you need an immediate response.

::: note
Using Support Center requires a cloud account setup. If you are unsure about this, please try logging in at the [Auth0 Support Center](${env.DOMAIN_URL_SUPPORT}) or check with your Auth0 Customer Success Manager.
:::

As a secondary point of escalation, PSaaS Appliance customers can also send an email to `productionoutage@auth0.com` to log a critical support issue. *Note that this should only be a secondary escalation point, as a ticket created in Support Center provides a more reliable way to identify the customer having the problem and interact with the user.*

### To log a critical support issue in Support Center

1. Go to the [Auth0 Support Center](${env.DOMAIN_URL_SUPPORT}) and log in with your credentials.
2. Click on the [New Ticket](${env.DOMAIN_URL_SUPPORT}/tickets/new) button.
3. Select the affected service. **Note that even if you only see your cloud account, you will be getting support for your PSaaS Appliance installation.**
4. For **Environment**, select your Production environment.
5. For **What can we help you with?** select `Auth0 Service Issue`.
6. For **Severity** select `Urgent`
  ::: note
  If you don't select `Urgent`, the issue will not be treated as critical. You will not be able to change the severity of the ticket once it is created so if, for example, you set Severity to `High` but later realize that the situation is critical, you need to create a new ticket with `Severity` set to Urgent.
  :::
7. Complete an appropriate **Subject** title.
8. Describe the problem as completely as possible. *The more information you can provide about the issue you are having, the better we can provide quick and valuable support.*

### Information to provide when logging an issue by email

To speed resolution, please provide the following when logging an issue via email (in addition to other information listed in the [Enterprise Support Guidance document](/onboarding/enterprise-support)):

* Your Company Name and specific project name (some customers have more than one instance of Auth0)
* Your contact details and the contact details of relevant colleagues such as IT operations staff, including email address and phone numbers with relevant country and area codes.

### What to expect

When an issue has been logged correctly:

* it will be acknowledged immediately by email and assigned a ticket ID number. Additional information may be requested.
* A responding Auth0 support staff member may contact you via email and/or direct you to join a private Slack channel and/or a Zoom web conference to facilitate faster communications.  However, it’s important to remember you should not initiate requests for help via a Slack channel - only via the methods outlined above. Slack channels may not be actively monitored.
* In addition to communications over a web conference or Slack, to preserve a record of an issue, any critical information, such as log files, symptoms, and so on should be sent as updates to the ticket via support center.  Any conclusions or next steps should be added to the ticket as well.
* Upon resolution of the issue, an Auth0 support staff member will ask the customer for confirmation the issue has been resolved to their satisfaction and the ticket will be closed only when customer has responded and confirmed issue is resolved.
