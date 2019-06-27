# Permissions

Permissions are actions or functions that a user, or group of user, is allowed to do. For example, let's say that you have an application that allows employees to enter in company expenses. You want all employees to be able to submit expenses, but want certain Finance users to have more admin type of actions such as being able to approve or delete expenses. These actions can be mapped to [permissions](/extensions/authorization-extension#permissions) (which later on can be grouped in <dfn data-key="role">[roles](/extensions/authorization-extension#roles)</dfn>):

For more information, refer to [Auth0 Authorization Extension](/extensions/authorization-extension#permissions).

## Get all Permissions

<h5 class="code-snippet-title">Examples</h5>

```http
GET https://{extension_url}/permissions
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
  "http_badge": "badge-primary",
  "http_method": "GET",
  "path": '/permissions',
  "link": "#get-permissions"
}) %>

Use this endpoint to retrieve all permissions.

### Scopes

The <dfn data-key="access-token">[Access Token](#get-an-access-token)</dfn> should have the following <dfn data-key="scope">scopes</dfn>:

<span class="badge">read:permissions</span>

### Parameters

| Parameter        | Description |
|:-----------------|:------------|
| `{extension_url}` <br/><span class="label label-danger">Required</span> | The URL of your Authorization Extension. For more info, see [Find your extension URL](#find-your-extension-url) |
| `{access_token}` <br/><span class="label label-danger">Required</span> | The token your client retrieved from Auth0 in order to access the API. For more info, see [Get an Access Token](#get-an-access-token) |

## Get a single Permission

<h5 class="code-snippet-title">Examples</h5>

```http
GET https://{extension_url}/permissions/{permission_id}
```

> RESPONSE SAMPLE:

```text
{
   "_id":"deeb552d-2d98-4efb-bb84-0c8babe5f431",
   "name":"Example",
   "description":"Example permission"
}
```

<% var path = '/permissions/{permission_id}'; %>
<%=
include('../../_includes/_http-method', {
  "http_badge": "badge-primary",
  "http_method": "GET",
  "path": path,
  "link": "#get-single-permission"
}) %>

Use this endpoint to get a single permission based on its unique identifier.

### Scopes

The <dfn data-key="access-token">[Access Token](#get-an-access-token)</dfn> should have the following <dfn data-key="scope">scopes</dfn>:

<span class="badge">read:permissions</span>

### Parameters

| Parameter        | Description |
|:-----------------|:------------|
| `{extension_url}` <br/><span class="label label-danger">Required</span> | The URL of your Authorization Extension. For more info, see [Find your extension URL](#find-your-extension-url) |
| `{access_token}` <br/><span class="label label-danger">Required</span> | The token your client retrieved from Auth0 in order to access the API. For more info, see [Get an Access Token](#get-an-access-token) |
| `{permission_id}` <br/><span class="label label-danger">Required</span> | The id of the permission to retrieve. |

## Create Permission

<h5 class="code-snippet-title">Examples</h5>

```http
```

```shell
curl --request POST \
  --url 'https://{extension_url}/permissions' \
  --header 'Authorization: Bearer {access_token}' \
  --header 'content-type: application/json' \
  --data '{ "name":"Example name", "description":"Example description", "applicationType":"client", "applicationId":"LcGQZRtjVPPtZfq33I8vtKxldPKPRwBa" }'
```

> RESPONSE SAMPLE:

```text
{
   "name":"Example name",
   "description":"Example description",
   "applicationType":"client",
   "applicationId":"LcGQZRtjVPPtZfq33I8vtKxldPKPRwBa",
   "_id":"4dcdbcbb-e598-4b8f-abc1-7feb57dc54fe"
}
```

<%=
include('../../_includes/_http-method', {
  "http_badge": "badge-success",
  "http_method": "POST",
  "path": "/permissions",
  "link": "#create-permission"
}) %>

Use this endpoint to create a permission.

### Scopes

The <dfn data-key="access-token">[Access Token](#get-an-access-token)</dfn> should have the following <dfn data-key="scope">scopes</dfn>:

<span class="badge">create:permissions</span>

### Parameters

| Parameter        | Description |
|:-----------------|:------------|
| `{extension_url}` <br/><span class="label label-danger">Required</span> | The URL of your Authorization Extension. For more info, see [Find your extension URL](#find-your-extension-url) |
| `{access_token}` <br/><span class="label label-danger">Required</span> | The token your client retrieved from Auth0 in order to access the API. For more info, see [Get an Access Token](#get-an-access-token) |
| `name` | The new permission's name |
| `description` | The new permission's description |
| `applicationType` | The new permission's application type |
| `applicationId` | The new permission's application Id |

## Update Permission

<h5 class="code-snippet-title">Examples</h5>

```http
PUT https://{extension_url}/permissions/{permission_id}
Content-Type:   'application/json'
Authorization:  'Bearer {access_token}'
{
   "name":"New example name",
   "description":"Example description",
   "applicationType":"client",
   "applicationId":"LcGQZRtjVPPtZfq33I8vtKxldPKPRwBa"
}
```

```shell
curl --request PUT \
  --url 'https://{extension_url}/permissions/{permission_id}' \
  --header 'Authorization: Bearer {access_token}' \
  --data '{ "name":"New example name", "description":"Example description", "applicationType":"client", "applicationId":"LcGQZRtjVPPtZfq33I8vtKxldPKPRwBa" }'
```

> RESPONSE SAMPLE:

```text
{
   "_id":"bc6945e0-393a-4405-99d9-96903eaec4a1",
   "name":"New example name",
   "description":"Example description",
   "applicationType":"client",
   "applicationId":"LcGQZRtjVPPtZfq33I8vtKxldPKPRwBa"
}
```

<h5 class="http-method-box">
  <span class="badge badge-warning" href="#update-permission">PUT</span>
  <span class="path" href="#update-permission">/permissions/{permission_id}</span>
</h5>

Use this endpoint to update the details of a permission.

### Scopes

The <dfn data-key="access-token">[Access Token](#get-an-access-token)</dfn> should have the following <dfn data-key="scope">scopes</dfn>:

<span class="badge">update:permissions</span>

### Parameters

| Parameter        | Description |
|:-----------------|:------------|
| `{extension_url}` <br/><span class="label label-danger">Required</span> | The URL of your Authorization Extension. For more info, see [Find your extension URL](#find-your-extension-url) |
| `{access_token}` <br/><span class="label label-danger">Required</span> | The token your client retrieved from Auth0 in order to access the API. For more info, see [Get an Access Token](#get-an-access-token) |
| `{permission_id}` <br/><span class="label label-danger">Required</span> | The id of the permission to update |
| `name` | The updated permission name |
| `description` | The updated permission description |
| `applicationType` | The updated application type |
| `applicationId` | The updated application Id |

## Delete Permission

<h5 class="code-snippet-title">Examples</h5>

```http
DELETE https://{extension_url}/permissions/{permission_id}
Authorization:  'Bearer {access_token}'
```

```shell
curl --request DELETE \
  --url 'https://{extension_url}/permissions/{permission_id}' \
  --header 'Authorization: Bearer {access_token}'
```

> RESPONSE SAMPLE:

```text
(empty response body)
```

<% var path = '/permissions/{permission_id}'; %>
<%=
include('../../_includes/_http-method', {
  "http_badge": "badge-danger",
  "http_method": "DELETE",
  "path": path,
  "link": "#delete-permission"
}) %>

Use this endpoint to remove a permission.

### Scopes

The <dfn data-key="access-token">[Access Token](#get-an-access-token)</dfn> should have the following <dfn data-key="scope">scopes</dfn>:

<span class="badge">delete:permissions</span>

### Parameters

| Parameter        | Description |
|:-----------------|:------------|
| `{extension_url}` <br/><span class="label label-danger">Required</span> | The URL of your Authorization Extension. For more info, see [Find your extension URL](#find-your-extension-url) |
| `{access_token}` <br/><span class="label label-danger">Required</span> | The token your client retrieved from Auth0 in order to access the API. For more info, see [Get an Access Token](#get-an-access-token) |
| `{permission_id}` <br/><span class="label label-danger">Required</span> | The id of the permission to delete |