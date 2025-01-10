# Standard Error Responses

The Authentication API may return the following HTTP Status Codes:
| Status            | JSON Response |
| :---------------- | :------------ |
| <span class="badge badge-danger">400</span> Bad Request|`{"error": "invalid_request", "error_description": "..."}`|
| <span class="badge badge-danger">400</span> Bad Request| `{"error": "invalid_request", "error_description": "..."}`|
| <span class="badge badge-danger">400</span> Bad Request| `{"error": "invalid_scope", "error_description": "Scope must be an array or a string"}`|
| <span class="badge badge-danger">401</span> Unauthorized| `{"error": "invalid_client", "error_description": "..."}`|
| <span class="badge badge-danger">401</span> Unauthorized| `{"error": "requires_validation", "error_description": "Suspicious request requires verification"}`|
| <span class="badge badge-danger">403</span> Forbidden| `{"error": "unauthorized_client", "error_description": "..."}`|
| <span class="badge badge-danger">403</span> Forbidden| `{"error": "access_denied", "error_description": "..."}`|
| <span class="badge badge-danger">403</span> Forbidden| `{"error": "access_denied", "error_description": "Unknown or invalid refresh token"}`|
| <span class="badge badge-danger">403</span> Forbidden| `{"error": "invalid_grant", "error_description": "..."}`|
| <span class="badge badge-danger">404</span> Not Found| `{"error": "endpoint_disabled", "error_description": "..."}`|
| <span class="badge badge-danger">405</span> Method Not Allowed| `{"error": "method_not_allowed", "error_description": "..."}`|
| <span class="badge badge-danger">429</span> Too Many Requests| `{"error": "too_many_requests", "error_description": "..."}`|
| <span class="badge badge-danger">500</span> Internal Server Error |  |
| <span class="badge badge-danger">501</span> Not Implemented| `{"error": "unsupported_response_type", "error_description": "..."}`|
| <span class="badge badge-danger">501</span> Not Implemented| `{"error": "unsupported_grant_type", "error_description": "..."}`|
| <span class="badge badge-danger">503</span> Service Unavailable| `{"error": "temporarily_unavailable", "error_description": "..."}`|