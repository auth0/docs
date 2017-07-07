# Users

<h5 class="code-snippet-title">Examples</h5>

```http
POST https://${account.namespace}/users
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
  --url 'https://${account.namespace}/users' \
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
   "start":0,
   "limit":100,
   "length":5,
   "users":[  
      {  
         "logins_count":12,
         "identities":[  
            {  
               "isSocial":false,
               "user_id":"59396da1b3c34a15589c780d",
               "provider":"auth0",
               "connection":"Username-Password-Authentication"
            }
         ],
         "user_id":"auth0|59396da1b3c34a15589c780d",
         "last_login":"2017-06-25T07:28:54.719Z",
         "name":"richard.dowinton@auth0.com",
         "picture":"https://s.gravatar.com/avatar/3e8ce75cfe7c53f13715df274f63e129?s=480&r=pg&d=https%3A%2F%2Fcdn.auth0.com%2Favatars%2Fri.png",
         "email":"richard.dowinton@auth0.com"
      },
      {  
         "logins_count":8,
         "identities":[  
            {  
               "isSocial":true,
               "user_id":"113108011846505476166",
               "provider":"google-oauth2",
               "connection":"google-oauth2"
            }
         ],
         "user_id":"google-oauth2|113108011846505476166",
         "last_login":"2017-06-23T06:14:54.532Z",
         "name":"Richard Dowinton",
         "picture":"https://lh6.googleusercontent.com/-EoUXjQam4is/AAAAAAAAAAI/AAAAAAAAAAs/dzqddX1PPes/photo.jpg",
         "email":"richard.dowinton@auth0.com"
      }
   ],
   "total":2
}
```

<%=
include('../../_includes/_http-method', {
  "http_method": "GET",
  "path": '/users',
  "link": "#get-users"
}) %>

Use this endpoint to retrieve all users.

### Request Parameters

| Parameter        | Description |
|:-----------------|:------------|
| `protocol` <br/><span class="label label-danger">Required</span> | The protocol to use against the identity provider: `oauth2`, `samlp`, `wsfed`, `wsfed-rms`. |
| `impersonator_id` <br/><span class="label label-danger">Required</span> | The `user_id` of the impersonator. |
| `client_id` <br/><span class="label label-danger">Required</span> | The  `client_id` of the client that is generating the impersonation link.|
| `additionalParameters` | This is a JSON object. You can use this to set additional parameters, like `response_type`, `scope` and `state`. |