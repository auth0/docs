---
name: User Search
description: Best practices when searching for users in Auth0
toc: true
---
# User Search

Auth0 provides multiple endpoints you can use to retrieve users. Each one offers slightly different functionality, and in this document, we'll cover the best practices for using each of the endpoints.

## User Search Options

Currently, Auth0 offers three different ways by which you can search for users:

* [Users](#users)
* [Users by Email](#users-by-email)
* [User Export](#user-export)

::: note
The following sections contain examples on how to call the various user search endpoints. To do so, you'll need to obtain a valid [access token](/api/management/v2/tokens) and provide it in the header of your call (simply replace the `YOUR_MGMT_API_ACCESS_TOKEN` placeholder value).
:::

### Definitions

In this document, we use the terms **eventually consistent** and **immediately consistent**.

* **Eventually consistent**: When you request information about a user (or a group of users), the response might not reflect the results of a recently-complete write operation. However, if you repeat your request after a short period of time, the response will return up-to-date data.

* **Immediately consistent**: When you request information about a user (or a group of users), the response will reflect the results of all successful write operations, including those that occured shortly prior to your request.

## Users

The [`GET /api/v2/users` endpoint](/api/management/v2#!/Users/get_users) allows you to retrieve a list of users. Using this endpoint, you can:

* Search based on a variety of criteria
* Select the fields to be returned
* Sort the returned results

*Required Scopes*: `read:users`, `read:user_idp_tokens`

```har
{
	"method": "GET",
	"url": "https://${account.namespace}/api/v2/users",
	"headers": [{
		"name": "Authorization",
		"value": "Bearer YOUR_MGMT_API_ACCESS_TOKEN"
	}]
}
```


**Sample Response**

Successful calls to the endpoint returns a JSON object similar to the following:

```json
[
  {
    "email": "john.doe@gmail.com",
    "email_verified": false,
    "username": "johndoe",
    "phone_number": "+199999999999999",
    "phone_verified": false,
    "user_id": "usr_5457edea1b8f33391a000004",
    "created_at": "",
    "updated_at": "",
    "identities": [
      {
        "connection": "Initial-Connection",
        "user_id": "5457edea1b8f22891a000004",
        "provider": "auth0",
        "isSocial": false
      }
    ],
    "app_metadata": {},
    "user_metadata": {},
    "picture": "",
    "name": "",
    "nickname": "",
    "multifactor": [
      ""
    ],
    "last_ip": "",
    "last_login": "",
    "logins_count": 0,
    "blocked": false,
    "given_name": "",
    "family_name": ""
  }
]
```

This endpoint is **eventually consistent**, and as such, we recommend that you use this endpoint for "back office" processes such as changing the display name of an existing user.

We do **not** recommend that you use this endpoint for:

* Operations that require immediate consistency - please use the [Users by Email endpoint](#users-by-email) for such actions
* User exports - please use the [User Export endpoint](#user-export) for such actions
* Operations that require user search as part of the Authentication Pipeline - please use the [Users by Email endpoint](#users-by-email) for such actions
* Searching for Users for [Account Linking](/link-accounts) by Email - please use the [Users by Email endpoint](#users-by-email) for such actions

## Users by Email

The [`GET /api/v2/users-by-email` endpoint](/api/management/v2#!/Users_By_Email/get_users_by_email) allows you to search for users using their email addresses. The search looks for an exact match to the provided email address.

*Required Scopes*: `read:users`

```har
{
	"method": "GET",
	"url": "https://${account.namespace}/api/v2/users-by-email?email=USER_EMAIL_ADDRESS",
	"headers": [{
		"name": "Authorization",
		"value": "Bearer YOUR_MGMT_API_ACCESS_TOKEN"
	}]
}
```

**Sample Response**

```json
[
  {
    "email": "john.doe@gmail.com",
    "email_verified": false,
    "username": "johndoe",
    "phone_number": "+199999999999999",
    "phone_verified": false,
    "user_id": "usr_5457edea1b8f33391a000004",
    "created_at": "",
    "updated_at": "",
    "identities": [
      {
        "connection": "Initial-Connection",
        "user_id": "5457edea1b8f22891a000004",
        "provider": "auth0",
        "isSocial": false
      }
    ],
    "app_metadata": {},
    "user_metadata": {},
    "picture": "",
    "name": "",
    "nickname": "",
    "multifactor": [
      ""
    ],
    "last_ip": "",
    "last_login": "",
    "logins_count": 0,
    "blocked": false,
    "given_name": "",
    "family_name": ""
  }
]
```

The Users by Email endpoint is immediately consistent, and as such, we recommend that you use this endpoint for:

* User searches run during the authentication/authorization process 
* User searches run as part of the account linking process.

We do **not** recommend using the Users by Email endpoint for:

* Searches involving user attributes
* Searches returning multiple users

## User Export

The [`POST /api/v2/jobs/users-exports`](/api/management/v2#!/Jobs/post_users_exports) endpoint allows you to create a job that exports all users associated with a [connection](/identityproviders).

When you create your job, you'll need to provide:

* The ID for the connection whose users you want exported
* The format of the export file (CSV or JSON)
* The maximum number of user records to be exported
* The user-related fields (such as user ID or name) that you want included in the export

*Required Scopes*: `read:users`

```har
{
	"method": "POST",
	"url": "https://${account.namespace}/api/v2/jobs/users-exports",
	"httpVersion": "HTTP/1.1",
	"cookies": [],
	"headers": [{
		"name": "Authorization",
		"value": "Bearer YOUR_MGMT_API_ACCESS_TOKEN"
	}],
	"queryString": [],
	"postData": {
		"mimeType": "application/json",
		"text": "{\"connection_id\": \"con_0000000000000001\", \"format\": \"csv\", \"limit\": 5, \"fields\": [[{\"name\": \"email\"}, { \"name\": \"identities[0].connection\", \"export_as\": \"provider\" }]]}" 
    },
	"headersSize": -1,
	"bodySize": -1,
	"comment": ""
}
```

**Sample Response**

```json
{
  "type": "users_export",
  "status": "pending",
  "connection_id": "con_0000000000000001",
  "format": "csv",
  "limit": 5,
  "fields": [
    {
      "name": "user_id"
    },
    {
      "name": "name"
    },
    {
      "name": "email"
    },
    {
      "name": "identities[0].connection",
      "export_as": "provider"
    }
  ],
  "connection": "Username-Password-Authentication",
  "created_at": "2017-11-02T23:34:03.803Z",
  "id": "job_coRQCC3MHztpuTlo"
}
```

Once you've created your job to export your users, you can check on its status in the [Dashboard](${manage_url}/#/logs). The **Event** type will be **API Operation** and the **Description** will say **Create job to export users**.

![](/media/articles/users/logs.png)

Click on your job, and click over to the **Response** tab. While the job is running, you'll see a **Status** of **Pending**.

![](/media/articles/users/job.png)

## Summary

When retrieving users in Auth0, there are three different API endpoints you can use. Here's a summary of when you should use each endpoint:

| Requirement | Endpoint to Use |
| - | - |
| Back of the office processes, such as changing a user's display name | [Users](#users) |
| Searches involving user attributes | [Users](#users) |
| Searches returning multiple users | [Users](#users) |
| Operations requiring immediate consistency | [Users by Email](#users-by-email) |
| Actions requiring user search as part of the Authentication Pipeline | [Users by Email](#users-by-email) |
| Searching for users for account linking by email | [Users by Email](#users-by-email) |
| User exports | [User Export](#user-export) |