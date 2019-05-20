---
title: Operations
description: Understand operationalization of your Auth0 tenant environments
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
*	What should I be doing about Auth0 security bulletins related to the Auth0 service?
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

## Service status

The Auth0 [status dashboard](https://status.auth0.com/) together with the Auth0 [uptime dashboard](http://uptime.auth0.com/) shows current and past status of the Auth0 service in a human-readable format. If any monitoring alerts are triggered, and as a first step in troubleshooting, your operations staff should check the status dashboard to see if there is a current outage. The public cloud status page also provides a facility for subscribing to outage notifications, and we also recommend that you check the status of any 3rd party, [external services](/monitoring/guides/check-external-services) you depend on - such as Social Providers. Having this information handy can help quickly eliminate possible causes when troubleshooting an issue and should be at the top of a troubleshooting checklist for developers as well as the helpdesk staff.

::: panel Best Practice
Information on how to check the status of Auth0 as well as any dependent services such as Social Providers should be at the top of a troubleshooting checklist for both developers and helpdesk staff, and we recommend you subscribe via the Auth0 status page to set up notification of any status updates. 
:::

In the event of an outage to the public cloud service, Auth0 performs a Root Cause Analysis (RCA) and publishes the results on the [Auth0 status page](/support#auth0-status). Auth0 performs a thorough investigation after an outage - including a determination of root cause, as well as contributing factors and how to prevent the issue from occurring again - and as a result an RCA document can take a few weeks to be published.

## Notifications

There are several different types of notifications from Auth0 that you should watch for as they contain important information that could impact your tenant(s) and project.

::: note
Proactive security notifications and other operational announcements are sent by Auth0 to dashboard administrators. You should ensure that the people who need to receive such messages are dashboard administrators.
:::

### Dashboard notifications

From time to time, Auth0 may send an important announcement related to your tenant. These announcements about your service will be sent to your Auth0 dashboard and depending on the severity of the announcement, via email to the registered Auth0 Dashboard Admins. You should make a regular practice of logging in to the dashboard and checking the bell icon at the top for any important notices. In addition, you should review emails from Auth0 in a timely fashion as they may convey important information about changes or actions you need to take.

### Auth0 security bulletins

Auth0 regularly conducts a number of security-related tests, and if any issues are found will proactively identify and notify customers who need to make security-related changes. Due to the extensible nature of the Auth0 product however, it may not be possible for Auth0 to identify every impacted customer, so you should regularly check Auth0 [security bulletins](/docs/security/bulletins). You should make sure a security contact is listed in Support Center for your organization.

::: panel Best Practice
It is a best practice to check the Auth0 [Security Bulletins](/security/bulletins) page periodically and take the recommended action if you are impacted by any security bulletins.
:::

### Change log

Auth0 provides information on changes to the service in the Auth0 change log (https://auth0.com/changelog). You should make a regular practice of reviewing Auth0 change logs to be aware of changes. Support teams researching an issue may find it useful to review the change log to determine if recent changes might be related, especially if these are [breaking changes](docs/migrations). Development teams will also want to review the change logs to identify new features that may be beneficial.

## Logging

Auth0 provides extensive capability when it comes to the logging of events, and also in the scanning of logs in order to identify event anomalies (see https://auth0.com/docs/logs for further details). Standard log retention period for Auth0 logs is determined by subscription level with the shortest period being 2 days and the longest period being only 30 days. Leveraging Auth0 support for integrating with external logging services will allow you to retain log outside of this, and will also provide for log aggregation across your organization.  

::: panel Best Practice
You should leverage one of the Auth0 logs extensions to send log data to an external logs analytics service.  This will enable keeping data for longer periods of time and provide advanced analytics on the logs data.
:::

You should review the logs data [retention period](/logs#how-long-is-log-file-data-available-) for your subscription level, and implement a logs data export extension to send log data to an external logs analytics service. Development teams can use log files for troubleshooting and detecting intermittent errors that may be hard to find via QA tests. Security teams will probably want log data in case forensic data is ever needed. Exporting log files to services that provide comprehensive analytics can help you see patterns such as usage trends and anomaly detection triggers. 

### Rate limits and other errors

Auth0 provides a unique error code for errors reported when the [rate limit is exceeded](/policies/rate-limits#exceeding-the-rate-limit). You should set up automatic scanning of logs to check for rate limit errors so you can proactively address activity that hits rate limits before it causes too much trouble for your users. Auth0 also publishes error codes for other types of errors, and you will find it helpful to scan logs for [authentication errors](/libraries/error-messages) as well as errors from Auth0 Management API calls (Management API error codes are shown below each call in the [Management API Explorer](/api/management/v2)).

::: panel Best Practice
Calling the management API to retrieve user profile information from within a Rule is a common cause of rate limit errors because such API calls can execute for every login as well as periodic session checks.
:::

## Email provider setup

Auth0 sends [emails](/email) to users for events such as signup welcome, email validation, breached password and password reset events. You can customize the email templates for each type of event, and advanced customization of email handling is also possible. Auth0 provides a test email provider with limited capacity for basic testing but you must set up your own email provider for production use, and customization of email templates will not work until you have established your own provider. 

::: panel Best Practice
The default Auth0 email provider does not support sending production volumes of email or customization of email templates. You should therefore configure your own email provider before deploying to production.
:::

## Infrastructure

### Firewalls

If custom code executing in Auth0 (such as in a Rule, Hook or Custom DB scripts) will call a service inside your network, or if you configure an on-premise SMTP provider in Auth0, then you may need to configure your firewall to allow [inbound traffic from Auth0](/guides/ip-whitelist#inbound-calls). The IP addresses to allow through the firewall are specific to each region and are listed on the Rules, Hooks, Custom DB scripts and email provider configuration screens in your Auth0 dashboard (as described in [Whitelist IP Addresses](/guides/ip-whitelist)).

## Planning

To help you with planning your implementation, we've put together some [planning guidance](https://drive.google.com/a/auth0.com/file/d/1lQU-uPTfwEi58WJMKL2azUhZhvy9h1IU/view?usp=sharing) that details our recommended strategies.

## Keep reading

* [Architecture](/architecture-scenarios/implementation/b2c/b2c-architecture)
* [Provisioning](/architecture-scenarios/implementation/b2c/b2c-provisioning)
* [Authentication](/architecture-scenarios/implementation/b2c/b2c-authentication)
* [Branding](/architecture-scenarios/implementation/b2c/b2c-branding)
* [Deployment Automation](/architecture-scenarios/implementation/b2c/b2c-deployment)
* [Quality Assurance](/architecture-scenarios/implementation/b2c/b2c-qa)
* [Profile Management](/architecture-scenarios/implementation/b2c/b2c-profile-mgmt)
* [Authorization](/architecture-scenarios/implementation/b2c/b2c-authorization)
* [Logout](/architecture-scenarios/implementation/b2c/b2c-logout)
