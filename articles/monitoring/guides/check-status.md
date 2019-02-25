---
title: Check Auth0 Status
description: Learn how to check Auth0 public cloud service availability, incident reports, and historical uptime reports. 
topics:
  - monitoring
contentType:
  - how-to
useCase:
  - analyze-auth0-analytics
  - analyze-logs
  - integrate-analytics
---

# Check Auth0 Status

Auth0 makes every effort to minimize outages, but if there is any disruption to service, it will appear on the [Auth0 Status](https://status.auth0.com) page. To support requirements for root cause analysis documentation after a disruption, Auth0 conducts internal analysis and publishes the results of the disruption notice. If there's an outage listed on the status page, you do not need to file a ticket. Auth0 is already working on the issue. 

## Check status

Go to [Auth0 Status](https://status.auth0.com) to check the service availability of the cloud version of Auth0. 

You can see the status of a region or expand a region and see the status of individual services supporting functionality such as the authentication API or execution of custom code (used within custom DB connections and rules).

## Subscribe to status updates

* On the [Auth0 Status](https://status.auth0.com) page, click **Subscribe to Updates** to get updates for specific regions and services to tailor the notices you receive. 

* Follow [@auth0status](https://twitter.com/auth0status) on Twitter to get the latest status updates.

* Subscribe to the Auth0 Atom feed to get status updates that affect your tenant.

   `status.auth0.com/feed?domain={YOUR-TENANT}.auth0.com`

## Historical uptime reports

Current and historical Auth0 uptime reports are available at [Auth0 Uptime](http://uptime.auth0.com).

## Keep reading

* [Check External Services Status](/monitoring/guides/check-external-services)
* [Check Auth0 Authentication and Supporting Services](/monitoring/guides/test-testall-endpoints)
* [Monitor Auth0 Using System Center Operations Manager](/monitoring/guides/monitor-using-SCOM)
* [Monitor Applications](/monitoring/guides/monitor-applications)
* [Troubleshooting](/troubleshoot)
* [Support Options](/support)
