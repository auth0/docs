---
name: Rate Limiting in the Appliance
description: How to enable, configure, and test for rate limiting in the Appliance
---
# Appliance: Rate Limiting

Beginning with Appliance build `6576`, rate limits for API endpoints can be enabled and configured in the Dashboard. Rate limiting in the Appliance is done using [limitd](https://github.com/limitd/limitd#buckets).

## Enable and Configure Rate Limiting

In the Appliance Dashboard, go to **Rate Limiting**.

![](/media/articles/appliance/admin/rate-limiting-1.png)

Click the checkbox next to **Enable** to enable rate limiting.

![](/media/articles/appliance/admin/rate-limiting-2.png)

By default, **Configuration of buckets** is empty, which means that limitd's default configuration will be used. You can, however, [customize your buckets](https://github.com/auth0/limitd#buckets).

Click **Save** and wait for the updates to the configuration to complete.

![](/media/articles/appliance/admin/rate-limiting-3.png)

## Test Rate Limiting Functionality

When you've enabled rate limiting, the HTTP response includes the following headers:

* X-RateLimit-Limit: Request limit
* X-RateLimit-Remaining: Requests available for the current time frame
* X-RateLimit-Reset: Time until the rate limit resets (in UTC [epoch seconds](https://en.wikipedia.org/wiki/Unix_time))

To verify that rate limiting is working, you can send a call to the [`/oauth/ro` endpoint](/api/authentication#resource-owner):

```text
POST /oauth/ro HTTP 1.1
Content-Type: application/json
{
  "grant_type": "password",
  "client_id": "123",
  "username": "alice",
  "password": "A3ddj3w",
  "connection": "my-database-connection",
  "scope": "openid email favorite_color offline_access",
  "device": "my-device-name"
```

Your expected response looks something like this:

```text
HTTP/1.1 200 OK
Date: Tue, 03 May 2016 16:28:23 GMT
Content-Type: application/json; charset=utf-8
Content-Length: 359
Connection: keep-alive
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 99
X-RateLimit-Reset: 1462293771
Cache-Control: no-cache
Pragma: no-cache
Set-Cookie: auth0=IFBpbr...; path=/; expires=Fri, 06 May 2016 16:28:22 GMT; secure; httponly
Strict-Transport-Security: max-age=3600

{"id_token":"eyJ0eXAiOiJ...","access_token":"AQ6d...","token_type":"bearer"}
```