---
description: Describes Auth0's rate limit policy for subscriptions created before 05-21-2020 when working with Auth0 API endpoints.
topics:
    - auth0-policies
    - rate-limits
contentType:
  - reference
useCase:
  - support
---
# Management API Endpoint Rate Limits before May 19, 2020

**This policy is effective for all paid and free subscriptions made before May 19, 2020.** 

::: warning
All subscriptions made on or after **May 19, 2020** are subject to the [updated rate limits](/policies/rate-limits-mgmt-api). 
Starting on **June 18, 2020**, the new limits will apply to all tenants. You will be notified of the new limits through a **Dashboard Notification**. If the changes will impact your tenant, you will be notified directly via email with additional information about minimizing API calls and upgrading plans.
:::

The rate limits for Auth0 Management API differ depending on whether your tenant is free or paid, production or not.

| Tenant Type | Limit |
| - | - |
| Free or Trial | 2 requests per second (and bursts up to 10 requests) |
| Non-Production (Paid) | 2 requests per second (and bursts up to 10 requests) |
| Production (Paid) | 15 requests per second (and bursts up to 50 requests) |

The aforementioned rate limits include calls made via [Rules](/rules) and are set **by tenant** and not by endpoint.

The following Auth0 Management API endpoints return rate limit-related headers. For additional information about these endpoints, please consult the [Management API explorer](/api/management/v2).

<table class="table">
  <thead>
    <tr>
      <th><strong>Endpoint</strong></th>
      <th><strong>GET</strong></th>
      <th><strong>POST</strong></th>
      <th><strong>DELETE</strong></th>
      <th><strong>PATCH</strong></th>
      <th><strong>PUT</strong></th>
    </tr>
  </thead>
  <tbody>
  <tr>
      <td>Application Grants</td>
      <td>/client-grants</td>
      <td>/client-grants</td>
      <td>/client-grants/{id}</td>
      <td>/client-grants/{id}</td>
      <td></td>
  </tr>
    <tr>
    <td>Signing Keys</td>
      <td>/keys/signing<br>/keys/signing/{id}</td>
      <td>/keys/signing/rotate<br>Limited to 5 requests per day</td>
      <td></td>
      <td></td>
      <td>/keys/signing/{kid}/revoke</td>
  </tr>
  <tr>
      <td>Applications</td>
      <td>/client <br />/client/{id}</td>
      <td>/client</td>
      <td>/client/{id}</td>
      <td>/client/{id}</td>
      <td></td>
  </tr>
  <tr>
      <td>Connections</td>
      <td>/connections <br />/connections/{id}</td>
      <td>/connections</td>
      <td>/connections/{id} <br />/connections/{id}/users</td>
      <td>/connections/{id}</td>
      <td></td>
  </tr>
  <tr>
      <td>Device Credentials</td>
      <td>/device-credentials</td>
      <td>/device-credentials</td>
      <td>/device-credentials/{id}</td>
      <td></td>
      <td></td>
  </tr>
  <tr>
      <td>Logs</td>
      <td>/logs <br />/log/{id}</td>
      <td></td>
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
      <td></td>
  </tr>
  <tr>
      <td>User Blocks</td>
      <td>/user-blocks <br />/user-blocks/{id}</td>
      <td></td>
      <td>/user-blocks <br />/user-blocks/{id}</td>
      <td></td>
      <td></td>
  </tr>
  <tr>
      <td>Users</td>
      <td>/users <br /> /users/{id} <br />/users/{id}/logs <br />/users/{id}/enrollments</td>
      <td>/users <br />/users/{id}/identities</td>
      <td>/users/{id} <br />/users/{id}/identities <br />/users/{id}/multifactor/{provider}</td>
      <td>/users/{id}</td>
      <td></td>
  </tr>
  <tr>
      <td>Emails</td>
      <td>/emails/provider</td>
      <td>/emails/provider</td>
      <td></td>
      <td>/emails/provider</td>
      <td></td>
  </tr>
  <tr>
      <td>Jobs</td>
      <td>/jobs/{id} <br /> /jobs/{id}/errors</td>
      <td>/jobs/verification-email <br />/jobs/users-imports <br />/jobs/users-exports</td>
      <td></td>
      <td></td>
      <td></td>
  </tr>
  <tr>
      <td>Resource Servers</td>
      <td>/resource-servers <br />/resource-servers/{id}</td>
      <td>/resource-servers</td>
      <td>/resource-servers/{id}</td>
      <td>/resource-servers/{id}</td>
      <td></td>
  </tr>
  <tr>
      <td>Stats</td>
      <td>/stats/active-users <br />/stats/daily</td>
      <td></td>
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
      <td></td>
  </tr>
  </tbody>
</table>

#### Concurrent import users jobs

The [create import users job](/api/management/v2#!/Jobs/post_users_imports) endpoint has a limit of two concurrent import jobs. Requesting additional jobs while there are two pending returns a `429 Too Many Requests` response:

```json
{
  "statusCode": 429,
  "error": "Too Many Requests",
  "message": "There are 2 active import users jobs, please wait until some of them are finished and try again
}
```

#### Access tokens for SPAs

If you obtain Access Tokens for your SPAs, note that there are rate limits that are applicable when working with the available `current_user`-related [scopes and endpoints](/api/management/v2/get-access-tokens-for-spas#available-scopes-and-endpoints). You are allowed a maximum of **10 requests per minute per user**.
