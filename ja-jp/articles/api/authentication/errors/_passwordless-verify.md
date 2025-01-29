# POST /passwordless/verify

| Status           | JSON Response |
| :----------------| :------------ |
|<span class="badge badge-danger">400</span> Bad Request|`{"error": "invalid_request", "error_description": "missing username parameter"}`|
|<span class="badge badge-danger">400</span> Bad Request|`{"error": "invalid_request", "error_description": "scope parameter must be a string"}`</br>Incorrect scope formatting; each scope must be separated by whitespace|
|<span class="badge badge-danger">400</span> Bad Request|`{"error": "invalid_request", "error_description": "missing client_id parameter"}`|
|<span class="badge badge-danger">400</span> Bad Request|`{"error": "invalid_request", "error_description": "the connection was not found"}`|
|<span class="badge badge-danger">400</span> Bad Request|`{"error": "invalid_request", "error_description": "the connection was disabled"}` </br>Check the connection in the dashboard, you may have turned it off for the provided `client_id`|
|<span class="badge badge-danger">400</span> Bad Request|`{"error": "invalid_request", "error_description": "the connection was not found for tenant..."}` </br>The connection does not belong to the tenant; check your base url|
|<span class="badge badge-danger">400</span> Bad Request|`{"error": "invalid_request", "error_description": "Fields with "." are not allowed, please remove all dotted fields..."}`</br>If you are using rules, some field name contains dots|
|<span class="badge badge-danger">400</span> Bad Request|`"error": "bad.tenant","error_description": "error in tenant - could not find tenant in params"`|
|<span class="badge badge-danger">400</span> Bad Request|`{"error": "bad.tenant","error_description": "error in tenant - tenant validation failed: "}`|
|<span class="badge badge-danger">400</span> Bad Request|`{"error": "bad.connection","error_description": "Connection does not exist"}`|
|<span class="badge badge-danger">400</span> Bad Request|`{"error": "bad.connection","error_description": "Invalid connection strategy. It must either be a passwordless connection"}`|
|<span class="badge badge-danger">400</span> Bad Request|`{"error": "bad.connection","error_description": "The connection is disabled"}`|
|<span class="badge badge-danger">401</span> Unauthorized|`{"error": "invalid_user_password", "error_description": "Wrong email or password."}`|
|<span class="badge badge-danger">401</span> Unauthorized|`{"error": "unauthorized", "error_description": "user is blocked"}`|
|<span class="badge badge-danger">403</span> Forbidden|`{"error": "unauthorized_client", "error_description": "invalid client"}`</br>The provided `client_id` is not valid|
|<span class="badge badge-danger">403</span> Forbidden|`{"error": "access_denied", "error_description": "..."}`</br>Validation of specific points raised an access issue|
|<span class="badge badge-danger">429</span> Too Many Requests|`{"error": "too_many_attempts", "error_description": "..."}` </br>Some attack protection features will return this error|
|<span class="badge badge-danger">500</span> Bad Request|`{"error": "server_error","error_description": "..."}`|