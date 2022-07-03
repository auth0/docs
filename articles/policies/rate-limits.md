---
title: Rate Limit Policy
description: Describes Auth0's rate limit policy.
toc: true 
topics:
    - auth0-policies
    - rate-limits
contentType:
  - reference
useCase:
  - support
---
# Rate Limit Policy

Actions such as rapidly updating configuration settings, aggressive polling, or making highly concurrent API calls may result in your app being rate limited.

Auth0's rate limits vary based on the tenant type you have. The tenants that have no credit card associated in the [Dashboard](${manage_url}/#/tenant/billing/payment) are free. There are also variations in terms of paid tenant types (e.g., non-production, production). To set an environment for your tenant (development, staging or production), go to [Support Center > Tenants](${env.DOMAIN_URL_SUPPORT}/tenants/public), find your tenant, select __Assign Environment Tag__, set the environment and save changes.

## API endpoint limits

To ensure the quality of Auth0's services, the Auth0 APIs are subject to rate limiting. Depending on the API endpoint, the request limit and the rate limit window in which the request limit resets, varies. 

Using the Management API for free and trial tenants is restricted to **2 requests per second** (with bursts of up to **10 requests**). Exceeding these values triggers an HTTP 429 error, but the error message states, "Global limit has been reached." These are in addition to those indicated in the rate limit response headers.

If your app triggers the rate limit, please refrain from making additional requests until the appropriate amount of time has elapsed.

See the rate limits for [Management API Endpoints](/policies/rate-limits-mgmt-api) and [Authentication API Endpoints](/policies/rate-limits-auth-api) for complete details on each endpoint limitation. 

### Review HTTP response headers

Auth0 reserves the right to modify the rate limits at any time. For the up-to-date information on rate limits, you can review the HTTP response headers returned from rate limited endpoints.

API requests to selected [Authentication](/api/authentication) or [Management API](/api/management/v2) endpoints will return HTTP response headers that provide relevant data on the current status of your rate limits for that endpoint. If you receive a rate limit-related response header, it will include numeric information detailing your status.

* **X-RateLimit-Limit**: The maximum number of requests available in the current time frame.
* **X-RateLimit-Remaining**: The number of remaining requests in the current time frame.
* **X-RateLimit-Reset**: A [UNIX timestamp](https://en.wikipedia.org/wiki/Unix_time) of the expected time when the rate limit will reset.

### Handle rates limitations in code

You should add logic to handle cases in which you exceed the provided rate limits and receive the HTTP Status Code 429 (Too Many Requests). In this case, if a retry is needed, it is best to allow for a back-off to avoid going into an infinite retry loop.

For scripts and rules that call Auth0 APIs, you should always handle rate limiting by checking the `X-RateLimit-Remaining` header and acting appropriately when the number returned nears 0. 

## Database login limits

For database connections, Auth0 limits certain types of repeat login attempts depending on the user account and IP address. For more information, see [Rate Limits on User/Password Authentication](/policies/rate-limit-policy/database-connections-rate-limits).

## SMS/Voice message limits for multi-factor authentication

There's a limit of 10 SMS or Voice messages/hour per user for MFA. For more information, see [Configure SMS or Voice Notifications for MFA](/mfa/guides/configure-phone).

## Native social login limits

Limits are only applied to requests related to the Native Social Login flows, which are identified based on the body of the requests with the following initial criteria:

| Request Type | Body |
| - | - |
| `grant_type` | `urn:ietf:params:oauth:grant-type:token-exchange` |
| `subject_token_type` | `http://auth0.com/oauth/token-type/apple-authz-code` |

### Limits for production tenants of paying customers

| Endpoint | Path | Limited By | Rate Limit |
| - | - | - | - |
| Get Token | `/oauth/token` | Any native social login request | 50 per minute with bursts up to 500 requests |

### Limits for non-production tenants of paying customers and all tenants of free customers

| Endpoint | Path | Limited By | Rate Limit |
| - | - | - | - |
| Get Token | `/oauth/token` | Native social login requests and IP | 30 per minute |

## Keep reading

* [Management API Endpoint Rate Limits](/policies/rate-limits-mgmt-api)
* [Authentication API Endpoint Rate Limits](/policies/rate-limits-auth-api)
* [Legacy Rate Limits](/policies/legacy-rate-limits)
* [Entity Limit Policy](/policies/entity-limits)
