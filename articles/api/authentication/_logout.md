# Logout

```http
GET https://${account.namespace}/oidc/logout?
  post_logout_redirect_uri=LOGOUT_URL&
  id_token_hint=ID_TOKEN_HINT
```

```shell
curl --request GET \
  --url 'https://${account.namespace}/oidc/logout' \
  --header 'content-type: application/json' \
  --data-raw '
  { 
    "client_id":"${account.clientId}", 
    "post_logout_redirect_uri":"LOGOUT_URL", 
    "id_token_hint":"ID_TOKEN_HINT",
    "logout_hint":"LOGOUT_HINT"
  }'
```

```javascript
// Script uses auth0.js. See Remarks for details.
<script src="${auth0js_url}"></script>
<script type="text/javascript">
  // Initialize application
  var webAuth = new auth0.WebAuth({
    domain:       '${account.namespace}',
    clientID:     '${account.clientId}'
  });
  
  webAuth.logout({
    post_logout_redirect_uri: 'YOUR_LOGOUT_URL',
    id_token_hint: 'YOUR_ID_TOKEN_HINT',
    logout_hint: 'YOUR_LOGOUT_HINT'
  });
</script>
```

<%= include('../../_includes/_http-method', {
  "http_badge": "badge-primary",
  "http_method": "GET",
  "path": "/oidc/logout",
  "link": "#logout"
}) %>

Use this endpoint to logout a user. If you want to navigate the user to a specific URL after the logout, set that URL at the `post_logout_redirect_uri` parameter. The URL should be included in the appropriate `Allowed Logout URLs` list:

- If the `id_token_hint` parameter is included:
  - When the `client_id` parameter is included, the server uses the URL from the `aud` claim in the `id_token_hint` to select which of the `Allowed Logout URLs` to use from the application specified by the `client_id`.
  - When the `client_id` parameter is NOT included, the server uses the URL from the `aud` claim in the `id_token_hint` to select which of the `Allowed Logout URLs` at the tenant level to use.
- If the `id_token_hint` parameter is not included:
  - If the `client_id` parameter is included, the `post_logout_redirect_uri` URL must be listed in the `Allowed Logout URLs` set at the application level (see [Setting Allowed Logout URLs at the App Level](/docs/logout#set-the-allowed-logout-urls-at-the-application-level)).
  - If the `client_id` parameter is NOT included, the `post_logout_redirect_uri` URL must be listed in the `Allowed Logout URLs` set at the tenant level (see [Setting Allowed Logout URLs at the Tenant Level](/docs/logout#set-the-allowed-logout-urls-at-the-tenant-level)).
  - If the `client_id` parameter is included and the `post_logout_redirect_uri` URL is NOT set, the server returns the user to the first `Allowed Logout URLs` set in the Dashboard (see [Setting Allowed Logout URLs at the Tenant Level](/docs/logout#set-the-allowed-logout-urls-at-the-tenant-level)).


### Request Parameters

| Parameter                             | Description                                                                                                                                                     |
| :------------------------------------ | :-------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `id_token_hint` (Recommended)         | Previously issued ID Token for the user. This is used to indicate which user to log out                                                                         |
| `logout_hint` (Optional)              | Optional `sub` (user ID) or `sid` (session ID) value to indicate which user to log out.                                                                         |
| `post_logout_redirect_uri` (Optional) | URL to redirect the user after the logout.                                                                                                                      |
| `client_id` (Optional)                | The `client_id` of your application.                                                                                                                            |
| `federated` (Optional)                | Add this query string parameter to log the user out of their identity provider: `https://YOUR_DOMAIN/oidc/logout?federated`.        |
| `state` (Optional)                    | An opaque value the applications adds to the initial request that the authorization server includes when redirecting the back to the`post_logout_redirect_uri`. |
| `ui_locales` (Optional)               | Space-delimited list of locales used to constrain the language list for the request. The first locale on the list must match the enabled locale in your tenant  |


### Test with Authentication API Debugger

<%= include('../../_includes/_test-this-endpoint') %>

1. At the *Configuration* tab, set the fields **Application** (select the application you want to use for the test) and **Connection** (the name of the social connection to use).

1. Copy the **_Callback URL_** and set it as part of the **Allowed Logout URLs** of your Application Settings.

1. At the _Other Flows_ tab, click **Logout**, or **Logout (Federated)** to log the user out of the identity provider as well.


### Remarks

- Logging the user out of their identity provider is not common practice, so think about the user experience before you use the `federated` query string parameter.
- If providing both `id_token_hint` and `logout_hint`, the `logout_hint` value must match either the `sub` or `sid` claim from the id_token_hint.
- If providing both `id_token_hint` and `client_id`, the `client_id` value must match the `aud` claim from the `id_token_hint`.
- If `id_token_hint` is not provided, then the user will be prompted for consent unless a `logout_hint` that matches either the user's ID or session ID is provided.
- The `POST` HTTP method is also supported for this request. When using `POST`, the request parameters should be provided in the request body as form parameters instead of the query string. The federated parameter requires a value of `true` or `false`.
- This conforms to the [OIDC RP-initiated Logout Specification](https://openid.net/specs/openid-connect-rpinitiated-1_0.html).

### More Information

- [Logout](/logout)
- [Use the OIDC Endpoint to Log Users Out of Auth0](/logout/log-users-out-of-auth0)
- [OIDC RP-initiated Logout Specification](https://openid.net/specs/openid-connect-rpinitiated-1_0.html)
