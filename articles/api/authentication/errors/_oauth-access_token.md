# POST /oauth/access_token

### HTTP 400

JSON | Description
---- | -------
`{"error": "invalid_request", "error_description": "the connection was disabled"}` | The `connection` is not active or not enabled for your `client_id`.
`{"error": "invalid_request", "error_description": "the connection was not found"}` | Invalid `connection` name.
`{"error": "invalid_request", "error_description": "missing client_id parameter"}` | The `client_id` value is null.
`{"error": "invalid_request", "error_description": "missing access_token parameter"}` | The `access_token` value is null.
`{"error": "invalid_request", "error_description": "missing connection parameter"}` | The `connection` value is null.

### HTTP 401

JSON | Description
--- | ---
`{"error": "invalid_request", "error_description": "invalid access_token: invalid_token"}` | The `access_token` is invalid or does not contain the `scope` you set.

### HTTP 403
JSON | Description
---- | -------
`{"error": "unauthorized_client", "error_description": "invalid client"}` | The `client_id` is invalid.
