Bulk Passwords Checking
=======================

In Auth0 we focus on bring you the tools you need to keep your systemas and your users safe. 
Bulk passwords checking is a tool that allows you to check your user's passwords against pre-defined list of 
passwords to test their stregth.

This tool together with our [Breached Password Security](/anomaly-detection/breached-passwords) helps you audit your
users security and take actions to protect them.

## Bulk Passwords Checking vs Breached Password Security
Breached Password Security tools verifies user passwords against our database of compromised passwords, those passwords usually
comes from security breached experienced by a third party application have been realeased by the attackers and so they might
have been accessed by attackers. If a compromised account is detected different actions may be taken based on your configuration.

On the other hand, bulk passwords checking aims to give you the power to audit your users security against your own
passwords database, those passwords may come from different sources, examples of possible sources might be list of passwords 
available on the Internet (also known as passwords-dictionaries), your own hand-made checking list, etc. 

Combined with other tools we offer, actively auditing your users' account passwords will help you to proactively 
protect them and take risk mitigation actions in case a weak password gets detected.

## Security considerations
This tool helps you audit and protect your users against weak passwords, however, if used innapropiately, it might allow
an attacker to brute force your users; because of this is really important for you to keep your credentials secure and not to 
issue tokens that allows to execute bulk passwords checking if not strictly necesary, also, make sure to include a token 
identifier and set a short expiration period on the tokens that allow this action, that way you will be able to blacklist them 
if they get compromised. Finally, delete the data once you have finished; that way you can be sure nobody else will be able to 
access it.

We also take explicit measures to protect your data:
- As everything in Auth0 all the data is transmited over TLS even in our internal systems.
- Your data will be in our systems as less time as possible, only the time needed to 
process and hand you in the results, then it is going to be deleted automatically in a short period of time. Even so, 
it is considered a good practice to manually delete the data once you have the results (see bellow).
- Input data will be processed in batches and every batch will be deleted as soon as it gets processed to minimize the risk of
exposure.
- Result won't include the actual matches but a reference to them.

To sum up:
- Do not issue tokens that allows this action if you are not absolutely sure this right is needed
- Set a short experiration on the issued tokens
- Add an identifier (jti) to your tokens. So you will be able to blacklist compromised tokens.
- If you think  a token might have been compromised black list it immediately.
- Delete the input data and results once finished.

## Usage
This tool is made available through our Management API. It has an endpoint that allows you to check a pre-defined list of users and passwords, which must be provided as a csv file, against a database connection. Each password will be checkend in background an some time later you will be able to get the results, the errors, and finally delete the information from Auth0 service.

### Preparing the input file
In order to run this job you need to upload a list of users and passwords to check. This list must be provided as a CSV (coma separated value) where each row must has te following format:
```
{username},{email},{password}
```

#### Format considerations:
- Must not has header row
- Each row *must* have a maximum of 400 characters
- If any of the values contain a coma, the whole value must be quoted
- Email and username are optional, but you must provide one of them (and not both)

The following JSON schema describes a row and might be used to validate it before uploading:
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

These rows are all valid input rows. Note the quotation around "secret, really secret"
because that password contains a coma. Whitespace does not need quotation as stated on
5th line.

### Starting the job
Once you have the file ready, you are ready to start a job to check the file against your database connection. To do so you need to execute a `POST` request against `/api/passwords-checking` with encoding type multipart/form-data.

Your request should contain the following parameters:

- passwords (the csv file, detailed above, that you are uploading, which contains data to check)
- connection_id (a string, the connection id of the connection from where the users will be checked)

If it works, you will get a response similar to the following one:

```js
{
    "id":"job_abcdef1234567890",
    "status":"pending",
    "type":"passwords_checking",
    "connection":"abcd"
}
```

The returned entity represents the passwords checking job. At this point the job is queued on our system and will be started
as soon as possible. Once the job is finishes you will get a log entry `fpc` (if failed) or `spc` (if succeed). You can query the logs throught Management API2 or use our [Dashboard](${manage_url}/#/logs) to get them. You can also query job status anytime you want using the appropiate endpoint (see bellow).

### Querying job status
Once a job has been started you can query its status whenever you want, to do so simply make a `GET` request to `/api/jobs/{id}`, the `id` is the one that has been handed to you when you started the job (see above). You will get a response similar to 

```js
{
    "id":"job_abcdef1234567890",
    "status":"pending",
    "type":"passwords_checking",
}
```

The `status` field might contain any of the following values:

- pending: The job is still queued or being executed on our system. Wait some minutes and query again to know when it has finished.
- completed: The job is complete you can query the errors and the results (see bellow).
- failed: The job has failed, you must query the errors and check your logs to see what went wrong.

### Querying results

### Querying errors

### Deleting input and results data

