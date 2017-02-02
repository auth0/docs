# Account Linking

## Link

<h5 class="code-snippet-title">Examples</h5>

```http
GET https://${account.namespace}/authorize?
  response_type=code|token&
  client_id=${account.clientId}&
  connection=CONNECTION&
  redirect_uri=${account.callback}&
  access_token=LOGGED_IN_USER_ACCESS_TOKEN
```

<%= include('../../_includes/_http-method', {
  "http_method": "GET",
  "path": "/authorize",
  "link": "#link"
}) %>

::: panel-danger Deprecation Notice
This endpoint is deprecated for account linking. The [POST /api/v2/users/{id}/identities](/api/management/v2#!/Users/post_identities) should be used instead. For more information refer to the [Migration Notice](/migrations#account-linking-removal).
:::

Call this endpoint when a user wants to link a second authentication method (for example, a user/password database connection, with Facebook).

This endpoint will trigger the login flow to link an existing account with a new one. This will return a 302 redirect to the `connection` that the current user wants to add. The user is identified by the `access_token` that was returned on login success.


### Request Parameters

| Parameter        | Description |
|:-----------------|:------------|
| `response_type`<br/><span class="label label-danger">Required</span>  | Use `code` for server side flows, `token` for client side flows |
| `client_id`<br/><span class="label label-danger">Required</span>      | The `client_id` of your client |
| `connection`     | The name of the connection configured to your client. If null, it will redirect to [Auth0 Login Page](https://auth0.com/#/login_page) and show the Login Widget using the first database connection. |
| `redirect_uri`<br/><span class="label label-danger">Required</span>   | The URL to which Auth0 will redirect the browser after authorization has been granted by the user. |
| `access_token`<br/><span class="label label-danger">Required</span>   | The logged-in user's access token |


### Remarks

- The `redirect_uri` value must be specified as a valid callback URL under your [Client's Settings](${manage_url}/#/clients/${account.clientId}/settings).


### More Information

- [Linking Accounts](/link-accounts)
- [User Initiated Account Linking](/link-accounts/user-initiated-linking)
- [Account Linking from Server Side Code](/link-accounts/suggested-linking)


## Unlink

<h5 class="code-snippet-title">Examples</h5>

```http
POST https://${account.namespace}/login/unlink
Content-Type: 'application/json'
{
  "access_token": "LOGGED_IN_USER_ACCESS_TOKEN", // Primary identity access_token
  "user_id": "LINKED_USER_ID" // (provider|id)
}
```

```shell
curl --request POST \
  --url 'https://${account.namespace}/login/unlink' \
  --header 'content-type: application/json' \
  --data '{"access_token": "LOGGED_IN_USER_ACCESS_TOKEN", "user_id": "LINKED_USER_ID"}'
```

```javascript
var url = 'https://' + ${account.namespace} + '/login/unlink';
var params = 'access_token=LOGGED_IN_USER_ACCESS_TOKEN&user_id=' + localStorage.getItem('user_id');

var xhr = new XMLHttpRequest();
xhr.open('POST', url);
xhr.setRequestHeader('Content-Type', 'application/json');

xhr.onload = function() {
  if (xhr.status == 200) {
    fetchProfile();
  } else {
    alert("Request failed: " + xhr.statusText);
  }
};

xhr.send(params);
```

<%= include('../../_includes/_http-method', {
  "http_method": "POST",
  "path": "/login/unlink",
  "link": "#unlink"
}) %>

::: panel-danger Deprecation Notice
This endpoint is deprecated. The [DELETE /api/v2/users/{id}/identities/{provider}/{user_id}](/api/management/v2#!/Users/delete_provider_by_user_id) should be used instead.
:::

Given a logged-in user's `access_token` and `user_id`, this endpoint will unlink a user's account from the identity provider.


### Request Parameters

| Parameter        | Description |
|:-----------------|:------------|
| `access_token`<br/><span class="label label-danger">Required</span>   | The logged-in user's `access token` |
| `user_id`<br/><span class="label label-danger">Required</span>        | The logged-in user's `user_id` |


### Test with Postman

<%= include('../../_includes/_test-with-postman') %>


### More Information

- [Unlinking Accounts](/link-accounts#unlinking-accounts)
