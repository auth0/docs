# Logout

<h5 class="code-snippet-title">Examples</h5>

```http
GET https://${account.namespace}/v2/logout?
  client_id={account.clientId}&
  returnTo=LOGOUT_URL
```

```shell
curl --request GET \
  --url 'https://${account.namespace}/v2/logout' \
  --header 'content-type: application/json' \
  --data '{"client_id":"${account.clientId}", "returnTo":"LOGOUT_URL"}'
```

```javascript
<script src="${auth0js_url}"></script>
<script type="text/javascript">
  var auth0 = new Auth0({
    domain:       '${account.namespace}',
    clientID:     '${account.clientId}',
    callbackURL:  '${account.callback}',
    responseType: 'token'
  });
</script>

$('.logout-dbconn').click(function() {
  //log the user out from their current browser session in your app
  localStorage.removeItem('id_token');

  //log the user out from Auth0
  auth0.logout();

  //log the user out from Auth0 and redirect to tenant-level whitelisted URL LOGOUT_URL
  auth0.logout({ returnTo: 'LOGOUT_URL' }, { version: 'v2' });

  //log the user out from Auth0 and redirect to client-level whitelisted URL LOGOUT_URL
  auth0.logout({ returnTo: 'LOGOUT_URL', client_id: ${account.clientId} }, { version: 'v2' });
});
```

<%= include('../../_includes/_http-method', {
  "http_method": "GET",
  "path": "/v2/logout",
  "link": "#logout"
}) %>

Use this endpoint to logout a user. If you want to navigate the user to a specific URL after the logout, set that URL at the `returnTo` parameter. The URL should be included in any the appropriate `Allowed Logout URLs` list:
- If the `client_id` parameter is included, the `returnTo` URL must be listed in the `Allowed Logout URLs` set at the client level (see [Setting Allowed Logout URLs at the App Level](/logout#setting-allowed-logout-urls-at-the-app-level)).
- If the `client_id` parameter is NOT included, the `returnTo` URL must be listed in the `Allowed Logout URLs` set at the account level (see [Setting Allowed Logout URLs at the Account Level](/logout#setting-allowed-logout-urls-at-the-account-level)).


### Query Parameters

| Parameter        | Description |
|:-----------------|:------------|
| `returnTo `      | URL to redirect the user after the logout (optional) |
| `client_id`      | The `client_id` of your client (optional) |


### Remarks

- Although this is not common practice, you can force the user to also log out of their identity provider. To do this add a `federated` querystring parameter to the logout URL: `https://${account.namespace}/v2/logout?federated`

### More Information

- [Logout](/logout)
