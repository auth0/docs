---
url: /support
toc: true
description: Explains the different types of support options provided by Auth0.
---
# Support Options

The following page contains information about the Auth0 support program.

## Support Options Overview

Auth0 offers the following support plans:

<table class="table">
  <tr>
    <th>No Plan</th>
    <td>Customers with Auth0's free subscription plan can seek support through the Auth0 Community.</td>
  </tr>
  <tr>
    <th>Standard Support</th>
    <td>For customers with a paid (non-Enterprise) subscription plan or those in the initial trial period.</td>
  </tr>
  <tr>
    <th>Enterprise Support</th>
    <td>For customers with an Enterprise subscription plan.</td>
  </tr>
  <tr>
    <th>Preferred Support</th>
    <td>For customers with an Enterprise subscription plan that have added the Preferred Support option.</td>
  </tr>
</table>

### No Support

Customers with Auth0's free subscription plan can seek support through the [Auth0 Community](${auth0_community}). Response times may vary and are not guaranteed.

:::panel Trial Subscriptions
New Auth0 customers receive Standard Support during the 22-day trial period (customers may check on how many trial days they have left by logging into the [Dashboard](${manage_url})).

At the end of the trial period, customers who have not opted to purchase a paid subscription can use the [Auth0 Community](${auth0_community}) for assistance. They will no longer be able to access or open tickets in the [Support Center](https://support.auth0.com/).
:::

### Standard Support

Customers with a paid Auth0 subscription plan receive Standard Support, which offers access to the following channels:

* Auth0 Community;
* Auth0 Support Center.

The Auth0 Support Center offers ticketed support, where support specialists are available to provide assistance.

### Enterprise Support (with or without Preferred Support)

Customers with an Enterprise subscription plan receive extended support hours for outages, quicker response times, and Auth0 Sprint onboarding assistance.

Please contact the [Auth0 Sales Team](https://auth0.com/?contact=true) if you have specific support requirements or are interested in the Enterprise Support Plan (with or without the Preferred Support option).

## Support Channels

Auth0 offers the following support channels.

### Auth0 Community

Auth0's public [question and answer community](${auth0_community}) offers support for __all__ subscribers. All customers, even those on free tenants, can search existing through questions and post a new question if theirs hasn't been answered. There are no guaranteed response times for questions posted.

### Support Center

In addition to the Auth0 Community, paid subscribers can create a private ticket via [Support Center](${env.DOMAIN_URL_SUPPORT}). All tenant administrators will be able to view and add comments to Support Center tickets. Support Center can be accessed by clicking on the **Get Support** link on the [dashboard](${manage_url}).

[Learn more about creating tickets with Support Center](/support/tickets)

Critical Production issues should always be reported via the [Support Center](https://support.auth0.com/) for fastest response.

#### Add Support-Only Users

You can add support-only users to your Auth0 tenant. This will allow them to open, view, and comment on [Support Center](${env.DOMAIN_URL_SUPPORT}) tickets, receive relevant notifications, and see service details.  They do not, however, have full administration access to the [Auth0 Dashboard](${manage_url}).

You can add support-only users via the Support Center. Click on your name in the top right, and click **Support Center Users**.

![](/media/articles/support/support-center-users.png)

If this is the first time you've used this feature or there are no support-only users, you'll be redirected immediately to a screen that allows you to invite users.

![](/media/articles/support/invite-users.png)

Provide the user's email address, select the Auth0 service to which they should have support access, and click **Send Invitation**. Auth0 will then send the user an email inviting them to register for and log into the Support Center.

Administrative accounts will be able to see details about support-only accounts.

![](/media/articles/support/manage-users.png)

Using this page, you can:

* Search for users;
* See the account details for users;
* Revoke privileges.

## Definitions

For the purposes of this Support Program description, the following capitalized words and phrases are ascribed the following meanings:

**“Defect”** means a failure of the Auth0 Platform, in the form provided or modified by Auth0, to conform to its applicable specifications set forth in the Documentation. A Defect includes a failure of one or more components of the environment or infrastructure provided by Auth0 or AWS to perform in accordance with their applicable documentation or specifications.

**“Demand Services”** has the meaning ascribed to it in Section 7 below.

**“Fix”** means a modification or an addition to the Auth0 Platform that overcomes a Defect when made or added to the Auth0 Platform. Auth0 may provide a Workaround in lieu of a Fix in Auth0’s sole discretion, but will provide a Fix to you as specified in Section 3.2 below.

**“Response Time”** means, for purposes of this Support Program description, the time between Auth0’s receipt of a Defect notification from you, and Auth0’s confirmation via one of its personnel that Auth0 is working on resolution of the Defect. (While your submission of a trouble ticket may trigger an automated response from Auth0, automated responses are disregarded for purposes of determining Response Times.)

**“Update”** means a patch, correction, or other modification or addition to the Auth0 Platform that Auth0 makes generally available to you for maintenance fixes, Defect corrections, and minor improvements to the Auth0 Platform, including fixes, patches, updates and releases to address any security vulnerabilities. “Update” also includes significant enhancements, or new features or functionalities that Auth0 makes generally available to you.  

**“Workaround”** means a set of procedures that you may follow to circumvent or mitigate the impact of a Defect, notwithstanding that the Defect still exists.

## Program Features

The Support Program applies to **production instances** of the Auth0 Platform only. If you require support for non-production instances, then you may request [Demand Services](#demand-services) from Auth0.

Your Sales Order will indicate whether you are subscribed to the **Standard** Support Program or the **Enterprise** Support Program. The features of each program are as follows:

| Support Feature | Standard | Enterprise |
| - | - | - |
| Answer questions concerning usage issues related to Auth0 Platform specific features, options and configurations | Yes | Yes |
| Provide initial and high-level suggestions regarding the appropriate usage, features, or solution configurations for the particular type of reporting, analysis, or functionality | Yes | Yes |
| Isolate, document, and find alternative solutions for reported Defects. | Yes | Yes |
| Work with Auth0 Operations, Product, Software Development, and QA staff to submit Change Requests, Enhancement Requests, and provide Fixes for the Auth0 Platform as necessary. | Yes | Yes |
| Address your concerns with online or printed documentation, providing additional examples or explanation for concepts requiring clarification. | Yes | Yes |
| Access to online release notes for Updates. | Yes | Yes |
| Access to Auth0’s online library of Support webinars and knowledgebase | Yes | Yes |
| Access to Auth0’s Customer Community forums to collaborate with fellow Auth0 customers. | Yes | Yes |
| Enhanced Response Times | No | Yes |
| Enhanced Hours of Support | No | Yes |

## Defect Resolution Procedures

Auth0 will assign all Defects one of four response priorities, dependent upon the problems caused by the Defect. Auth0 may re-assign prioritization levels assigned by you in Auth0’s trouble ticketing system, to reflect the problem descriptions below. Auth0’s assignment will be consistent with the problem descriptions described below. Priority categories are as follows:

| Severity Level | Description |
| - | - |
| 1 (Urgent) | **Emergency Issue**. Defect resulting in full or partial system outage or a condition that makes the Auth0 Platform unusable or unavailable in production for all of your Users. |
| 2 (High) | **Significant Business Impact**. Defect resulting in a condition where major functionality is impacted or significant performance degradation is experienced; issue is persistent and affects many Users and/or major functionality. |
| 3 (Normal) | **Minor Feature / Function Issue / General Question**. Defect results in a component of the Auth0 Platform not performing as expected or documented **or** an inquiry by your representatives regarding general technical issues/questions |
| 4 (Low) | **Minor Problem / Enhancement Request**. Information requested on Auth0 Platform capabilities, navigation, installation, or configuration; enhancement request. |

### Defect Responses

The priority of a Defect will dictate the timing and nature of the response as specified in the table below:

| Defect Severity Level | Target Response Time (Standard) | Target Response Time (Enterprise) | Solution Definition (one or more of the following) |
| - | - | - | - |
| 1 (Urgent) | 1 business hours | 30 minutes | Issue is resolved. Workaround is provided. Fix is provided. Fix incorporated into future release. |
| 2 (High) | 4 business hours | 2 hours | Issue is resolved. Workaround is provided. Fix is provided. Fix incorporated into future release. |
| 3 (Normal) | 1 business day | 12 hours | Issue is resolved. Workaround is provided. Fix incorporated into future release. Answer to question is provided. |
| 4 (Low) | 2 business days | 24 hours | Answer to question is provided. Enhancement request logged. |

## Program Hours

Auth0 will provide support for Severity Level 1 Defects on a 24x7x365 basis.

For all other defects, Auth0 will provide support during the hours specified below:

| Standard | Enterprise |
| - | - |
| 6AM to 6PM (your local time) Monday to Friday | 24 hours a day, Monday to Friday (your local time) |

## Support Languages

We provide all technical support in English, but we will make an effort to accommodate other languages if possible.

## Upgrades

During the Subscription Term, Auth0 will provide or install Updates if and when they are made generally commercially available by Auth0 to its customers, at no additional cost to you. 

## Demand Services

You may from time to time request assistance from Auth0 for services that are outside the scope of the Support Program.  Auth0 will make resources available for mutual agreeable time periods to provide such assistance.  Auth0 will invoice you, and you will pay for these services (“Demand Services”) at Auth0’s then applicable rates, or such other rates as may be agreed in writing between Auth0 and you, plus any applicable expenses.

## Pricing

For pricing information on Auth0's subscription plans, please see [Pricing Page](https://auth0.com/pricing) or your [Tenant Settings](${manage_url}/#/tenant/billing/subscription).

## Auth0 Status
The [Auth0 status page](https://status.auth0.com) contains information on current production status and will be updated during an outage.  After an outage, a root-cause analysis is performed and made available via the page.

Please check the [status page](https://status.auth0.com) before filing a ticket.  If the status page contains a notification about an outage, our team will already be working on restoring service as quickly as possible.  Once the issue is resolved, the status page will be updated to reflect that.  There is a button on the page to subscribe to notifications of any changes.  A root-cause analysis will be published to the status page once an investigation has been done.

## Whitehat Support Tickets

All customers, even those with free subscription plans, may report security concerns via [Auth0 Whitehat](https://auth0.com/whitehat).
