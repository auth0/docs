---
title: Configure membership
description: Learn to assign members and add roles to members using Auth0's Organizations feature.
topics:
  - organizations
contentType: 
    - how-to
    - concept
useCase:
  - build-an-app
toc: true
---

# Configure membership

Each organization has its own associated members, which represent the users who will be allowed to log in through its configured login page. You can add members to organizations by assigning them if they are already in the data store, or by inviting them if they are not.

## Assign members

To assign a member to your organization, you must have already [created the user](/users/create-users) in your tenant. If you cannot find a user, you can [invite them](#invite-users) instead.

You can assign members to organizations using either the Auth0 Dashboard or the Management API.

### Auth0 Dashboard

To assign members via the Auth0 Dashboard:

1. Navigate to [Auth0 Dashboard > Organizations](${MANAGE_URL}/#/organizations), and select the organization for which you want to configure membership.
2. Select the **Members** view, select **Add members**, and select **Add Users**.
3. Enter the name(s) of the user you would like to assign as a member to the organization, and select **Add user(s) to organization**.

### Management API

To assign members via the Management API:

Make a `POST` call to the `Create Organization Members` endpoint. Be sure to replace `ORG_ID`, `MGMT_API_ACCESS_TOKEN`, and `USER_ID` placeholder values with your organization ID, Management API Access Token, and user IDs, respectively.

```har
{
   "method": "POST",
   "url": "https://YOUR_AUTH0_DOMAIN/api/v2/organizations/ORG_ID/members",
 "headers": [
   { "name": "Content-Type", "value": "application/json" },
   { "name": "Authorization", "value": "Bearer MGMT_API_ACCESS_TOKEN" },
   { "name": "Cache-Control", "value": "no-cache" }
   ],
   "postData": {
   "mimeType": "application/json",
   "text" : "{ \"members\": [ \"USER_ID\", \"USER_ID\", \”USER_ID\” ] }"
   }
}
```

<%= include('./_includes/_find_domain') %>

| Value | Description |
| - | - |
| `ORG_ID` | ID of the organization for which you want to assign membership. |
| `MGMT_API_ACCESS_TOKEN` | [Access Token for the Management API](/tokens/management-api-access-tokens) with the scope `create:organization_members`. |
| `USER_ID` | ID of the user(s) you want to assign to the specified organization. Maximum of 10 members per organization. | 

#### Responses

Possible responses are as follows:

| Code | Error code | Message | Cause |
| - | - | - | - |
| `204` | | Members successfully added to organization. | |
| `400` | `invalid_body` | Invalid request body. The message will vary depending on the cause. | The request payload is not valid. |
| `400` | `invalid_query_string` | Invalid request query string. The message will vary depending on the cause. | The query string is not valid. |
| `401` | | Invalid token. | |
| `401` | | Invalid signature received for JSON Web Token validation. | |
| `401` | | Client is not global. | |
| `403` | `insufficient_scope` | Insufficient scope; expected any of: `create:organization_members`. | Tried to read/write a field that is not allowed with provided bearer token scopes. |
| `429` | | Too many requests. Check the X-RateLimit-Limit, X-RateLimit-Remaining and X-RateLimit-Reset headers. | | 

