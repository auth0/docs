# Roles

<dfn data-key="role">Roles</dfn> are collections of permissions. For example, let's say that you have an application that allows employees to enter in company expenses. You want all employees to be able to submit expenses, but want certain Finance users to have more admin type of actions such as being able to approve or delete expenses. These actions can be mapped to [Permissions](/extensions/authorization-extension#permissions) and then assigned to a certain role.

For more information, refer to [Auth0 Authorization Extension](/extensions/authorization-extension#roles).

## Get all Roles

<h5 class="code-snippet-title">Examples</h5>

```http
GET https://{extension_url}/roles
```

> RESPONSE SAMPLE:

```text
{
   "roles":[
      {
         "applicationType":"client",
         "applicationId":"LcGQZRtjVPPtZfq33I8vtKxldPKPRwBa",
         "description":"Test",
         "name":"Test",
         "permissions":[

         ],
         "_id":"9b814aac-87ba-4d84-8de6-3bcd0afee761"
      },
      {
         "applicationType":"client",
         "applicationId":"LcGQZRtjVPPtZfq33I8vtKxldPKPRwBa",
         "description":"Example",
         "name":"Example 2",
         "permissions":[

         ],
         "_id":"7f3d03a7-b44e-4605-ad68-c2d94912a692"
      }
   ],
   "total":2
}
```

<%=
include('../../_includes/_http-method', {
  "http_badge": "badge-primary",
  "http_method": "GET",
  "path": '/roles',
  "link": "#get-roles"
}) %>

Use this endpoint to retrieve all roles.

### Scopes

The <dfn data-key="access-token">[Access Token](#get-an-access-token)</dfn> should have the following <dfn data-key="scope">scopes</dfn>:

<span class="badge">read:roles</span>

### Parameters

| Parameter        | Description |
|:-----------------|:------------|
| `{extension_url}` <br/><span class="label label-danger">Required</span> | The URL of your Authorization Extension. For more info, see [Find your extension URL](#find-your-extension-url) |
| `{access_token}` <br/><span class="label label-danger">Required</span> | The token your client retrieved from Auth0 in order to access the API. For more info, see [Get an Access Token](#get-an-access-token) |

## Get a single Role

<h5 class="code-snippet-title">Examples</h5>

```http
GET https://{extension_url}/roles/{role_id}
```

> RESPONSE SAMPLE:

```text
{
   "_id":"9b814aac-87ba-4d84-8de6-3bcd0afee761",
   "name":"Test",
   "description":"Test"
}
```

<% var path = '/roles/{role_id}'; %>
<%=
include('../../_includes/_http-method', {
  "http_badge": "badge-primary",
  "http_method": "GET",
  "path": path,
  "link": "#get-single-role"
}) %>

Use this endpoint to get a single role based on its unique identifier.

### Scopes

The <dfn data-key="access-token">[Access Token](#get-an-access-token)</dfn> should have the following <dfn data-key="scope">scopes</dfn>:

<span class="badge">read:roles</span>

### Parameters

| Parameter        | Description |
|:-----------------|:------------|
| `{extension_url}` <br/><span class="label label-danger">Required</span> | The URL of your Authorization Extension. For more info, see [Find your extension URL](#find-your-extension-url) |
| `{access_token}` <br/><span class="label label-danger">Required</span> | The token your client retrieved from Auth0 in order to access the API. For more info, see [Get an Access Token](#get-an-access-token) |
| `{role_id}` <br/><span class="label label-danger">Required</span> | The id of the role to retrieve. |

## Create Role

<h5 class="code-snippet-title">Examples</h5>

```http
```

```shell
curl --request POST \
  --url 'https://{extension_url}/roles' \
  --header 'Authorization: Bearer {access_token}' \
  --header 'content-type: application/json' \
  --data '{ "name":"My new example name", "description":"Example description", "applicationType":"client", "applicationId":"LcGQZRtjVPPtZfq33I8vtKxldPKPRwBa", "permissions":["{permission_id}"] }'
```

> RESPONSE SAMPLE:

```text
{
   "name":"Example name",
   "description":"Example description",
   "applicationType":"client",
   "applicationId":"LcGQZRtjVPPtZfq33I8vtKxldPKPRwBa",
   "permissions":[
      "bc6945e0-393a-4405-99d9-96903eaec4a1"
   ],
   "_id":"22787849-f39c-4165-814f-6996ad8e72a0"
}
```

<%=
include('../../_includes/_http-method', {
  "http_badge": "badge-success",
  "http_method": "POST",
  "path": "/roles",
  "link": "#create-role"
}) %>

Use this endpoint to create a role.

### Scopes

The <dfn data-key="access-token">[Access Token](#get-an-access-token)</dfn> should have the following <dfn data-key="scope">scopes</dfn>:

<span class="badge">create:roles</span>

### Parameters

| Parameter        | Description |
|:-----------------|:------------|
| `{extension_url}` <br/><span class="label label-danger">Required</span> | The URL of your Authorization Extension. For more info, see [Find your extension URL](#find-your-extension-url) |
| `{access_token}` <br/><span class="label label-danger">Required</span> | The token your client retrieved from Auth0 in order to access the API. For more info, see [Get an Access Token](#get-an-access-token) |
| `name` | The new role's name |
| `description` | The new role's description |
| `applicationType` | The new role's application type |
| `applicationId` | The new role's application Id |
| `permissions` | A comma separated list of permissions (`{permission_id}`) for the new role |

## Update Role

<h5 class="code-snippet-title">Examples</h5>

```http
PUT https://{extension_url}/roles/{role_id}
Content-Type:   'application/json'
Authorization:  'Bearer {access_token}'
{
   "name":"My new example name",
   "description":"Example description",
   "applicationType":"client",
   "applicationId":"LcGQZRtjVPPtZfq33I8vtKxldPKPRwBa",
   "permissions":[
      "{permission_id}"
   ]
}
```

```shell
curl --request PUT \
  --url 'https://{extension_url}/roles/{role_id}' \
  --header 'Authorization: Bearer {access_token}' \
  --header 'Content-Type: application/json' \
  --data '{ "name":"My new example name", "description":"Example description", "applicationType":"client", "applicationId":"LcGQZRtjVPPtZfq33I8vtKxldPKPRwBa", "permissions":["{permission_id}"] }'
```

> RESPONSE SAMPLE:

```text
{
   "_id":"22787849-f39c-4165-814f-6996ad8e72a0",
   "name":"My new example name",
   "description":"Example description",
   "applicationType":"client",
   "applicationId":"LcGQZRtjVPPtZfq33I8vtKxldPKPRwBa",
   "permissions":[
      "deeb552d-2d98-4efb-bb84-0c8babe5f431"
   ]
}
```

<h5 class="http-method-box">
  <span class="badge badge-warning" href="#update-role">PUT</span>
  <span class="path" href="#update-role">/roles/{role_id}</span>
</h5>

Use this endpoint to update the details of a role.

### Scopes

The <dfn data-key="access-token">[Access Token](#get-an-access-token)</dfn> should have the following <dfn data-key="scope">scopes</dfn>:

<span class="badge">update:roles</span>

### Parameters

| Parameter        | Description |
|:-----------------|:------------|
| `{extension_url}` <br/><span class="label label-danger">Required</span> | The URL of your Authorization Extension. For more info, see [Find your extension URL](#find-your-extension-url) |
| `{access_token}` <br/><span class="label label-danger">Required</span> | The token your client retrieved from Auth0 in order to access the API. For more info, see [Get an Access Token](#get-an-access-token) |
| `{role_id}` <br/><span class="label label-danger">Required</span> | The id of the role to update |
| `name` | The updated role name |
| `description` | The updated role description |
| `applicationType` | The updated application type |
| `applicationId` | The updated application Id |
| `permissions` | The updated list of permissions |

## Delete Role

<h5 class="code-snippet-title">Examples</h5>

```http
DELETE https://{extension_url}/roles/{role_id}
Authorization:  'Bearer {access_token}'
```

```shell
curl --request DELETE \
  --url 'https://{extension_url}/roles/{role_id}' \
  --header 'Authorization: Bearer {access_token}'
```

> RESPONSE SAMPLE:

```text
(empty response body)
```

<% var path = '/roles/{role_id}'; %>
<%=
include('../../_includes/_http-method', {
  "http_badge": "badge-danger",
  "http_method": "DELETE",
  "path": path,
  "link": "#delete-role"
}) %>

Use this endpoint to remove a role.

### Scopes

The <dfn data-key="access-token">[Access Token](#get-an-access-token)</dfn> should have the following <dfn data-key="scope">scopes</dfn>:

<span class="badge">delete:roles</span>

### Parameters

| Parameter        | Description |
|:-----------------|:------------|
| `{extension_url}` <br/><span class="label label-danger">Required</span> | The URL of your Authorization Extension. For more info, see [Find your extension URL](#find-your-extension-url) |
| `{access_token}` <br/><span class="label label-danger">Required</span> | The token your client retrieved from Auth0 in order to access the API. For more info, see [Get an Access Token](#get-an-access-token) |
| `{role_id}` <br/><span class="label label-danger">Required</span> | The id of the role to delete |