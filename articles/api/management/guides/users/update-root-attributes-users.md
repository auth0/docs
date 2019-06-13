---
title: Update Root Attributes for Users
description: Learn how to update root attributes in existing user profiles using the Auth0 Management API.
topics:
  - mgmt-api
  - root-attributes
  - users
  - user-profile
contentType:
  - how-to
useCase:
  - build-an-app
  - add-login
  - manage-users
---
# Update Root Attributes for Users

This guide will show you how to update root attributes for an existing user profile using Auth0's Management API. To see which attributes you can update, visit [Normalized User Profile Structure](/users/references/user-profile-structure).

1. Make a `PATCH` call to the [Update a User endpoint](/api/management/v2#!/Users/patch_users_by_id). Be sure to replace `USER_ID`, `MGMT_API_ACCESS_TOKEN`, `GIVEN_NAME_VALUE`, `FAMILY_NAME_VALUE`, `NAME_VALUE`, `NICKNAME_VALUE`, and `PICTURE` placeholder values with your user ID, Access Token, given name, family name, name, nickname, and picture URL, respectively.

```har
{
	"method": "PATCH",
	"url": "https://${account.namespace}/api/v2/users/USER_ID",
    "headers": [
  	    { "name": "Content-Type", "value": "application/json" },
  	    { "name": "Authorization", "value": "Bearer MGMT_API_ACCESS_TOKEN" },
  	    { "name": "Cache-Control", "value": "no-cache" }
	],
	"postData": {
        "mimeType": "application/json",
        "text" : "{ \"given_name\": GIVEN_NAME_VALUE, \"family_name\": FAMILY_NAME_VALUE,\"name\": NAME_VALUE, \"nickname\": NICKNAME_VALUE,\"picture\": PICTURE_VALUE }"
	}
}
```

| **Value** | **Description** |
| - | - |
| `USER_ID` | Τhe ID of the user to be updated. |
| `MGMT_API_ACCESS_TOKEN`  | [Access Token for the Management API](/api/management/v2/tokens) with the scope `update:users`. |
| `GIVEN_NAME_VALUE` | Given name of the user to be updated. |
| `FAMILY_NAME_VALUE` | Family name of the user to be updated. |
| `NAME_VALUE` | Full name of the user to be updated. |
| `NICKNAME_VALUE` | Nickname of the user to be updated. |
| `PICTURE_VALUE` | URL of the picture for the user to be updated. |

::: note
Setting any value to "null” will remove the attribute for the user.
:::