<div class="code-picker">
  <div class="languages-bar">
    <ul>
      <li class="active"><a href="#${idPrevious}" data-toggle="tab">Legacy (ID Token)</a></li>
      <li><a href="#${idCurrent}" data-toggle="tab">Current (Access Token)</a></li>
    </ul>
  </div>
  <div class="tab-content">
    <div id="${idPrevious}" class="tab-pane active">
      <pre class="text hljs">
        <code>
https://${account.namespace}/authorize?
  scope=openid
  &response_type=id_token
  &client_id=${account.clientId}
  &redirect_uri=${account.callback}
  &nonce=NONCE
  &state=OPAQUE_VALUE
        </code>
      </pre>
    </div>
    <div id="${idCurrent}" class="tab-pane">
      <pre class="text hljs">
        <code>
https://${account.namespace}/authorize?
  audience=https://${account.namespace}/api/v2/
  &scope=${scope}
  &response_type=token%20id_token
  &client_id=${account.clientId}
  &redirect_uri=${account.callback}
  &nonce=NONCE
  &state=OPAQUE_VALUE
        </code>
      </pre>
    </div>
  </div>
</div>

To get an <dfn data-key="access-token">Access Token</dfn> that can access the Management API:
- We set the `audience` to `https://${account.namespace}/api/v2/`
- We asked for the <dfn data-key="scope">scope</dfn> `${scope}`
- We set the `response_type` to `id_token token` so Auth0 will sent us both an ID Token and an Access Token

If we decode the Access Token and review its contents we can see the following:

```text
{
  "iss": "https://${account.namespace}/",
  "sub": "auth0|5a620d29a840170a9ef43672",
  "aud": "https://${account.namespace}/api/v2/",
  "iat": 1521031317,
  "exp": 1521038517,
  "azp": "${account.clientId}",
  "scope": "${scope}"
}
```

Notice that the `aud` is set to your tenant's API URI, the `scope` to `${scope}`, and the `sub` to the user ID of the logged in user.