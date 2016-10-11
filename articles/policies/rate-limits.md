---
description: This page details Auth0's Rate Limit Policy with hitting Auth0 API endpoints.
---

# Rate Limit Policy

To ensure the quality of Auth0's services, the Auth0 API is subject to rate limiting.

## Limits

Depending on the API endpoint, the request limit and the rate limit window in which the request limit resets varies.

Each endpoint is configured with a bucket that defines:

-  the request limit
-  the rate limit window (per second, per minute, per hour, etc.)

```
bucket:
    size: x
    per_minute: y
```

For example, the above states that, for the given bucket, there is a maximum request limit of X per minute, and for each minute that elapses, permissions for Y requests are added back. In other words, for each `60 / Y` seconds, one additional request is added to the bucket. This occurs automatically until the bucket contains the maximum permitted number of requests.

For some API endpoints, the rate limits are defined per bucket, so the origins of the call do not influence the rate limit changes. For other buckets, the rate limits are defined using different keys, so the originating IP address is considered when counting the number of received API calls.

## Exceeding the Rate Limit

If you exceed the provided rate limit for a given API endpoint, you will receive the [429 Too Many Requests](http://tools.ietf.org/html/rfc6585#section-4) response with the following message:

```text
{
    "message": "Too many requests. Check the X-RateLimit-Limit, X-RateLimit-Remaining and X-RateLimit-Reset headers."
}
```

Actions such as rapidly updating configuration settings, aggressive polling, or making highy concurrent API calls may result in your app being rate limited.

If your app triggers the rate limit, please refrain from making additional requests until the appropriate amount of time has elapsed.

## HTTP Response Headers

API requests to selected Authentication or Management API endpoints will return HTTP Response Headers that provide relevant data on where you are at for a given rate limit. If you receive a rate limit-related response header, it will include numeric information detailing your status.

* **X-RateLimit-Limit**: Request limit
* **X-RateLimit-Remaining**: Requests available for the current time frame
* **X-RateLimit-Reset**: Time until the rate limit resets (in UTC [epoch seconds](https://en.wikipedia.org/wiki/Unix_time))

The following Auth0 API endpoints return rate limit-related headers. For additional information about these endpoints, please consult the [API explorer](/api/management/v2).

> If you are using an API endpoint **not** listed below and you receive rate limit headers as part of your response, please see the page on [Anomaly Detection](/anomaly-detection) for additional information.

<table class="table">
  <tr>
      <th>Endpoint</th>
      <th>GET</th>
      <th>POST</th>
      <th>DELETE</th>
      <th>PATCH</th>
  </tr>
  <tr>
      <td>Client Grants</td>
      <td>/client-grants</td>
      <td>/client-grants</td>
      <td>/client-grants/{id}</td>
      <td>/client-grants/{id}</td>
  </tr>
  <tr>
      <td>Clients</td>
      <td>/client <br />/client/{id}</td>
      <td>/client</td>
      <td>/client/{id}</td>
      <td>/client/{id}</td>
  </tr>
  <tr>
      <td>Connections</td>
      <td>/connections <br />/connections/{id}</td>
      <td>/connections</td>
      <td>/connections/{id} <br />/connections/{id}/users</td>
      <td>/connections/{id}</td>
  </tr>
  <tr>
      <td>Device Credentials</td>
      <td>/device-credentials</td>
      <td>/device-credentials</td>
      <td>/device-credentials/{id}</td>
      <td></td>
  </tr>
  <tr>
      <td>Logs</td>
      <td>/logs <br />/log/{id}</td>
      <td></td>
      <td></td>
      <td></td>
  </tr>
  <tr>
      <td>Rules</td>
      <td>/rules <br />/rules/{id}</td>
      <td>/rules</td>
      <td>/rules/{id}</td>
      <td>/rules/{id}</td>
  </tr>
  <tr>
      <td>User Blocks</td>
      <td>/user-blocks <br />/user-blocks/{id}</td>
      <td></td>
      <td>/user-blocks <br />/user-blocks/{id}</td>
      <td></td>
  </tr>
  <tr>
      <td>Users</td>
      <td>/users <br /> /users/{id} <br />/users/{id}/logs <br />/users/{id}/enrollments</td>
      <td>/users <br />/users/{id}/identities</td>
      <td>/users/{id} <br />/users/{id}/identities <br />/users/{id}/multifactor/{provider}</td>
      <td>/users/{id}</td>
  </tr>
  <tr>
      <td>Emails</td>
      <td>/emails/provider</td>
      <td>/emails/provider</td>
      <td></td>
      <td>/emails/provider</td>
  </tr>
  <tr>
      <td>Jobs</td>
      <td>/jobs/{id} <br /> /jobs/{id}/errors</td>
      <td>/jobs/verification-email <br />/jobs/users-imports</td>
      <td></td>
      <td></td>
  </tr>
  <tr>
      <td>Resource Servers</td>
      <td>/resource-servers <br />/resource-servers/{id}</td>
      <td>/resource-servers</td>
      <td>/resource-servers/{id}</td>
      <td>/resource-servers/{id}</td>
  </tr>
  <tr>
      <td>Stats</td>
      <td>/stats/active-users <br />/stats/daily</td>
      <td></td>
      <td></td>
      <td></td>
  </tr>
  <tr>
      <td>Tenants</td>
      <td>/tenants/settings</td>
      <td></td>
      <td></td>
      <td>/tenants/settings</td>
  </tr>
</table>
