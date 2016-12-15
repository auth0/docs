# Impersonation

<h5 class="code-snippet-title">Examples</h5>

```http
POST https://${account.namespace}/users/{user_id}/impersonate?
  protocol=PROTOCOL&
  impersonator_id=IMPERSONATOR_ID&
  client_id=${account.clientId}&
  additionalParameters=YOUR_ADDITIONAL_PARAMETERS
```

```shell
curl --request POST \
  --url 'https://${account.namespace}/users/{user_id}/impersonate' \
  --header 'Authorization: Bearer {access_token}' \
  --header 'content-type: application/x-www-form-urlencoded; charset=UTF-8' \
  --data '{"protocol":"", "impersonator_id":"", "client_id":"${account.clientId}", "additionalParameters": {"response_type": "code", "state": ""}}'
```

```javascript
var url = 'https://' + ${account.namespace} + '/users/' + localStorage.getItem('user_id') + '/impersonate';
var params = 'protocol=PROTOCOL&impersonator_id=IMPERSONATOR_ID&client_id=CLIENT_ID';

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
<%=
include('../../_includes/_http-method', {
  "http_method": "POST",
  "path": path,
  "link": "#impersonation"
}) %>

Use this endpoint to obtain an impersonation URL to login as another user. Useful for troubleshooting.


### Query Parameters

| Parameter        | Description |
|:-----------------|:------------|
| `protocol`       | the connection protocol to use: `oauth2`, `samlp`, `wsfed`, `wsfed-rms` |
| `impersonator_id`| the `user_id` of the impersonator |
| `client_id` | the  `client_id` of your client |
| `additionalParameters` | "response_type": "code", "state": "" |


### Remarks

- This endpoint can only be used with **Global Client** credentials.
- To distinguish between real logins and impersonation logins, the profile of the impersonated user will contain additional impersonated and impersonator properties. For example:
`"impersonated": true, "impersonator": {"user_id": "auth0|...", "email": "admin@example.com"}`


### More Information

- [Impersonation](/user-profile/user-impersonation)
