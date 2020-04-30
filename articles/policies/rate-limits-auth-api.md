---
title: Rate Limits for Authentication API Endpoints
description: Describes Auth0's rate limit policy when working with Auth0 Authentication API endpoints.
toc: true
topics:
    - auth0-policies
    - rate-limits
contentType:
  - reference
useCase:
  - support
---
# Rate Limits for Authentication API Endpoints

Each endpoint is configured with a bucket that defines:

-  Request limit
-  Rate limit window (per second, per minute, per day, etc.)

```text
bucket:
    size: x
    per_minute: y
```

For example, the above states that, for the given bucket, there is a maximum request limit of `x` per minute, and for each minute that elapses, permissions for `y` requests are added back. In other words, for each `60 / y` seconds, one additional request is added to the bucket. This occurs automatically until the bucket contains the maximum permitted number of requests.

For some API endpoints, the rate limits are defined per bucket, so the origins of the call do not influence the rate limit changes. For other buckets, the rate limits are defined using different keys, so the originating IP address is considered when counting the number of received API calls.

::: note
If you are using an API endpoint **not** listed below and you receive rate limit headers as part of your response, see [Anomaly Detection](/anomaly-detection) for more information.
:::

## Production tenants for enterprise users

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

## Non-production tenants for enterprise users

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

## Free tenants

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
