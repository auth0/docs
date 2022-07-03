# Groups

Groups are collections of users. The groups that you will create are dependent on the needs of your business process. For example, you might have a group for your users in Finance, a group for your users in IT, and so on.

For more information, refer to [Auth0 Authorization Extension](/extensions/authorization-extension#groups).

## Get all Groups

<h5 class="code-snippet-title">Examples</h5>

```http
GET https://{extension_url}/groups
Authorization:  'Bearer {access_token}'
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

<% var path = '/groups'; %>
<%=
include('../../_includes/_http-method', {
  "http_badge": "badge-primary",
  "http_method": "GET",
  "path": path,
  "link": "#get-groups"
}) %>

Use this endpoint to retrieve all groups.

### Scopes

The <dfn data-key="access-token">[Access Token](#get-an-access-token)</dfn> should have the following <dfn data-key="scope">scopes</dfn>:

<span class="badge">read:groups</span>

### Parameters

| Parameter        | Description |
|:-----------------|:------------|
| `{extension_url}` <br/><span class="label label-danger">Required</span> | The URL of your Authorization Extension. For more info, see [Find your extension URL](#find-your-extension-url) |
| `{access_token}` <br/><span class="label label-danger">Required</span> | The token your application retrieved from Auth0 in order to access the API. For more info, see [Get an Access Token](#get-an-access-token) |

## Get a single Group

<h5 class="code-snippet-title">Examples</h5>

```http
GET https://{extension_url}/groups/{group_id}
```

> RESPONSE SAMPLE:

```text
{
  "_id": "2a1e2b9f-3435-4954-8c5d-56e8e9ce763f",
  "name": "Test",
  "description": "Test"
}
```

<% var path = '/groups/{group_id}'; %>
<%=
include('../../_includes/_http-method', {
  "http_badge": "badge-primary",
  "http_method": "GET",
  "path": path,
  "link": "#get-single-group"
}) %>

Use this endpoint to get a single group based on its unique identifier. Add "?expand" to also load all <dfn data-key="role">roles</dfn> and permissions for this group.

### Scopes

The <dfn data-key="access-token">[Access Token](#get-an-access-token)</dfn> should have the following <dfn data-key="scope">scopes</dfn>:

<span class="badge">read:groups</span>

### Parameters

| Parameter        | Description |
|:-----------------|:------------|
| `{extension_url}` <br/><span class="label label-danger">Required</span> | The URL of your Authorization Extension. For more info, see [Find your extension URL](#find-your-extension-url) |
| `{access_token}` <br/><span class="label label-danger">Required</span> | The token your application retrieved from Auth0 in order to access the API. For more info, see [Get an Access Token](#get-an-access-token) |
| `{group_id}` <br/><span class="label label-danger">Required</span> | The id of the group to retrieve. |

## Create Group

<h5 class="code-snippet-title">Examples</h5>

```http
```

```shell
curl --request POST \
  --url 'https://{extension_url}/groups' \
  --header 'Authorization: Bearer {access_token}' \
  --header 'content-type: application/json' \
  --data '{"name": "My name", "description": "My description"}'
```

> RESPONSE SAMPLE:

```text
{
  "name":"My name",
  "description":"My description",
  "_id":"3ea7dc85-3e50-4ba8-ae5a-4956ed6b26d5"
}
```

<% var path = '/groups'; %>
<%=
include('../../_includes/_http-method', {
  "http_badge": "badge-success",
  "http_method": "POST",
  "path": path,
  "link": "#create-group"
}) %>

Use this endpoint to create a group.

### Scopes

The <dfn data-key="access-token">[Access Token](#get-an-access-token)</dfn> should have the following <dfn data-key="scope">scopes</dfn>:

<span class="badge">create:groups</span>

### Parameters

| Parameter        | Description |
|:-----------------|:------------|
| `{extension_url}` <br/><span class="label label-danger">Required</span> | The URL of your Authorization Extension. For more info, see [Find your extension URL](#find-your-extension-url) |
| `{access_token}` <br/><span class="label label-danger">Required</span> | The token your application retrieved from Auth0 in order to access the API. For more info, see [Get an Access Token](#get-an-access-token) |
| `name` <br/><span class="label label-danger">Required</span> | The name of the new group |
| `description` | A description of the new group |

## Delete Group

<h5 class="code-snippet-title">Examples</h5>

```http
POST https://{extension_url}/groups/{group_id}
Content-Type:   'application/json'
Authorization:  'Bearer {access_token}'
```

```shell
curl --request POST \
  --url 'https://{extension_url}/groups/{group_id}' \
  --header 'Authorization: Bearer {access_token}' \
```

> RESPONSE SAMPLE:

```text
(empty response body)
```

<% var path = '/groups/{group_id}'; %>
<%=
include('../../_includes/_http-method', {
  "http_badge": "badge-danger",
  "http_method": "DELETE",
  "path": path,
  "link": "#delete-group"
}) %>

Use this endpoint to delete a group.

### Scopes

The <dfn data-key="access-token">[Access Token](#get-an-access-token)</dfn> should have the following <dfn data-key="scope">scopes</dfn>:

<span class="badge">delete:groups</span>

### Parameters

| Parameter        | Description |
|:-----------------|:------------|
| `{extension_url}` <br/><span class="label label-danger">Required</span> | The URL of your Authorization Extension. For more info, see [Find your extension URL](#find-your-extension-url) |
| `{access_token}` <br/><span class="label label-danger">Required</span> | The token your application retrieved from Auth0 in order to access the API. For more info, see [Get an Access Token](#get-an-access-token) |
| `{group_id}` <br/><span class="label label-danger">Required</span> | The id of the group to delete |

## Update Group

<h5 class="code-snippet-title">Examples</h5>

```http
PUT https://{extension_url}/groups/{group_id}
Content-Type:   'application/json'
Authorization:  'Bearer {access_token}'
{
  name: "New name",
  description: "New description"
}
```

```shell
curl --request PUT \
  --url 'https://{extension_url}/groups/{group_id}' \
  --header 'Authorization: Bearer {access_token}' \
  --data '{ "name": "New name", "description": "New description" }'
```

> RESPONSE SAMPLE:

```text
{
  "_id": "2a1e2b9f-3435-4954-8c5d-56e8e9ce763f",
  "name": "New name",
  "description": "New description",
  "members": [
    "auth0|59396da1b3c34a15589c780d"
  ]
}
```

<h5 class="http-method-box">
  <span class="badge badge-warning" href="#update-group">PUT</span>
  <span class="path" href="#update-group">/groups/{group_id}</span>
</h5>

Use this endpoint to update the name or the description of a group.

### Scopes

The <dfn data-key="access-token">[Access Token](#get-an-access-token)</dfn> should have the following <dfn data-key="scope">scopes</dfn>:

<span class="badge">update:groups</span>

### Parameters

| Parameter        | Description |
|:-----------------|:------------|
| `{extension_url}` <br/><span class="label label-danger">Required</span> | The URL of your Authorization Extension. For more info, see [Find your extension URL](#find-your-extension-url) |
| `{access_token}` <br/><span class="label label-danger">Required</span> | The token your application retrieved from Auth0 in order to access the API. For more info, see [Get an Access Token](#get-an-access-token) |
| `{group_id}` <br/><span class="label label-danger">Required</span> | The id of the group to update |
| `name` <br/><span class="label label-danger">Required</span> | The updated group name |
| `description` <br/><span class="label label-danger">Required</span> | The updated group description |

## Get Group Mappings

<h5 class="code-snippet-title">Examples</h5>

```http
GET https://{extension_url}/groups/{group_id}/mappings
```

> RESPONSE SAMPLE:

```text
{
  "_id":"529e053f-285b-4f7f-b73c-c8c37b0ae4f2",
  "groupName":"Google",
  "connectionName":"google-oauth2 (google-oauth2)"
}
```

<% var path = '/groups/{group_id}/mappings'; %>
<%=
include('../../_includes/_http-method', {
  "http_badge": "badge-primary",
  "http_method": "GET",
  "path": path,
  "link": "#get-group-mappings"
}) %>

Use this endpoint to retrieve the mappings of a group.

### Scopes

The <dfn data-key="access-token">[Access Token](#get-an-access-token)</dfn> should have the following <dfn data-key="scope">scopes</dfn>:

<span class="badge">read:groups</span>

### Parameters

| Parameter        | Description |
|:-----------------|:------------|
| `{extension_url}` <br/><span class="label label-danger">Required</span> | The URL of your Authorization Extension. For more info, see [Find your extension URL](#find-your-extension-url) |
| `{access_token}` <br/><span class="label label-danger">Required</span> | The token your application retrieved from Auth0 in order to access the API. For more info, see [Get an Access Token](#get-an-access-token) |
| `{group_id}` <br/><span class="label label-danger">Required</span> | The id of the group whose mappings you want to retrieve |

## Create Group Mappings

<h5 class="code-snippet-title">Examples</h5>

```http
PATCH https://{extension_url}/groups/{group_id}/mappings
Content-Type:   'application/json'
Authorization:  'Bearer {access_token}'
{
  groupName: "Test",
  connectionName: "google-oauth2"
}
```

```shell
curl -v -X PATCH \
  --url 'https://{extension_url}/api/groups/{group_id}/mappings' \
  --header 'Content-Type: application/json' \
  --header 'Authorization: Bearer {access_token}' \
  --data '[{"groupName": "Test", "connectionName": "google-oauth2"}]'
```

> RESPONSE SAMPLE:

```text
(empty response body)
```

<h5 class="http-method-box">
  <span class="badge badge-warning" href="#create-group-mappings">PATCH</span>
  <span class="path" href="#create-group-mappings">/groups/{group_id}/mappings</span>
</h5>

Use this endpoint to create one or more mappings in a group.

Group Mappings allow you to dynamically "add" users to different Groups based on the users' Connections. Essentially, using the Connection and the Groups information provided by the Identity Provider, you can dynamically make the user a member of the group in which you've created the appropriate mapping. For more information, refer to [Group Mappings](/extensions/authorization-extension/v2/implementation/setup#group-mappings). 

### Scopes

The <dfn data-key="access-token">[Access Token](#get-an-access-token)</dfn> should have the following <dfn data-key="scope">scopes</dfn>:

<span class="badge">update:groups</span>

### Parameters

| Parameter        | Description |
|:-----------------|:------------|
| `{extension_url}` <br/><span class="label label-danger">Required</span> | The URL of your Authorization Extension. For more info, see [Find your extension URL](#find-your-extension-url) |
| `{access_token}` <br/><span class="label label-danger">Required</span> | The token your application retrieved from Auth0 in order to access the API. For more info, see [Get an Access Token](#get-an-access-token) |
| `{group_id}` <br/><span class="label label-danger">Required</span> | The id of the group whose mappings you want to retrieve |
| `groupName` <br/><span class="label label-danger">Required</span> | Group to add the users to |
| `connectionName` <br/><span class="label label-danger">Required</span> | Connection for the mapping |

## Delete Group Mappings

<h5 class="code-snippet-title">Examples</h5>

```http
DELETE https://{extension_url}/groups/{group_id}/mappings
Content-Type:   'application/json'
Authorization:  'Bearer {access_token}'
{
  _id: [
    "7b57312c-579a-4798-bd91-9647563e1b8a"
  ],
}
```

```shell
curl --request DELETE \
  --url 'https://{extension_url}/groups/{group_id}/mappings' \
  --header 'Authorization: Bearer {access_token}' \
  --data '{"_id": ["7b57312c-579a-4798-bd91-9647563e1b8a"]}'
```

> RESPONSE SAMPLE:

```text
(empty response body)
```

<% var path = '/groups/{group_id}/mappings'; %>
<%=
include('../../_includes/_http-method', {
  "http_badge": "badge-danger",
  "http_method": "DELETE",
  "path": path,
  "link": "#delete-group-mappings"
}) %>

Use this endpoint to delete one or more group mappings from a group.

### Scopes

The <dfn data-key="access-token">[Access Token](#get-an-access-token)</dfn> should have the following <dfn data-key="scope">scopes</dfn>:

<span class="badge">update:groups</span>

### Parameters

| Parameter        | Description |
|:-----------------|:------------|
| `{extension_url}` <br/><span class="label label-danger">Required</span> | The URL of your Authorization Extension. For more info, see [Find your extension URL](#find-your-extension-url) |
| `{access_token}` <br/><span class="label label-danger">Required</span> | The token your application retrieved from Auth0 in order to access the API. For more information on how to implement this, refer to our [machine-to-machine flow implementation guide](/flows/guides/client-credentials/call-api-client-credentials) |
| `{group_id}` <br/><span class="label label-danger">Required</span> | The id of the group whose mappings you want to delete |

## Get Group Members

<h5 class="code-snippet-title">Examples</h5>

```http
GET https://{extension_url}/groups/{group_id}/members
```

> RESPONSE SAMPLE:

```text
{
   "total":1,
   "users":[
      {
         "email":"richard.dowinton@auth0.com",
         "email_verified":true,
         "user_id":"auth0|59396da1b3c34a15589c780d",
         "picture":"https://s.gravatar.com/avatar/3e8ce75cfe7c53f13715df274f63e129?s=480&r=pg&d=https%3A%2F%2Fcdn.auth0.com%2Favatars%2Fri.png",
         "nickname":"richard.dowinton",
         "identities":[
            {
               "user_id":"59396da1b3c34a15589c780d",
               "provider":"auth0",
               "connection":"Username-Password-Authentication",
               "isSocial":false
            }
         ],
         "updated_at":"2017-06-25T07:28:54.719Z",
         "created_at":"2017-06-08T15:30:41.237Z",
         "name":"richard.dowinton@auth0.com",
         "app_metadata":{
            "authorization":{
               "roles":[

               ],
               "permissions":[

               ]
            }
         },
         "last_ip":"83.208.22.80",
         "last_login":"2017-06-25T07:28:54.719Z",
         "logins_count":12
      }
   ]
}
```

<% var path = '/groups/{group_id}/members'; %>
<%=
include('../../_includes/_http-method', {
  "http_badge": "badge-primary",
  "http_method": "GET",
  "path": path,
  "link": "#get-group-members"
}) %>

Use this endpoint to get the members for a group.

### Scopes

The <dfn data-key="access-token">[Access Token](#get-an-access-token)</dfn> should have the following <dfn data-key="scope">scopes</dfn>:

<span class="badge">read:groups</span>

### Parameters

| Parameter        | Description |
|:-----------------|:------------|
| `{extension_url}` <br/><span class="label label-danger">Required</span> | The URL of your Authorization Extension. For more info, see [Find your extension URL](#find-your-extension-url) |
| `{access_token}` <br/><span class="label label-danger">Required</span> | The token your application retrieved from Auth0 in order to access the API. For more info, see [Get an Access Token](#get-an-access-token) |
| `{group_id}` <br/><span class="label label-danger">Required</span> | The id of the group whose members you want to retrieve |
| `{page}` | The page number. One-based. |
| `{per_page}` | The amount of entries per page. Default: `25`. Max value: `25`. |


## Add Group Members

<h5 class="code-snippet-title">Examples</h5>

```http
PATCH https://{extension_url}/groups/{group_id}/members
Content-Type:   'application/json'
Authorization:  'Bearer {access_token}'
[ "google-oauth2|113108011846505476166" ]
```

```shell
curl --request PATCH \
  --url 'https://{extension_url}/groups/{group_id}/members' \
  --header 'Authorization: Bearer {access_token}' \
  --data '[ "{user_id}" ]'
```

> RESPONSE SAMPLE:

```text
(empty response body)
```

<% var path = '/groups/{group_id}/members'; %>
<%=
include('../../_includes/_http-method', {
  "http_badge": "badge-warning",
  "http_method": "PATCH",
  "path": path,
  "link": "#add-group-members"
}) %>

Use this endpoint to add one or more members in a group.

### Scopes

The <dfn data-key="access-token">[Access Token](#get-an-access-token)</dfn> should have the following <dfn data-key="scope">scopes</dfn>:

<span class="badge">update:groups</span>

### Parameters

| Parameter        | Description |
|:-----------------|:------------|
| `{extension_url}` <br/><span class="label label-danger">Required</span> | The URL of your Authorization Extension. For more info, see [Find your extension URL](#find-your-extension-url) |
| `{access_token}` <br/><span class="label label-danger">Required</span> | The token your application retrieved from Auth0 in order to access the API. For more info, see [Get an Access Token](#get-an-access-token) |
| `{group_id}` <br/><span class="label label-danger">Required</span> | The id of the group to which you want to add members |
| `{user_id}` | Id of the user to add in a group |

## Delete Group Members

<h5 class="code-snippet-title">Examples</h5>

```http
DELETE https://{extension_url}/groups/{group_id}/members
Content-Type:   'application/json'
Authorization:  'Bearer {access_token}'
["7b57312c-579a-4798-bd91-9647563e1b8a"]
```

```shell
curl --request DELETE \
  --url 'https://{extension_url}/groups/{group_id}/members' \
  --header 'Authorization: Bearer {access_token}' \
  --data '["7b57312c-579a-4798-bd91-9647563e1b8a"]'
```

> RESPONSE SAMPLE:

```text
(empty response body)
```

<% var path = '/groups/{group_id}/members'; %>
<%=
include('../../_includes/_http-method', {
  "http_badge": "badge-danger",
  "http_method": "DELETE",
  "path": path,
  "link": "#delete-group-members"
}) %>

Use this endpoint to remove one or more members from a group.

### Scopes

The <dfn data-key="access-token">[Access Token](#get-an-access-token)</dfn> should have the following <dfn data-key="scope">scopes</dfn>:

<span class="badge">update:groups</span>

### Parameters

| Parameter        | Description |
|:-----------------|:------------|
| `{extension_url}` <br/><span class="label label-danger">Required</span> | The URL of your Authorization Extension. For more info, see [Find your extension URL](#find-your-extension-url) |
| `{access_token}` <br/><span class="label label-danger">Required</span> | The token your application retrieved from Auth0 in order to access the API. For more info, see [Get an Access Token](#get-an-access-token) |
| `{group_id}` <br/><span class="label label-danger">Required</span> | The id of the group from which you want to remove members |

## Get Nested Group Members

<h5 class="code-snippet-title">Examples</h5>

```http
GET https://{extension_url}/groups/{group_id}/members/nested
```

> RESPONSE SAMPLE:

```text
{
   "total":1,
   "nested":[
      {
         "user":{
            "user_id":"auth0|59396da1b3c34a15589c780d",
            "name":"richard.dowinton@auth0.com",
            "nickname":"richard.dowinton",
            "email":"richard.dowinton@auth0.com"
         },
         "group":{
            "_id":"2a1e2b9f-3435-4954-8c5d-56e8e9ce763f",
            "name":"New name",
            "description":"New description"
         }
      }
   ]
}
```

<% var path = '/groups/{group_id}/members/nested'; %>
<%=
include('../../_includes/_http-method', {
  "http_badge": "badge-primary",
  "http_method": "GET",
  "path": path,
  "link": "#get-nested-group-members"
}) %>

Use this endpoint to get the nested members for a group.

### Scopes

The <dfn data-key="access-token">[Access Token](#get-an-access-token)</dfn> should have the following <dfn data-key="scope">scopes</dfn>:

<span class="badge">read:groups</span>

### Parameters

| Parameter        | Description |
|:-----------------|:------------|
| `{extension_url}` <br/><span class="label label-danger">Required</span> | The URL of your Authorization Extension. For more info, see [Find your extension URL](#find-your-extension-url) |
| `{access_token}` <br/><span class="label label-danger">Required</span> | The token your application retrieved from Auth0 in order to access the API. For more info, see [Get an Access Token](#get-an-access-token) |
| `{group_id}` <br/><span class="label label-danger">Required</span> | The id of the group from which the nested members will be retrieved |
| `{page}` | The page number. One-based. |
| `{per_page}` | The amount of entries per page. Default: `25`. Max value: `25`. |

## Get Nested Groups

<h5 class="code-snippet-title">Examples</h5>

```http
GET https://{extension_url}/groups/{group_id}/nested
```

> RESPONSE SAMPLE:

```text
[
   {
      "_id":"2a1e2b9f-3435-4954-8c5d-56e8e9ce763f",
      "name":"Test",
      "description":"Test",
      "members":[
         "auth0|59396da1b3c34a15589c780d"
      ]
   }
]
```

<% var path = '/groups/{group_id}/nested'; %>
<%=
include('../../_includes/_http-method', {
  "http_badge": "badge-primary",
  "http_method": "GET",
  "path": path,
  "link": "#get-nested-groups"
}) %>

Use this endpoint to get the nested groups for a group.

### Scopes

The <dfn data-key="access-token">[Access Token](#get-an-access-token)</dfn> should have the following <dfn data-key="scope">scopes</dfn>:

<span class="badge">read:groups</span>

### Parameters

| Parameter        | Description |
|:-----------------|:------------|
| `{extension_url}` <br/><span class="label label-danger">Required</span> | The URL of your Authorization Extension. For more info, see [Find your extension URL](#find-your-extension-url) |
| `{access_token}` <br/><span class="label label-danger">Required</span> | The token your application retrieved from Auth0 in order to access the API. For more info, see [Get an Access Token](#get-an-access-token) |
| `{group_id}` <br/><span class="label label-danger">Required</span> | The id of the group from which the nested members will be retrieved |

## Add Nested Groups

<h5 class="code-snippet-title">Examples</h5>

```http
PATCH https://{extension_url}/groups/{group_id}/nested
Content-Type:   'application/json'
Authorization:  'Bearer {access_token}'
[ "{group_id_to_add}" ]
```

```shell
curl --request PATCH \
  --url 'https://{extension_url}/groups/{group_id}/nested' \
  --header 'Authorization: Bearer {access_token}' \
  --header 'Content-Type: application/json' \
  --data '[ "{group_id_to_add}" ]'
```

> RESPONSE SAMPLE:

```text
(empty response body)
```

<% var path = '/groups/{group_id}/nested'; %>
<%=
include('../../_includes/_http-method', {
  "http_badge": "badge-warning",
  "http_method": "PATCH",
  "path": path,
  "link": "#add-nested-groups"
}) %>

Use this endpoint to add nested groups.

### Scopes

The <dfn data-key="access-token">[Access Token](#get-an-access-token)</dfn> should have the following <dfn data-key="scope">scopes</dfn>:

<span class="badge">update:groups</span>

### Parameters

| Parameter        | Description |
|:-----------------|:------------|
| `{extension_url}` <br/><span class="label label-danger">Required</span> | The URL of your Authorization Extension. For more info, see [Find your extension URL](#find-your-extension-url) |
| `{access_token}` <br/><span class="label label-danger">Required</span> | The token your application retrieved from Auth0 in order to access the API. For more info, see [Get an Access Token](#get-an-access-token) |
| `{group_id}` <br/><span class="label label-danger">Required</span> | The id of the group to which you want to add members |
| `{group_id_to_add}` | List of group IDs that you want to add in the group |

## Delete Nested Groups

<h5 class="code-snippet-title">Examples</h5>

```http
DELETE https://{extension_url}/groups/{group_id}/nested
Content-Type:   'application/json'
Authorization:  'Bearer {access_token}'
["{NESTED_GROUP_ID}"]
```

```shell
curl --request DELETE \
  --url 'https://{extension_url}/groups/{group_id}/nested' \
  --header 'Authorization: Bearer {access_token}' \
  --data '["{NESTED_GROUP_ID}"]'
```

> RESPONSE SAMPLE:

```text
(empty response body)
```

<% var path = '/groups/{group_id}/nested'; %>
<%=
include('../../_includes/_http-method', {
  "http_badge": "badge-danger",
  "http_method": "DELETE",
  "path": path,
  "link": "#delete-nested-group"
}) %>

Use this endpoint to remove one or more nested groups.

### Scopes

The <dfn data-key="access-token">[Access Token](#get-an-access-token)</dfn> should have the following <dfn data-key="scope">scopes</dfn>:

<span class="badge">update:groups</span>

### Parameters

| Parameter        | Description |
|:-----------------|:------------|
| `{extension_url}` <br/><span class="label label-danger">Required</span> | The URL of your Authorization Extension. For more info, see [Find your extension URL](#find-your-extension-url) |
| `{access_token}` <br/><span class="label label-danger">Required</span> | The token your application retrieved from Auth0 in order to access the API. For more info, see [Get an Access Token](#get-an-access-token) |
| `{group_id}` <br/><span class="label label-danger">Required</span> | The id of the group from which you want to remove other group members |
| `{NESTED_GROUP_ID}` <br/><span class="label label-danger">Required</span> | The id of the group to remove |

## Get Group Roles

<h5 class="code-snippet-title">Examples</h5>

```http
GET https://{extension_url}/groups/{group_id}/roles
```

> RESPONSE SAMPLE:

```text
[
   {
      "applicationType":"client",
      "applicationId":"LcGQZRtjVPPtZfq33I8vtKxldPKPRwBa",
      "description":"Test",
      "name":"Test",
      "permissions":[

      ],
      "_id":"9b814aac-87ba-4d84-8de6-3bcd0afee761"
   }
]
```

<% var path = '/groups/{group_id}/roles'; %>
<%=
include('../../_includes/_http-method', {
  "http_badge": "badge-primary",
  "http_method": "GET",
  "path": path,
  "link": "#get-group-roles"
}) %>

Use this endpoint to get the roles for a group.

### Scopes

The <dfn data-key="access-token">[Access Token](#get-an-access-token)</dfn> should have the following <dfn data-key="scope">scopes</dfn>:

<span class="badge">read:groups</span>

### Parameters

| Parameter        | Description |
|:-----------------|:------------|
| `{extension_url}` <br/><span class="label label-danger">Required</span> | The URL of your Authorization Extension. For more info, see [Find your extension URL](#find-your-extension-url) |
| `{access_token}` <br/><span class="label label-danger">Required</span> | The token your application retrieved from Auth0 in order to access the API. For more info, see [Get an Access Token](#get-an-access-token) |
| `{group_id}` <br/><span class="label label-danger">Required</span> | The id of the group from which the nested members will be retrieved |

## Add Group Roles

<h5 class="code-snippet-title">Examples</h5>

```http
PATCH https://{extension_url}/groups/{group_id}/roles
Content-Type:   'application/json'
Authorization:  'Bearer {access_token}'
[ "google-oauth2|113108011846505476166" ]
```

```shell
curl --request PATCH \
  --url 'https://{extension_url}/groups/{group_id}/roles' \
  --header 'Authorization: Bearer {access_token}' \
  --data '[ "{role_id}" ]'
```

> RESPONSE SAMPLE:

```text
(empty response body)
```

<% var path = '/groups/{group_id}/roles'; %>
<%=
include('../../_includes/_http-method', {
  "http_badge": "badge-warning",
  "http_method": "PATCH",
  "path": path,
  "link": "#add-group-roles"
}) %>

Use this endpoint to add roles to a group.

### Scopes

The <dfn data-key="access-token">[Access Token](#get-an-access-token)</dfn> should have the following <dfn data-key="scope">scopes</dfn>:

<span class="badge">update:groups</span>

### Parameters

| Parameter        | Description |
|:-----------------|:------------|
| `{extension_url}` <br/><span class="label label-danger">Required</span> | The URL of your Authorization Extension. For more info, see [Find your extension URL](#find-your-extension-url) |
| `{access_token}` <br/><span class="label label-danger">Required</span> | The token your application retrieved from Auth0 in order to access the API. For more info, see [Get an Access Token](#get-an-access-token) |
| `{group_id}` <br/><span class="label label-danger">Required</span> | The id of the group to which you want to add members |
| `{role_id}` | List of role IDs to add in the group |

## Delete Group Roles

<h5 class="code-snippet-title">Examples</h5>

```http
DELETE https://{extension_url}/groups/{group_id}/roles
Content-Type:   'application/json'
Authorization:  'Bearer {access_token}'
["{GROUP_ROLES_ID}"]
```

```shell
curl --request DELETE \
  --url 'https://{extension_url}/groups/{group_id}/roles' \
  --header 'Authorization: Bearer {access_token}' \
  --data '["{role_id}"]'
```

> RESPONSE SAMPLE:

```text
(empty response body)
```

<% var path = '/groups/{group_id}/roles'; %>
<%=
include('../../_includes/_http-method', {
  "http_badge": "badge-danger",
  "http_method": "DELETE",
  "path": path,
  "link": "#delete-group-roles"
}) %>

Use this endpoint to remove one or more groups roles.

### Scopes

The <dfn data-key="access-token">[Access Token](#get-an-access-token)</dfn> should have the following <dfn data-key="scope">scopes</dfn>:

<span class="badge">update:groups</span>

### Parameters

| Parameter        | Description |
|:-----------------|:------------|
| `{extension_url}` <br/><span class="label label-danger">Required</span> | The URL of your Authorization Extension. For more info, see [Find your extension URL](#find-your-extension-url) |
| `{access_token}` <br/><span class="label label-danger">Required</span> | The token your application retrieved from Auth0 in order to access the API. For more info, see [Get an Access Token](#get-an-access-token) |
| `{group_id}` <br/><span class="label label-danger">Required</span> | The id of the group from which you want to remove members |
| `{role_id}` <br/><span class="label label-danger">Required</span> | The IDs of the roles to be removed from the group |

## Get Nested Group Roles

<h5 class="code-snippet-title">Examples</h5>

```http
GET https://{extension_url}/groups/{group_id}/roles/nested
```

> RESPONSE SAMPLE:

```text
[
   {
      "role":{
         "_id":"9b814aac-87ba-4d84-8de6-3bcd0afee761",
         "applicationType":"client",
         "applicationId":"LcGQZRtjVPPtZfq33I8vtKxldPKPRwBa",
         "description":"Test",
         "name":"Test",
         "permissions":[

         ],
         "users":[
            "auth0|59396da1b3c34a15589c780d"
         ]
      },
      "group":{
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
   }
]
```

<% var path = '/groups/{group_id}/roles/nested'; %>
<%=
include('../../_includes/_http-method', {
  "http_badge": "badge-primary",
  "http_method": "GET",
  "path": path,
  "link": "#get-nested-roles"
}) %>

Use this endpoint to get the nested roles for a group.

### Scopes

The <dfn data-key="access-token">[Access Token](#get-an-access-token)</dfn> should have the following <dfn data-key="scope">scopes</dfn>:

<span class="badge">read:groups</span>

### Parameters

| Parameter        | Description |
|:-----------------|:------------|
| `{extension_url}` <br/><span class="label label-danger">Required</span> | The URL of your Authorization Extension. For more info, see [Find your extension URL](#find-your-extension-url) |
| `{access_token}` <br/><span class="label label-danger">Required</span> | The token your application retrieved from Auth0 in order to access the API. For more info, see [Get an Access Token](#get-an-access-token) |
| `{group_id}` <br/><span class="label label-danger">Required</span> | The id of the group from which the nested members will be retrieved |
