---
title: Bulk User Imports
description: Learn how to perform bulk user imports with the Management API.
crews: crew-2
toc: true
topics:
  - users
  - user-management
  - migrations
  - bulk-imports
contentType:
  - how-to
useCase:
  - manage-users
  - migrate
---

# Bulk User Imports

If you already have a user database, you can use the [POST /api/v2/jobs/users/post_users_imports](/api/management/v2#!/Jobs/post_users_imports) endpoint to populate a database connection with this information. The user data should first be exported in JSON format. You can then import that file using our API. To see database file schema and examples, visit [Bulk Import Database Schema and Examples](/users/references/bulk-import-database-schema-examples).

For a list of user profile fields that can be inserted and updated during import, see [User Profile Attributes](/users/references/user-profile-structure#user-profile-attributes).

Using the bulk import endpoints, you can:

1. [Request a bulk import of users to a connection](/api/management/v2#!/Jobs/post_users_imports) and receive a response.
2. [Query job's status](/api/management/v2#!/Jobs/get_jobs_by_id).
3. [Check for details on any failed entries in your job](/api/management/v2#!/Jobs/get_errors).

## Before you start

Before you launch the import users job:

* [Configure a database connection](/connections/database) to import the users to and enable it for at least one application.
* Create a file in JSON format containing the users to import into Auth0.
* If you are importing passwords, make sure the passwords are hashed using one of the [supported algorithms](/users/references/bulk-import-database-schema-examples#supported-hash-algorithms). Users with passwords hashed by unsupported algorithms will need to reset their password when they log in for the first time after the bulk import.
* Get a [Management API Token](/api/management/v2/tokens) to use in requests to the job endpoints.

## Request bulk import

The [Create import users job endpoint](/api/management/v2#!/Jobs/post_users_imports) requires that your `POST` request encoded as type `multipart/form-data`.

Create a request that contains the following parameters:

| Parameter | Description |
|-----------|-------------|
| `users` | [File in JSON format](/users/references/bulk-import-database-schema-examples#examples) that contains the users to import. |
| `connection_id` | ID of the connection to which users will be inserted. You can retrieve the ID using the [GET /api/v2/connections](/api/management/v2#!/Connections/get_connections) endpoint. |
| `upsert` | Boolean value; `false` by default. When set to `false`, pre-existing users that match on email address, user ID, or username will fail. When set to `true`, pre-existing users that match on any of these fields will be updated, but only with upsertable attributes. For a list of user profile fields that can be upserted during import, see [User Profile Attributes](/users/references/user-profile-structure#user-profile-attributes). |
| `external_id` | Optional user-defined string that can be used to correlate multiple jobs. Returned as part of the job status response. |
| `send_completion_email` | Boolean value; `true` by default. When set to `true`, sends a completion email to all tenant owners when the import job is finished. If you do *not* want emails sent, you must explicitly set this parameter to `false`. |

For example:

```har
{
  "method": "POST",
  "url": "https://${account.namespace}/api/v2/jobs/users-imports",
  "headers": [
    { "name": "Content-Type", "value": "multipart/form-data" },
    { "name": "Authorization", "value": "Bearer ACCESS_TOKEN" }
  ],
  "postData": {
    "mimeType": "multipart/form-data",
    "params": [
        {
          "name": "users",
          "fileName": "MY_USERS_IMPORT_FILE.json",
          "contentType": "application/json"
        },
        {
          "name": "connection_id",
          "value": "MY_DB_CONNECTION_ID"
        },
        {
          "name": "upsert",
          "value": false
        },
        {
          "name": "external_id",
          "value": "MY_EXTERNAL_ID"
        },
        {
          "name": "send_completion_email",
          "value": true
        },
    ]
  }
}
```

If the request works, you will receive a response similar to the following:

```json
{
    "status":"pending",
    "type":"users_import",
    "id":"job_abcdef1234567890",
    "connection":"abcd",
    "external_id":"contoso"
}
```

The returned entity represents the import job.

Once the job finishes, the owner(s) of the Auth0 tenant that the job is being run on will get an email notifying them about whether it failed or succeeded (if `send_completion_email` was set to `true`). A notification email for a job that failed might notify the owner(s) that it failed to parse the users file JSON when importing users.

## Query for job status

You can query a job's status using the [Get a Job endpoint](/api/management/v2#!/Jobs/get_jobs_by_id). If the job is complete, the job status response will also show summary totals of successful/failed/inserted/updated records. If there is an error in the job, it will return as failed; however, note that invalid user information, such as an invalid email, will not make the entire job fail.

Additionally, the job status is added to [Tenant Logs](${manage_url}/#/logs), which allows for a custom WebHook to be triggered using the [WebHook Logs Extension](/extensions/management-api-webhooks).

## Job timeouts

All user import jobs timeout after **two (2) hours**. If your job does not complete within this time frame, it is marked as failed.

Furthermore, all of your job-related data is automatically deleted after 24 hours and cannot be accessed afterward. As such, **we strongly recommend storing the job results using the storage mechanism of your choice**.

## Retrieve failed entries

You can query and retrieve details on failed entries via the API using the [Get Failed Job Error Details endpoint](/api/management/v2#!/Jobs/get_errors).


## Keep reading

* [User Migration Overview](/users/concepts/overview-user-migration)
* [Configure Automatic Migration from Your Database](/users/guides/configure-automatic-migration)
* [User Import/Export Extension](/extensions/user-import-export)
* [Bulk Import Database Schema and Example](/users/references/bulk-import-database-schema-examples)
* [User Migration Scenarios](/users/references/user-migration-scenarios)
