---
title: Define organization behavior
description: Learn to define organization behavior within applications for Auth0's Organizations feature.
topics:
  - organizations
contentType: 
    - how-to
    - concept
useCase:
  - build-an-app
---

# Define organization behavior

You may be familiar with applications like Heroku that present different behaviors depending on whether a user logs in with a personal account or selects an organization associated with their business account. Auth0 allows you to define similar organization behavior at the application level. For each application you create in Auth0, you can decide whether end-users should log in directly or be required to authenticate in the context of an organization. For applications that require users to log in via an organization, you can specify what happens if one is not provided to the login flow, as well.

You can define organization behavior using either the Auth0 Dashboard or the Management API.

## Auth0 Dashboard

To define organization behavior via the Auth0 Dashboard:

1. Navigate to [Auth0 Dashboard > Applications](${MANAGE_URL}/#/applications), and select the application for which you want to configure organizations.
2. Select the **Organizations** view, and configure the appropriate settings:

| Field | Description | 
| - | - |
| **Organization Behavior** | Dictates whether your application can support users logging into an organization. Options include:
* **Deny**: Users cannot log in using an organization.
* **Allow**: Users can log in either with an organization or without one. When selected, you must provide an organization when you redirect users to the `/authorize` endpoint.
* **Require**: Users must log in using an organization. When selected, you must either provide an organization when you redirect users to the `/authorize` endpoint or choose Pre-login prompt as your Organization Prompt Type to allow users to choose an organization before they log in. |
| **Organization Prompt Type** | Specifies what type of prompt to use when your application requires that users select their organization. Only applicable when **Organization Behavior** is set to **Require**. Options include:
* **No prompt**: Display no prompt. Requests without a valid organization parameter will be rejected.
* **Pre-login prompt**: Display Auth0’s out-of-box pre-login Organization prompt. |

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
      	"text" : "{ \"organization_usage\": \"ORG_USAGE\", \”organization_require_behavior\”: \”ORG_REQUIRE_BEHAVIOR\” }"
	}
}
```

| Value | Description |
| - | - |
| `CLIENT_ID` | ID of the application for which you want to add organization behavior. |
| `MGMT_API_ACCESS_TOKEN` | [Access Tokens for the Management API](/tokens/management-api-access-tokens) with the scope `update:clients`. |
| `ORG_USAGE` | Dictates whether your application can support users logging into an organization. Options include:
`deny`: (Default) Users cannot log in using an organization.
`allow`: Users can log in either with an organization or without one. When selected, you must provide an organization when you redirect users to the `/authorize` endpoint.
`require`: Users must log in using an organization. When selected, you must either provide an organization when you redirect users to the `/authorize` endpoint or set ORG_REQUIRE_BEHAVIOR to `pre_login_prompt` to allow users to choose an organization before they log in. |
| `ORG_REQUIRE_BEHAVIOR` | Specifies what type of prompt to use when your application requires that users select their organization. Only applicable when ORG_USAGE is `require`. Options include:
`no_prompt`: (Default) Display no prompt. Requests without a valid organization parameter will be rejected.
`pre_login_prompt`: Display Auth0’s out-of-box pre-login Organization prompt. |
