# POST /oauth/ro

## Grant type: jwt-bearer

| Status           | JSON Response |
| :----------------| :------------ |
|<span class="badge badge-danger">400</span> Bad Request|`{"error": "invalid_request", "error_description": "missing device parameter"}` </br>You need to provide a device name for the caller device (like a browser, app, and so on) |
|<span class="badge badge-danger">400</span> Bad Request|`{"error": "invalid_request", "error_description": "missing id_token parameter"}`</br>For this grant type you need to provide a JWT ID Token |
|<span class="badge badge-danger">400</span> Bad Request|`{"error": "invalid_grant", "error_description": "..."}` </br>Errors related to an invalid ID Token or user |

## Grant type: password

| Status           | JSON Response |
| :----------------| :------------ |
| <span class="badge badge-danger">400</span> Bad Request|`{"error": "invalid_request", "error_description": "scope parameter must be a string"}`</br> Incorrect scope formatting; each scope must be separated by whitespace|
| <span class="badge badge-danger">400</span> Bad Request|`{"error": "invalid_request", "error_description": "specified strategy does not support requested operation"}`</br>The connection/provider does not implement username/password authentication |
| <span class="badge badge-danger">401</span> Unauthorized|`{"error": "invalid_user_password", "error_description": "Wrong email or password."}`|
| <span class="badge badge-danger">401</span> Unauthorized|`{"error": "unauthorized", "error_description": "user is blocked"}`|
| <span class="badge badge-danger">401</span> Unauthorized|`{ "error": "password_leaked", "error_description": "This login has been blocked because your password has been leaked in another website. We’ve sent you an email with instructions on how to unblock it."}`|
| <span class="badge badge-danger">401</span> Unauthorized|`{ "error": "requires_verification", "error_description": "Suspicious request requires verification" }`|
| <span class="badge badge-danger">429</span> Too Many Requests|`{"error": "too_many_attempts", "error_description": "..."}` </br>Some attack protection features will return this error|
| <span class="badge badge-danger">429</span> Too Many Requests|`{"error": "too_many_logins", "error_description": "..."}` </br>Some attack protection features will return this error|

## All grant types

| Status           | JSON Response |
| :--------------- | :----------- |
| <span class="badge badge-danger">400</span> Bad Request |`{"error": "invalid_request", "error_description": "missing client_id parameter"}<`|
| <span class="badge badge-danger">400</span> Bad Request |`{"error": "invalid_request", "error_description": "the connection was disabled"}`</br>Check the connection in the dashboard, you may have turned it off for the provided `client_id` |
| <span class="badge badge-danger">400</span> Bad Request |`{"error": "invalid_request", "error_description": "The connection is not yet configured..."}` </br>The connection is not properly configured with custom scripts|
| <span class="badge badge-danger">400</span> Bad Request |`{"error": "invalid_request", "error_description": "the connection was not found for tenant..."}`</br>The connection does not belong to the tenant; check your base url |
| <span class="badge badge-danger">400</span> Bad Request |`{"error": "invalid_request", "error_description": "Fields with "." are not allowed, please remove all dotted fields..."}`</br>If you are using rules, some field name contains dots |
| <span class="badge badge-danger">403</span> Forbidden |`{"error": "unauthorized_client", "error_description": "invalid client"}`</br>The provided `client_id` is not valid |
| <span class="badge badge-danger">403</span> Forbidden |`{"error": "access_denied", "error_description": "..."}`</br>Validation of specific points raised an access issue |