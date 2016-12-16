# POST /oauth/access_token

### HTTP 400

JSON | Description
---- | -------
`{"error": "invalid_request", "error_description": "the connection was disabled"}` | The `connection` is not active or not enabled for your `client_id`.
`{"error": "invalid_request", "error_description": "the connection was not found"}` | Invalid `connection` name.

### HTTP 403
JSON | Description
---- | -------
`{"error": "unauthorized_client", "error_description": "invalid client"}` | The `client_id` is invalid.
