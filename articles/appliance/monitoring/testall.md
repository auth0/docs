# Using the `testall` Endpoint

The `testall` endpoint can be accessed via http or https:

```text
curl -v  http://10.1.0.248/testall
```

The return results include information gathered from a set of basic checks that ensure all services are running. If all is well, the endpoint returns a status code of `200`. Alternatively, if there are any issues, the endpoint returns a status code of `500`.
