---
url: /support
toc: true
description: Explains the different types of support options provided by Auth0.
---
# Support Options

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

Auth0's public [question and answer community](${auth0_community}) offers support for __all__ subscribers. All customers, even those with free subscription plans, can search existing through questions and post a new question if theirs hasn't been answered. There are no guaranteed response times for questions posted.

### Support Center

In addition to the Auth0 Community, paid subscribers can create a private ticket via [Support Center](${env.DOMAIN_URL_SUPPORT}). All tenant administrators will be able to view and add comments to Support Center tickets. Support Center can be accessed by clicking on the **Get Support** link on the [dashboard](${manage_url}).

[Learn more about creating tickets with Support Center](/support/tickets)

Critical Production issues should always be reported via the [Support Center](https://support.auth0.com/) for fastest response.

#### Add Support-Only Users

You can support-only users to your Auth0 tenant. This will allow them to open, view, and comment on Support Center tickets, receive relevant notifications, and see service details.  They do not, however, have full administration access to the Auth0 Dashboard.

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

## Ticket Response Times

Ticket response times will vary based on your support plan (shown below).  Note that customers on non-paying trial or free subscriptions are not eligible for a support plan and should utilize the [Auth0 Community](${auth0_community}).

<table class="table">
  <thead>
    <tr>
      <th></th>
      <th>Standard Support</th>
      <th>Enterprise Support</th>
      <th>Preferred Support</th>
    </tr>
  </thead>
  <tbody>
     <tr>
      <th>Subscription Plan</th>
      <td>Developer, Developer Pro. Legacy plans: Gold, Silver and Home Grown</td>
      <td>Enterprise</td>
      <td>Enterprise with Preferred Support Option</td>
    </tr>
    <tr>
      <th><a href="#support-hours">Support Hours</a></th>
      <td>Standard: 24 hours per day, Monday - Friday</td>
      <td>Standard: 24 hours per day, Monday - Friday / Critical Outage: 24 Hours Per Day, 7 days per week, 365 days per year</td>
      <td>Standard: 24 hours per day, Monday - Friday / Critical Outage: 24 Hours Per Day, 7 days per week, 365 days per year</td>
    </tr>
    <tr>
      <th>First Response Time Target</th>
      <td>2 Business Days</td>
      <td>Standard: 3 business hours / Critical Outage: 1 hour</td>
      <td>Standard: 1 business hour / Critical Outage: 1 hour</td>
    </tr>
    <tr>
      <th>Subsequent Response Time Target</th>
      <td>Standard: 2 business days</td>
      <td>Standard: 1 business day / Critical Outage: ongoing within support hours</td>
      <td>Standard: 4 business hours / Critical Outage: ongoing within support hours</td>
    </tr>
    <tr>
      <th>Ticket Response Channels</th>
      <td class="warning">Support Center</td>
      <td class="success">Support Center, chat, web conference</td>
      <td class="success">Support Center, chat, web conference</td>
    </tr>
    <tr>
      <th><a href="/onboarding/sprint#sprint-benefits-by-support-plan">Onboarding Experience</a></th>
      <td>Self-service in app and email</td>
      <td>Sprint</td>
      <td>Sprint Preferred</td>
    </tr>
    <tr>
      <th><a href="/onboarding/sprint#what-happens-after-the-sprint-program-finishes-">Ongoing Customer Success Engagement</a> </th>
      <td>Not Included</td>
      <td>Customer Success Team </td>
      <td>Allocated Customer Success Manager</td>
    </tr>
  </tbody>
</table>

### Support Hours

Auth0's Business Hours are as follows:

**Standard Business Hours**
Monday, 6:00 am CST/UTC+8 hours - Friday, 6:00 pm PDT/UTC-7 hours | 24/5 coverage during this period

**Critical Support Hours**
Standard Support: 24/5 | Enterprise and Preferred Support: 24/7/365

Every effort will be made to respond sooner than the times listed above. However, some types of problems such as development issues that require us to install software to duplicate a problem, may take time due to the research and work required.  Response times may also be delayed during periods of heavy ticket volume.

If you have specific support requirements or are interested in the __Enterprise Support__ or __Preferred Support__ option, please [contact sales](https://auth0.com/?contact=true).

## Ticket Severity

Standard: Defined as an Auth0 issue impacting your live or in-production systems or your ability to progress to production where:

- Business processes and functions are degraded;
- A group or groups of users are impacted;
- There is a reasonable workaround;
- Application is not yet in live, production status.

Critical: Defined as an Auth0 issue severely impacting your live or in-production systems where:

- Major business processes and functions are stopped for all or most users;
- Majority of users are significantly impacted, for example: unable to log in;
- There is no workaround;
- Application is in live, production status.

Critical Production issues should always be reported via the [Support Center](https://support.auth0.com/) for fastest response.

### Legacy Subscription Plan Mapping

- Subscriptions previously known as "Free" map to the current "Free" support classification
- Subscriptions previously known as "Gold/Silver/Home Grown"  map to the current "Standard" support plan.
- Customers that have Developer or Developer Pro subscriptions map to the current "Standard" support plan.
- Support plans previously known as "Enterprise" and "Premium" support map to the current "Enterprise" support plan.
- The "Preferred" support plan is a new plan available for purchase as of October 2016.

### Support Languages

We provide all technical support in English, but we will make an effort to accommodate other languages if possible.

## Pricing

For pricing information on Auth0's subscription plans, please see [Pricing Page] or your [Account Settings](${manage_url}/#/account/billing/subscription).

## Additional Support Resources

### Auth0 Status
The [Auth0 status page](https://status.auth0.com) contains information on current production status and will be updated during an outage.  After an outage, a root-cause analysis is performed and made available via the page.

Please check the [status page](https://status.auth0.com) before filing a ticket.  If the status page contains a notification about an outage, our team will already be working on restoring service as quickly as possible.  Once the issue is resolved, the status page will be updated to reflect that.  There is a button on the page to subscribe to notifications of any changes.  A root-cause analysis will be published to the status page once an investigation has been done.

### Whitehat Support Tickets

All customers, even those with free subscription plans, may report security concerns via [Auth0 Whitehat](https://auth0.com/whitehat).
