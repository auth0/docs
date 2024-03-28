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