---
title: Set Root Attributes During User Sign-Up
description: Learn how to set root attributes for users during sign-up using the Auth0 Management API.
topics:
  - mgmt-api
  - root-attributes
  - users
  - user-profile
  - user-signup
contentType:
  - how-to
useCase:
  - build-an-app
  - add-login
  - manage-users
---
# Set Root Attributes During User Sign-Up

This guide will show you how to set root attributes for a user during sign-up using Auth0's Management API. This allows you to minimize the number of API calls required to set root attributes when creating users.

1. Make a `POST` call to the [Create a User endpoint](/api/management/v2#!/Users/post_users). Be sure to replace `MGMT_API_ACCESS_TOKEN`, `CONNECTION_NAME`, `EMAIL_VALUE`, `PASSWORD_VALUE`, `GIVEN_NAME_VALUE`, `FAMILY_NAME_VALUE`, `NAME_VALUE`, `NICKNAME_VALUE`, and `PICTURE` placeholder values with your Management API Access Token, initial connection name, email address, password, given name, family name, name, nickname, and picture URL, respectively.

```har
{
	"method": "POST",
	"url": "https://${account.namespace}/api/v2/users",
    "headers": [
  	    { "name": "Content-Type", "value": "application/json" },
  	    { "name": "Authorization", "value": "Bearer MGMT_API_ACCESS_TOKEN" },
  	    { "name": "Cache-Control", "value": "no-cache" }
	],
	"postData": {
        "mimeType": "application/json",
        "text": "{ \"connection\": CONNECTION_NAME, \"email\": EMAIL_VALUE, \"password\": PASSWORD_VALUE, \"given_name\": GIVEN_NAME_VALUE, \"family_name\": FAMILY_NAME_VALUE,\"name\": NAME_VALUE, \"nickname\": NICKNAME_VALUE,\"picture\": PICTURE_VALUE }"
	}
}
```

| **Value** | **Description** |
| - | - |
| `MGMT_API_ACCESS_TOKEN`  | [Access Token for the Management API](/api/management/v2/tokens) with the <dfn data-key="scope">scope</dfn> `create:users`. |
| `CONNECTION_NAME` | Name of the connection through which the initial user information was received. |
| `EMAIL_VALUE` | Email address of the user to be created. |
| `PASSWORD_VALUE` | Password of the user to be created. |
| `GIVEN_NAME_VALUE` | Given name of the user to be created. |
| `FAMILY_NAME_VALUE` | Family name of the user to be created. |
| `NAME_VALUE` | Full name of the user to be created. |
| `NICKNAME_VALUE` | Nickname of the user to be created. |
| `PICTURE_VALUE` | URL of the picture for the user to be created. |

::: note
If you are using Lock or the [public signup endpoint](/api/authentication#signup) for user sign-up, you can set root attributes using the same method.
:::
