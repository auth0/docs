---
title: Monitor application
description: Learn how to monitor your applications 
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
Auth0 is a critical dependency of your application and/or service. Monitoring Auth0's health can be important as it allows you to report specific errors to your customers and/or take mitigating actions in case of an issue with Auth0.

You can monitor Auth0 using many approaches, each of them complementary with the others. Picking the approaches to use depends on your needs and investment possibilities.

## Synthetic transactions
The simplest approach to monitor Auth0. This involves setting up a periodic request to perform an authentication transaction. If the request works successfully, Auth0 is working fine. If the request fails this _might_ indicate an with Auth0.

> There _might_ be an issue with Auth0, but the issue could also either be specific to the tenant used for the synthetic transaction or just a single failed request.

For synthetic transactions we recommend using setups that are close to your production tenant configuration as possible, potentially even using the same production tenant. Since setting up synthetic transactions with redirect flows and third party providers can be tricky, using the [Resource Owner Password Grant](/api-auth/tutorials/password-grant) is recommended. This flow does neither involve browser redirects nor require a UI.

If you are using [rules](/rules) or [custom database connection(s)](/connections/database/custom-db) or other extensibility points, the synthetic transaction(s) should be configured to go through their logic.

Tools like [Pingdom](http://pingdom.com) make setting up synthetic transactions a simple thing.

### Check Period
We recommend synthetic transactions happen with a periodicity of one minute. For this simple monitoring approach, that's a frequency that will not consume a lot of your Auth0 rate limit quota, while also providing timely responses if an issue were to be happening.

### Limitations of synthetic transactions
Synthetic transactions do not represent your end user's experience, but instead aim to provide a proxy metric for them. They might not be exercising the same flows your users are, they should be run every minute and naturally do not report on errors your end users might have seen. However, they are a simple and inexpensive way of getting good signal on the health of an Auth0 tenant.

If you are interested in getting more granular data read about [Error Tracking](#error-tracking) and [Metrics and Logs](#metrics-and-logs).

## Error Tracking
This approach is useful to track errors in existing calls to Auth0. It involves reporting errors whenever a call to Auth0 fails. [Sentry](https://sentry.io/) is a tool commonly used for these cases, which works both on frontend and backend scenarios.

This approach is useful because it allows you to know about real errors that your end users are experiencing. However, because you are only tracking errors (and not all requests) it is not possible to get an accurate perception of "how many" end users are affected: is it 1% of 5%? It also doesn't require you to set up a separate "synthetic call", which might consume part of your rate limit quota, especially if misconfigured.

## Metrics and logs
This approach is useful if calls to Auth0 are performed from a backend you control. This is the case for:
- Most calls to [Auth0's Management API](https://auth0.com/docs/api/management/v2)
- Calls to the [Authentication API](https://auth0.com/docs/api/authentication) from Regular Web Applications and Machine-to-machine applications (learn more about client types [here](https://auth0.com/docs/applications)).

> Some observability products also allow you to report metrics/logs from frontend and mobile applications.

The approach consists in using metrics and/or logs to track error rates on calls to Auth0. Metrics/logs report error rates that accurately describe what end users are experiencing, without requiring to set up a separate "synthetic call", which might consume part of your rate limit quota, especially if misconfigured.

## Alerting
Regardless of which approach you use, it is common that you will want to get an alert/a page when one of them starts seeing errors happen at a particular rate. That rate depends on your application.

When your team gets an alert from Auth0, we recommend adding a link to [Check Auth0 Status](/monitoring/guides/check-status) to the alert payload/playbook. This will allow them to quickly check Auth0's official status reporting channel to understand if the issue is coming from Auth0 or your application/service.

## Keep reading
* [Check Auth0 Status](/monitoring/guides/check-status)
* [Check External Services Status](/monitoring/guides/check-external-services)