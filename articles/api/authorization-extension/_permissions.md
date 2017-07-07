# Permissions

<h5 class="code-snippet-title">Examples</h5>

```http
POST https://${account.namespace}/permissions
Content-Type:   'application/json'
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
  --url 'https://${account.namespace}/DUMMY' \
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
{
   "permissions":[
      {
         "applicationType":"client",
         "applicationId":"LcGQZRtjVPPtZfq33I8vtKxldPKPRwBa",
         "description":"Example permission",
         "name":"Example",
         "_id":"deeb552d-2d98-4efb-bb84-0c8babe5f431"
      }
   ],
   "total":1
}
```

<%=
include('../../_includes/_http-method', {
  "http_method": "GET",
  "path": '/permissions',
  "link": "#get-permissions"
}) %>

Use this endpoint to retrieve all permissions.

### Request Parameters

| Parameter        | Description |
|:-----------------|:------------|
| `protocol` <br/><span class="label label-danger">Required</span> | The protocol to use against the identity provider: `oauth2`, `samlp`, `wsfed`, `wsfed-rms`. |
| `impersonator_id` <br/><span class="label label-danger">Required</span> | The `user_id` of the impersonator. |
| `client_id` <br/><span class="label label-danger">Required</span> | The  `client_id` of the client that is generating the impersonation link.|
| `additionalParameters` | This is a JSON object. You can use this to set additional parameters, like `response_type`, `scope` and `state`. |