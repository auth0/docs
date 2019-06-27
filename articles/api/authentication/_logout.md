# Logout

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

<%= include('../../_includes/_http-method', {
  "http_badge": "badge-primary",
  "http_method": "GET",
  "path": "/v2/logout",
  "link": "#logout"
}) %>

Use this endpoint to logout a user. If you want to navigate the user to a specific URL after the logout, set that URL at the `returnTo` parameter. The URL should be included in any the appropriate `Allowed Logout URLs` list:
- If the `client_id` parameter is included, the `returnTo` URL must be listed in the `Allowed Logout URLs` set at the application level (see [Setting Allowed Logout URLs at the App Level](/logout#set-the-allowed-logout-urls-at-the-application-level)).
- If the `client_id` parameter is NOT included, the `returnTo` URL must be listed in the `Allowed Logout URLs` set at the tenant level (see [Setting Allowed Logout URLs at the Tenant Level](/logout#set-the-allowed-logout-urls-at-the-tenant-level)).
- If the `client_id` parameter is included and the `returnTo` URL is NOT set, the server returns the user to the first Allowed Logout URLs set in the Dashboard (see [Setting Allowed Logout URLs at the Tenant Level](/logout#set-the-allowed-logout-urls-at-the-tenant-level)).


### Request Parameters

| Parameter        | Description |
|:-----------------|:------------|
| `returnTo `      | URL to redirect the user after the logout. |
| `client_id`      | The `client_id` of your application. |
| `federated`      | Add this querystring parameter to the logout URL, to log the user out of their identity provider, as well: `https://${account.namespace}/v2/logout?federated`. |


### Test with Authentication API Debugger

<%= include('../../_includes/_test-this-endpoint') %>

1. At the *Configuration* tab, set the fields **Application** (select the application you want to use for the test) and **Connection** (the name of the social connection to use).

1. Copy the <dfn data-key="callback">**Callback URL**</dfn> and set it as part of the **Allowed Logout URLs** of your [Application Settings](${manage_url}/#/applications).

1. At the *Other Flows* tab, click **Logout**, or **Logout (Federated)** to log the user out of the identity provider as well.


### Remarks

- Logging the user out of their identity provider is not common practice, so think about the user experience before you use the `federated` querystring parameter.
- The sample auth0.js script uses the library version 8. If you are using auth0.js version 7, please see this [reference guide](/libraries/auth0js/v7).

### More Information

- [Logout](/logout)
