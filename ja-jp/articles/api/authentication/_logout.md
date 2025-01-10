# Logout
## Auth0 Logout

<%= include('../../_includes/_http-method', {
  "http_badge": "badge-primary",
  "http_method": "GET",
  "path": "/v2/logout",
  "link": "#logout"
}) %>

```http
GET https://${account.namespace}/v2/logout?
  client_id=${account.clientId}&
  returnTo=LOGOUT_URL
```

```shell
curl --request GET \
  --url 'https://${account.namespace}/v2/logout' \
  --header 'content-type: application/json' \
  --data '{"client_id":"${account.clientId}", "returnTo":"LOGOUT_URL"}'
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
    returnTo: 'YOUR_LOGOUT_URL',
    client_id: '${account.clientId}'
  });
</script>
```

Use this endpoint to logout a user. If you want to navigate the user to a specific URL after the logout, set that URL at the `returnTo` parameter. The URL should be included in any the appropriate `Allowed Logout URLs` list:
- If the `client_id` parameter is included, the `returnTo` URL must be listed in the `Allowed Logout URLs` set at the application level. To learn more, read [Log Users Out of Applications](/authenticate/login/logout/log-users-out-of-applications).
- If the `client_id` parameter is NOT included, the `returnTo` URL must be listed in the `Allowed Logout URLs` set at the tenant level. To learn more, read [Log Users Out of Auth0](/authenticate/login/logout/log-users-out-of-auth0).
- If the `client_id` parameter is included and the `returnTo` URL is NOT set, the server returns the user to the first Allowed Logout URLs set in the Dashboard. To learn more, read [Log Users Out of Applications](/authenticate/login/logout/log-users-out-of-applications).


### Request Parameters

| Parameter        | Description |
|:-----------------|:------------|
| `returnTo`      | URL to redirect the user after the logout. |
| `client_id`      | The `client_id` of your application. |
| `federated`      | Add this query string parameter to the logout URL, to log the user out of their identity provider, as well: `https://${account.namespace}/v2/logout?federated`. |

### Remarks

- Logging the user out of their identity provider is not common practice, so think about the user experience before you use the `federated` query string parameter.
- The sample auth0.js script uses the library version 8. If you are using auth0.js version 7, please see this [reference guide](/libraries/auth0js/v7).

### Learn More

- [Logout](/logout)

## OIDC Logout
<%= include('../../_includes/_http-method', {
  "http_badge": "badge-primary",
  "http_method": "GET",
  "path": "/oidc/logout",
  "link": "#logout"
}) %>

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
    "id_token_hint":"ID_TOKEN_HINT"
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
    id_token_hint: 'YOUR_ID_TOKEN_HINT'
  });
</script>
```

Use this endpoint to logout a user. If you want to navigate the user to a specific URL after the logout, set that URL at the `post_logout_redirect_uri` parameter. The URL should be included in the appropriate `Allowed Logout URLs` list:

- If the `id_token_hint` parameter is included:
  - When the `client_id` parameter is included, the server uses the URL from the `aud` claim in the `id_token_hint` to select which of the `Allowed Logout URLs` to use from the application specified by the `client_id`.
  - When the `client_id` parameter is NOT included, the server uses the URL from the `aud` claim in the `id_token_hint` to select which of the `Allowed Logout URLs` at the tenant level to use.
- If the `id_token_hint` parameter is not included:
  - If the `client_id` parameter is included, the `post_logout_redirect_uri` URL must be listed in the `Allowed Logout URLs` set at the application level.
  - If the `client_id` parameter is NOT included, the `post_logout_redirect_uri` URL must be listed in the `Allowed Logout URLs` set at the tenant level.
  - If the `client_id` parameter is included and the `post_logout_redirect_uri` URL is NOT set, the server returns the user to the first `Allowed Logout URLs` set in Auth0 Dashboard.

  To learn more, read [Log Users Out of Auth0 with OIDC Endpoint](/authenticate/login/logout/log-users-out-of-auth0).


### Request Parameters

| Parameter                             | Description                                                                                                                                                     |
| :------------------------------------ | :-------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `id_token_hint` (Recommended)         | Previously issued ID Token for the user. This is used to indicate which user to log out.                                                                         |
| `logout_hint` (Optional)              | Optional `sid` (session ID) value to indicate which user to log out. Should be provided when `id_token_hint` is not available.                                                                       |
| `post_logout_redirect_uri` (Optional) | URL to redirect the user after the logout.                                                                                                                      |
| `client_id` (Optional)                | The `client_id` of your application.                                                                                                                            |
| `federated` (Optional)                | Add this query string parameter to log the user out of their identity provider: `https://YOUR_DOMAIN/oidc/logout?federated`.        |
| `state` (Optional)                    | An opaque value the applications adds to the initial request that the authorization server includes when redirecting the back to the`post_logout_redirect_uri`. |
| `ui_locales` (Optional)               | Space-delimited list of locales used to constrain the language list for the request. The first locale on the list must match the enabled locale in your tenant  |

