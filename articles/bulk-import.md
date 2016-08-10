# Massively importing users to Auth0 using a job

Our focus has always been not only greenfield projects but also existing applications that want to extend their Authentication capabilities.

With this in mind, our [Management API has an endpoint](/api/v2#!/jobs/post_users_imports) that allows consumers to populate a database connection with users obtained from a file. Each of those users will have to reset their password on they log in for the first time.

## Pre-requisites

Before you launch the import users job, a database to where users will be imported must exist.

### Users schema
The user's file must have an array with the user's information in JSON format. The following [JSON schema](http://json-schema.org) describes valid users:

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

When you perform a request to the endpoint you will get a response similar to the following one:

```
Code: 202.

Body
{
    "status":"pending",
    "type":"users_import",
    "tenant":"contoso",
    "connection":"abcd",
    "id":"job_abcdef1234567890"
}
```

The returned entity represents the import job. You can query its status using [this other endpoint](/api/v2#!/jobs/get_jobs_by_id).

Once the job finishes, whether it failed or was successful, Auth0 account owners will get an e-mail notifying about the result.

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
