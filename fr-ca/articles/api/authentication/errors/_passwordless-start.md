<!-- markdownlint-disable MD038-->
# POST /passwordless/start

| Status           | JSON Response |
| :----------------| :------------ |
|<span class="badge badge-danger">400</span> Bad Request|`{"error": "bad.tenant","error_description": "error in tenant - tenant validation failed: invalid_tenant"}`|
|<span class="badge badge-danger">400</span> Bad Request|`{"error": "bad.client_id", "error_description": "Missing required property: client_id"}`|
|<span class="badge badge-danger">400</span> Bad Request|`{"error": "bad.connection", "error_description": "Missing required property: connection"}`|
|<span class="badge badge-danger">400</span> Bad Request|`{"error": "bad.connection", "error_description": "Connection does not exist"}`|
|<span class="badge badge-danger">400</span> Bad Request|`{"error": "bad.connection", "error_description": "Connection is disabled"}`|
|<span class="badge badge-danger">400</span> Bad Request|`{"error": "bad.connection", "error_description": "Invalid connection strategy. It must either be a passwordless connection"}`|
|<span class="badge badge-danger">400</span> Bad Request|`{"error": "bad.authParams", "error_description": "error in authParams - invalid type: string (expected object)"}`|
|<span class="badge badge-danger">400</span> Bad Request|`{"error": "bad.request", "error_description": "the following properties are not allowed: <INVALID_PARAMETER_VALUE>"}`|
|<span class="badge badge-danger">400</span> Bad Request|`{"error": "bad.phone_number", "error_description": "Missing required property: phone_number"}`|
|<span class="badge badge-danger">400</span> Bad Request|`{"error": "bad.phone_number", "error_description": "String does not match pattern: ^\\+[0-9]{1,15}$"}`|
|<span class="badge badge-danger">400</span> Bad Request|`{"error": "sms_provider_error", "error_description": "<SPECIFIC_PROVIDER_MESSAGE> (Code: <SPECIFIC_PROVIDER_CODE>)"}`|
|<span class="badge badge-danger">400</span> Bad Request|`{"error": "invalid_request","error_description": "Expected `auth0-forwarded-for` header to be a valid IP address."}`|
|<span class="badge badge-danger">400</span> Bad Request|`{"error": "bad.tenant","error_description": "error in tenant - could not find tenant in params"}`|
|<span class="badge badge-danger">400</span> Bad Request|`{"error": "server_error","error_description": "error resolving client"}`|
|<span class="badge badge-danger">400</span> Bad Request|`{"error": "invalid_request","error_description": "The client_id in the authentication header does not match the client_id in the payload"}`|
|<span class="badge badge-danger">400</span> Bad Request|`{"error": "bad.connection","error_description": "Public signup is disabled"}`|
|<span class="badge badge-danger">400</span> Bad Request|`{"error": "bad.connection","error_description": "Unknown error"}`|
|<span class="badge badge-danger">401</span> Unauthorized|`{"error": "server_error","error_description": "user is blocked"}`|
|<span class="badge badge-danger">403</span> Forbidden|`{"error": "unauthorized_client","error_description": "Client authentication is required"}`|
|<span class="badge badge-danger">500</span> Internal Server Error|`{"error": "server_error","error_description": "IdP Error"}`|