# Impersonation

```http
POST https://${account.namespace}/users/{user_id}/impersonate
Content-Type:   application/json
Authorization:  'Bearer {ACCESS_TOKEN}'
{
  protocol: "PROTOCOL",
  impersonator_id: "IMPERSONATOR_ID",
  client_id: "${account.clientId}",
  additionalParameters: [
    "response_type": "code",
    "state": "STATE"
  ]
}
```

```shell
curl --request POST \
  --url 'https://${account.namespace}/users/{user_id}/impersonate' \
  --header 'Authorization: Bearer {ACCESS_TOKEN}' \
  --header 'content-type: application/x-www-form-urlencoded; charset=UTF-8' \
  --data '{"protocol":"PROTOCOL", "impersonator_id":"IMPERSONATOR_ID", "client_id":"${account.clientId}", "additionalParameters": {"response_type": "code", "state": "STATE"}}'
```

```javascript
var url = 'https://' + ${account.namespace} + '/users/' + localStorage.getItem('user_id') + '/impersonate';
var params = 'protocol=PROTOCOL&impersonator_id=IMPERSONATOR_ID&client_id=${account.clientId}';

var xhr = new XMLHttpRequest();

xhr.open('POST', url);
xhr.setRequestHeader('Content-Type', 'application/json');
xhr.setRequestHeader('Authorization', 'Bearer ' + localStorage.getItem('access_token'));

xhr.onload = function() {
  if (xhr.status == 200) {
    fetchProfile();
  } else {
    alert("Request failed: " + xhr.statusText);
  }
};

xhr.send(params);
```

> RESPONSE SAMPLE:

```text
https:/YOUR_DOMAIN/users/IMPERSONATOR_ID/impersonate?&bewit=WFh0MUtm...
```

<% var path = '/users/{user_id}/impersonate'; %>

<%= include('../../../_includes/_http-method', {
  "http_badge": "badge-success",
  "http_method": "POST",
  "path": path,
  "link": "#impersonation"
}) %>

<%= include('../../../_includes/_deprecate-impersonation.md') %>

Use this endpoint to obtain an impersonation URL to login as another user. Useful for troubleshooting.

### Request Parameters

| Parameter        | Description |
|:-----------------|:------------|
| `protocol` <br/><span class="label label-danger">Required</span> | The protocol to use against the identity provider: `oauth2`, `samlp`, `wsfed`, `wsfed-rms`. |
| `impersonator_id` <br/><span class="label label-danger">Required</span> | The `user_id` of the impersonator. |
| `client_id` <br/><span class="label label-danger">Required</span> | The  `client_id` of the client that is generating the impersonation link.|
| `additionalParameters` | This is a JSON object. You can use this to set additional parameters, like `response_type`, `scope` and `state`. |

### Remarks

- This endpoint can only be used with **Global Client** credentials.

- To distinguish between real logins and impersonation logins, the profile of the impersonated user will contain additional impersonated and impersonator properties. For example: `"impersonated": true, "impersonator": {"user_id": "auth0|...", "email": "admin@example.com"}`.

- For a regular web app, you should set the `additionalParameters`: set the `response_type` to be `code`, the `callback_url` to be the <dfn data-key="callback">callback URL</dfn> to which Auth0 will redirect with the authorization code, and the <dfn data-key="scope">`scope`</dfn> to be the JWT claims that you want included in the JWT.


### More Information

- [Impersonate Users](/users/guides/impersonate-users-using-the-dashboard)
