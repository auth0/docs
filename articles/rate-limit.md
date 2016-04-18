# Rate Limits


Auth0 has implemented rate limiting on its API endpoints.   We do not publish the exact rate limits for multiple reasons, one of which is they may change over time.    

Auth0 recommends that customers use the following approach when making calls to API endpoints. This approach will provide the information necessary to dynamically adjust the rate at which calls are made to stay under the limit. 

Even with the dynamic method of making API calls, programs should still check for a 429 error code and handle the error gracefully.

### How Rate Limits are expressed

For each endpoint, the rate limit is expressed in terms of a size and a per_time rate.

* size - the request limit (X)
* per_time: The rate limit time window (for example: per second, per minute, per hour, etc.) (Y) (for this example we’ll assume minutes)

For example, using X for size and Y for per_time, there is a maximum request limit of X per minute, and for each minute that elapses, permissions for Y requests are added back. In other words, if per_time is in minutes, then for each 60 / Y seconds, one additional request is added to the bucket. This occurs automatically until the bucket contains the maximum permitted number of requests.

### How to tell how many allowed calls remain

Rate-limited endpoints will return HTTP Response Headers that tell you how many more calls you can make within the relevant timeframe.  The following is returned in the headers:

```
'X-RateLimit-Limit': 10, (= maximum requests for the bucket)
'X-RateLimit-Remaining': 8, (= total number of requests that can be made in the current context)
'X-RateLimit-Reset': 1441118993 (= unix time when the max requests for the bucket (10 in this case) will be available again)
```

Programs making API calls should use the header information returned to throttle their requests to stay under the rate limit.  For example, programs can check the value of X-RateLimit-Reset and send a batch of requests (up to X-RateLimit-Limit) at that time.




