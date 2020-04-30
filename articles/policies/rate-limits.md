---
title: Rate Limit Policy For Auth0 APIs
description: Describes Auth0's rate limit policy when working with Auth0 API endpoints.
toc: true
topics:
    - auth0-policies
    - rate-limits
    - testing
contentType:
  - reference
useCase:
  - support
---
# Rate Limit Policy For Auth0 APIs

To ensure the quality of Auth0's services, the Auth0 APIs are subject to rate limiting.

::: warning
Auth0 reserves the right to modify the rate limits at any time. For the up-to-date information on rate limits, please review the headers returned from rate limited endpoints.
:::

## Limits

Depending on the API endpoint, the request limit and the rate limit window in which the request limit resets, varies.

Each endpoint is configured with a bucket that defines:

-  the request limit, and
-  the rate limit window (per second, per minute, per hour, and so on)

```text
bucket:
    size: x
    per_minute: y
```

For example, the above states that, for the given bucket, there is a maximum request limit of `x` per minute, and for each minute that elapses, permissions for `y` requests are added back. In other words, for each `60 / y` seconds, one additional request is added to the bucket. This occurs automatically until the bucket contains the maximum permitted number of requests.

::: warning
For some API endpoints, the rate limits are defined per bucket, so the origins of the call do not influence the rate limit changes. For other buckets, the rate limits are defined using different keys, so the originating IP address is considered when counting the number of received API calls.
:::

## Exceeding rate limits

