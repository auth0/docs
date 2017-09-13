---
description: How to bulk import users using the Management API endpoint.
crews: crew-2
toc: true
---
# Bulk Import Users to Auth0

If you already have a user base, you can use our [/post_users_imports Management API endpoint](/api/management/v2#!/Jobs/post_users_imports) to populate a database connection with this information. The user data should first be exported in JSON format. You can then import that file using our API. 

::: note
Each affected user will need to reset their password when they log in the first time after the bulk import.
:::

## Pre-requisites

Before you launch the import users job, a database (to which the users will be imported) must already exist and it must be enabled for at least one client. For more information on how to configure a database connection at your [dashboard](${manage_url}), refer to [Database Identity Providers](/connections/database).

## File schema

The users file must have an array with the users' information in JSON format. The following [JSON schema](http://json-schema.org) describes valid users:

```json
{
    "type": "object",
    "properties": {
        "email_verified": {
            "type": "boolean"
        },
        "email": {
            "type": "string",
            "description": "The email of the user.",
            "format": "email"
        },
        "username": {
            "type": "string",
            "description": "The username."
        },
        "app_metadata": {
            "type": "object",
            "description": "Data related to the user that does affect the application's core functionality."
        },
        "user_metadata": {
            "type": "object",
            "description": "Data related to the user that does not affect the application's core functionality."
        }
    },
    "required": ["email", "email_verified"],
    "additionalProperties": false
}
```

### User `app_metadata` schema

Additionally, the `app_metadata` should **not** contain any of these properties:

* `clientID`
* `globalClientID`
* `global_client_id`
* `email_verified`
* `user_id`
* `identities`
* `lastIP`
* `lastLogin`
* `metadata`
* `created_at`
* `loginsCount`
* `_id`

::: note
The `app_metadata` store information, that can impact how an application functions or what the user can access (for example, a user's support plan or roles and access groups). For more information, refer to [User Metadata](/metadata).
:::

### File example

A file with the following contents is valid:

```json
[
  {
    "email": "john.doe@contoso.com",
    "email_verified": false,
    "app_metadata": {
        "roles": ["admin"],
        "plan": "premium"
    },
    "user_metadata": {
        "theme": "light"
    }
  }
]
```

::: note
The file size limit for a bulk import is 500KB. You will need to start multiple imports if your data exceeds this size.
:::

## How does it work?

Using the bulk import endpoints, you should be able to [request a bulk import of users to a connection](/api/management/v2#!/Jobs/post_users_imports), receive a response, [check on a job's status](/api/management/v2#!/Jobs/get_jobs_by_id), and [check for details on any failed entries in your job](/api/management/v2#!/Jobs/get_errors).

### Request a Bulk Import

[The users import endpoint](/api/management/v2#!/Jobs/post_users_imports) requires that your `POST` request be of encoding type `multipart/form-data`.

Your request should contain the following parameters:

| Parameter | Description |
|-----------|-------------|
| `users` | The file, that containing the users to import, in JSON format. |
| `connection_id` | The id of the connection to which the above users will be inserted. You can retrieve this information, using the [GET /api/v2/connections](/api/management/v2#!/Connections/get_connections) endpoint.|
| `upsert` | A boolean value, `false` by default. If it is false, users will only be inserted. If there are already user(s) with the same emails as one or more of those being inserted, they will fail. If this value is set to `true` and the user being imported already exists, the user will be updated with the new information. |
| `external_id` | This is an optional user defined string that can be used for correlating multiple jobs, and is returned as part of the job status response. |
| `send_completion_email` | A boolean value which when set to `true`, sends a completion email to all tenant owners when the job is finished. |

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

Once the job finishes, whether it failed or was successful, the owner of the Auth0 tenant that the job is being run on will get an e-mail notifying them about the result (if `send_completion_email` was set to `true`). A notification email for a job that failed might notify the owner(s) that it failed to parse the users file JSON when importing users.

### Query for Job Status

You can query a job's status using the [GET /api/v2/jobs/{id} endpoint](/api/management/v2#!/jobs/get_jobs_by_id). If the job is complete, the job status response will show summary totals of successful/failed/inserted/updated records, as well. If there is a error in the job, it will return as failed (however, note that invalid user information, such as an invalid email, for example, will not make the entire job fail). 

Additionally, the job status is added to [Tenant Logs](${manage_url}/#/logs), which allows for a custom WebHook to be triggered using the [WebHook Logs Extension](/extensions/management-api-webhooks).

### Retrieve Failed Entries

You can query and retrieve details on failed entries via the API using the [GET /api/v2/jobs/{id}/errors endpoint](/api/management/v2#!/Jobs/get_errors).
