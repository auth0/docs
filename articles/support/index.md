---
url: /support
toc: true
description: Explains the different types of support options provided by Auth0.
topics:
    - support
contentType:
   - index
   - concept
   - reference
useCase:
  - support
---
# Support options

Auth0 provides a variety of support plans to match your needs.

## Support plans

Auth0 offers the following support plans:

<table class="table">
  <tbody>
    <tr>
      <th>No Plan</th>
      <td>If you have Auth0's free subscription plan, you can seek support through the [Auth0 Community](${auth0_community}).</td>
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
    </tr>
      <th>Premier Success Support</th>
      <td>For customers with any subscription plan that have added the Premier Success option. 
  </tbody>
</table>

### No plan
If you do not have a support plan subscription, you have access to the Auth0 Community and documentation. Response times may vary and are not guaranteed.

:::panel Trial subscriptions
New Auth0 customers receive Standard Support during the 22-day trial period. Customers may check on how many trial days they have left by logging into the [Dashboard](${manage_url}).

At the end of the trial period, customers who have not opted to purchase a paid subscription can use the [Auth0 Community](${auth0_community}) for assistance. They will no longer be able to access or open tickets in the [Support Center](https://support.auth0.com/).
:::

### Standard support

If you have a paid Auth0 subscription plan, you receive Standard Support, which offers access to the following channels:

* Auth0 Community
* Auth0 Support Center

The Auth0 Support Center offers ticketed support where support specialists are available to provide assistance.

### Enterprise and Preferred support

If you have an Enterprise subscription plan, you receive extended support hours for outages, quicker response times, and Auth0 Sprint onboarding assistance.

Please contact the [Auth0 Sales Team](https://auth0.com/?contact=true) if you have specific support requirements or are interested in the Enterprise Support Plan (with or without the Preferred Support option).

### Premier Success support

You can add a Premier Success support option to your subscription. With that option, all your inquiries are funneled to a dedicated team of support engineers who understand your use cases, projects, and plans. Your Premier Support Team will be able to quickly investigate and ultimately resolve your issues sooner. Your support plan will also include: 

* Weekly operations reviews with a dedicated Customer Success Manager
* Issue tracking dashboard
* 24x7 phone support

[Learn more about services available with Premier Success](/services/premier-success).  

## Support channels

Auth0 offers the following support channels.

### Auth0 Community

Auth0's public [question and answer community](${auth0_community}) offers support for __all__ subscribers. All customers, even those on free tenants, can search existing through questions and post a new question if theirs hasn't been answered. There are no guaranteed response times for questions posted.

### Auth0 Support Center

In addition to the Auth0 Community, paid subscribers can create a private ticket via [Support Center](${env.DOMAIN_URL_SUPPORT}). All tenant administrators will be able to view and add comments to Support Center tickets. Support Center can be accessed by clicking on the **Get Support** link on the [dashboard](${manage_url}).

[Learn more about creating tickets with Support Center](/support/tickets)

Critical Production issues should always be reported via the [Support Center](https://support.auth0.com/) for fastest response.

#### Add support-only users

You can add support-only users to your Auth0 tenant. This will allow them to open, view, and comment on [Support Center](${env.DOMAIN_URL_SUPPORT}) tickets, receive relevant notifications, and see service details.  They do not, however, have full administration access to the [Auth0 Dashboard](${manage_url}).

You can add support-only users via the Support Center. Click on your name in the top right, and click **Support Center Users**.

![](/media/articles/support/support-center-users.png)

If this is the first time you've used this feature or there are no support-only users, you'll be redirected immediately to a screen that allows you to invite users.

![](/media/articles/support/invite-users.png)

Provide the user's email address, select the Auth0 service to which they should have support access, and click **Send Invitation**. Auth0 will then send the user an email inviting them to register for and log into the Support Center.

Administrative accounts will be able to see details about support-only accounts.

![](/media/articles/support/manage-users.png)

Using this page, you can:

* Search for users
* See the account details for users
* Revoke privileges

## Support Program features

The Support Program applies to **production instances** of the Auth0 Platform only. If you require support for non-production instances, then you may request [Demand Services](#demand-services) from Auth0.

Your sales order will indicate whether you are subscribed to the **Standard** Support Program or the **Enterprise** Support Program. The features of each program are as follows:

| Support Feature | Standard | Enterprise/Preferred | With Premier Success |
| - | - | - | - |
| Answer questions concerning usage issues related to Auth0 Platform specific features, options and configurations | Yes | Yes | Yes |
| Provide initial and high-level suggestions regarding the appropriate usage, features, or solution configurations for the particular type of reporting, analysis, or functionality | Yes | Yes | Yes |
| Isolate, document, and find alternative solutions for reported Defects | Yes | Yes | Yes |
| Work with Auth0 Operations, Product, Software Development, and QA staff to submit Change Requests, Enhancement Requests, and provide Fixes for the Auth0 Platform as necessary | Yes | Yes | Yes |
| Address your concerns with documentation, providing additional examples or explanation for concepts requiring clarification | Yes | Yes | Yes |
| Access to online release notes for updates | Yes | Yes | Yes |
| Access to Auth0’s online library of webinars and knowledgebase | Yes | Yes | Yes |
| Access to Auth0’s Customer Community forums to collaborate with fellow Auth0 customers | Yes | Yes | Yes |
| Enhanced response times | No | Yes | Yes |
| Enhanced hours of support | No | Yes | Yes |
| Weekly operations reviews | No | No | Yes |
| Issue tracking dashboard | No | No | Yes |

## Defect resolution process

Auth0 will assign all defects one of four response priorities, depending on the problems caused by the defect. Auth0 may re-assign prioritization levels assigned by you in Auth0’s trouble ticketing system to reflect the problem descriptions below:

<table class="table">
  <thead>
    <tr>
      <th style="width: 15%">Severity level</th>
      <th style="width: 85%">Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>1 (Urgent)</td>
      <td><b>Emergency Issue</b>. Defect resulting in full or partial system outage or a condition that makes the Auth0 Platform unusable or unavailable in production for all of your Users.</td>
    </tr>
    <tr>
      <td>2 (High)</td>
      <td><b>Significant Business Impact</b>. Defect resulting in a condition where major functionality is impacted or significant performance degradation is experienced; issue is persistent and affects many Users and/or major functionality.</td>
    </tr>
    <tr>
      <td>3 (Normal)</td>
      <td><b>Minor Feature / Function Issue / General Question</b>. Defect results in a component of the Auth0 Platform not performing as expected or documented <b>or</b> an inquiry by your representatives regarding general technical issues/questions</td>
    </tr>
    <tr>
      <td>4 (Low)</td>
      <td><b>Minor Problem / Enhancement Request</b>. Information requested on Auth0 Platform capabilities, navigation, installation, or configuration; enhancement request.</td>
    </tr>
  </tbody>
</table>

### Defect responses

The priority of a defect will dictate the timing and nature of the response as specified in the table below:

| Defect severity level | Standard target response time | Standard with Premier target response time | Enterprise target response time | Enterprise with Premier target response time | Preferred target response time | Preferred with Premier target response time |
| --- | **Standard** | **w/Premier** | **Enterprise** | **w/Premier** | **Preferred** | **w/Premier** |
| **1 (Urgent)** | 1 business hour<br>24x7x365 | 1 business hour<br>24x7x365 | 30 minutes<br>24x7x365 | 30 minutes<br>24x7x365 | 30 minutes<br>24x7x365 | 30 minutes<br>24x7x365 |
| **2 (High)** | 4 business hours<br>24x5 | 4 business hours<br>24x7x365 | 2 hours<br>24x5 | 2 hours<br>24x7x365 | 1 hour<br>24x5 | 1 hour<br>24x7x365 |
| **3 (Normal)** | 1 business day<br>24x5 | 1 business day<br>24x7x365 | 12 hours<br>24x5 | 12 hours<br>24x7x365 | 1 hour<br>24x5 | 1 hour<br>24x7x365 |
| **4 (Low)** | 2 business days<br>24x5 | 2 business days<br>24x7x365 | 24 hours<br>24x5 | 24 hours<24x7x365 | 12 hours<br>24x5 | 12 hours<br>24x7x365 |

For severity level 1, 2, and 3 defects, the a solution will be defined to include one or more of the following:

* Issue resolved
* Workaround provided
* Fix provided
* Fix incorporated into future release

For severity level 4 defects, the solution will be defined to include one or more of the following:

* Answer to question provided
* Enhancement request logged

## Support hours

Auth0 provides support for severity level 1 defects on a 24x7x365 basis.

For all other defects, Auth0 provides support during the hours specified below:

| Standard | Enterprise/Preferred | w/Preferred |
| - | - | - |
| 6AM to 6PM (your local time) Monday through Friday | 24 hours a day, Monday through Friday | 24x7x365 |

## Support languages

We provide all technical support in English, but we will make an effort to accommodate other languages if possible.

## Upgrades

During the subscription term, Auth0 provides or installs updates if and when they are commercially available at no additional cost to you.

## Demand services

You may request assistance from Auth0 for services that are outside the scope of the support program.  Auth0 makes resources available for mutually agreeable time periods to provide such assistance.  Auth0 invoices you, and you pay for these services (“Demand Services”) at Auth0’s applicable rates, or such other rates as may be agreed in writing between Auth0 and you, plus any applicable expenses.

## Pricing

For pricing information on Auth0's subscription plans, please see [Pricing Page](https://auth0.com/pricing) or your [Tenant Settings](${manage_url}/#/tenant/billing/subscription).

## Auth0 status
The [Auth0 status page](https://status.auth0.com) contains information on current production status and will be updated during an outage.  After an outage, a root-cause analysis is performed and made available via the page.

Please check the [status page](https://status.auth0.com) before filing a ticket.  If the status page contains a notification about an outage, our team will already be working on restoring service as quickly as possible.  Once the issue is resolved, the status page will be updated to reflect that.  There is a button on the page to subscribe to notifications of any changes.  A root-cause analysis will be published to the status page once an investigation has been done.

## Whitehat support tickets

All customers, even those with free subscription plans, may report security concerns via [Auth0 Whitehat](https://auth0.com/whitehat).

[Additional Details](https://auth0.com/legal)
