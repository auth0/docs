---
title: Check Auth0 Authentication Service
description: Learn how check the status of the Auth0 authentication service as well as supporting services such as the Dashboard and documentation. 
topics:
  - monitoring
contentType:
  - how-to
useCase:
  - analyze-auth0-analytics
  - analyze-logs
  - integrate-analytics
---
# Check Auth0 Authentication Service

You can use the `/test` and `/testall` endpoints as a supplemental to monitoring. They are better for determining everything is functioning rather than determining if anything is down. However, even if it returns a `500`, it doesn’t mean that there’s a failure.

* **`/test` endpoint**: Checks the status of the core Auth0 authentication service
* **`/testall` endpoint**: Checks the status of the core Auth0 authentication service, as well as supporting services such as those for the [Dashboard](${manage_url}) and documentation.

## Test endpoint

Here is an example of a call to the `/test` endpoint**:

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

Here is an example call to the `/testall` endpoint:

```har
{
  "method": "GET",
  "url": "https://${account.namespace}/testall"
}
```

If all services are up, the endpoint returns the `200` HTTP response code and a simple text message of `OK`. If any service is down, it returns a `5xx` response code.

<%= include('../_includes/_monitor-appliance.md') %>

## Keep reading

* [Check Auth0 Status](/monitoring/guides/check-status)
* [Check External Services Status](/monitoring/guides/check-external-services)
* [Monitor Auth0 Using System Center Operations Manager](/monitoring/guides/monitor-using-scom)
* [Monitor Applications](/monitoring/guides/monitor-applications)
