# Standard Error Responses

The Authentication API may return the following HTTP Status Codes:

<table class="table">
    <thead>
      <tr>
        <th width="20%">Status</th>
        <th width="20%">Description</th>
        <th width="60%">Messages</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><span class="badge badge-danger">400</span></td>
        <td>Bad Request</td>
        <td>
            <ul>
                <li>invalid_request</li>
                <li>invalid_scope</li>
                <li>Scope must be an array or a string</li>
            </ul>
        </td>
      </tr>
      <tr>
        <td><span class="badge badge-danger">401</span></td>
        <td>Unauthorized</td>
        <td>invalid_client</td>
      </tr>
      <tr>
        <td><span class="badge badge-danger">403</span></td>
        <td>Forbidden</td>
        <td>
            <ul>
                <li>unauthorized_client</li>
                <li>access_denied</li>
                <li>Unknown or invalid refresh token</li>
            </ul>
        </td>
      </tr>
      <tr>
        <td><span class="badge badge-danger">404</span></td>
        <td>Not Found</td>
        <td>endpoint_disabled</td>
      </tr>
      <tr>
        <td><span class="badge badge-danger">405</span></td>
        <td>Method Not Allowed</td>
        <td>&nbsp;</td>
      </tr>
      <tr>
        <td><span class="badge badge-danger">429</span></td>
        <td>Too Many Requests</td>
        <td>&nbsp;</td>
      </tr>
      <tr>
        <td><span class="badge badge-danger">500</span></td>
        <td>Internal Server Error</td>
        <td>&nbsp;</td>
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
