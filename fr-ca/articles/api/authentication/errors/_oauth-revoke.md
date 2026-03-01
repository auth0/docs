# POST /oauth/revoke

| Status           | JSON Response |
| :--------------- | :------------ |
|<span class="badge badge-info">200</span> Success | `{"error": "invalid_request", "error_description": "..."}`</br> The <dfn data-key="refresh-token">Refresh Token</dfn> is revoked, does not exist, or was not issued to the client making the revocation request|
|<span class="badge badge-danger">400</span> Bad Request | `{"error": "invalid_request", "error_description": "..."}` The required parameters were not sent in the request.|
|<span class="badge badge-danger">401</span> Unauthorized  | `{"error": "invalid_client", "error_description": "..."}`</br> The request is not authorized. Check that the client credentials `client_id` and client_secret` are present in the request and hold valid values. |