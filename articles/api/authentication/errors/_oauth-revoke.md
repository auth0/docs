# POST /oauth/revoke

<table class="table">
  <thead>
    <tr>
      <th width="20%">Status</th>
      <th width="80%">Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><span class="badge badge-info">200</span></td>
      <td><code>{"error": "invalid_request", "error_description": "..."}</code></br>The <dfn data-key="refresh-token">Refresh Token</dfn> is revoked, does not exist, or was not issued to the client making the revocation request.</td>
    </tr>
    <tr>
      <td><span class="badge badge-danger">400</span></td>
      <td><code>{"error": "invalid_request", "error_description": "..."}</code></br>The required parameters were not sent in the request.</td>
    </tr>
    <tr>
      <td><span class="badge badge-danger">401</span></td>
      <td><<code>{"error": "invalid_client", "error_description": "..."}</br>The request is not authorized. Check that the client credentials (<code>client_id</code> and <code>client_secret</code>) are present in the request and hold valid values.</td>
    </tr>
  </tbody>
</table>
