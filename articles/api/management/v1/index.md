---
description: An overview of the Auth0 Management API v1 which has been deprecated.
---

# Management API v1 (deprecated)

::: warning-banner
WARNING: This version of the Management API has been deprecated.
Please use the [new version](/docs/api/v2) instead.
:::

## Authentication

<div class="row api-explorer-row api-post">
  <div class="span8 col-sm-8 api-method"><span class="verb post">POST</span> /oauth/token</div>
  <div class="span4 col-sm-4 api-description" style="text-align:right">Obtain a token to call the API</div>
</div>

Auth0 API requires an `access_token`. You can get one by authenticating with your `client_id` and `client_secret` (It will be valid for 24 hours). To obtain the global client ID and global client secret see the "Advanced" section under "Account Settings" in the Auth0 [dashboard](https://manage.auth0.com/#/account/advanced).

```text
POST /oauth/token
Content-Type: 'application/json'
{
  "client_id": "",
  "client_secret": "",
  "grant_type": "client_credentials"
}
```

Once authenticated, the `access_token` can be included in the request as part of the querystring ( `?access_token=...`) or in an HTTP header (`Authorization: Bearer ...access_token...`).


## Users
<div class="row api-explorer-row api-get">
  <div class="span8 col-sm-8 api-method"><span class="verb get">GET</span> /api/users</div>
  <div class="span4 col-sm-4 api-description" style="text-align:right">Gets all users who have logged in</div>
</div>

Gets all users who have logged in through any of your connections.

```text
GET /api/users
Authorization: Bearer {token}
```

<div class="row api-explorer-row api-get">
  <div class="span8 col-sm-8 api-method"><span class="verb get">GET</span> /api/users?search={query}</div>
  <div class="span4 col-sm-4 api-description" style="text-align:right">Search users</div>
</div>

Performs a 'starts with' search by name or email. Or search by field, for example: email_verified:true; loginsCount:1; family_name:"johnson"

```text
GET /api/users?search={query}
Authorization: Bearer {token}
```

<div class="row api-explorer-row api-get">
  <div class="span8 col-sm-8 api-method"><span class="verb post">GET</span> /api/users/{user_id}</div>
  <div class="span4 col-sm-4 api-description" style="text-align:right">Gets an user by id</div>
</div>

Gets an user who have logged in through any of your connections that has a given id.

```text
GET /api/users/{user_id}
Authorization: Bearer {token}
```

<div class="row api-explorer-row api-get">
  <div class="span8 col-sm-8 api-method"><span class="verb get">GET</span> /api/users/{user_id}/devices</div>
  <div class="span4 col-sm-4 api-description" style="text-align:right">Gets all user's devices</div>
</div>

Gets all devices/refresh_tokens being used by the user.

```text
GET /api/users/{user_id}/devices
Authorization: Bearer {token}
```

<div class="row api-explorer-row api-get">
  <div class="span8 col-sm-8 api-method"><span class="verb get">GET</span> /api/connections/{connection}/users</div>
  <div class="span4 col-sm-4 api-description" style="text-align:right">Gets all users from an enterprise directory</div>
</div>

Head ups! If the connection does not support querying for users (for instance ADFS, SAMLP), it will return the users who have logged in through that connection.

```text
GET /api/connections/{connection}/users
Authorization: Bearer {token}
```

<div class="row api-explorer-row api-get">
  <div class="span8 col-sm-8 api-method"><span class="verb get">GET</span> /api/connections/{connection}/users?search={criteria}</div>
  <div class="span4 col-sm-4 api-description" style="text-align:right">Search users from an enterprise directories</div>
</div>

**Search** remarks: Depending on the connection's type the search will be done in different fields:
*   Active Directory/LDAP: by default uses Ambigous name resolution ([ANR](http://technet.microsoft.com/en-us/library/cc755809(v=ws.10).aspx)) which expands to givenName (first name), sn (surname, or last name), displayName, RDN, legacyExchangeDN, physicalDeliveryOfficeName (for example, Building A, Suite 1234), proxyAddresses (the collection of e-mail addresses over all e-mail address spaces that the Exchange server knows about).
*   Database Connections (not custom): Name/Email case insensitive.
*   Google Apps: Email/username case insensitive.
*   WAAD/WAAD2: Name/Email case insensitive.
*   Windows Azure Active Directory or Office365: name/email case insensitive
Heads up! If the connection does not support querying for users (for instance ADFS, SAMLP), it will return the users who have logged in through that connection.

```text
GET /api/connections/{connection}/users?search={query}&per_page={count}
Authorization: Bearer {token}
```

<div class="row api-explorer-row api-get">
  <div class="span8 col-sm-8 api-method"><span class="verb get">GET</span> /api/enterpriseconnections/users?search={criteria}</div>
  <div class="span4 col-sm-4 api-description" style="text-align:right">Search users from all enterprise directories</div>
</div>

Search users from all enterprise directories based on the specified `criteria`. The parameter is mandatory.
**Search** remarks: Depending on the connection's type the search will be done in different fields:
*   Active Directory/LDAP: by default uses Ambigous name resolution ([ANR](http://technet.microsoft.com/en-us/library/cc755809(v=ws.10).aspx)) which expands to givenName (first name), sn (surname, or last name), displayName, RDN, legacyExchangeDN, physicalDeliveryOfficeName (for example, Building A, Suite 1234), proxyAddresses (the collection of e-mail addresses over all e-mail address spaces that the Exchange server knows about).
*   Database Connections (not custom): Name/Email case insensitive.
*   Google Apps: Email/username case insensitive.
*   WAAD/WAAD2: Name/Email case insensitive.
*   Windows Azure Active Directory or Office365: name/email case insensitive
Heads up! If the connection does not support querying for users (for instance ADFS, SAMLP), it will return the users who have logged in through that connection.

```text
GET /api/enterpriseconnections/users?search=&per_page=
Authorization: Bearer {token}
```

<div class="row api-explorer-row api-get">
  <div class="span8 col-sm-8 api-method"><span class="verb get">GET</span> /api/socialconnections/users?search={criteria}</div>
  <div class="span4 col-sm-4 api-description" style="text-align:right">Gets all users who have logged in with social connections that match the search criteria</div>
</div>


Gets all users who have logged in through social connections that match the specified search `criteria`.
Performs a 'starts with' search by name or email. Or searches by field, for example: email_verified:true; loginsCount:1; family_name:"johnson"

```text
GET /api/socialconnections/users?search=&per_page=
Authorization: Bearer {token}
```

<div class="row api-explorer-row api-get">
  <div class="span8 col-sm-8 api-method"><span class="verb get">GET</span> /api/clients/{client-id}/users</div>
  <div class="span4 col-sm-4 api-description" style="text-align:right">Gets all users from a specific client</div>
</div>

Gets all users who have logged in with a specific client

```text
GET /api/clients//users
Authorization: Bearer {token}
```

<div class="row api-explorer-row api-post">
  <div class="span8 col-sm-8 api-method"><span class="verb post">POST</span> /api/users</div>
  <div class="span4 col-sm-4 api-description" style="text-align:right">Creates a user</div>
</div>

Creates a user. The body of the request must include the `email`, the `password`, and the `connection` of the user. Also it can include the user's `email_verified` parameter and the `extra attributes` that you want to add.

```text
POST /api/users/
Authorization: Bearer {token}
Content-Type: 'application/json'
{
  "email":          "",
  "password":       "",
  "connection":     "", // only database or passwordless connections
  "email_verified": falsetrue, // if true, it won't send an email for confirmation
  "vip": true,
  "birthdate": "1980-12-23T03:00:00.000Z"
}
```

<div class="row api-explorer-row api-post">
  <div class="span8 col-sm-8 api-method"><span class="verb post">POST</span> /api/users/{user_id}/send_verification_email</div>
  <div class="span4 col-sm-4 api-description" style="text-align:right">Resends verification account email</div>
</div>
Resends verification account email.

```text
POST /api/users//`send_verification_email`
Authorization: Bearer {token}
```

<div class="row api-explorer-row api-post">
  <div class="span8 col-sm-8 api-method"><span class="verb post">POST</span> /api/users/{user_id}/change_password_ticket</div>
  <div class="span4 col-sm-4 api-description" style="text-align:right">Generates change password ticket</div>
</div>

Generates change password ticket. The body of the request must include the `newPassword` of the user. Optionally, you can include the `resultUrl` (post verification url).

```text
POST /api/users/{user_id}/change_password_ticket
Authorization: Bearer {token}
Content-Type: 'application/json'
{
  "newPassword":    "",
  "resultUrl":      "" // optional
}
```
<div class="row api-explorer-row api-post">
  <div class="span8 col-sm-8 api-method"><span class="verb post">POST</span> /api/users/{user_id}/verification_ticket</div>
  <div class="span4 col-sm-4 api-description" style="text-align:right">Generates verification account ticket</div>
</div>

Generates verification account ticket. Optionally, you can include the `resultUrl` (post verification url) in the body of the request.

```text
POST /api/users/{user_id}/verification_ticket
Authorization: Bearer {token}
Content-Type: 'application/json'
{
  "resultUrl":      "" // optional
}
```

<div class="row api-explorer-row api-post">
  <div class="span8 col-sm-8 api-method"><span class="verb post">POST</span> /api/users/{user_id}/publickey</div>
  <div class="span4 col-sm-4 api-description" style="text-align:right">Saves user public key for specified device</div>
</div>

Saves user public key for specified device.

```text
POST /api/users//publickey
Authorization: Bearer {token}
Content-Type: 'application/json'
{
  "device":     "",
  "public_key": ""
}
```

<div class="row api-explorer-row api-put">
  <div class="span8 col-sm-8 api-method"><span class="verb put">PUT</span> /api/users/{user_id}/email</div>
  <div class="span4 col-sm-4 api-description" style="text-align:right">Updates user email</div>
</div>

Update user email. The body of the request must include the new `email`.

```text
PUT /api/users/{user_id}/email
Authorization: Bearer {token}
Content-Type: 'application/json'
{
  "email":   "",
  "verify":  truefalse // if false, it won't send an email for verification
}
```

<div class="row api-explorer-row api-put">
  <div class="span8 col-sm-8 api-method"><span class="verb put">PUT</span> /api/users/{user_id}/metadata</div>
  <div class="span4 col-sm-4 api-description" style="text-align:right">Updates user metadata</div>
</div>

Update user metadata. The body of the request must include a `json` object with metadata `attributes`.

```text
PUT /api/users/{user_id}/metadata
Authorization: Bearer {token}
Content-Type: 'application/json'
{
  "Policy": "1238907654",
  "Customer Id": "1234"
}
```

<div class="row api-explorer-row api-put">
  <div class="span8 col-sm-8 api-method"><span class="verb put">PUT</span> /api/users/{user_id}/password</div>
  <div class="span4 col-sm-4 api-description" style="text-align:right">Updates user password</div>
</div>

Update user password. The body of the request must include the new `password`.

```text
PUT /api/users/{user_id}/password
Authorization: Bearer {token}
Content-Type: 'application/json'
{
  "password":   "",
  "verify":     truefalse, // if false, it won't send an email for confirmation
}
```

<div class="row api-explorer-row api-put">
  <div class="span8 col-sm-8 api-method"><span class="verb put">PUT</span> /api/users/{email}/password</div>
  <div class="span4 col-sm-4 api-description" style="text-align:right">Updates user password</div>
</div>

Update user password. The body of the request must include the `email`, `connection` and the new `password`.

```text
PUT /api/users/{email}/password
Authorization: Bearer {token}
Content-Type: 'application/json'
{
  "email":      "",
  "password":   "",
  "connection": "
  ", // only database connections
  "verify":     truefalse, // if false, it won't send an email for confirmation
}
```

<div class="row api-explorer-row api-patch">
  <div class="span8 col-sm-8 api-method"><span class="verb patch">PATCH</span> /api/users/{user_id}/metadata</div>
  <div class="span4 col-sm-4 api-description" style="text-align:right">Patch user metadata</div>
</div>

Patch user metadata. The body of the request must include a `json` object with metadata `attributes`. It will not override metadata not specified attributes.

```text
PATCH /api/users/{user_id}/metadata
Authorization: Bearer {token}
Content-Type: 'application/json'
{
  "Policy": "1238907654",
  "Customer Id": "1234"
}
```

<div class="row api-explorer-row api-delete">
  <div class="span8 col-sm-8 api-method"><span class="verb delete">DELETE</span> /api/users/{user_id}</div>
  <div class="span4 col-sm-4 api-description" style="text-align:right">Deletes a user</div>
</div>

Deletes a user identified by `user_id`

```text
DELETE /api/users/{user_id}
Authorization: Bearer {token}
```

<div class="row api-explorer-row api-delete">
  <div class="span8 col-sm-8 api-method"><span class="verb delete">DELETE</span> /api/users/{user_id}/refresh_tokens/{refresh_token}</div>
  <div class="span4 col-sm-4 api-description" style="text-align:right">Revokes a refresh token</div>
</div>

Revokes a user's refresh token

```text
DELETE /api/users/{user_id}/refresh_tokens/{refresh_token}
Authorization: Bearer {token}
```


<div class="row api-explorer-row api-delete">
  <div class="span8 col-sm-8 api-method"><span class="verb delete">DELETE</span> /api/users/{user_id}/publickey?device={device}</div>
  <div class="span4 col-sm-4 api-description" style="text-align:right">Revokes a public key</div>
</div>

Revokes a user's public key for specified device

```
DELETE /api/users/{user_id}/publickey?device={device}
Authorization: Bearer {token}
```

## Connections

<div class="row api-explorer-row api-get">
  <div class="span8 col-sm-8 api-method"><span class="verb get">GET</span> /api/connections</div>
  <div class="span4 col-sm-4 api-description" style="text-align:right">Gets all connections</div>
</div>

Gets a list of all the connections (enterprise and social) and all its `options`

```text
GET /api/connections
Authorization: Bearer {token}
```

<div class="row api-explorer-row api-get">
  <div class="span8 col-sm-8 api-method"><span class="verb get">GET</span> /api/connections/{connection-name}</div>
  <div class="span4 col-sm-4 api-description" style="text-align:right">Gets one connection by name</div>
</div>

Gets a connection by name (enterprise and social) and all its `options`

```text
GET /api/connections/{connection-name}
Authorization: Bearer {token}
```

<div class="row api-explorer-row api-delete">
  <div class="span8 col-sm-8 api-method"><span class="verb delete">DELETE</span> /api/connections/{connection-name}</div>
  <div class="span4 col-sm-4 api-description" style="text-align:right">Removes a connection</div>
</div>

Deletes a connection identified by `connectionName`

```text
DELETE /api/connections/{connection-name}
Authorization: Bearer {token}
```

<div class="row api-explorer-row api-post">
  <div class="span8 col-sm-8 api-method"><span class="verb post">POST</span> /api/connections</div>
  <div class="span4 col-sm-4 api-description" style="text-align:right">Creates a connection</div>
</div>

Creates a connection. The body of the request must include the `name`, the authentication `strategy` to use, and an `options` object with the connection parameters.

```text
POST /api/connections
Authorization: Bearer {token}
Content-Type: 'application/json'
{
  "name":     ""
  "strategy": "waad|google-apps|adfs|PingFederate|samlp|auth0|etc",
  "options":   {
    "tenant_domain":
    "domain_aliases":
    "tenant_domain":
    "domain_aliases":
    "tenant_domain": ,
    "domain_aliases": ,
    "adfs_server":
    "domain_aliases": ,
    "PingFederate Base URL": ,
    "Signing Cert":   "",
    "signInEndpoint":   "",
    "signingCert":   "",
    "tenant_domain": "",
    "domain_aliases": ,
    "signOutEndpoint":  "",
  }
}
```

<div class="row api-explorer-row api-put">
  <div class="span8 col-sm-8 api-method"><span class="verb put">PUT</span> /api/connections/{connection-name}</div>
  <div class="span4 col-sm-4 api-description" style="text-align:right">Updates a connection</div>
</div>

Updates a connection. The body of the request must include the `options` object with the connection parameters and the `status`.
The request's body depends on the strategy that was used to create the connection. Select a strategy: waad google-apps adfs PingFederate samlp auth0

```text
PUT /api/connections/{connection-name}
Authorization: Bearer {token}
Content-Type: 'application/json'
{
  "options":   {
    "tenant_domain":
    "tenant_domain":
    "tenant_domain": ,
    "adfs_server":
    "PingFederate Base URL": ,
    "Signing Cert":   "",
    "signInEndpoint":   "",
    "signingCert":   "",
    "tenant_domain": "",
    "signOutEndpoint":  "",
  }
  "status": true|false
}
```

## Clients

<div class="row api-explorer-row api-get">
  <div class="span8 col-sm-8 api-method"><span class="verb get">GET</span> /api/clients</div>
  <div class="span4 col-sm-4 api-description" style="text-align:right">Gets all applications/APIs</div>
</div>

Gets a list of all the applications/APIs (aka clients) and all its `options`

```text
GET /api/clients
Authorization: Bearer {token}
```

<div class="row api-explorer-row api-post">
  <div class="span8 col-sm-8 api-method"><span class="verb post">POST</span> /api/clients</div>
  <div class="span4 col-sm-4 api-description" style="text-align:right">Creates a new applications/APIs</div>
</div>

Create a client. The body of the request can include the `name` and `callbacks` parameters.

```text
POST /api/clients
Authorization: Bearer {token}
Content-Type: 'application/json'
{
  "name":      "",
  "callbacks": "" // You can specify multiple valid URLs by comma-separating them.
}
```

<div class="row api-explorer-row api-patch">
  <div class="span8 col-sm-8 api-method"><span class="verb patch">PATCH</span> /api/clients/{client-id}</div>
  <div class="span4 col-sm-4 api-description" style="text-align:right">Updates an applications/APIs</div>
</div>

Update a client. The body of the request must include the `name` and `callbacks` parameters. Does not overwrite the entire client, only the provided values.
Additionally the `signingKey` can be overwritten using this method (not provided for trial for safety reasons). Possible formats are:
*   `"signingKey": { cert: "%CERT_STRING%" } // using a cert`
*   `"signingKey": { key: "%KEY_STRING%" } // using a private key`
*   `"signingKey": { pkcs7: "%PKCS7_STRING%" } // using a pkcs7`
*
WARNING! Changing the `signingKey` for the globalClient will change it for all clients.

```text
PATCH /api/clients/{client-id}
Authorization: Bearer {token}
Content-Type: 'application/json'
{
  "name":      "",
  "callbacks": "" // You can specify multiple valid URLs by comma-separating them.
}
```

## Rules

<div class="row api-explorer-row api-get">
  <div class="span8 col-sm-8 api-method"><span class="verb get">GET</span> /api/rules</div>
  <div class="span4 col-sm-4 api-description" style="text-align:right">Gets all rules</div>
</div>

Gets a list of all the rules

```text
GET /api/rules
Authorization: Bearer {token}
```

<div class="row api-explorer-row api-post">
  <div class="span8 col-sm-8 api-method"><span class="verb post">POST</span> /api/rules</div>
  <div class="span4 col-sm-4 api-description" style="text-align:right">Creates a new applications/APIs</div>
</div>

Create a rule. The body of the request must include the `name`, `status` and `script` parameters.

```text
POST /api/rules/
Authorization: Bearer {token}
Content-Type: 'application/json'
{
  "name":     "",
  "status":   true|false,
  "script":   "function (user, context, callback) { user.foo = 'bar'; callback(null, user, context);}"
               // new lines should be encoded as \n
  "order": 1 // optional
}
```

<div class="row api-explorer-row api-put">
  <div class="span8 col-sm-8 api-method"><span class="verb put">PUT</span> /api/rules/{rule-name}</div>
  <div class="span4 col-sm-4 api-description" style="text-align:right">Updates a rule</div>
</div>

Update a rule. The body of the request must include the `status` and `script` parameters.

```text
PUT /api/rules/{rule-name}
Authorization: Bearer {token}
Content-Type: 'application/json'
{
  "status":   true|false,
  "script":   "function (user, context, callback) { user.foo = 'bar'; callback(null, user, context);}"
               // new lines should be encoded as \n
  "order": 1 // optional
}
```

<div class="row api-explorer-row api-delete">
  <div class="span8 col-sm-8 api-method"><span class="verb delete">DELETE</span> /api/rules/{rule-name}</div>
  <div class="span4 col-sm-4 api-description" style="text-align:right">Deletes a rules</div>
</div>


Deletes a rule identified by `rule-name` (url-encoded)

```text
DELETE /api/rules/{rule-name}
Authorization: Bearer {token}
```

## Email Templates

<div class="row api-explorer-row api-get">
  <div class="span8 col-sm-8 api-method"><span class="verb get">GET</span> /api/emails/{email-template-name}</div>
  <div class="span4 col-sm-4 api-description" style="text-align:right">Gets an email template by name</div>
</div>

Gets an email template by name

```text
GET /api/emails/{email-template-name}
Authorization: Bearer {token}
```

Template Names:
* `verify_email`
* `welcome_email`
* `reset_email`
* `blocked_account`

<div class="row api-explorer-row api-post">
  <div class="span8 col-sm-8 api-method"><span class="verb post">POST</span> /api/emails</div>
  <div class="span4 col-sm-4 api-description" style="text-align:right">Creates an email template</div>
</div>


Creates an email template. The body of the request must include the `template` name and the `tenant`.

```text
POST /api/emails/
Authorization: Bearer {token}
Content-Type: 'application/json'
{
  "template": "template_name",
  "disabled": true|false,
  "from": "",
  "subject": "",
  "body": "",
  "urlLifetimeInSeconds": "",
  "resultUrl": "",
  "syntax": "liquid"
}
```

Template Names:
* `verify_email`
* `welcome_email`
* `reset_email`
* `blocked_account`

<div class="row api-explorer-row api-put">
  <div class="span8 col-sm-8 api-method"><span class="verb put">PUT</span> /api/emails/{email-template-name}</div>
  <div class="span4 col-sm-4 api-description" style="text-align:right">Updates an email template</div>
</div>

Updates an email template.

```text
PUT /api/emails/{email-template-name}
Authorization: Bearer {token}
Content-Type: 'application/json'
{
  "disabled": true|false,
  "from": "",
  "subject": "",
  "body": "",
  "urlLifetimeInSeconds": "",
  "resultUrl": "",
  "syntax": "liquid"
}
```

Template Names:
* `verify_email`
* `welcome_email`
* `reset_email`
* `blocked_account`

## Logs

<div class="row api-explorer-row api-get">
  <div class="span8 col-sm-8 api-method"><span class="verb get">GET</span> /api/logs/{_id}</div>
  <div class="span4 col-sm-4 api-description" style="text-align:right">Gets a log entry</div>
</div>


Retrieves the data related to the log entry identified by `_id`.

```text
GET /api/logs/{_id}
Authorization: Bearer {token}
```

<div class="row api-explorer-row api-get">
  <div class="span8 col-sm-8 api-method"><span class="verb get">GET</span> /api/users/{user_id}/logs?page={number}&amp;per_page={items}</div>
  <div class="span4 col-sm-4 api-description" style="text-align:right">Gets the logs for a particular user</div>
</div>

Retrieves the log entries related to the user identified by `user_id`. Log entries are split into pages of a particular size to avoid returning all data at once:
*   `page`: The page number. Zero based.
*   `items`: The amount of entries per page.

```text
GET /api/users/{user_id}/logs?page={number}&per_page={items}
Authorization: Bearer {token}
```

#### Response fields
The following is a description of the values returned by the request:
*   `start`: The absolute number (considering all log entries) of the first entry in the page.
*   `length`: The amount of entries in the page (can only be different than `limit` in the last page).
*   `total`: The amount of entries in the page.
*   `limit`: The maximum amount of items in a page.
*   `logs`: A collection of log entries.
    *   `date`: The moment when the event occured.
    *   `connection`: The connection related to the event.
    *   `client_id`: The id of the client related to the event.
    *   `client_name`: The name of the client related to the event.
    *   `ip`: The IP address from where the request that caused the log entry originated.
    *   `user_id`: The user id releated to the event.
    *   `user_name`: The user name releated to the event.
    *   `description`: The event's description.
    *   `user_agent`: The user agent that was used to cause the creation of the log entry.
    *   `type`: An abbreviation of the event type. Refer to the event acronym mappings below for the mapping between abbreviations and their meaning.
    *   `details`: Additional (and very useful) details about the event. They don't have a specific schema as they vary based on event type.
##### Event acronym mappings
The following is the meaning of the event acronyms:
*   `s`:Success Login
*   `f`:Failed Login
*   `fu`:Failed Login (invalid email/username)
*   `fp`:Failed Login (wrong password)
*   `fc`:Failed by Connector
*   `fco`:Failed by CORS
*   `con`:Connector Online
*   `coff`:Connector Offline
*   `ss`:Success Signup
*   `fs`:Failed Signup
*   `sv`:Success Verification Email
*   `fv`:Failed Verification Email
*   `scp`:Success Change Password
*   `fcp`:Failed Change Password
*   `sce`:Success Change Email
*   `fce`:Failed Change Email
*   `svr`:Success Verification Email Request
*   `fvr`:Failed Verification Email Request
*   `scpr`:Success Change Password Request
*   `fcpr`:Failed Change Password Request
*   `fn`:Failed Sending Notification

<div class="row api-explorer-row api-get">
  <div class="span8 col-sm-8 api-method"><span class="verb get">GET</span> /api/logs?page={number}&per_page={items}&sort={field}:{-1|1}&fields={fields}&exclude_fields{true|false}</div>
  <div class="span4 col-sm-4 api-description" style="text-align:right">Gets log entries</div>
</div>

Retrieves data about log entries based on the specified parameters. Log entries are split into pages of a particular size to avoid returning all data at once:
*   `page`: The page number. Zero based.
*   `items`: The amount of entries per page.
*   `field`: The field to use for sorting. `1` == ascending and `-1` == descending.
*   `fields`: Can be used to either include or exclude the specified fields by providing a comma (,) separated list of fields, for example `at,c,cn,un`. If no list is provided all fields are included in the response.
*   `exclude_fields`: To exclude the fields `exclude_fields=true` must be used (if not specified it defaults to false).
Possible values for `field` are:
*   `date`: The moment when the event occured.
*   `connection`: The connection related to the event.
*   `client_name`: The name of the client related to the event.
*   `user_name`: The user name releated to the event.

```text
GET /api/logs?page={number}&per_page={items}&sort={field}:{-1|1}&fields={fields}&exclude_fields{true|false}
Authorization: Bearer {token}
```

#### Response fields
The following is a description of the values returned by the request:
*   `start`: The absolute number (considering all log entries) of the first entry in the page.
*   `length`: The amount of entries in the page (can only be different than `limit` in the last page).
*   `total`: The amount of entries in the page.
*   `limit`: The maximum amount of items in a page.
*   `logs`: A collection of log entries.
    *   `date`: The moment when the event occured.
    *   `connection`: The connection related to the event.
    *   `client_id`: The id of the client related to the event.
    *   `client_name`: The name of the client related to the event.
    *   `ip`: The IP address from where the request that caused the log entry originated.
    *   `user_id`: The user id releated to the event.
    *   `user_name`: The user name releated to the event.
    *   `description`: The event's description.
    *   `user_agent`: The user agent that was used to cause the creation of the log entry.
    *   `type`: An abbreviation of the event type. Refer to the event acronym mappings below for the mapping between abbreviations and their meaning.
    *   `details`: Additional (and very useful) details about the event. They don't have a specific schema as they vary based on event type.
##### Event acronym mappings
The following is the meaning of the event acronyms:
*   `s`:Success Login
*   `f`:Failed Login
*   `fu`:Failed Login (invalid email/username)
*   `fp`:Failed Login (wrong password)
*   `fc`:Failed by Connector
*   `fco`:Failed by CORS
*   `con`:Connector Online
*   `coff`:Connector Offline
*   `ss`:Success Signup
*   `fs`:Failed Signup
*   `sv`:Success Verification Email
*   `fv`:Failed Verification Email
*   `scp`:Success Change Password
*   `fcp`:Failed Change Password
*   `sce`:Success Change Email
*   `fce`:Failed Change Email
*   `svr`:Success Verification Email Request
*   `fvr`:Failed Verification Email Request
*   `scpr`:Success Change Password Request
*   `fcpr`:Failed Change Password Request
*   `fn`:Failed Sending Notification

<div class="row api-explorer-row api-get">
  <div class="span8 col-sm-8 api-method"><span class="verb get">GET</span> /api/logs?search={criteria}</div>
  <div class="span4 col-sm-4 api-description" style="text-align:right">Gets log entries</div>
</div>

Retrieves logs that match the specified search `criteria`. This parameter can be combined with all the others in the `/api/logs` endpoint but is specified separately for clarity.
If no fields are provided a case insensitive 'starts with' search is performed on all of the following fields:
*   `client_name`
*   `connection`
*   `user_name`

Otherwise, you can specify multiple fields and specify the search using the `%field%:%search%`, for example: `application:node user:"John@contoso.com"`.
Values specified without quotes are matched using a case insensitive 'starts with' search. If quotes are used a case insensitve exact search is used. If multiple fields are used, the AND operator is used to join the clauses.

##### Available Fields
*   `application`: Maps to the `client_name` field.
*   `connection`: Maps to the `connection` field.
*   `user`: Maps to the `user_name` field.

```text
GET /api/logs?search={criteria}
Authorization: Bearer {token}
```

#### Response fields
The following is a description of the values returned by the request:
*   `start`: The absolute number (considering all log entries) of the first entry in the page.
*   `length`: The amount of entries in the page (can only be different than `limit` in the last page).
*   `total`: The amount of entries in the page.
*   `limit`: The maximum amount of items in a page.
*   `logs`: A collection of log entries.
    *   `date`: The moment when the event occured.
    *   `connection`: The connection related to the event.
    *   `client_id`: The id of the client related to the event.
    *   `client_name`: The name of the client related to the event.
    *   `ip`: The IP address from where the request that caused the log entry originated.
    *   `user_id`: The user id releated to the event.
    *   `user_name`: The user name releated to the event.
    *   `description`: The event's description.
    *   `user_agent`: The user agent that was used to cause the creation of the log entry.
    *   `type`: An abbreviation of the event type. Refer to the event acronym mappings below for the mapping between abbreviations and their meaning.
    *   `details`: Additional (and very useful) details about the event. They don't have a specific schema as they vary based on event type.

##### Event acronym mappings
The following is the meaning of the event acronyms:
*   `s`:Success Login
*   `f`:Failed Login
*   `fu`:Failed Login (invalid email/username)
*   `fp`:Failed Login (wrong password)
*   `fc`:Failed by Connector
*   `fco`:Failed by CORS
*   `con`:Connector Online
*   `coff`:Connector Offline
*   `ss`:Success Signup
*   `fs`:Failed Signup
*   `sv`:Success Verification Email
*   `fv`:Failed Verification Email
*   `scp`:Success Change Password
*   `fcp`:Failed Change Password
*   `sce`:Success Change Email
*   `fce`:Failed Change Email
*   `svr`:Success Verification Email Request
*   `fvr`:Failed Verification Email Request
*   `scpr`:Success Change Password Request
*   `fcpr`:Failed Change Password Request
*   `fn`:Failed Sending Notification

<div class="row api-explorer-row api-get">
  <div class="span8 col-sm-8 api-method"><span class="verb get">GET</span> /api/logs?from={checkpointId}&take={count}</div>
  <div class="span4 col-sm-4 api-description" style="text-align:right">Gets log entries from a checkpoint</div>
</div>

Retrieves `count` log entries that were logged after `checkpointId`.
*   If `checkpointId` is not provided it will start retrieving from the first log entry.
*   If `count` is not provided the default value is 200 (also the max value).

```text
GET /api/logs?from={checkpointId}&take={count}
Authorization: Bearer {token}
```

#### Response fields
The following is a description of the values returned by the request:
*   `start`: The absolute number (considering all log entries) of the first entry in the page.
*   `length`: The amount of entries in the page (can only be different than `limit` in the last page).
*   `total`: The amount of entries in the page.
*   `limit`: The maximum amount of items in a page.
*   `logs`: A collection of log entries.
    *   `date`: The moment when the event occured.
    *   `connection`: The connection related to the event.
    *   `client_id`: The id of the client related to the event.
    *   `client_name`: The name of the client related to the event.
    *   `ip`: The IP address from where the request that caused the log entry originated.
    *   `user_id`: The user id releated to the event.
    *   `user_name`: The user name releated to the event.
    *   `description`: The event's description.
    *   `user_agent`: The user agent that was used to cause the creation of the log entry.
    *   `type`: An abbreviation of the event type. Refer to the event acronym mappings below for the mapping between abbreviations and their meaning.
    *   `details`: Additional (and very useful) details about the event. They don't have a specific schema as they vary based on event type.

##### Event acronym mappings
The following is the meaning of the event acronyms:
*   `s`:Success Login
*   `f`:Failed Login
*   `fu`:Failed Login (invalid email/username)
*   `fp`:Failed Login (wrong password)
*   `fc`:Failed by Connector
*   `fco`:Failed by CORS
*   `con`:Connector Online
*   `coff`:Connector Offline
*   `ss`:Success Signup
*   `fs`:Failed Signup
*   `sv`:Success Verification Email
*   `fv`:Failed Verification Email
*   `scp`:Success Change Password
*   `fcp`:Failed Change Password
*   `sce`:Success Change Email
*   `fce`:Failed Change Email
*   `svr`:Success Verification Email Request
*   `fvr`:Failed Verification Email Request
*   `scpr`:Success Change Password Request
*   `fcpr`:Failed Change Password Request
*   `fn`:Failed Sending Notification
