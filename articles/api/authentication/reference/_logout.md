# Logout

<h5 class="code-snippet-title">Examples</h5>

```http
GET https://${account.namespace}/v2/logout
Content-Type: 'application/json'
{
  "client_id": "${account.client_id}",
  "returnTo": ""
}
```

```shell
curl --request GET \
  --url 'https://${account.namespace}/v2/logout' \
  --header 'content-type: application/json' \
  --data '{"client_id":"${account.client_id}", "returnTo":""}'
```

```javascript
```

Logout the user from the identity provider. If you specify a `returnTo` parameter, we will redirect to the URL specified after the logout. This URL should be included in any of the `Allowed Logout URLs` list. There is a list at the application level (you need to use the `client_id` parameter to select the desired application's `Allowed Logout URLs` list) and a list at the Account level. For more information, see: [Logout](/logout).


**Query Parameters**

| Parameter        | Description |
|:-----------------|:------------|
| `returnTo `      | An `Allowed Logout URL` (optional)|
| `client_id`      | The `client_id` of your app (optional) |


**Remarks**

- If the `client_id` parameter is included, the `returnTo` URL must be listed in the `Allowed Logout URLs` set at the client level (see [Setting Allowed Logout URLs at the App Level](/logout#setting-allowed-logout-urls-at-the-app-level)).
- If the `client_id` parameter is NOT included, the `returnTo` URL must be listed in the `Allowed Logout URLs` set at the account level (see [Setting Allowed Logout URLs at the Account Level](/logout#setting-allowed-logout-urls-at-the-account-level)).
