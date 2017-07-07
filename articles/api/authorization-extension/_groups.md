# Groups

<h5 class="code-snippet-title">Examples</h5>

```http
POST https://${account.namespace}/DUMMY
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
   "groups":[
      {
         "_id":"2a1e2b9f-3435-4954-8c5d-56e8e9ce763f",
         "name":"Test",
         "description":"Test",
         "members":[
            "auth0|59396da1b3c34a15589c780d"
         ],
         "mappings":[

         ]
      },
      {
         "_id":"81097bea-f7a3-48b6-a3fc-e2c3eb6c1ace",
         "name":"Google",
         "description":"Google",
         "mappings":[
            {
               "_id":"529e053f-285b-4f7f-b73c-c8c37b0ae4f2",
               "groupName":"Google",
               "connectionName":"google-oauth2"
            }
         ],
         "members":[
            "auth0|59396da1b3c34a15589c780d",
            "google-oauth2|113108011846505476166"
         ],
         "nested":[
            "2a1e2b9f-3435-4954-8c5d-56e8e9ce763f"
         ],
         "roles":[
            "9b814aac-87ba-4d84-8de6-3bcd0afee761"
         ]
      }
   ],
   "total":2
}
```

<%=
include('../../_includes/_http-method', {
  "http_method": "GET",
  "path": '/groups',
  "link": "#get-groups"
}) %>

Use this endpoint to retrieve all groups.

### Request Parameters

| Parameter        | Description |
|:-----------------|:------------|
| `protocol` <br/><span class="label label-danger">Required</span> | The protocol to use against the identity provider: `oauth2`, `samlp`, `wsfed`, `wsfed-rms`. |
| `impersonator_id` <br/><span class="label label-danger">Required</span> | The `user_id` of the impersonator. |
| `client_id` <br/><span class="label label-danger">Required</span> | The  `client_id` of the client that is generating the impersonation link.|
| `additionalParameters` | This is a JSON object. You can use this to set additional parameters, like `response_type`, `scope` and `state`. |