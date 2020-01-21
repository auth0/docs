---
title: Monitor Applications
description: Learn how to monitor your own applications and perform  end-to-end testing using your own tests. 
topics:
  - monitoring
contentType:
  - how-to
useCase:
  - analyze-auth0-analytics
  - analyze-logs
  - integrate-analytics
  - synthetic-authentication
  - synthetic-transactions
---
# Monitor Applications

If you would like to monitor your own [application](/applications) or conduct end-to-end testing, you’ll need to set up your own tests. 

If you've extended Auth0 through [rules](/rules) or a [custom database connection](/connections/database/custom-db), you can build a synthetic transaction that exercises these capabilities using the [Resource Owner Password Grant](/api-auth/tutorials/password-grant). One way of doing this is to [Monitor Auth0 Using SCOM](/monitoring/guides/monitor-using-SCOM).

Auth0 recommends using an authentication flow that doesn't require a user interface such as the **Resource Owner Password Grant**. That way, you can use a monitoring tool that doesn't have to mimick the actions of a user. Many monitoring services exist with this capability including:

* [New Relic](http://newrelic.com)
* [Pingdom](http://pingdom.com)

Use one of these services to execute synthetic authentication requests. 

## Keep reading

* [Analytics Integrations](/analytics)
* [Check Auth0 Status](/monitoring/guides/check-status)
* [Check External Services Status](/monitoring/guides/check-external-services)
* [Monitor Auth0 Using System Center Operations Manager](/monitoring/guides/monitor-using-SCOM)
