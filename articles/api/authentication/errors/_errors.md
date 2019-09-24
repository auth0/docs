# Standard Error Responses

The Authentication API may return the following HTTP Status Codes:

<table class="table">
    <thead>
      <tr>
        <th width="20%">Status</th>
        <th width="60%">Description</th>
        <th width="20%">Messages</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><span class="badge badge-danger">400</span></td>
        <td>Bad Request</td>
        <td>invalid_request<br />invalid_scope<br />Scope must be an array or a string</td>
      </tr>
      <tr>
        <td><span class="badge badge-danger">401</span></td>
        <td>Unauthorized</td>
        <td>invalid_client</td>
      </tr>
      <tr>
        <td><span class="badge badge-danger">403</span></td>
        <td>Forbidden</td>
        <td>unauthorized_client<br / >access_denied<br />Unknown or invalid refresh token<br /></td>
      </tr>
      <tr>
        <td><span class="badge badge-danger">404</span></td>
        <td>Not Found</td>
        <td>endpoint_disabled</td>
      </tr>
      <tr>
        <td><span class="badge badge-danger">405</span></td>
        <td>Method Not Allowed</td>
      </tr>
      <tr>
        <td><span class="badge badge-danger">429</span></td>
        <td>Too Many Requests</td>
      </tr>
      <tr>
        <td><span class="badge badge-danger">500</span></td>
        <td>Internal Server Error</td>
      </tr>
      <tr>
        <td><span class="badge badge-danger">501</span></td>
        <td>Not Implemented</td>
        <td>unsupported_response_type</td>
      </tr>
      <tr>
        <td><span class="badge badge-danger">503</span></td>
        <td>Service Unavailable</td>
        <td>temporarily_unavailable</td>
      </tr>
    </tbody>
  </table>
