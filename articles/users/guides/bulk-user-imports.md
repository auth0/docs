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

## Request bulk user import

To start a bulk user import job, make a `POST` request encoded as type `multipart/form-data` to the [create import users job endpoint](/api/management/v2#!/Jobs/post_users_imports). Be sure to replace the `MGMT_API_ACCESS_TOKEN`, `USERS_IMPORT_FILE.json`, `CONNECTION_ID`, and `EXTERNAL_ID` placeholder values with your Management API Access Token, users JSON file, database connection ID, and external ID, respectively.

```har
{ 
  "method":"POST",
  "url":"https://${account.namespace}/api/v2/jobs/users-imports",
  "headers":[ 
    { 
      "name":"Content-Type",
      "value":"multipart/form-data"
    },
    { 
      "name":"Authorization",
      "value":"Bearer MGMT_API_ACCESS_TOKEN"
    }
  ],
  "postData":{ 
    "mimeType":"multipart/form-data",
    "params":[ 
      { 
        "name":"users",
        "fileName":"USERS_IMPORT_FILE.json",
        "contentType":"application/json"
      },
      { 
        "name":"connection_id",
        "value":"CONNECTION_ID"
      },
      { 
        "name":"external_id",
        "value":"EXTERNAL_ID"
      }
    ]
  }
}
```

| Parameter | Description |
|-----------|-------------|
| `users` | [File in JSON format](/users/references/bulk-import-database-schema-examples#examples) that contains the users to import. |
| `connection_id` | ID of the connection to which users will be inserted. You can retrieve the ID using the [GET /api/v2/connections](/api/management/v2#!/Connections/get_connections) endpoint. |
| `upsert` | Boolean value; `false` by default. When set to `false`, pre-existing users that match on email address, user ID, or username will fail. When set to `true`, pre-existing users that match on any of these fields will be updated, but only with upsertable attributes. For a list of user profile fields that can be upserted during import, see [User Profile Attributes](/users/references/user-profile-structure#user-profile-attributes). |
| `external_id` | Optional user-defined string that can be used to correlate multiple jobs. Returned as part of the job status response. |
| `send_completion_email` | Boolean value; `true` by default. When set to `true`, sends a completion email to all tenant owners when the import job is finished. If you do *not* want emails sent, you must explicitly set this parameter to `false`. |

If the request is successful, you'll receive a response similar to the following:

```json
{
  "status": "pending",
  "type": "users_import",
  "created_at": "",
  "id": "job_abc123",
  "connection_id": "CONNECTION_ID",
  "upsert": false,
  "external_id": "EXTERNAL_ID",
  "send_completion_email": true
}
```

The returned entity represents the import job.

When the user import job finishes and if `send_completion_email` was set to `true`, the tenant administrator(s) will get an email notifying them that job either failed or succeeded. An email for a job that failed might notify the administrator(s) that it failed to parse the users JSON file when importing users.

## Check job status

To check a job's status, make a `GET` request to the [Get a Job endpoint](/api/management/v2#!/Jobs/get_jobs_by_id). Be sure to replace the `JOB_ID` placeholder value with your user import job ID.

```har
{ 
  "method": "GET",
  "url": "https://${account.namespace}/api/v2/jobs/JOB_ID",
  "headers": [ 
    { 
      "name": "Content-Type",
      "value": "application/json"
    },
    { 
      "name": "Authorization",
      "value": "Bearer MGMT_API_ACCESS_TOKEN"
    }
  ]
}
```

Depending on the status of the user import job, you'll receive a response similar to one of the following:

**Pending**

```json
{
  "status": "pending",
  "type": "users_import",
  "created_at": "", // TODO: add date
  "id": "job_abc123",
  "connection_id": "CONNECTION_ID",
  "external_id": "EXTERNAL_ID"
}
```

**Processing**

```json
{
  "status": "processing",
  "type": "users_import",
  "created_at": "", // TODO: add date
  "id": "job_abc123",
  "connection_id": "CONNECTION_ID",
  "external_id": "EXTERNAL_ID",
  "percentage_done": 0,
  "time_left_seconds": 0
}
```

**Completed**

If a job is completed, the job status response will include summary totals of successful/failed/inserted/updated records.

```json
{
  "status": "completed",
  "type": "users_import",
  "created_at": "", // TODO: add date
  "id": "job_abc123",
  "connection_id": "CONNECTION_ID",
  "external_id": "EXTERNAL_ID",
  "location": "https://${account.namespace}/EXAMPLE"
  // TODO: example of successful/failed/inserted/updated fields
}
```

**Failed**

If there is an error in the job, it will return as failed. However, note that invalid user information, such as an invalid email, will not make the entire job fail.

```json
{
  "status": "failed",
  "type": "users_import",
  "created_at": "", // TODO: add date
  "id": "job_abc123",
  "connection_id": "CONNECTION_ID",
  "external_id": "EXTERNAL_ID"
}
```

**Expired**

Expired jobs are completed jobs that were created more than `TODO_TIME` ago

```json
{
  "status": "expired",
  "type": "users_import",
  "created_at": "", // TODO: add date
  "id": "job_abc123",
  "connection_id": "CONNECTION_ID",
  "external_id": "EXTERNAL_ID"
}
```

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
