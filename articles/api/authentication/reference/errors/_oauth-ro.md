# POST /oauth/ro

## Grant type: jwt-bearer

### HTTP 400

JSON | Description
---- | -------
`{"error":"invalid_request", "error_description":"missing device parameter"}` | Missing Device. You need to provide a device name for the caller device (like a browser, app, etc).
`{"error":"invalid_request", "error_description":"missing id_token parameter"}` | Missing id_token. For this grant type you need to provide a JWT id token.
`{"error":"invalid_grant", "error_description":"..."}` | Errors related to an invalid `id_token` or user.

## Grant type: password

### HTTP 400

JSON | Description
---- | -------
`{"error":"invalid_request", "error_description":"missing username parameter"}` | Missing username parameter in the request.
`{"error":"invalid_request", "error_description":"missing password parameter"}` | Missing password parameter in the request.
`{"error":"invalid_request", "error_description":"missing connection parameter"}` | Missing connection parameter in the request.
`{"error":"invalid_request", "error_description":"scope parameter must be a string"}` | Incorrect scope formatting. Each scope must be separated by whitespace.
`{"error":"invalid_request", "error_description":"specified strategy does not support requested operation"}` | The connection/provider does not implement username/password authentication.

### HTTP 401

JSON | Description
---- | -------
`{"error":"invalid_user_password", "error_description":"Wrong email or password."}` | Wrong username or password (this can vary depending on the identity provider).
`{"error":"unauthorized", "error_description":"user is blocked"}` | The user is blocked.
`{ "error":"password_leaked", "error_description":"This login has been blocked because your password has been leaked in another website. We’ve sent you an email with instructions on how to unblock it."}` | Another site had a security breach and your password has been leaked.

### HTTP 429

JSON | Description
---- | -----------
`{"error":"too_many_attempts", "error_description":"..."}` | Some anomaly detections will return this error.
`{"error":"too_many_logins", "error_description":"..."}` | Some anomaly detections will return this error.

## All grant types

### HTTP 400

JSON | Description
---- | -----------
`{"error":"invalid_request", "error_description":"missing client_id parameter"}` | Missing `client_id` parameter in the request.
`{"error":"invalid_request", "error_description":"the connection was not found"}` | Provided connection was not found.
`{"error":"invalid_request", "error_description":"the connection was disabled"}` | Provided connection is disabled. Check the connection in the dashboard, you may have turned it off for the provided `client_id`.
`{"error":"invalid_request", "error_description":"The connection is not yet configured..."}` | The connection is not properly configured with custom scripts.
`{"error":"invalid_request", "error_description":"the connection was not found for tenant..."}` | The connection does not belong to the tenant. Check your base url.
`{"error":"invalid_request", "error_description":"Fields with "." are not allowed, please remove all dotted fields..."}` | If you are using rules, some field name contains dots.

### HTTP 403

JSON | Description
---- | -----------
`{"error":"unauthorized_client", "error_description":"invalid client"}` | Provided `client_id` is not valid.
`{"error":"access_denied", "error_description":"..."}` | Validation of specific points raised an access issue.
