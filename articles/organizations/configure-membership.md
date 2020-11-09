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
   "text" : "{ \"members\": [ \"USER_ID\", \"USER_ID\", \"USER_ID\" ] }"
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

## Remove members
 
You can remove members from organizations using either the Auth0 Dashboard or the Management API. Remember that removing the user from the organization will not delete it from any connections.
 
### Auth0 Dashboard
 
To remove a member via the Auth0 Dashboard:
 
1. Navigate to [Auth0 Dashboard > Organizations](${MANAGE_URL}/#/organizations), and select the organization for which you want to configure membership.
2. Select the **Members** view, locate the member you want to remove, and expand its **More Options** (**...**) menu.
3. Select **Remove member**, and confirm.
 
### Management API
 
To remove members via the Management API:
 
Make a `DELETE` call to the `Delete Organization Members` endpoint. Be sure to replace the `ORG_ID`, `MGMT_API_ACCESS_TOKEN`, and `USER_ID` placeholder values with your organization ID, Management API Access Token, and user ID, respectively.
 
```har
{
   "method": "DELETE",
   "url": "https://${account.namespace}/api/v2/organizations/ORG_ID/enabled_connections/CONNECTION_ID",
   "headers": [
   { "name": "Authorization", "value": "Bearer MGMT_API_ACCESS_TOKEN" },
  { "name": "Authorization", "value": "Bearer MGMT_API_ACCESS_TOKEN" },
  { "name": "Cache-Control", "value": "no-cache" }
  ],
  "postData": {
  "mimeType": "application/json",
  "text" : "{ \"members\": [ \"USER_ID\", \"USER_ID\", \"USER_ID\" ] }"
  }
}
```
 
<%= include('./_includes/_find_domain') %>
 
| Value | Description |
| - | - |
| `ORG_ID` | ID of the organization for which you want to remove membership. |
| `MGMT_API_ACCESS_TOKEN` | [Access Token for the Management API](/tokens/management-api-access-tokens) with the scope `delete:organization_members`. |
| `USER_ID` | ID of the user(s) you want to remove from the specified organization. |
 
#### Responses
 
Possible responses are as follows:
 
| Code | Error code | Message | Cause |
| - | - | - | - |
| `204` | | Users successfully removed from organization. | |
| `400` | `invalid_body` | Invalid request body. The message will vary depending on the cause. | The request payload is not valid. |
| `400` | `invalid_query_string` | Invalid request query string. The message will vary depending on the cause. | The query string is not valid. |
| `401` | | Invalid token. | |
| `401` | | Invalid signature received for JSON Web Token validation. | |
| `401` | | Client is not global. | |
| `403` | `insufficient_scope` | Insufficient scope; expected any of: `delete:organization_members`. | Tried to read/write a field that is not allowed with provided bearer token scopes. |
| `429` | | Too many requests. Check the X-RateLimit-Limit, X-RateLimit-Remaining and X-RateLimit-Reset headers. | |

## Invite members
 
If you would like to assign a member to your organization, but the user does not yet exist in your data store, you can invite them to your organization. In this case, the user will receive an email containing a link that will allow them to log in to the organization using a configured connection.
 
You can invite users to organizations using either the Auth0 Dashboard or the Management API.
 
### Auth0 Dashboard
 
To invite members via the Auth0 Dashboard:
 
1. Navigate to [Auth0 Dashboard > Organizations](${MANAGE_URL}/#/organizations), and select the organization for which you want to configure membership.
2. Select the **Members** view, select **Add members**, and select **Invite Users**.
3. Enter the names of the user you would like to invite to the organization, and select **Add user(s) to organization**.
 
### Management API
 
To invite members via the Management API:
 
Make a `POST` call to the `Create Organization Invitations` endpoint. Be sure to replace `ORG_ID`, `MGMT_API_ACCESS_TOKEN`, `NAME_OF_USER`, `EMAIL_ADDRESS`, `CLIENT_ID`, `CONNECTION_ID`, `EXP_TIME`, and `ROLE_ID` placeholder values with your organization ID, Management API Access Token, name of invited user, email address of invited user, client ID, connection ID, expiration time, and role IDs, respectively.
 
```har
{
  "method": "POST",
  "url": "https://YOUR_AUTH0_DOMAIN/api/v2/organizations/ORG_ID/invitations",
"headers": [
  { "name": "Content-Type", "value": "application/json" },
  { "name": "Authorization", "value": "Bearer MGMT_API_ACCESS_TOKEN" },
  { "name": "Cache-Control", "value": "no-cache" }
  ],
  "postData": {
  "mimeType": "application/json",
  "text" : "{ \"inviter\": { \"name\": \"NAME_OF_USER\"}, \"invitee\": { \"email\": \"EMAIL_ADDRESS\" }, \"client_id\": \"CLIENT_ID\", \"connection_id\": \"CONNECTION_ID\", \"ttl_sec\": \"EXP_TIME\", \"roles\": [ \"ROLE_ID\", \"ROLE_ID\", \"ROLE_ID\" ] }"
  }
}
```
 
<%= include('./_includes/_find_domain') %>
 
| Value | Description |
| - | - |
| `ORG_ID` | ID of the organization for which you want to assign membership. |
| `MGMT_API_ACCESS_TOKEN` | [Access Token for the Management API](/tokens/management-api-access-tokens) with the scope `create:organization_invitations`. |
| `NAME_OF_USER`| Name of the user to whom you want to send the invitation. Maximum of 300 characters. |
| `EMAIL_ADDRESS` | Email address to which the invitation should be sent. |
| `CLIENT_ID` | ID of the application to which the invited user should authenticate. |
| `CONNECTION_ID` | ID of the connection through which the invited member should authenticate. |
| `EXP_TIME` | Number of seconds before the invitation expires. If unspecified or set to 0, defaults to 604800 seconds (7 days). Maximum of 2592000 seconds (30 days). |
| `ROLE_ID` | ID of the role(s) you want to assign to the invited user for the specified organization. Maximum of 50 roles per member. |
 
#### Responses
 
Possible responses are as follows:
 
| Code | Error code | Message | Cause |
| - | - | - | - |
| `200` | | Invitation successfully created. | |
| `400` | `invalid_body` | The specified client_id does not exist. | The request payload is not valid. |
| `400` | `invalid_body` | The specified connection does not exist. | The request payload is not valid. |
| `400` | `invalid_body` | Passwordless connections are not supported. | The request payload is not valid. |
| `400` | `invalid_body` | A default login route is required to generate the invitation url. To learn more, see [Configure default login routes](/universal-login/configure-default-login-routes). | The request payload is not valid. |
| `400` | `invalid_body` | One or more of the specified roles do not exist: role1, role2'. | The request payload is not valid. |
| `400` | `invalid_body` | Invalid request body. The message will vary depending on the cause. | The request payload is not valid. |
| `400` | `invalid_query_string` | Invalid request query string. The message will vary depending on the cause. | The query string is not valid. |
| `401` | | Invalid token. | |
| `401` | | Invalid signature received for JSON Web Token validation. | |
| `401` | | Client is not global. | |
| `403` | `insufficient_scope` | Insufficient scope; expected any of: `create:organization_invitations`. | Tried to read/write a field that is not allowed with provided bearer token scopes. |
| `404` | | No organization found by that id. | |
| `429` | | Too many requests. Check the X-RateLimit-Limit, X-RateLimit-Remaining and X-RateLimit-Reset headers. | |
 
## Assign roles to members
 
Each organization member can be assigned one or more roles. Roles are applied when users log in through the organization. To enable a role for an organization member, you must have already [created the role](/authorization/rbac/roles/create-roles) in your tenant.
 
You can assign roles to members in organizations using either the Auth0 Dashboard or the Management API.
 
### Auth0 Dashboard
 
To add roles to an organization member via the Auth0 Dashboard:
 
1. Navigate to [Auth0 Dashboard > Organizations](${MANAGE_URL}/#/organizations), and select the organization for which you want to configure membership.
2. Select the **Members** view, and click the name of the member to which you would like to add a role.
3. Click **Assign role**.
4. Enter the role name(s) you would like to assign to the member, and select **Add role(s) to organization**.
 
### Management API
 
To add roles to an organization member via the Management API:
 
Make a `POST` call to the `Create Organization Member Roles` endpoint. Be sure to replace `ORG_ID`, `MGMT_API_ACCESS_TOKEN`, `USER_ID`, and `ROLE_ID` placeholder values with your organization ID, Management API Access Token, user ID, and role ID, respectively.
 
```har
{
  "method": "POST",
  "url": "https://YOUR_AUTH0_DOMAIN/api/v2/organizations/ORG_ID/members/USER_ID/roles",
"headers": [
  { "name": "Content-Type", "value": "application/json" },
  { "name": "Authorization", "value": "Bearer MGMT_API_ACCESS_TOKEN" },
  { "name": "Cache-Control", "value": "no-cache" }
  ],
  "postData": {
  "mimeType": "application/json",
  "text" : "{ \"roles\": [ \"ROLE_ID\", \"ROLE_ID\", \"ROLE_ID\" ] }"
  }
}
```
 
<%= include('./_includes/_find_domain') %>
 
| Value | Description |
| - | - |
| `ORG_ID` | ID of the organization for which you want to add roles to a member. |
| `MGMT_API_ACCESS_TOKEN` | [Access Token for the Management API](/tokens/management-api-access-tokens) with the scope `create:organization_member_roles`. |
| `USER_ID` | ID of the user to which you want to add the specified role(s). |
| `ROLE_ID` | ID of the role you want to add to the specified user for the specified organization. Maximum of 100 roles per user. |
 
#### Responses
Possible responses are as follows:
 
| Code | Error code | Message | Cause |
| - | - | - | - |
| `204` | | Roles successfully associated with user. | |
| `400` | `invalid_body` | Invalid request body. The message will vary depending on the cause. | The request payload is not valid. |
| `400` | `invalid_query_string` | Invalid request query string. The message will vary depending on the cause. | The query string is not valid. |
| `401` | | Invalid token. | |
| `401` | | Invalid signature received for JSON Web Token validation. | |
| `401` | | Client is not global. | |
| `403` | `insufficient_scope` | Insufficient scope; expected any of: `create:organization_member_roles`. | Tried to read/write a field that is not allowed with provided bearer token scopes. |
| `429` | | Too many requests. Check the X-RateLimit-Limit, X-RateLimit-Remaining and X-RateLimit-Reset headers. |
 
## Remove roles from members
 
You can remove roles from organization members using either the Auth0 Dashboard or the Management API.
 
### Auth0 Dashboard
 
To remove a role from an organization member via the Auth0 Dashboard:
 
1. Navigate to [Auth0 Dashboard > Organizations](${MANAGE_URL}/#/organizations), and select the organization for which you want to configure membership.
2. Select the **Members** view, and click the name of the member from which you would like to remove a role.
3. Locate the role you would like to remove, click its trash can icon, and confirm.
 
### Management API
 
To remove roles from an organization member via the Management API:
 
Make a `DELETE` call to the `Delete Organization Member Roles` endpoint. Be sure to replace the `ORG_ID`, `MGMT_API_ACCESS_TOKEN`, `USER_ID`, and `ROLE_ID` placeholder values with your organization ID, Management API Access Token, user ID, and role ID, respectively.
 
```har
{
   "method": "DELETE",
   "url": "https://${account.namespace}/api/v2/organizations/ORG_ID/members/USER_ID/roles",
   "headers": [
   { "name": "Authorization", "value": "Bearer MGMT_API_ACCESS_TOKEN" },
  { "name": "Authorization", "value": "Bearer MGMT_API_ACCESS_TOKEN" },
  { "name": "Cache-Control", "value": "no-cache" }
  ],
  "postData": {
  "mimeType": "application/json",
  "text" : "{ \"roles\": [ \"ROLE_ID\", \"ROLE_ID\", \"ROLE_ID\" ] }"
  }
}
```
 
<%= include('./_includes/_find_domain') %>
 
| Value | Description |
| - | - |
| `ORG_ID` | ID of the organization for which you want to remove roles from a member. |
| `MGMT_API_ACCESS_TOKEN` | [Access Token for the Management API](/tokens/management-api-access-tokens) with the scope `delete:organization_member_roles`. |
| `USER_ID` | ID of the user from which you want to remove the specified role(s). |
| `ROLE_ID` | ID of the role you want to remove from the specified user for the specified organization. |
 
#### Responses
 
Possible responses are as follows:
 
| Code | Error code | Message | Cause |
| - | - | - | - |
| `204` | | Roles successfully removed from organization member. | |
| `400` | `invalid_body` | Invalid request body. The message will vary depending on the cause. | The request payload is not valid. |
| `400` | `invalid_query_string` | Invalid request query string. The message will vary depending on the cause. | The query string is not valid. |
| `401` | | Invalid token. | |
| `401` | | Invalid signature received for JSON Web Token validation. | |
| `401` | | Client is not global. | |
| `403` | `insufficient_scope` | Insufficient scope; expected any of: `delete:organization_member_roles`. | Tried to read/write a field that is not allowed with provided bearer token scopes. |
| `429` | | Too many requests. Check the X-RateLimit-Limit, X-RateLimit-Remaining and X-RateLimit-Reset headers. | |