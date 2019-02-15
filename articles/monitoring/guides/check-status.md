---
title: Check Auth0 Status
description: Learn how to check the public cloud version of Auth0 service availability, incident reports, and historical uptime reports. 
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

Auth0 makes every effort to minimize outages, but if there is any disruption to service, it will appear on the status page. To support requirements for root cause analysis documentation after a disruption, Auth0 conducts internal analysis and publishes the results on the disruption notice when the analysis is completed.

In addition, you may want to set up monitoring of any remote identity providers you use with your Auth0 connections. This will help you quickly isolate the source of the problem if one of them goes down. An additional best practice to consider is setting up synthetic transactions that test the end-to-end login experience.

Last but not least your customers may have some of the same concerns, so you may want to document any monitoring pages or endpoints they can look at to help them troubleshoot and narrow down the location of an issue.

## Check status

Go to the [Auth0 Status](https://status.auth0.com) page to check the service availability of the cloud version of Auth0. 

You can see the status of a region or click to expand a region and see the status of individual services such as the authentication API or execution of custom code (used within custom DB connections and rules).

## Subscribe to status updates

* Click **Subscribe to Updates** to get updates for specific regions and services to tailor the notices you receive. 

* Follow Auth0 on Twitter (@auth0status) to get the latest status updates.

* Subscribe to the Atom feed to get status updates that affect your tenant.
`status.auth0.com/feed?domain={YOUR-TENANT}.auth0.com`

## Incident reports

The Auth0 DevOps team uses [Auth0 Status](https://status.auth0.com) for reports on current incidents.

## Historical uptime reports

Current and historical uptime is available at [Auth0 Uptime](http://uptime.auth0.com).

## Keep reading

* [Check External Services Status](/monitoring/guides/check-external-services)
* [Monitor Auth0 Using System Center Operations Manager](/monitoring/guides/monitor-using-scom)
* [Monitor Applications](/monitoring/guides/monitor-applications)
