# POST /oauth/ro

## Grant type: jwt-bearer

<table class="table">
  <thead>
    <tr>
      <th width="20%">Status</th>
      <th width="80%">Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><span class="badge badge-danger">400</span></td>
      <td><code>{"error": "invalid_request", "error_description": "missing device parameter"}</code></br>You need to provide a device name for the caller device (like a browser, app, and so on)</td>
    </tr>
    <tr>
      <td><span class="badge badge-danger">400</span></td>
      <td><code>{"error": "invalid_request", "error_description": "missing id_token parameter"}</code></br>For this grant type you need to provide a JWT ID Token</td>
    </tr>
    <tr>
      <td><span class="badge badge-danger">400</span></td>
      <td><code>{"error": "invalid_grant", "error_description": "..."}</code></br>Errors related to an invalid ID Token or user</td>
    </tr>
  </tbody>
</table>

## Grant type: password

<table class="table">
  <thead>
    <tr>
      <th width="20%">Status</th>
      <th width="80%">Description</th>
    </tr>
  </thead>
  <tbody>
      <tr>
        <td><span class="badge badge-danger">400</span></td>
        <td><code>{"error": "invalid_request", "error_description": "scope parameter must be a string"}</code></br>Incorrect scope formatting; each scope must be separated by whitespace</td>
      </tr>
      <tr>
        <td><span class="badge badge-danger">400</span></td>
        <td><code>{"error": "invalid_request", "error_description": "specified strategy does not support requested operation"}</code></br>The connection/provider does not implement username/password authentication</td>
      </tr>
      <tr>
        <td><span class="badge badge-danger">401</span></td>
        <td><code>{"error": "invalid_user_password", "error_description": "Wrong email or password."}</code></td>
      </tr>
      <tr>
        <td><span class="badge badge-danger">401</span></td>
        <td><code>{"error": "unauthorized", "error_description": "user is blocked"}</code></td>
      </tr>
      <tr>
        <td><span class="badge badge-danger">401</span></td>
        <td><code>{ "error": "password_leaked", "error_description": "This login has been blocked because your password has been leaked in another website. We’ve sent you an email with instructions on how to unblock it."}</code></td>
      </tr>
      <tr>
        <td><span class="badge badge-danger">429</span></td>
        <td><code>{"error": "too_many_attempts", "error_description": "..."}</code></br>Some anomaly detections will return this error</td>
      </tr>
      <tr>
        <td><span class="badge badge-danger">429</span></td>
        <td><code>{"error": "too_many_logins", "error_description": "..."}</code></br>Some anomaly detections will return this error</td>
      </tr>
    </tbody>
  </table>

## All grant types

<table class="table">
    <thead>
      <tr>
        <th width="20%">Status</th>
        <th width="80%">Description</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><span class="badge badge-danger">400</span></td>
        <td><code>{"error": "invalid_request", "error_description": "missing client_id parameter"}</code></td>
      </tr>
      <tr>
        <td><span class="badge badge-danger">400</span></td>
        <td><code>{"error": "invalid_request", "error_description": "the connection was disabled"}</code></br>Check the connection in the dashboard, you may have turned it off for the provided <code>client_id</code></td>
      </tr>
      <tr>
        <td><span class="badge badge-danger">400</span></td>
        <td><code>{"error": "invalid_request", "error_description": "The connection is not yet configured..."}</code></br>The connection is not properly configured with custom scripts</td>
      </tr>
      <tr>
        <td><span class="badge badge-danger">400</span></td>
        <td><code>{"error": "invalid_request", "error_description": "the connection was not found for tenant..."}</code></br>The connection does not belong to the tenant; check your base url</td>
      </tr>
      <tr>
        <td><span class="badge badge-danger">400</span></td>
        <td><code>{"error": "invalid_request", "error_description": "Fields with "." are not allowed, please remove all dotted fields..."}</code></br>If you are using rules, some field name contains dots</td>
      </tr>
      <tr>
        <td><span class="badge badge-danger">403</span></td>
        <td><code>{"error": "unauthorized_client", "error_description": "invalid client"}</code></br>The provided <code>client_id</code> is not valid</td>
      </tr>
      <tr>
        <td><span class="badge badge-danger">403</span></td>
        <td><code>{"error": "access_denied", "error_description": "..."}</code></br>Validation of specific points raised an access issue</td>
      </tr>
    </tbody>
</table>