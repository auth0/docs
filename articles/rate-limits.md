# API Rate Limits

To ensure the quality of Auth0's services, the Auth0 API is subject to rate limiting.

## Limits

Depending on the API endpoint, the request limit and the rate limit window in which the request limit resets varies.

Each endpoint is configured with a bucket that defines:

-	the request limit
-	the rate limit window (per second, per minute, per hour, etc.)

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

<table>
  <tr>
    <th>Header</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>X-RateLimit-Limit</td>
    <td>Request limit</td>
  </tr>
  <tr>
    <td>X-RateLimit-Remaining</td>
    <td>Requests available for the current time frame</td>
  </tr>
  <tr>
    <td>X-RateLimit-Reset</td>
    <td>Time until the rate limit resets (in UTC [epoch seconds](https://en.wikipedia.org/wiki/Unix_time))</td>
  </tr>
</table>

The following endpoints return rate limit-related headers.

<table>
  <tr>
      <th>Endpoint</th>
      <th>GET</th>
      <th>GET [All]</th>
      <th>POST</th>
      <th>DELETE</th>
      <th>PATCH</th>
  </tr>
  <tr>
      <td>Client Grants</td>
      <td></td>
      <td>X</td>
      <td>X</td>
      <td>X</td>
      <td>X</td>
  </tr>
</table>
