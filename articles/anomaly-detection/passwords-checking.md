Bulk Password Checking
=======================

At Auth0, we focus on bringing you the tools you need to keep your systems and your users safe.
The bulk password checking tool allows you to check your users' passwords against a pre-defined list of passwords.

This tool, together with our [Breached-Password Detection](/anomaly-detection/breached-passwords) functionality, helps you audit your users' security and take appropriate actions to protect them and their accounts.

## Bulk Password Checking vs. Breached-Password Detection
The Breached-Password Detection feature checks user passwords against Auth0's database of compromised passwords. These passwords have been compiled from security breaches experienced by external third-parties, where the breached information have been released to the public. If a compromised account is detected, the Breached-Password Detection tool will take appropriate action.
 
 Bulk Password Checking, on the other hand, aims to give you the power to audit your users' security against your own passwords list. This list of passwords can be anything you choose; like a list of forbidden, trivial-to-crack passwords, or a list of passwords that your organization knows to have been breached elsewhere.
 
Combined with other tools we offer, actively auditing your users' account passwords will help you to proactively protect them, and to mitigate risk to your users and their accounts.

## Security considerations
This tool is designed to help you audit and protect your users against weak or compromised passwords. If used inappropriately, however, it could be used to attempt to guess your users' passwords.

For this reason, it is really important for you to keep your credentials secure and not to issue tokens that allows the execution of Bulk Password Checking unnecessarily. Be sure to include a token identifier, and set a short expiration period on the tokens that allow this action. That way you will be able to blacklist them if they get compromised. Finally, delete the data once the checking is complete, in order to prevent its abuse.

We also take explicit measures to protect your data:
- As with all data at Auth0, it is transmitted over TLS even in our internal systems.
- The data is held only for the time it takes to process and return the results, and then it will be automatically deleted after the results are retrieved. Even so, it is considered good practice to manually delete the data once you have retrieved the results (see below).
- The results will not contain the password information.

To sum up:
- Use tokens with create:passwords_checking_job sparingly.
- Set a short expiration on the issued tokens.
- As always, add an identifier (jti) to your tokens so you will be able to blacklist compromised tokens.
- If you think a token may have been compromised, blacklist it immediately.
- Delete the input data and results when finished.

## Usage
This tool is made available through our [Management API](/api/management/v2). It has an endpoint that allows you to check a pre-defined list of users and passwords --provided as a csv file-- against a database connection. This is run as a background process, which, when complete, will allow you to retrieve the results and any errors, as well as delete the data from Auth0.

### Preparing the input file
In order to run this job you need to upload a list of users and passwords to check. This list must be provided as a CSV (comma separated value) file, where each row must have the following format:

```
{username},{email},{password}
```

#### Format considerations:
- Must not have a header row
- Each row *must* have a maximum of 400 characters
- If any of the values contain a comma, the whole value must be quoted
- You must provide either a email or a username, but not both

Use the following JSON schema to verify your data before uploading:
```js
   {
     type: 'object',
     anyOf: [
       {
         properties: {
           email: {
             type: 'string',
             minLength: 1,
             maxLength: 100,
             description: 'Email to check'
           },
           plain_text_password: {
             type: 'string',
             minLength: 1,
             maxLength: 100,
             description: 'Password to check'
           }
         },
         required: ['plain_text_password', 'email'],
         additionalProperties: false
       },
       {
         properties: {
           username: {
            type: 'string',
            minLength: 1,
            maxLength: 100,
            description: 'Username to check'
           },
           plain_text_password: {
             type: 'string',
             minLength: 1,
             maxLength: 100,
             description: 'Password to check'
           }
         },
         required: ['plain_text_password', 'username'],
         additionalProperties: false
       }
     ]
   }
```

##### File Example
```
john.doe0@example.com,,secret
,john.doe2,secret
john.doe3@example.com,,"secret, really secret"
,john.doe2,secr et
```

Each of these rows are valid. Note the quotation around "secret, really secret" is necessary because of the comma within the password. Whitespace does not require quoting.

### Starting the job
Once you have the file ready, you are ready to start a job to check the file against your database connection. To do so you need to execute a `POST` request against `/api/passwords-checking` with encoding type `multipart/form-data`.

Your request should contain the following parameters:

- passwords (the csv file as shown above)
- connection_id (the [connection](/connections/database) the data will be checked against)

If successful, your response will be similar to the following:

```js
{
    "id":"job_abcdef1234567890",
    "status":"pending",
    "type":"passwords_checking",
    "connection":"abcd"
}
```

The returned entity represents the job in progress. At this point the job is queued. Once the job completes you will get a log entry `fpc` (for failure) or `spc` (for success). You can query the logs through [Management API2](/api/management/v2) or the [Dashboard](${manage_url}/#/logs). You can also query job status anytime using the appropriate endpoint as shown below.

### Querying job status
To query a job's status, make a `GET` request to `/api/jobs/{id}` using the `id` returned when the job was initiated (see above). You will get a response similar to

```js
{
    "id":"job_abcdef1234567890",
    "status":"pending",
    "type":"passwords_checking",
}
```

The `status` field might contain any of the following values:

- pending: The job is still queued or is being executed on our system.
- completed
- failed

### Querying results
Once the job has finished you may retrieve the results with a request to /api/{job_id}/results. You will get a JSON Array response, similar to:

```js
[
  {
    "email": "john.doe1@example.com",
    "status": "password_matched"
  },
  {
    "username": "john.doe2",
    "status": "invalid_password"
  },
  {
    "username": "john.doe2",
    "status": "user_not_found"
  }
]
```

- Email or username will be available depending the information you provided as input.
- Status might have any of the following values:
  * password_matched: the password you provided for that user matched
  * invalid_password: the password provided did not match
  * user_not_found: the user was not in the connection database you specified

Note that the system will recover from most of errors instead of failing the job, so there may be rows with errors even after the job completes. You should check the errors (see below) after every job.

```
*IMPORTANT:* For security, you should delete the job once you have retrieved your results. The results will be automatically deleted after a period of time, but it is a good practice to clean out the data as soon as possible regardless.
```

### Querying errors
Any errors will be made available to you through this endpoint. Keep in mind that there might be errors even a completed job; specific records may be problematic, but we keep processing the rest of the input file instead of completely failing the job.

To query the errors you should make `GET` request to `/api/{job_id}/errors`. You will get a JSON array result similar to:

```json
[
  {
    "row": {
      "username": "john.doe"
    },
    "errorMessage": "The plain_text_password property is required",
    "errorCode": "row_validation_error"
  },
  {
    "row": {
      "email": "john.doe@example.com"
    },
    "errorMessage": "The plain_text_password property is required",
    "errorCode": "row_validation_error"
  },
  {
    "row": {
      "plain_text_password": "\<REMOVED\>"
    },
    "errorMessage": "Username or email are required",
    "errorCode": "row_validation_error"
  }
]
```

- `row` property contains information about the failing row, if it included a password it will be replaced by the tag "\<REMOVED\>"; it might also contain username or email depending on what you provided.

- `errorMessage` an human readable description of the error.

- `errorCode`: an invariant code of the error; it might be:
  * row_validation_error: when the row does not match a valid format.
  * unknown_error: when the error is scoped to the row but we cannot classify it over a more specific type.

### Deleting input and results data
Once you have retrieved the results, make a DELETE request to /api/jobs/{job_id}. Make sure you have a delete:passwords_checking_job scope. You should get back an empty 204 response. You can check that everything has been deleted trying to get the results for the job using the endpoint described above.

```
*IMPORTANT*: If this endpoint is not called, the data will be deleted automatically after a short period of time.```
```
