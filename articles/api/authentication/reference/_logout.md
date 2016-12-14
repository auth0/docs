# Logout

<h5 class="code-snippet-title">Examples</h5>

```http
GET https://${account.namespace}/v2/logout
Content-Type: 'application/json'
{
  "client_id": "${account.clientId}",
  "returnTo": ""
}
```

```shell
curl --request GET \
  --url 'https://${account.namespace}/v2/logout' \
  --header 'content-type: application/json' \
  --data '{"client_id":"${account.clientId}", "returnTo":""}'
```

```javascript
<script src="${auth0js_url}"></script>
<script type="text/javascript">
  var auth0 = new Auth0({
    domain:       '${account.namespace}',
    clientID:     '${account.clientId}',
    callbackURL:  '{YOUR APP URL}',
    responseType: 'token'
  });
</script>

$('.logout-dbconn').click(function() {
  //log the user out from their current browser session in your app
  localStorage.removeItem('id_token');

  //log the user out from Auth0
  auth0.logout();

  //log the user out from Auth0 and redirect to tenant-level whitelisted URL http://localhost:3000
  auth0.logout({ returnTo: 'http://localhost:3000' }, { version: 'v2' });

  //log the user out from Auth0 and redirect to client-level whitelisted URL http://localhost:3000
  auth0.logout({ returnTo: 'http://localhost:3000', client_id: ${account.clientId} }, { version: 'v2' });
});
```

<%= include('../../../_includes/_http-method', {
  "http_method": "GET",
  "path": "/v2/logout",
  "link": "#logout"
}) %>

Logout the user from the identity provider. If you specify a `returnTo` parameter, we will redirect to the URL specified after the logout. This URL should be included in any of the `Allowed Logout URLs` list. There is a list at the application level (you need to use the `client_id` parameter to select the desired application's `Allowed Logout URLs` list) and a list at the Account level.


### Query Parameters

| Parameter        | Description |
|:-----------------|:------------|
| `returnTo `      | An `Allowed Logout URL` (optional)|
| `client_id`      | The `client_id` of your app (optional) |


### Remarks

- If the `client_id` parameter is included, the `returnTo` URL must be listed in the `Allowed Logout URLs` set at the client level (see [Setting Allowed Logout URLs at the App Level](/logout#setting-allowed-logout-urls-at-the-app-level)).
- If the `client_id` parameter is NOT included, the `returnTo` URL must be listed in the `Allowed Logout URLs` set at the account level (see [Setting Allowed Logout URLs at the Account Level](/logout#setting-allowed-logout-urls-at-the-account-level)).
- Although this is not common practice, you can force the user to also log out of their identity provider. To do this add a `federated` querystring parameter to the logout URL: `https://${account.namespace}/v2/logout?federated`

### More Information
- [Logout](/logout)
