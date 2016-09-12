# Bulk Import Users to Auth0 Using a Job

Our focus has always been not only greenfield projects but also existing applications that want to extend their authentication capabilities.

With this in mind, our [Management API has an endpoint](/api/management/v2#!/Jobs/post_users_imports) that allows consumers to populate a database connection with users obtained from a file. Each of those users will have to reset their password when they log in for the first time.

## Pre-requisites

Before you launch the import users job, a database (to which the users will be imported) must already exist.

### Users schema
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

Additionally, the `app_metadata` should not contain any of these properties:

* clientID
* globalClientID
* global_client_id
* email_verified
* user_id
* identities
* lastIP
* lastLogin
* metadata
* created_at
* loginsCount
* _id

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

> The file size limit for a bulk import is 10MB. You will need to start multiple imports if your data exceeds this size.

## How does it work?

Using the bulk import endpoints, you should be able to request a bulk import of users to a connection, receive a response, check on a job's status, and check for details on any failed entries in your job.

### Requesting a Bulk Import

Your request should contain the following parameters:
* **users** (the file containing users)
* **connection_id** (a string, the connection id of the connection to which the above users will be inserted)
* **external_id** (This is a user defined string that can be used for correlating multiple jobs, and is returned as part of the job status response)
* **upsert** (A boolean value, `false` by default. If it is false, users will only be inserted. If there are already user(s) with the same emails as one or more of those being inserted, they will fail. If this value is set to `true`, and there are emails in the `users` which match pre-existing users, those pre-existing users will be updated with the new information.)

When you perform a request to the endpoint, it should look similar to this one:

 ```
  {
    users,
    connection_id,
    external_id,
    upsert: true/false     (default as false)
  }
 ```

If it works, you will get a response similar to the following one:

```
{
    "status":"pending",
    "type":"users_import",
    "id":"job_abcdef1234567890",
    "connection":"abcd",
    "external_id":"contoso"
}
```

The returned entity represents the import job. 

Once the job finishes, whether it failed or was successful, the owner of the Auth0 account that the job is being run on will get an e-mail notifying them about the result.

For example, one possible failure notification could be:

```
Subject
-----
[Auth0] Import user job for tenant contoso and connection abcd failed

Body
---
Failed to parse users file JSON when importing users. Make sure it is valid JSON.
```

If the job was succesful owners would get an e-mail like this one:

```
Subject
-----
[Auth0] Import user job for tenant contoso and connection abcd completed

Body
----
New users: 1
Total users: 15
Duplicate Users: 0
```

### Querying for Job Status

You can query a job's status using the [GET /api/v2/jobs/{id} endpoint](/api/management/v2#!/jobs/get_jobs_by_id). If the job is complete, the job status response will show summary totals of successful/failed/inserted/updated records, as well. If there is a parse error in the job, it will return as failed (however, note that invalid user information, such as an invalid email, for example, will not make the entire job fail). Additionally, the job status is added to Tenant Logs, which allows for a custom WebHook to be triggered using the WebHook Logs Extension.

### Retrieving Failed Entries

You can query and retrieve details on failed entries via the API using the [GET /api/v2/jobs/{id}/errors endpoint](/api/management/v2#!/Jobs/get_errors). 

