### Error Responses

The error response returned for the `/usernamepassword/login` endpoint is different from that retured from the `/co/authenticate` endpoint.

The legacy error response is not OIDC Conformant. A standard DB connection had a JSON response payload similar to the following:

```
{
  "name": "ValidationError",
  "code": "invalid_user_password",
  "description": "Wrong email or password.",
  "statusCode": 400
}
```

A custom DB connection had a JSON response payload similar to the following:

```
{
  "name": "ValidationError",
  "message": "Something went wrong...",
  "code": "403",
  "description": "Something went wrong...",
  "fromSandbox": true
}
```

The new error response is OIDC Conformant and has a JSON response payload similiar to the following:

```
{
  "error": "access_denied",
  "error_description": "Wrong email or password."
}
```
