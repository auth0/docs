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
---
# Monitor Applications

If you would like to monitor your own application or conduct end-to-end testing, you’ll need to set up your own tests. There are multiple services which allow doing this. One example is [Pingdom](https://www.pingdom.com/).

You can use one of these services to call the endpoints and to execute synthetic authentication requests, also described on that page. If you've extended Auth0 through [rules](/rules) or [a custom database connection](/connections/database/mysql), you can build a synthetic transaction that exercises these capabilities using the [Resource Owner Password Grant](/api-auth/tutorials/password-grant). One way of doing this is to [Monitor Auth0 Using SCOM](/monitoring/guides/monitor-using-SCOM).

Auth0 recommends using an authentication flow that doesn't require a user interface such as the **Resource Owner Password Grant**. That way you can use a monitoring tool that doesn't have to mimick the actions of a user. Many monitoring services exist with this capability including:

* [New Relic](http://newrelic.com)
* [Pingdom](http://pingdom.com)

Use one of these services to execute synthetic authentication requests or to call the following endpoints:

* **`test` endpoint:** checks the status of the core Auth0 authentication service
* **`testall` endpoint:** checks the status of the core Auth0 authentication service, as well as supporting services such as those for the [Dashboard](${manage_url}) and documentation.

## Test endpoint

The `test` endpoint checks the status of the core Auth0 authentication service. An example call:

```har
{
  "method": "GET",
  "url": "https://${account.namespace}/test"
}
```

If the service is up, the endpoint returns a `200` HTTP response code; if it is not, it returns a `5xx` response code. Additionally, this endpoint returns a JSON object:

```json
{
  "clock": 1417220191640
}
```

## Testall endpoint

The `/testall` endpoint checks the status of the core Auth0 authentication service, as well as supporting services such as those for the [Dashboard](${manage_url}) and documentation. An example call:

```har
{
  "method": "GET",
  "url": "https://${account.namespace}/testall"
}
```

If all services are up, the endpoint returns the `200` HTTP response code and a simple text message of `OK`. If any service is down, it returns a `5xx` response code.

<%= include('../_includes/_monitor-appliance.md') %>

## Keep reading

* [Analytics Integrations](/analytics/integrations)
* [Check Auth0 Status](/monitoring/guides/check-status)
* [Check External Services Status](/monitoring/guides/check-external-services)
* [Monitor Auth0 Using System Center Operations Manager](/monitoring/guides/monitor-using-scom)
