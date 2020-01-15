# Standard Error Responses

The Authentication API may return the following HTTP Status Codes:

<table class="table">
    <thead>
      <tr>
        <th width="20%">Status</th>
        <th width="20%">Description</th>
        <th width="60%">Message</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><span class="badge badge-danger">400</span></td>
        <td>Bad Request</td>
        <td><code>{"error": "invalid_request", "error_description": "..."}</code></td>
      </tr>        
      <tr>
        <td><span class="badge badge-danger">400</span></td>
        <td>Bad Request</td>
        <td><code>{"error": "invalid_scope", "error_description": "..."}</code></td>
      </tr>          
      <tr>
        <td><span class="badge badge-danger">400</span></td>
        <td>Bad Request</td>
        <td><code>{"error": "invalid_scope", "error_description": "Scope must be an array or a string"}</code></td>
      </tr>
      <tr>
        <td><span class="badge badge-danger">401</span></td>
        <td>Unauthorized</td>
        <td><code>{"error": "invalid_client", "error_description": "..."}</code></td>
      </tr>
      <tr>
        <td><span class="badge badge-danger">403</span></td>
        <td>Forbidden</td>
        <td><code>{"error": "unauthorized_client", "error_description": "..."}</code></td>
      </tr>
      <tr>
        <td><span class="badge badge-danger">403</span></td>
        <td>Forbidden</td>
        <td><code>{"error": "access_denied", "error_description": "..."}</code></td>
      </tr>        
      <tr>
        <td><span class="badge badge-danger">403</span></td>
        <td>Forbidden</td>
        <td><code>{"error": "access_denied", "error_description": "Unknown or invalid refresh token"}</code></td>
      </tr>
      <tr>
        <td><span class="badge badge-danger">404</span></td>
        <td>Not Found</td>
        <td><code>{"error": "endpoint_disabled", "error_description": "..."}</code></td>
      </tr>
      <tr>
        <td><span class="badge badge-danger">405</span></td>
        <td>Method Not Allowed</td>
        <td><code>{"error": "method_not_allowed", "error_description": "..."}</code></td>
      </tr>
      <tr>
        <td><span class="badge badge-danger">429</span></td>
        <td>Too Many Requests</td>
        <td><code>{"error": "too_many_requests", "error_description": "..."}</code></td>
      </tr>
      <tr>
        <td><span class="badge badge-danger">500</span></td>
        <td>Internal Server Error</td>
        <td>&nbsp;</td>
      </tr>
      <tr>
        <td><span class="badge badge-danger">501</span></td>
        <td>Not Implemented</td>
        <td><code>{"error": "unsupported_response_type", "error_description": "..."}</code></td>
      </tr>
      <tr>
        <td><span class="badge badge-danger">503</span></td>
        <td>Service Unavailable</td>
        <td><code>{"error": "temporarily_unavailable", "error_description": "..."}</code></td>
      </tr>
    </tbody>
  </table>
