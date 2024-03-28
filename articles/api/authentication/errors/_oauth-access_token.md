# POST /oauth/access_token

| Status           | JSON Response |
| :--------------- |:------------- |
| <span class="badge badge-danger">400</span> Bad Request | `{"error": "invalid_request", "error_description": "the connection was disabled"}`</br> The connection is not active or not enabled for your `client_id`.|
| <span class="badge badge-danger">400</span> Bad Request | `{"error": "invalid_request", "error_description": "the connection was not found"}` |
| <span class="badge badge-danger">400</span> Bad Request | `{"error": "invalid_request", "error_description": "missing client_id parameter"}` |
| <span class="badge badge-danger">400</span> Bad Request | `{"error": "invalid_request", "error_description": "missing access_token parameter"}` |
| <span class="badge badge-danger">401</span> Unauthorized | `{"error": "invalid_request", "error_description": "invalid access_token: invalid_token"}` </br> The `access_token` is invalid or does not contain the set `scope`|
| <span class="badge badge-danger">403</span> Forbidden | `{"error": "unauthorized_client", "error_description": "invalid client"}` |