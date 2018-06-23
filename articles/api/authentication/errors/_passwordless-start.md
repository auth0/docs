# POST /passwordless/start

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
        <td><code>{"error": "bad.tenant","error_description": "error in tenant - tenant validation failed: invalid_tenant"}</code></td>
      </tr>
      <tr>
        <td><span class="badge badge-danger">400</span></td>
        <td><code>{"error": "bad.client_id", "error_description": "Missing required property: client_id"}</code></td>
      </tr>
      <tr>
        <td><span class="badge badge-danger">400</span></td>
        <td><code>{"error": "bad.connection", "error_description": "Missing required property: connection"}</code></td>
      </tr>
      <tr>
        <td><span class="badge badge-danger">400</span></td>
        <td><code>{"error": "bad.connection", "error_description": "Connection does not exist"}</code></td>
      </tr>
      <tr>
        <td><span class="badge badge-danger">400</span></td>
        <td><code>{"error": "bad.connection", "error_description": "Connection is disabled"}</code></td>
      </tr>
      <tr>
        <td><span class="badge badge-danger">400</span></td>
        <td><code>{"error": "bad.connection", "error_description": "Invalid connection strategy. It must either be a passwordless connection"}</code></td>
      </tr>
      <tr>
        <td><span class="badge badge-danger">400</span></td>
        <td><code>{"error": "bad.authParams", "error_description": "error in authParams - invalid type: string (expected object)"}</code></td>
      </tr>
      <tr>
        <td><span class="badge badge-danger">400</span></td>
        <td><code>{"error": "bad.request", "error_description": "the following properties are not allowed: <INVALID_PARAMETER_VALUE>"}</code></td>
      </tr>
      <tr>
        <td><span class="badge badge-danger">400</span></td>
        <td><code>{"error": "bad.phone_number", "error_description": "Missing required property: phone_number"}</code></td>
      </tr>
      <tr>
        <td><span class="badge badge-danger">400</span></td>
        <td><code>{"error": "bad.phone_number", "error_description": "String does not match pattern: ^\\+[0-9]{1,15}$"}</code></td>
      </tr>
      <tr>
        <td><span class="badge badge-danger">400</span></td>
        <td><code>{"error": "sms_provider_error", "error_description": "<SPECIFIC_PROVIDER_MESSAGE> (Code: <SPECIFIC_PROVIDER_CODE>)"}</code></td>
      </tr>
    </tbody>
  </table>
