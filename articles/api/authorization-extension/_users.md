# Users

These endpoints enable you to manage all the current users of your applications. You can retrieve their profile and edit or view their groups and their <dfn data-key="role">roles</dfn>.

For more information, refer to [Auth0 Authorization Extension](/extensions/authorization-extension/v2#users).

## Get all Users

<h5 class="code-snippet-title">Examples</h5>

```http
GET https://{extension_url}/users
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
               "user_id":"59091da1b3c34a15589c780d",
               "provider":"auth0",
               "connection":"Username-Password-Authentication"
            }
         ],
         "user_id":"auth0|59091da1b3c34a15589c780d",
         "last_login":"2017-06-25T07:28:54.719Z",
         "name":"dummy.user@example.com",
         "picture":"https://s.gravatar.com/avatar/your-gravatar.png",
         "email":"richard.dowinton@auth0.com"
      }
   ],
   "total":1
}
```

<%=
include('../../_includes/_http-method', {
  "http_badge": "badge-primary",
  "http_method": "GET",
  "path": '/users',
  "link": "#get-users"
}) %>

Use this endpoint to retrieve all users.

### Scopes

The <dfn data-key="access-token">[Access Token](#get-an-access-token)</dfn> should have the following <dfn data-key="scope">scopes</dfn>:

<span class="badge">read:users</span>

### Parameters

| Parameter        | Description |
|:-----------------|:------------|
| `{extension_url}` <br/><span class="label label-danger">Required</span> | The URL of your Authorization Extension. For more info, see [Find your extension URL](#find-your-extension-url) |
| `{access_token}` <br/><span class="label label-danger">Required</span> | The token your client retrieved from Auth0 in order to access the API. For more info, see [Get an Access Token](#get-an-access-token) |
| `{page}` | The page number. One-based. |
| `{per_page}` | The amount of entries per page. Default: `100`. Max value: `200`. |

## Get a single User

<h5 class="code-snippet-title">Examples</h5>

```http
GET https://{extension_url}/users/{user_id}
```

> RESPONSE SAMPLE:

```text
{
   "email":"dummy.user@example.com",
   "email_verified":true,
   "user_id":"auth0|59091da1b3c34a15589c780d",
   "picture":"https://s.gravatar.com/avatar/your-gravatar.png",
   "nickname":"dummy.user",
   "identities":[
      {
         "user_id":"59091da1b3c34a15589c780d",
         "provider":"auth0",
         "connection":"Username-Password-Authentication",
         "isSocial":false
      }
   ],
   "updated_at":"2017-06-25T07:28:54.719Z",
   "created_at":"2017-06-08T15:30:41.237Z",
   "name":"dummy.user@example.com",
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
```

<% var path = '/users/{user_id}'; %>
<%=
include('../../_includes/_http-method', {
  "http_badge": "badge-primary",
  "http_method": "GET",
  "path": path,
  "link": "#get-single-user"
}) %>

Use this endpoint to get a single user based on its unique identifier.

### Scopes

The <dfn data-key="access-token">[Access Token](#get-an-access-token)</dfn> should have the following <dfn data-key="scope">scopes</dfn>:

<span class="badge">read:users</span>

### Parameters

| Parameter        | Description |
|:-----------------|:------------|
| `{extension_url}` <br/><span class="label label-danger">Required</span> | The URL of your Authorization Extension. For more info, see [Find your extension URL](#find-your-extension-url) |
| `{access_token}` <br/><span class="label label-danger">Required</span> | The token your client retrieved from Auth0 in order to access the API. For more info, see [Get an Access Token](#get-an-access-token) |
| `{user_id}` <br/><span class="label label-danger">Required</span> | The id of the user to retrieve. |

## Get User Groups

<h5 class="code-snippet-title">Examples</h5>

```http
GET https://{extension_url}/users/{user_id}/groups
```

> RESPONSE SAMPLE:

```text
[
   {
      "_id":"2a1e2b9f-3435-4954-8c5d-56e8e9ce763f",
      "name":"Test",
      "description":"Test"
   },
   {
      "_id":"81097bea-f7a3-48b6-a3fc-e2c3eb6c1ace",
      "name":"Google",
      "description":"Google"
   }
]
```

<% var path = '/users/{user_id}/groups'; %>
<%=
include('../../_includes/_http-method', {
  "http_badge": "badge-primary",
  "http_method": "GET",
  "path": path,
  "link": "#get-user-groups"
}) %>

Use this endpoint to get the groups of a single user, based on its unique identifier. Add "?expand" to also load all roles and permissions for these groups.

### Scopes

The <dfn data-key="access-token">[Access Token](#get-an-access-token)</dfn> should have the following <dfn data-key="scope">scopes</dfn>:

<span class="badge">read:users</span>

### Parameters

| Parameter        | Description |
|:-----------------|:------------|
| `{extension_url}` <br/><span class="label label-danger">Required</span> | The URL of your Authorization Extension. For more info, see [Find your extension URL](#find-your-extension-url) |
| `{access_token}` <br/><span class="label label-danger">Required</span> | The token your client retrieved from Auth0 in order to access the API. For more info, see [Get an Access Token](#get-an-access-token) |
| `{user_id}` <br/><span class="label label-danger">Required</span> | The id of the user to retrieve. |

## Add User to Groups

<h5 class="code-snippet-title">Examples</h5>

```http
PATCH https://{extension_url}/users/{user_id}/groups
Content-Type:   'application/json'
Authorization:  'Bearer {access_token}'
[ "{group_id}" ]
```

```shell
curl --request PATCH \
  --url 'https://{extension_url}/users/{user_id}/groups' \
  --header 'Authorization: Bearer {access_token}' \
  --header 'Content-Type: application/json' \
  --data '[ "{group_id}" ]'
```

> RESPONSE SAMPLE:

```text
(empty response body)
```

<% var path = '/users/{user_id}/groups'; %>
<%=
include('../../_includes/_http-method', {
  "http_badge": "badge-warning",
  "http_method": "PATCH",
  "path": path,
  "link": "#add-user-to-groups"
}) %>

Use this endpoint to add one or more users in a group.

### Scopes

The <dfn data-key="access-token">[Access Token](#get-an-access-token)</dfn> should have the following <dfn data-key="scope">scopes</dfn>:

<span class="badge">update:groups</span>

### Parameters

| Parameter        | Description |
|:-----------------|:------------|
| `{extension_url}` <br/><span class="label label-danger">Required</span> | The URL of your Authorization Extension. For more info, see [Find your extension URL](#find-your-extension-url) |
| `{access_token}` <br/><span class="label label-danger">Required</span> | The token your client retrieved from Auth0 in order to access the API. For more info, see [Get an Access Token](#get-an-access-token) |
| `{user_id}` <br/><span class="label label-danger">Required</span> | The id of the user that you want to add to groups |
| `{group_id}` <br/><span class="label label-danger">Required</span> | The id of the group to which you want to add users |

## Calculate Group Memberships

<h5 class="code-snippet-title">Examples</h5>

```http
GET https://{extension_url}/users/{user_id}/groups/calculate
```

> RESPONSE SAMPLE:

```text
[
   {
      "_id":"2a1e2b9f-3435-4954-8c5d-56e8e9ce763f",
      "name":"Test",
      "description":"Test"
   },
   {
      "_id":"81097bea-f7a3-48b6-a3fc-e2c3eb6c1ace",
      "name":"Google",
      "description":"Google"
   }
]
```

<% var path = '/users/{user_id}/groups/calculate'; %>
<%=
include('../../_includes/_http-method', {
  "http_badge": "badge-primary",
  "http_method": "GET",
  "path": path,
  "link": "#calculate-group-memberships"
}) %>

Use this endpoint to calculate the group memberships for a user (including nested groups).

### Scopes

The <dfn data-key="access-token">[Access Token](#get-an-access-token)</dfn> should have the following <dfn data-key="scope">scopes</dfn>:

<span class="badge">read:groups</span>

### Parameters

| Parameter        | Description |
|:-----------------|:------------|
| `{extension_url}` <br/><span class="label label-danger">Required</span> | The URL of your Authorization Extension. For more info, see [Find your extension URL](#find-your-extension-url) |
| `{access_token}` <br/><span class="label label-danger">Required</span> | The token your client retrieved from Auth0 in order to access the API. For more info, see [Get an Access Token](#get-an-access-token) |
| `{user_id}` <br/><span class="label label-danger">Required</span> | The id of the user for whom you want to calculate the group memberships |

## Get User Roles

<h5 class="code-snippet-title">Examples</h5>

```http
GET https://{extension_url}/users/{user_id}/roles
```

> RESPONSE SAMPLE:

```text
[
   {
      "_id":"9b814aac-87ba-4d84-8de6-3bcd0afee761",
      "name":"Test",
      "applicationId":"LcGQZRtjVPPtZfq33I8vtKxldPKPRwBa",
      "description":"Test"
   },
   {
      "_id":"7f3d03a7-b44e-4605-ad68-c2d94912a692",
      "name":"Example 2",
      "applicationId":"LcGQZRtjVPPtZfq33I8vtKxldPKPRwBa",
      "description":"Example"
   }
]
```

<% var path = '/users/{user_id}/roles'; %>
<%=
include('../../_includes/_http-method', {
  "http_badge": "badge-primary",
  "http_method": "GET",
  "path": path,
  "link": "#get-user-roles"
}) %>

Use this endpoint to get the roles of a single user, based on its unique identifier.

### Scopes

The <dfn data-key="access-token">[Access Token](#get-an-access-token)</dfn> should have the following <dfn data-key="scope">scopes</dfn>:

<span class="badge">read:users</span>

### Parameters

| Parameter        | Description |
|:-----------------|:------------|
| `{extension_url}` <br/><span class="label label-danger">Required</span> | The URL of your Authorization Extension. For more info, see [Find your extension URL](#find-your-extension-url) |
| `{access_token}` <br/><span class="label label-danger">Required</span> | The token your client retrieved from Auth0 in order to access the API. For more info, see [Get an Access Token](#get-an-access-token) |
| `{user_id}` <br/><span class="label label-danger">Required</span> | The id of the user for whom you want to retrieve the roles |

## Add User to Roles

<h5 class="code-snippet-title">Examples</h5>

```http
PATCH https://{extension_url}/users/{user_id}/roles
Content-Type:   'application/json'
Authorization:  'Bearer {access_token}'
[ "{role_id}" ]
```

```shell
curl --request PATCH \
  --url 'https://{extension_url}/users/{user_id}/roles' \
  --header 'Authorization: Bearer {access_token}' \
  --header 'Content-Type: application/json' \
  --data '[ "{role_id}" ]'
```

> RESPONSE SAMPLE:

```text
(empty response body)
```

<% var path = '/users/{user_id}/roles'; %>
<%=
include('../../_includes/_http-method', {
  "http_badge": "badge-warning",
  "http_method": "PATCH",
  "path": path,
  "link": "#add-user-to-roles"
}) %>

Use this endpoint to assign a role to a user.

### Scopes

The <dfn data-key="access-token">[Access Token](#get-an-access-token)</dfn> should have the following <dfn data-key="scope">scopes</dfn>:

<span class="badge">update:users</span>

### Parameters

| Parameter        | Description |
|:-----------------|:------------|
| `{extension_url}` <br/><span class="label label-danger">Required</span> | The URL of your Authorization Extension. For more info, see [Find your extension URL](#find-your-extension-url) |
| `{access_token}` <br/><span class="label label-danger">Required</span> | The token your client retrieved from Auth0 in order to access the API. For more info, see [Get an Access Token](#get-an-access-token) |
| `{user_id}` <br/><span class="label label-danger">Required</span> | The id of the user that you want to assign to roles |
| `{role_id}` <br/><span class="label label-danger">Required</span> | The id of the role to which you want to assign users |

## Remove User from Roles

<h5 class="code-snippet-title">Examples</h5>

```http
DELETE https://{extension_url}/users/{user_id}/roles
Content-Type:   'application/json'
Authorization:  'Bearer {access_token}'
[ "{role_id}" ]
```

```shell
curl --request DELETE \
  --url 'https://{extension_url}/users/{user_id}/roles' \
  --header 'Authorization: Bearer {access_token}' \
  --header 'Content-Type: application/json' \
  --data '[ "{role_id}" ]'
```

> RESPONSE SAMPLE:

```text
(empty response body)
```

<% var path = '/users/{user_id}/roles'; %>
<%=
include('../../_includes/_http-method', {
  "http_badge": "badge-danger",
  "http_method": "DELETE",
  "path": path,
  "link": "#remove-user-from-role"
}) %>

Use this endpoint to remove one or more user from a role.

### Scopes

The <dfn data-key="access-token">[Access Token](#get-an-access-token)</dfn> should have the following <dfn data-key="scope">scopes</dfn>:

<span class="badge">update:roles</span>

### Parameters

| Parameter        | Description |
|:-----------------|:------------|
| `{extension_url}` <br/><span class="label label-danger">Required</span> | The URL of your Authorization Extension. For more info, see [Find your extension URL](#find-your-extension-url) |
| `{access_token}` <br/><span class="label label-danger">Required</span> | The token your client retrieved from Auth0 in order to access the API. For more info, see [Get an Access Token](#get-an-access-token) |
| `{user_id}` <br/><span class="label label-danger">Required</span> | The id of the user you want to remove from roles |
| `body` <br/><span class="label label-danger">Required</span> | The id of the role(s) you want to remove users from (i.e. `[ "{role_id}" ]`) |

## Calculate Roles

<h5 class="code-snippet-title">Examples</h5>

```http
GET https://{extension_url}/users/{user_id}/roles/calculate
```

> RESPONSE SAMPLE:

```text
[
   {
      "_id":"9b814aac-87ba-4d84-8de6-3bcd0afee761",
      "name":"Test",
      "applicationId":"LcGQZRtjVPPtZfq33I8vtKxldPKPRwBa",
      "description":"Test"
   },
   {
      "_id":"7f3d03a7-b44e-4605-ad68-c2d94912a692",
      "name":"Example 2",
      "applicationId":"LcGQZRtjVPPtZfq33I8vtKxldPKPRwBa",
      "description":"Example"
   }
]
```

<% var path = '/users/{user_id}/roles/calculate'; %>
<%=
include('../../_includes/_http-method', {
  "http_badge": "badge-primary",
  "http_method": "GET",
  "path": path,
  "link": "#calculate-roles"
}) %>

Use this endpoint to calculate the roles assigned to the user (including through group memberships).

### Scopes

The <dfn data-key="access-token">[Access Token](#get-an-access-token)</dfn> should have the following <dfn data-key="scope">scopes</dfn>:

<span class="badge">read:roles</span>

### Parameters

| Parameter        | Description |
|:-----------------|:------------|
| `{extension_url}` <br/><span class="label label-danger">Required</span> | The URL of your Authorization Extension. For more info, see [Find your extension URL](#find-your-extension-url) |
| `{access_token}` <br/><span class="label label-danger">Required</span> | The token your client retrieved from Auth0 in order to access the API. For more info, see [Get an Access Token](#get-an-access-token) |
| `{user_id}` <br/><span class="label label-danger">Required</span> | The id of the user for whom you want to calculate the roles |

## Execute Authorization Policy

<h5 class="code-snippet-title">Examples</h5>

```http
```

```shell
curl --request POST \
  --url 'https://{extension_url}/users/{user_id}/policy/{client_id}' \
  --header 'Authorization: Bearer {access_token}' \
  --header 'content-type: application/json' \
  --data '{ "connectionName": "Username-Password-Database", "groups": [{group_id}] }'
```

> RESPONSE SAMPLE:

```text
{
   "groups":[
      "New name",
      "Google",
      "My name"
   ],
   "permissions":[

   ],
   "roles":[
      "Test",
      "Example 2"
   ]
}
```

<% var path = '/users/{user_id}/policy/{client_id}'; %>
<%=
include('../../_includes/_http-method', {
  "http_badge": "badge-success",
  "http_method": "POST",
  "path": path,
  "link": "#execute-authz-policy"
}) %>

Use this endpoint to execute the authorization policy for a user in the context of a client. This will return the user's groups but also roles and permissions that apply to the current client.

### Scopes

The <dfn data-key="access-token">[Access Token](#get-an-access-token)</dfn> should have the following <dfn data-key="scope">scopes</dfn>:

<span class="badge">read:users</span>

### Parameters

| Parameter        | Description |
|:-----------------|:------------|
| `{extension_url}` <br/><span class="label label-danger">Required</span> | The URL of your Authorization Extension. For more info, see [Find your extension URL](#find-your-extension-url) |
| `{access_token}` <br/><span class="label label-danger">Required</span> | The token your client retrieved from Auth0 to access the API. For more info, see [Get an Access Token](#get-an-access-token) |
| `{user_id}` <br/><span class="label label-danger">Required</span> |  |
| `{client_id}` <br/><span class="label label-danger">Required</span> |  |
| `connectionName` <br/><span class="label label-danger">Required</span> | The name of the connection with which the user logged in |
| `groups` | List of group names received from the IdP (AD, ADFS, and so on) |
