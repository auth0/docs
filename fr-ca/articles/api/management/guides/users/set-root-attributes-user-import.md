---
title: Set Root Attributes During User Import
description: Learn how to set root attributes for users during import using the Auth0 Management API.
topics:
  - mgmt-api
  - root-attributes
  - users
  - user-profile
  - user-import
contentType:
  - how-to
useCase:
  - manage-users
---
# Set Root Attributes During User Import

This guide will show you how to set root attributes for a user during import using Auth0's Management API. This allows you to minimize the number of API calls required to set root attributes when importing users. To see which attributes you can import, visit [Normalized User Profile Structure](/users/references/user-profile-structure).

1. Make a `POST` call to the [Create Job to Import Users endpoint](/api/management/v2#!/Jobs/post_users_imports). Be sure to replace `MGMT_API_ACCESS_TOKEN`, `CONNECTION_ID`, and `JSON_USER_FILE_PATH` placeholder values with your Management API Access Token, connection ID, and users filename, respectively.

```har
{
	"method": "POST",
	"url": "https://${account.namespace}/api/v2/jobs/usersimports",
    "headers": [
  	    { "name": "Content-Type", "value": "multipart/form-data " },
  	    { "name": "Authorization", "value": "Bearer MGMT_API_ACCESS_TOKEN" }
	],
	"postData": {
        "mimetype": "multipart/form-data",
        "text": "{ \"connection_id\": \"CONNECTION_ID\", \"users\": \"JSON_USER_FILE_PATH\" }"
	}
}
```

| **Value** | **Description** |
| - | - |
| `MGMT_API_ACCESS_TOKEN`  | [Access Token for the Management API](/api/management/v2/tokens) with the <dfn data-key="scope">scope</dfn> `create:users`. |
| `CONNECTION_ID` | ID of the connection to which the users will be inserted. You can retrieve this info using the [Get All Connections endpoint](/api/management/v2#!/Connections/get_connections). |
| `JSON_USER_FILE_PATH` | Filename of the file that contains the users to be imported. File should be in JSON format and include root attributes for users. For a list of available attributes, see [User Profile Attributes](/users/references/user-profile-structure#attributes). For an example of the file format, see [Bulk User Import Database Schema and Examples](/users/references/bulk-import-database-schema-examples). |