### Remarks

- Logging the user out of their social identity provider is not common practice, so think about the user experience before you use the `federated` query string parameter with social identity providers.
- If providing both `id_token_hint` and `logout_hint`, the `logout_hint` value must match the `sid` claim from the id_token_hint.
- If providing both `id_token_hint` and `client_id`, the `client_id` value must match the `aud` claim from the `id_token_hint`.
- If `id_token_hint` is not provided, then the user will be prompted for consent unless a `logout_hint` that matches the user's session ID is provided.
- The `POST` HTTP method is also supported for this request. When using `POST`, the request parameters should be provided in the request body as form parameters instead of the query string. The federated parameter requires a value of `true` or `false`.
- This conforms to the [OIDC RP-initiated Logout Specification](https://openid.net/specs/openid-connect-rpinitiated-1_0.html).

### Learn More

- [Logout](/logout)
- [Use the OIDC Endpoint to Log Users Out of Auth0](/logout/log-users-out-of-auth0)
- [OIDC RP-initiated Logout Specification](https://openid.net/specs/openid-connect-rpinitiated-1_0.html)

## SAML Logout

```http
POST https://${account.namespace}/samlp/CLIENT_ID/logout
```

```shell
curl --request POST \
  --url 'https://${account.namespace}/samlp/CLIENT_ID/logout' \
  --header 'content-type: application/x-www-form-urlencoded' \
  --data '{SAML_LOGOUT_REQUEST}'
```

Use this endpoint to log out a user from an Auth0 tenant configured as a SAML identity provider (IdP).

Logout behavior is determined by the configuration of the SAML2 Web App addon for the application on the Auth0 tenant acting as the SAML IdP. To learn more, read [Log Users Out of SAML Identity Providers](https://auth0.com/docs/authenticate/login/logout/log-users-out-of-saml-idps#configure-slo-when-auth0-is-the-saml-idp).

### Request Parameters

| Parameter | Description |
|:--|:--|
| `CLIENT_ID` | Client ID of your application configured with the [SAML2 Web App addon](https://auth0.com/docs/authenticate/protocols/saml/saml-sso-integrations/enable-saml2-web-app-addon). |
| `SAML_LOGOUT_REQUEST` | SAML `<LogoutRequest>` message. |

### Remarks
- The POST body must contain a valid SAML `<LogoutRequest>` message. To learn more, read [Assertions and Protocols for the OASIS Security Assertion Markup Language (SAML) V2.0 on Oasis](https://docs.oasis-open.org/security/saml/v2.0/saml-core-2.0-os.pdf).

### Learn More
- [Logout](/logout)
- [Log Users Out of SAML Identity Providers](https://auth0.com/docs/authenticate/login/logout/log-users-out-of-saml-idps)
