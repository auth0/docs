# Massively importing users to Auth0 using a job

Our focus has always been not only greenfield projects but also existing applications that want to extend their Authentication capabilities.

With this in mind, our [API has an endpoint](https://auth0.com/docs/apiv2#!/jobs/post_users_imports) that allows consumers to populate a database connection with users obtained from a file. Each of those users will have to reset their password on they log in for the first time.

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
        "family_name": {
            "type": "string",
            "description": "The user's last name."
        },
        "gender": {
            "type": "string",
            "description": "The user's gender."
        },
        "name": {
            "type": "string",
            "description": "The user's full name."
        },
        "nickname": {
            "type": "string",
            "description": "The user's nickname."
        },
        "picture": {
            "type": "string",
            "description": "The URI from where to obtain the user's picture."
        },
        "locale": {
            "type": "string",
            "description": "The user's locale."
        },
        "given_name": {
            "type": "string",
            "description": "The user's first name."
        },
        "loginsCount": {
            "type": "number",
            "description": "The amout of times the user has logged in.",
            "minimum": 1,
            "maximum": 1
        },
        "metadata": {
            "type": "object",
            "description": "Additional properties related to the user."
        },
        "created_at": {
            "type": "object",
            "description": "The date when the user was created."
        },
        "identities": {
            "type": "array",
            "description": "The user's identities.",
            "items": {
                "type": "object",
                "required": ["profileData", "provider", "connection", "isSocial"],
                "properties": {
                    "profileData": {
                        "type": "object",
                        "required": ["email", "email_verified"],
                        "properties": {
                            "email_verified": {
                                "type": "boolean"
                            },
                            "email": {
                                "type": "string",
                                "description": "The email of the user's identity.",
                                "format": "email"
                            }
                        }
                    },
                    "provider": {
                        "type": "string",
                        "description": "The identity provider.",
                        "enum":["auth0"]
                    },
                    "connection": {
                        "type": "string",
                        "description": "The connection of the user's identity."
                    },
                    "isSocial": {
                        "type": "boolean",
                        "description": "True if the IdP is social, false otherwise.",
                        "enum":[false]
                    }
                }
            },
            "minItems": 1,
            "maxItems": 1
        }
    },
    "required": ["email", "email_verified", "identities", "loginsCount", "created_at"],
    "id": "user",
    "additionalProperties": false
}
```

### User metadata schema
Additionally, the metadata property must be valid for the following schema:
```json
{
  "type": "object",
  "properties": {
    "clientID": { "not": {} },
    "globalClientID": { "not": {} },
    "global_client_id": { "not": {} },
    "email_verified": { "not": {} },
    "user_id": { "not": {} },
    "identities": { "not": {} },
    "lastIP": { "not": {} },
    "lastLogin": { "not": {} },
    "metadata": { "not": {} },
    "created_at": { "not": {} },
    "loginsCount": { "not": {} },
    "_id": { "not": {} }
  },
  "id": "user_metadata"
}
```

Basically, it should not contain any of the properties listed above.

### File example
A file with the following contents is valid:
```json
[
  {
    "email": "john.doe@contoso.com",
    "family_name": "Doe",
    "email_verified": false,
    "gender": "male",
    "name": "John Doe",
    "nickname": "Johnny",
    "given_name": "John"
  }
]
```

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
    "_id":"545bb6aca4109a44b38ba231"
}
```

The returned entity represents the import job. You can query its status using [this other endpoint](https://auth0.com/docs/apiv2#!/jobs/get_jobs_by_id).

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
