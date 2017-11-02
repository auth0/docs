---
name: User Search
description: Best practices when searching for users in Auth0
toc: true
---
# User Search

Auth0 provides multiple endpoints you can use to search for users. Each one offers slightly different functionality, and in this document, we'll cover the best practices for using each of the endpoints.

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

```har
{
	"method": "GET",
	"url": "YOUR_AUTH0_DOMAIN/api/v2/users",
	"headers": [{
		"name": "Authorization",
		"value": "Bearer YOUR_MGMT_API_ACCESS_TOKEN"
	}]
}
```

This endpoint is **eventually consistent**, and as such, we recommend that you use this endpoint for "back office" processes such as changing the display name of an existing user.

We do **not** recommend that you use this endpoint for:

* Operations that require immediate consistency - please use the [Users by Email endpoint](#users-by-email) for such actions
* User exports - please use the [User Export endpoint](#user-export) for such actions

## Users by Email

The [`GET /api/v2/users-by-email` endpoint](/api/management/v2#!/Users_By_Email/get_users_by_email) allows you to search for users using their email addresses.

```har
{
	"method": "GET",
	"url": "YOUR_AUTH0_DOMAIN/api/v2/users-by-email?email=USER_EMAIL_ADDRESS",
	"headers": [{
		"name": "Authorization",
		"value": "Bearer YOUR_MGMT_API_ACCESS_TOKEN"
	}]
}
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

```har
{
	"method": "POST",
	"url": "YOUR_AUTH0_DOMAIN/api/v2/jobs/users-exports",
	"httpVersion": "HTTP/1.1",
	"cookies": [],
	"headers": [{
		"name": "Authorization",
		"value": "Bearer YOUR_MGMT_API_ACCESS_TOKEN"
	}],
	"queryString": [],
	"postData": {
		"mimeType": "application/json",
		"text": "" 
    },
	"headersSize": -1,
	"bodySize": -1,
	"comment": ""
}
```