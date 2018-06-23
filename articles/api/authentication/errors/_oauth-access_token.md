# POST /oauth/access_token

<table class="table">
    <thead>
      <tr>
        <th width="20%">Status</th>
        <th width="80%">Response</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><span class="badge badge-danger">400</span></td>
        <td><code>{"error": "invalid_request", "error_description": "the connection was disabled"}</code></br>The connection is not active or not enabled for your <code>client_id</code></td>
      </tr>
      <tr>
        <td><span class="badge badge-danger">400</span></td>
        <td><code>{"error": "invalid_request", "error_description": "the connection was not found"}</code></td>
      </tr>
      <tr>
        <td><span class="badge badge-danger">400</span></td>
        <td><code>{"error": "invalid_request", "error_description": "missing client_id parameter"}</code></td>
      </tr>
      <tr>
        <td><span class="badge badge-danger">400</span></td>
        <td><code>{"error": "invalid_request", "error_description": "missing access_token parameter"}</code></td>
      </tr>
      <tr>
        <td><span class="badge badge-danger">401</span></td>
        <td><code>{"error": "invalid_request", "error_description": "invalid access_token: invalid_token"}</code></br>The <code>access_token</code> is invalid or does not contain the <code>scope</code> you set</td>
      </tr>
      <tr>
        <td><span class="badge badge-danger">403</span></td>
        <td><code>{"error": "unauthorized_client", "error_description": "invalid client"}</code></td>
      </tr>
    </tbody>
  </table>
