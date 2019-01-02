---
title: Bulk User Imports with the Management API
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

# Bulk User Imports with the Management API

If you already have a user database, you can use our [/post_users_imports Management API endpoint](/api/management/v2#!/Jobs/post_users_imports) to populate a database connection with this information. The user data should first be exported in JSON format. You can then import that file using our API. 

::: note
Each affected user will need to reset their password when they log in the first time after the bulk import.
:::

Using the bulk import endpoints, you can:

1. [Request a bulk import of users to a connection](/api/management/v2#!/Jobs/post_users_imports) and receive a response.
3. [Query job's status](/api/management/v2#!/Jobs/get_jobs_by_id).
4. [Check for details on any failed entries in your job](/api/management/v2#!/Jobs/get_errors).

## Prerequisites

Before you launch the import users job, a database (to which the users will be imported) must already exist and it must be enabled for at least one application. For more information on how to configure a database connection at your [dashboard](${manage_url}), refer to [Database Identity Providers](/connections/database). For database file schema information and examples, see [Bulk Import Database Schema and Example](/users/references/bulk-import-database-schema-examples).

## Request bulk import

The [users import endpoint](/api/management/v2#!/Jobs/post_users_imports) requires that your `POST` request be of encoding type `multipart/form-data`.

Create a request that contains the following parameters:

| Parameter | Description |
|-----------|-------------|
| `users` | The file, that containing the users to import, in JSON format. |
| `connection_id` | The id of the connection to which the above users will be inserted. You can retrieve this information, using the [GET /api/v2/connections](/api/management/v2#!/Connections/get_connections) endpoint.|
| `upsert` | A boolean value, `false` by default. If it is false, users will only be inserted. If there are already user(s) with the same emails as one or more of those being inserted, they will fail. If this value is set to `true` and the user being imported already exists, the user will be updated with the new information. |
| `external_id` | This is an optional user defined string that can be used for correlating multiple jobs, and is returned as part of the job status response. |
| `send_completion_email` | A boolean value which when set to `true`, sends a completion email to all tenant owners when the job is finished. The default is `true`, so you must explicitly set this parameter to `false` if you do *not* want emails sent. |

If it works, you will get a response similar to the following one:

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

Once the job finishes, whether it failed or was successful, the owner of the Auth0 tenant that the job is being run on will get an email notifying them about the result (if `send_completion_email` was set to `true`). A notification email for a job that failed might notify the owner(s) that it failed to parse the users file JSON when importing users.

## Query for job status

You can query a job's status using the [GET /api/v2/jobs/{id} endpoint](/api/management/v2#!/jobs/get_jobs_by_id). If the job is complete, the job status response will show summary totals of successful/failed/inserted/updated records, as well. If there is an error in the job, it will return as failed (however, note that invalid user information, such as an invalid email, for example, will not make the entire job fail). 

Additionally, the job status is added to [Tenant Logs](${manage_url}/#/logs), which allows for a custom WebHook to be triggered using the [WebHook Logs Extension](/extensions/management-api-webhooks).

## Retrieve failed entries

You can query and retrieve details on failed entries via the API using the [GET /api/v2/jobs/{id}/errors endpoint](/api/management/v2#!/Jobs/get_errors).

## Keep reading

* [User Migration Overview](/users/concepts/overview-user-migration)
* [Configure Automatic Migration from Your Database](/users/guides/configure-automatic-migration)
* [User Import/Export Extension](/extensions/user-import-export)
* [Bulk Import Database Schema and Example](/users/references/bulk-import-database-schema-examples)
* [User Migration Scenarios](/users/references/user-migration-scenarios)
