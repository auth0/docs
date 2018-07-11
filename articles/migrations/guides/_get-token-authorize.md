<code-block>
  <code-block-tab data-title="Legacy (ID Token)">

  ```text
  https://${account.namespace}/authorize?
    scope=openid
    &response_type=id_token
    &client_id=${account.clientId}
    &redirect_uri=${account.callback}
    &nonce=CRYPTOGRAPHIC_NONCE
    &state=OPAQUE_VALUE
  ```

  </code-block-tab>
  <code-block-tab data-title="Current (Access Token)">

  ```text
  https://${account.namespace}/authorize?
    audience=https://${account.namespace}/api/v2/
    &scope=${scope}
    &response_type=token%20id_token
    &client_id=${account.clientId}
    &redirect_uri=${account.callback}
    &nonce=CRYPTOGRAPHIC_NONCE
    &state=OPAQUE_VALUE
  ```

  </code-block-tab>
</code-block>

In order to get an Access Token that can access the Management API:
- We set the `audience` to `https://${account.namespace}/api/v2/`
- We asked for the scope `${scope}`
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