If you exceed the provided rate limit for a given API endpoint, you will receive a response with [HTTP Status Code 429 (Too Many Requests)](http://tools.ietf.org/html/rfc6585#section-4). You can refer to the [HTTP Response Headers](#http-response-headers) for more information on the rate limits applicable to that endpoint.

Actions such as rapidly updating configuration settings, aggressive polling, or making highly concurrent API calls may result in your app being rate limited.

Please note that usage of the Management API for free and trial tenants is restricted to **two requests per second** (with bursts of up to **ten (10) requests**). Exceeding these values will also trigger the HTTP 429 error, but the error message states, "Global limit has been reached." These are in addition to those indicated in the rate limit response headers.

If your app triggers the rate limit, please refrain from making additional requests until the appropriate amount of time has elapsed.

::: warning How to Handle Rate Limits when calling Auth0 APIs
For scripts and rules that call Auth0 APIs, you should always handle rate limiting by checking the X-RateLimit-Remaining header and acting appropriately when the number returned nears 0. You should also add logic to handle cases in which you exceed the provided rate limits and receive the HTTP Status Code 429 (Too Many Requests); in this case, if a re-try is needed, it is best to allow for a back-off to avoid going into an infinite re-try loop.
:::

## HTTP response headers

API requests to selected [Authentication](/api/authentication) or [Management API](/api/management/v2) endpoints will return HTTP response headers that provide relevant data on the current status of your rate limits for that endpoint. If you receive a rate limit-related response header, it will include numeric information detailing your status.

* **X-RateLimit-Limit**: The maximum number of requests available in the current time frame.
* **X-RateLimit-Remaining**: The number of remaining requests in the current time frame.
* **X-RateLimit-Reset**: A [UNIX timestamp](https://en.wikipedia.org/wiki/Unix_time) of the expected time when the rate limit will reset.

## Tenant types

Auth0's rate limits vary based on the tenant type you have. The tenants that have no credit card associated in the [Dashboard](${manage_url}/#/tenant/billing/payment) are free.

There are also variations in terms of paid tenant types (e.g., non-production, production). To set an environment for your tenant (development, staging or production), go to [Support Center > Tenants](${env.DOMAIN_URL_SUPPORT}/tenants/public), find your tenant, select __Assign Environment Tag__, set the environment and save changes.

## Endpoints with rate limits

::: note
If you are using an API endpoint **not** listed below and you receive rate limit headers as part of your response, see [Anomaly Detection](/anomaly-detection) for more information.
:::

### Management API v2

The rate limits for this API differ depending on whether your tenant is free or paid, production or not.

If you exceed your plan rate limits, the following message appears: 

![Rate Limit Reached](/media/articles/policies/rate-limit-reached.png)

| Tenant Type | Rate Limit (per second) | Rate Limit (per minute) |
| - | - | - |
| Free or Trial | 10 | 120 |
| Enterprise (Non-production) | 10 | 120 |
| Enterprise (Production) | 50 | 1000 |
| Developer or Developer Pro (created before 05-21-2020) | 50 | 1000 |

::: note
These limits apply to Developer and Developer Pro tenants created after 05-20-2020. Starting on 07-01-2020, these limits will apply to all Developer and Developer Pro tenants.

If you subscribed on or before 05-19-2020, the following [rate limit policy](/policies/legacy-rate-limits) applies to you.
:::

The aforementioned rate limits include calls made via [Rules](/rules) and are set **by tenant** and not by endpoint.

The following Auth0 Management API endpoints return rate limit-related headers. For additional information about these endpoints, please consult the [Management API explorer](/api/management/v2).

| Endpoints | Rate Limit (per second) | Rate Limit (per minute) |
| - | - | - |
| Read or write users: <br> `GET /api/v2/users` <br> `POST /api/v2/users` | 40 | 800 |
| Read logs: <br> `GET /api/v2/logs` <br> `GET /api/v2/user/{id}/logs` | 10 | 200 |
| Read clients: <br> `GET /api/v2/clients` <br> `POST /api/v2/clients/{id}` | 5 | 100 |
| Read connections: <br> `GET /api/v2/connections` <br> `POST /api/v2/connections/{id} | 10 | 100 |
| Delete device credentials: <br> `DELETE /api/v2/device-credentials/{id} | 5 | 100 |
| All other endpoints | 10 | 150 |

#### Concurrent import users jobs

The [create import users job](/api/management/v2#!/Jobs/post_users_imports) endpoint has a limit of 2 concurrent import jobs. Requesting additional jobs while there are two pending returns a `429 Too Many Requests` response:

```json
{
  "statusCode": 429,
  "error": "Too Many Requests",
  "message": "There are 2 active import users jobs, please wait until some of them are finished and try again
}
```

#### Access tokens for SPAs

If you obtain Access Tokens for your SPAs, there are rate limits that are applicable when working with the available `current_user`-related [scopes and endpoints](/api/management/v2/get-access-tokens-for-spas#available-scopes-and-endpoints). You are allowed a maximum of **10 requests per minute per user**.

### Authentication API

#### Production tenants for enterprise users

<table class="table">
    <tr>
        <th>Endpoint</th>
        <th>Path</th>
        <th>Limited By</th>
        <th>Rate Limit</th>
    </tr>
    <tr>
        <td>All Endpoints</td>
        <td><a href="/api/authentication">All Authentication API endpoints</a></td>
        <td>Sum of all combined requests to any Authentication API endpoint</td>
        <td>100 requests per second</td>
    </tr>
    <tr>
        <td rowspan="2">User Profile</td>
        <td><code>/tokeninfo</code> (Legacy)</td>
        <td>IP Address</td>
        <td>800 requests per minute</td>
    </tr>
    <tr>
        <td><code>/userinfo</code></td>
        <td>User ID</td>
        <td>5 requests per minute with bursts of up to 10 requests</td>
    </tr>
    <tr>
        <td>Delegation</td>
        <td><code>/delegation</code></td>
        <td>User ID, IP Address</td>
        <td>10 requests per second</td>
    </tr>
    <tr>
    <td>Change Password</td>
    <td><code>/dbconnections/change_pass</code></td>
    <td>User Email, IP Address</td>
    <td>1 request per minute with bursts of up to 10 requests</td>
  </tr>
  <tr>
    <td>Get Passwordless Code or Link</td>
    <td><code>/passwordless/start</code></td>
    <td>IP Address</td>
    <td>50 requests per hour</td>
  </tr>
</table>

#### Non-production tenants for enterprise users

<table class="table">
    <tr>
        <th>Endpoint</th>
        <th>Path</th>
        <th>Limited By</th>
        <th>Rate Limit</th>
    </tr>
    <tr>
        <td rowspan="2">User Profile</td>
        <td><code>/tokeninfo</code> (Legacy)</td>
        <td>IP Address</td>
        <td>800 requests per minute</td>
    </tr>
    <tr>
        <td><code>/userinfo</code></td>
        <td>User ID</td>
        <td>5 requests per minute with bursts of up to 10 requests</td>
    </tr>
    <tr>
        <td>Delegation</td>
        <td><code>/delegation</code></td>
        <td>User ID, IP Address</td>
        <td>10 requests per second</td>
    </tr>
    <tr>
    <td>Change Password</td>
    <td><code>/dbconnections/change_password</code></td>
    <td>User Email, IP Address</td>
    <td>1 request per minute with bursts of up to 10 requests</td>
  </tr>
  <tr>
    <td>Get Passwordless Code or Link</td>
    <td><code>/passwordless/start</code></td>
    <td>IP</td>
    <td>50 requests per hour</td>
  </tr>
  <tr>
    <td>Get Token</td>
    <td><code>/oauth/token</code></td>
    <td>Any Request</td>
    <td>30 requests per second</td>
  </tr>
  <tr>
    <td>Cross Origin Authentication</td>
    <td><code>/co/authenticate</code></td>
    <td>Any Request</td>
    <td>5 requests per second</td>
  </tr>

  <tr>
    <td>Authentication</td>
    <td><code>usernamepassword/login</code></td>
    <td>Any Request</td>
    <td>5 requests per second</td>
  </tr>
  <tr>
    <td>Resource Owner (legacy)</td>
    <td><code>/oauth/ro</code></td>
    <td>Any Request</td>
    <td>10 requests per second</td>
  </tr>
  <tr>
    <td>JSON Web Token Keys</td>
    <td><code>/.well-known/jwks.json</code></td>
    <td>Any Request</td>
    <td>20 requests per second</td>
  </tr>
</table>

#### Free tenants

Auth0's Authentication API has a [global limit](/policies/global-limit) for free tenants.
<table class="table">
    <tr>
        <th>Endpoint</th>
        <th>Path</th>
        <th>Limited By</th>
        <th>Rate Limit</th>
    </tr>
    <tr>
        <td>All Endpoints</td>
        <td><a href="/api/authentication">All Authentication API endpoints</a></td>
        <td>Sum of all combined requests to any Authentication API endpoint</td>
        <td>300 requests per minute</td>
    </tr>
<table>

## Limits on database logins

For database connections, Auth0 limits certain types of repeat login attempts depending on the user account and IP address. For more information, see [Rate Limits on User/Password Authentication](/connections/database/rate-limits).

## Limits on SMS Messages for MFA

There's a limit of 10 SMS messages/hour per user for multi-factor authentication. For more information, see [Configure SMS Notifications for MFA](/mfa/guides/configure-sms).

## Limits on native social logins

Limits are only applied to requests related to the Native Social Login flows, which are identified based on the body of the requests with the following initial criteria:

* `grant_type`: `urn:ietf:params:oauth:grant-type:token-exchange` 
* `subject_token_type`: `http://auth0.com/oauth/token-type/apple-authz-code`

### Limits for production tenants for enterprise users

<table class="table">
  <thead>
    <tr>
        <th><strong>Endpoint</strong></th>
        <th><strong>Path</strong></th>
        <th><strong>Limited By</strong></th>
        <th><strong>Rate Limit</strong></th>
    </tr>
  </thead>
  <tbody>
    <tr>
        <td>Get Token</td>
        <td>/oauth/token</td>
        <td>Any Native Social Login request</td>
        <td>50 requests per minute with bursts of up to 500 requests</td>
    </tr>
  </tbody>
</table>

### Limits for free tenants and non-production tenants for enterprise users

<table class="table">
  <thead>
    <tr>
        <th><strong>Endpoint</strong></th>
        <th><strong>Path</strong></th>
        <th><strong>Limited By</strong></th>
        <th><strong>Rate Limit</strong></th>
    </tr>
  </thead>
  <tbody>
    <tr>
        <td>Get Token</td>
        <td>/oauth/token</td>
        <td>Native Social Login request and IP</td>
        <td>30 requests per minute</td>
    </tr>
  </tbody>
</table>
