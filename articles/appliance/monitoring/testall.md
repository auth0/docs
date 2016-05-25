# Using the `testall` Endpoint

The `testall` endpoint can be accessed via http or https:

```text
GET https://${account.namespace}/testall
```

The `/testall` endpoint checks the availability of the core Auth0 Authentication Service, as well as other services such as the Management Dashboard and Documentation pages. If all is well, the endpoint returns a response code of `200`.

```text
200
content-type: text/plain
OK
```

Alternatively, if there are any issues, `/testall` returns a `5xx` response code.
