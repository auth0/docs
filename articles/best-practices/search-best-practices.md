---
name: User Search Best Practices
description: Best practices when searching for users in Auth0
topics:
  - users
  - user-management
  - search
contentType: reference
useCase:
  - manage-users
---

# User Search Best Practices

Auth0 provides multiple endpoints you can use to retrieve users. Each one offers slightly different functionality, and in this document, we'll cover the best practices for using each of the endpoints.

Currently, Auth0 offers a few different ways by which you can search for users:

* [Users](#users)
* [Users by ID](#users-by-id)
* [Users by Email](#users-by-email)
* [User Export](#user-export)

::: note
The following sections contain examples on how to call the various user search endpoints. To do so, you'll need to obtain a valid [Access Token](/api/management/v2/tokens) and provide it in the header of your call (simply replace the `YOUR_MGMT_API_ACCESS_TOKEN` placeholder value).
:::

In this document, we use the following terms:

* **Eventually consistent**: When you request information about a user (or a group of users), the response might not reflect the results of a recently-complete write operation. However, if you repeat your request after a short period of time, the response will return up-to-date data.

* **Immediately consistent**: When you request information about a user (or a group of users), the response will reflect the results of all successful write operations, including those that occurred shortly prior to your request.

## General guidelines

When running user searches:

* Use an immediately consistent endpoint during authentication processes.
* Use exact match searches (with the `raw` subfield) whenever possible.
* Use a well-known schema for metadata:
  * Use consistent data types for properties.
  * Avoid dynamic property names.
  * Avoid large schema sizes and deep structures.
  * Avoid storing data you do not need for authentication and authorization purposes.
* Don't use existence queries (for example, "give me all users with a property regardless of its value").
* Don't use full text search or partial searches.
* Don't poll the search APIs.
* Don't use large metadata field (try to keep metadata fields to 2 KB or less).

## Users

The [`GET /api/v2/users` endpoint](/api/management/v2#!/Users/get_users) allows you to retrieve a list of users. Using this endpoint, you can:

* Search based on a variety of criteria
* Select the fields to be returned
* Sort the returned results

*Required Scopes*: `read:users`

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

### Sample response

Successful calls to the endpoint return a JSON object similar to the following:

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

* Operations that require immediate consistency - please use the [Users by Email endpoint](#users-by-email) or the [Users by ID endpoint](#users-by-id) for such actions
* User exports - please use the [User Export endpoint](#user-export) for such actions
* Operations that require user search as part of authentication processes - please use the [Users by Email endpoint](#users-by-email) or the [Users by ID endpoint](#users-by-id) for such actions
* Searching for Users for [Account Linking](/link-accounts) by Email - please use the [Users by Email endpoint](#users-by-email) for such actions

## Users by ID

The [`GET /api/v2/users/{id}` endpoint](/api/management/v2#!/Users/get_users_by_id) allows you to retrieve a specific user using their Auth0 user ID.

::: note
The user ID should be URL encoded since it may contain characters that do not work well in a URL.
:::

*Required Scopes*: `read:users`

```har
{
    "method": "GET",
    "url": "https://${account.namespace}/api/v2/users/USER_ID",
    "headers": [{
        "name": "Authorization",
        "value": "Bearer YOUR_MGMT_API_ACCESS_TOKEN"
    }]
}
```

### Sample response

```json
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
```

This endpoint is **immediately consistent**, and as such, we recommend that you use this endpoint for:

* User searches run during the authentication process 
* User searches run as part of the account linking process.

## Users by email

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

### Sample response

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

* User searches run during the authentication process 
* User searches run as part of the account linking process.

## User export

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
    },
  {
    "name": "Content-Type",
    "value": "application/json"
  }],
    "queryString": [],
    "postData": {
        "mimeType": "application/json",
        "text": "{\"connection_id\": \"YOUR_CONNECTION_ID\", \"format\": \"csv\", \"limit\": 5, \"fields\": [{\"name\": \"email\"}, { \"name\": \"identities[0].connection\", \"export_as\": \"provider\" }]}" 
    },
    "headersSize": -1,
    "bodySize": -1,
    "comment": ""
}
```

### Sample response

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

### Export metadata

If you export user data in CSV and want to include metadata information, you must specify each metadata field that you want exported. 

For example, for metadata structured like this:

```json
{
  "consent": {
      "given": true,
      "date": "01/23/2018",
      "text_details": "some-url"
  }
}
```

The export request (for all three fields) will looks like this:


```har
{
  "method": "POST",
  "url": "https://${account.namespace}/api/v2/jobs/users-exports",
  "httpVersion": "HTTP/1.1",
  "cookies": [],
  "headers": [{
    "name": "Authorization",
    "value": "Bearer YOUR_MGMT_API_ACCESS_TOKEN"
  },
  {
    "name": "Content-Type",
    "value": "application/json"
  }],
  "queryString": [],
  "postData": {
    "mimeType": "application/json",
    "text": "{\"connection_id\": \"YOUR_CONNECTION_ID\", \"format\": \"csv\", \"limit\": 5, \"fields\": [{\"name\": \"email\"}, {\"name\": \"user_metadata.consent.given\"}, {\"name\": \"user_metadata.consent.date\"}, {\"name\": \"user_metadata.consent.text_details\"}]}" 
    },
  "headersSize": -1,
  "bodySize": -1,
  "comment": ""
}
```

If you export the data in JSON, you need only provide the root property; you do not need to name each individual inner property since they will be included automatically.

In this case, for the same example we used before, the request will look like this:

```har
{
  "method": "POST",
  "url": "https://${account.namespace}/api/v2/jobs/users-exports",
  "httpVersion": "HTTP/1.1",
  "cookies": [],
  "headers": [{
    "name": "Authorization",
    "value": "Bearer YOUR_MGMT_API_ACCESS_TOKEN"
  },
  {
    "name": "Content-Type",
    "value": "application/json"
  }],
  "queryString": [],
  "postData": {
    "mimeType": "application/json",
    "text": "{\"connection_id\": \"YOUR_CONNECTION_ID\", \"format\": \"json\", \"limit\": 5, \"fields\": [{\"name\": \"email\"}, {\"name\": \"user_metadata.consent\"}]}" 
    },
  "headersSize": -1,
  "bodySize": -1,
  "comment": ""
}
```
::: panel Search Metadata
Beginning **1 September 2017**, new tenants cannot search any of the  `app_metadata` fields. 

Only tenants associated with paid subscriptions that were created on/before **31 August 2017** can search the `app_metadata` fields.

As for `user_metadata`, you can only search for profile-related information, such as
- `name`
- `nickname`
- `given_name`
- `family_name`
:::

### Get results

Once you've created your job to export your users, you can check on its status using the [Get a Job endpoint](/api/management/v2#!/Jobs/get_jobs_by_id). 

You'll need to provide the ID of the job (which you received in the response when creating the job). If you're using the sample request below, replace the placeholder `YOUR_JOB_ID` with the value of the ID.

*Require Scopes*: `create:users`, `read:users`, `create:passwords_checking_job`

```har
{
  "method": "GET",
  "url": "https://${account.namespace}/api/v2/jobs/YOUR_JOB_ID",
  "headers": [{
    "name": "Authorization",
    "value": "Bearer YOUR_MGMT_API_ACCESS_TOKEN"
  }]
}
```

### Sample response

```json
{
  "type": "users_export",
  "status": "completed",
  "connection_id": "con_lCvO...a",
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
  "location": "https://user-exports.auth0.com/job_coRQCC3MHztpuTlo/auth0docs2.csv.gz?Expires=1509725589&Key-Pair-Id=APKAJPL62IJALBDMSSCA&Signature=l2JaFXP~BATnfagb64PK-qbX9QaZREDYNW0q5QeHuV-MaDpZjpABDXfHHLh2SsCMQz~UO-QsCSfI81l0lvCKzZPZL6cZHK7f~ixlZOK~MHKJuvMqsUZMbNluNAwhFmgb2fZ86yrB1c-l2--H3lMELAk7hKUwwSrNBlsfbMgQ-i41nMNnsYdy3AVlNVQkwZyx~w-IEHfJDHsqyjia-jfDbIOLQvr8~D9PwZ-xOzROxDwgxrt3undtz80bkgP5hRKOAbHC7Y-iKWa2bzNZYHqzowTrlh7Ta60cblJR46NfF9cNqn9jqRGVv-lsvUD9FxnImCCk~DL6npJnzNLjHvn4-CaWq6KdQnwWgCnZ3LZkxXDVWLLIQQaoc6i~xbuGnnbtKRePFSnpqbt2mAUYasdxTOWuUVK8wHhtfZmRYtCpwZcElXFO9Qs~PTroYZEiS~UHH5byMLt2x4ChkHnTG7pIhLAHN~bCOLk8BN2lOkDBUASEVtuJ-1i6cKCDqI2Ro9YaKZcCYzeQvKwziX6cgnMchmaZW77~RMOGloi2EffYE31OJHKiSVRK7RGTykaYN5S2Sg7W0ZOlLPKBtCGRvGb8rJ6n3oPUiOC3lSp7v0~dkx1rm-jO8mKWZwVtC0~4DVaXsn8KXNbj0LB4mjKaDHwXs16uH1-aCfFnMK7sZC2VyCU_",
  "connection": "Username-Password-Authentication",
  "created_at": "2017-11-02T23:34:03.803Z",
  "id": "job_coRQCC3MHztpuTlo"
}
```

You can access your export using the URL provided as the value for the **location** parameter. When you navigate to the URL, you'll automatically begin downloading the file. The name of your tenant is also the name of your file. For example, if your tenant name is `auth0docs`, then your file will be `auth0docs.csv` or `auth0docs.json`.

::: note
The download link is valid for 60 seconds. If this time period has expired, you'll need to initiate a new job.
:::

![Exported user data](/media/articles/users/data.png)

## API endpoints and when to use them

When retrieving users in Auth0, there are three different API endpoints you can use. Here's a summary of when you should use each endpoint:

| Requirement | Endpoint to Use |
| - | - |
| Changing users' display names | [Users](#users) |
| Searches involving user attributes | [Users](#users) |
| Searches returning multiple users | [Users](#users) |
| Operations requiring immediate consistency | [Users by ID](#users-by-id) or [Users by Email](#users-by-email) |
| Actions requiring user search as part of authentication processes | [Users by ID](#users-by-id) or [Users by Email](#users-by-email) |
| Searching for users for account linking by email | [Users by Email](#users-by-email) |