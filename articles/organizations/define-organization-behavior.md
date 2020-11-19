---
title: Define Organization Behavior
description: Learn to define organization behavior within applications for Auth0's Organizations feature.
topics:
  - organizations
contentType: 
    - how-to
    - concept
useCase:
  - build-an-app
toc: true
---

# Define Organization Behavior

You may be familiar with applications like Heroku that present different behaviors depending on whether a user logs in with a personal account or selects an organization associated with their business account. Auth0 allows you to define similar organization behavior at the application level. For each application you create in Auth0, you can decide whether end-users should log in directly or be required to authenticate in the context of an organization. For applications that require users to log in via an organization, you can also specify what happens if one is not provided to the login flow.

You can define organization behavior using either the Auth0 Dashboard or the Management API.

## Auth0 Dashboard

To define organization behavior via the Auth0 Dashboard:

1. Navigate to [Auth0 Dashboard > Applications](${manage_url}/#/applications), and select the application for which you want to configure organizations.
2. Select the **Organizations** view, and configure the appropriate settings:

| Field | Description | 
| - | - |
| <strong>Organization&nbsp;Behavior</strong> | Dictates whether your application can support users logging in through an organization. Options include:<ul><li><strong>Deny</strong>: Users cannot log in using an organization.</li><li><strong>Allow</strong>: Users can log in either with an organization or without one. When selected, you must provide an organization when you redirect users to the <code>/authorize</code> endpoint.</li><li><strong>Require</strong>: Users must log in using an organization. When selected, you must either provide an organization when you redirect users to the <code>/authorize</code> endpoint or choose Pre-login prompt as your Organization Prompt Type to allow users to choose an organization before they log in.</li></ul> |
| **Organization Prompt Type** | Specifies what type of prompt to use when your application requires that users select their organization. Only applicable when **Organization Behavior** is set to **Require**. Options include:<ul><li><strong>No prompt</strong>: Display no prompt. Requests without a valid organization parameter will be rejected.</li><li><strong>Pre-login prompt</strong>: Display Auth0’s out-of-box pre-login Organization prompt.</li></ul> |

3. Select **Save changes**.

## Management API

Make a `PATCH` call to the [Update a Client endpoint](/api/management/v2#!/Clients/patch_clients_by_id). Be sure to replace `CLIENT_ID`, `MGMT_API_ACCESS_TOKEN`, `ORG_USAGE`, and `ORG_REQUIRE_BEHAVIOR` placeholder values with your client ID, Management API Access Token, organization use option, and organization behavior option, respectively.

```har
{
	"method": "PATCH",
	"url": "https://${account.namespace}/api/v2/clients/CLIENT_ID",
	"headers": [
    	{ "name": "Content-Type", "value": "application/json" },
   		{ "name": "Authorization", "value": "Bearer MGMT_API_ACCESS_TOKEN" },
    	{ "name": "Cache-Control", "value": "no-cache" }
	],
	"postData": {
      	"mimeType": "application/json",
      	"text" : "{ \"organization_usage\": \"ORG_USAGE\", \"organization_require_behavior\": \"ORG_REQUIRE_BEHAVIOR\" }"
	}
}
```

| Value | Description |
| - | - |
| `CLIENT_ID` | ID of the application for which you want to add organization behavior. |
| `MGMT_API_ACCESS_TOKEN` | [Access Tokens for the Management API](/tokens/management-api-access-tokens) with the scope `update:clients`. |
| `ORG_USAGE` | Dictates whether your application can support users logging into an organization. Options include:<ul><li><code>deny</code>: (Default) Users cannot log in using an organization.<li><code>allow</code>: Users can log in either with an organization or without one. When selected, you must provide an organization when you redirect users to the `/authorize` endpoint.</li><li><code>require</code>: Users must log in using an organization. When selected, you must either provide an organization when you redirect users to the `/authorize` endpoint or set ORG_REQUIRE_BEHAVIOR to `pre_login_prompt` to allow users to choose an organization before they log in.</li></ul> |
| `ORG_REQUIRE_BEHAVIOR` | Specifies what type of prompt to use when your application requires that users select their organization. Only applicable when ORG_USAGE is `require`. Options include:<ul><li><code>no_prompt</code>: (Default) Display no prompt. Requests without a valid organization parameter will be rejected.</li><li><code>pre_login_prompt</code>: Display Auth0’s out-of-box pre-login Organization prompt.</li></ul> |

### Response status codes

Possible response status codes are as follows:

| Status code | Error code | Message | Cause |
| - | - | - | - |
| `200` | | Client successfully updated. | |
| `400` | `invalid_uri` | Invalid request URI. The message will vary depending on the cause. | The path is not valid. |
| `400` | `invalid_body` | Invalid request body. The message will vary depending on the cause. | The request payload is not valid. |
| `401` | | Invalid token. | |
| `401` | | Client is not global. | |
| `401` | | Invalid signature received for JSON Web Token validation. | |
| `403` | `insufficient_scope` | Insufficient scope; expected any of: `update:clients`, `update:client_keys`. | Tried to read/write a field that is not allowed with provided bearer token scopes. |
| `403` | `insufficient_scope` | Some fields cannot be updated with the permissions granted by the bearer token scopes. The message will vary depending on the fields and the scopes. | Tried to read/write a field that is not allowed with provided bearer token scopes. |
| `403` | `operation_not_supported` | The account is not allowed to perform this operation. | The account is not allowed to perform this operation. |
| `404` | `inexistent_client` | Client not found. | Inexistent resource. Specified application does not exist. |
| `429` | | Too many requests. Check the X-RateLimit-Limit, X-RateLimit-Remaining and X-RateLimit-Reset headers. | |
