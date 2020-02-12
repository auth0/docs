---
title: Check Auth0 Authentication and Supporting Services
description: Learn how check the status of the Auth0 authentication service as well as supporting services such as the Dashboard and documentation using the test and testall endpoints. 
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
# Check Auth0 Authentication and Supporting Services

::: warning
The `/test` and `/testall` endpoints are best for determining if everything is functioning but *not* for determining if something is down. They do not provide a complete status picture. 
:::

Use the `/test` and `/testall` endpoints as a supplement to your other monitoring. You should use synthetic transactions against a test account to ensure that everything is functional. You should also track your own logs and other metrics to calls to Auth0 from servers and/or clients.

## Test endpoint

The `/test` endpoint checks the status of the core Auth0 authentication service. 

Here is an example of a call to the `/test` endpoint:

```har
{
  "method": "GET",
  "url": "https://${account.namespace}/test"
}
```

If the service is up, the endpoint returns a `200` HTTP response code; if it is not, it returns a `5xx` response code. 

Additionally, this endpoint returns a JSON object:

```json
{
  "clock": 1417220191640
}
```

## Testall endpoint

The `/testall` endpoint checks the status of the core Auth0 authentication service, as well as supporting services such as those for the [Dashboard](${manage_url}) and documentation.

Here is an example call to the `/testall` endpoint:

```har
{
  "method": "GET",
  "url": "https://${account.namespace}/testall"
}
```

If all services are up, the endpoint returns the `200` HTTP response code and a simple text message of `OK`. If any service is down, it returns a `5xx` response code.

<%= include('../_includes/_monitor-private-cloud.md') %>

## Keep reading

* [Check Auth0 Status](/monitoring/guides/check-status)
* [Check External Services Status](/monitoring/guides/check-external-services)
* [Monitor Auth0 Using System Center Operations Manager](/monitoring/guides/monitor-using-SCOM)
* [Monitor Applications](/monitoring/guides/monitor-applications)
