---
description: Management API V1 reference page.
section: apis
toc: true
topics:
  - apis
  - management-api
contentType: reference
useCase: invoke-api
---

# Auth0 Management API Reference

<%= include('../../../_includes/_version_warning_api') %>

### API endpoint

```text
https://${account.namespace}/api
```

### Authentication
Each API request must include an <dfn data-key="access-token">Access Token</dfn>, either inside the query string:

```text
https://${account.namespace}/api/connections/?access_token={ACCESS-TOKEN}
```

or in an ```Authorization``` header:

```text
GET https://${account.namespace}/api/connections
Authorization: bearer {ACCESS-TOKEN}
```

A token is obtained using the POST method:

```text
POST https://${account.namespace}/oauth/token
Content-type: application/x-www-form-urlencoded
client_id=${account.clientId}&client_secret=YOUR_CLIENT_SECRET&type=web_server&grant_type=client_credentials
```

The response body of this POST is a JSON object:

```text
{
  'access_token': TOKEN
  'token_type':'bearer'
}
```

Here is a simple example using cURL:

```text
curl https://${account.namespace}/oauth/token --data "client_id=${account.clientId}&client_secret=YOUR_CLIENT_SECRET&type=web_server&grant_type=client_credentials"
```

### Headers
The `Authorization` header is the only accepted header and is used in place of the query string to send the Access Token. All content is  returned in JSON. The `Accept` header is ignored for now.

```text
Authorization: bearer {ACCESS-TOKEN}
```

## Connections

### Connection Methods
| Verb | URL |
|:-----|:----|
|`GET` | https://${account.namespace}/api/connections |
|`GET` | https://${account.namespace}/api/connections/{connectionName} |
|`POST` | https://${account.namespace}/api/connections |
|`DELETE`| https://${account.namespace}/api/connections/{connectionName} |
|`PUT` | https://${account.namespace}/api/connections/{connectionName} |

#### List all Connections

To return a list of all defined connections in Auth0, use this syntax:

```text
GET https://${account.namespace}/api/connections/?access_token={ACCESS-TOKEN}
```

The body of the response is a `connection` object formatted as follows:

```text
{
  "client_id": "${account.clientId}",
  "name": YOUR-CONNECTION-NAME,
  "options":
  {
    ...
  },
  "status": 0,
  "strategy": STRATEGY
}
```

#### Parameters
| Parameter  | Description |
|:-----------|:------------|
| `client_id`| Your client_id (${account.clientId}), used to obtain the authentication token.           |
| `name` | The unique name you gave to the connection.                                |
| `status` | Defines whether the connection is active `1` or not `0`. |
| `strategy` | The type of identity provider associated with this connection. See below for supported strategies.|
| `options` | An object with properties that are dependent on the strategy selected. |


#### Strategies

| Strategy | For Customers Using |
|:---------|:--------------------|
| `adfs` | On Premises Active Directory or any WS-Federation server |
| `g-suite` | G Suite |
| `google-oauth2` |Google (through the OAuth2 protocol) |
| `office365` | Office 365 and Microsoft Azure Active Directory |
| `windowslive` | Microsoft Account (formerly LiveID) |

When implementing the `office365`, `g-suite` or `adfs` strategies, the following properties are added to the connection object:

```text
provisioning_ticket: TICKET
provisioning_ticket_url: PROVISIONING-URL
```

The `provisioning_ticket_url` is sent to the identity provider administrator and contains information on how to complete the configuration on their side.

A GET on `connections` with a specified `{connectionName}` in the path will return the matching connection object only.

###### The cURL sample scripts

This script returns a specific connection:

```text
curl https://${account.namespace}/api/connections/?access_token={YOUR ACCESS TOKEN}
```

This script returns all connections:

```text
curl https://${account.namespace}/api/connections/{YOUR-CONNECTION-NAME}?access_token={YOUR ACCESS TOKEN}
```

##### Options

The `options` object returned in the `connection` will be different for each strategy and will typically contain the same information that was entered on the [connections](${manage_url}/#/connections) screen.

###### ADFS Strategy

```text
{
  tenant_domain: A-DOMAIN,
  adfs_server: YOUR-FEDERATION-METADATA-ENDPOINT,
  thumbprints: [ '9b250aad7e4950604072ffaa60cde7795f23b52a',
    'f97702a42c893a0fb1bc6dad21c79fb720473a85',
    '9b250aad7e4955604072faca60cde7795f23b52a',
    'f97702a42c893a0fb1bc6dad21c79fb720473a85',
    '9b250aad7e4956704072ffaa60cde7795f23b52a',
    'f97702a42c893a0fb1b546dad21c79fb720473a85',
    '9b250aad7e4959804072ffaa60cde7795f23b52a' ],
  signInEndpoint: ADFS-LOGIN-PAGE
}
```

| Parameter | Description |
|:----------|:------------|
| `tenant_domain` | The domain name of the company (If the user's email is _john @mycompany.com_, then _mycompany.com_ is the domain). |
| `adfs_server` | (for example: `the-adfs-server.domain.com/FederationMetadata/2007-06/FederationMetadata.xml`). |
| `signInEndpoint`| The URL of the ADFS server where Auth0 will redirect users for login. (for example: `the-adfs-server.company.com/adfs/ls`). |

###### G Suite Strategy

```text
{
  client_id: GOOG-CLIENT-ID,
  client_secret: GOOG-CLIENT-SECRET,
  tenant_domain: 'company.com',
  email: true/false,
  profile: true/false,
  ext_groups: true/false,
  ext_is_admin: true/false,
  ext_is_suspended: true/false,
  ext_agreed_terms: true/false,
  api_enable_users: true/false,
  scope: [ 'https://www.googleapis.com/auth/userinfo.email',
       'https://www.googleapis.com/auth/userinfo.profile' ]
}
```

To obtain the `client_id` and `client_secret` for G Suite connections, see [Google connections](/connections/social/google).

###### Google OAuth2 Strategy

```text
{
  client_id: 'GOOG-CLIENT-ID',
  client_secret: 'GOOG-CLIENT-SECRET',
  email: true/false,
  profile: true/false,
  contacts: true/false,
  blogger: true/false,
  calendar: true/false,
  gmail: true/false,
  google_plus: true/false,
  orkut: true/false,
  picasa_web: true/false,
  tasks: true/false,
  youtube: true/false,
  adsense_management: true/false,
  google_affiliate_network: true/false,
  analytics: true/false,
  google_books: true/false,
  google_cloud_storage: true/false,
  content_api_for_shopping: true/false,
  chrome_web_store: true/false,
  document_list: true/false,
  google_drive: true/false,
  google_drive_files: true/false,
  latitude_best: true/false,
  latitude_city: true/false,
  moderator: true/false,
  sites: true/false,
  spreadsheets: true/false,
  url_shortener: true/false,
  webmaster_tools: true/false,
  scope: []
}
```

###### Office 365 Strategy

```text
{
  client_id: 'OFFICE-365-CLIENT-ID',
  client_secret: 'OFFICE-365-CLIENT-SECRET',
  tenant_domain: 'CONNECTION-DOMAIN-ON-OFFICE-365',
  basic_profile: true/false,
  ext_profile: true/false,
  ext_groups: true/false,
  ext_assigned_plans: true/false,
  api_enable_users: true/false,
  app_domain: '${account.namespace}',
  thumbprints: []
}
```

To obtain `client_id` and `client_secret` for Office 365 connections, see [o365-clientid](/o365-clientid).


###### Microsoft Account Strategy

```text
{
  client_id: 'MSFT-ACCOUNT-CLIENT-ID',
  client_secret: 'MSFT-ACCOUNT-CLIENT-SECRET',
  signin: true/false,
  emails: true/false,
  postal_addresses: true/false,
  birthday: true/false,
  work_profile: true/false,
  basic: true/false,
  offline_access: true/false,
  calendars: true/false,
  calendars_update: true/false,
  contacts_birthday: true/false,
  contacts_create: true/false,
  contacts_calendar: true/false,
  contacts_photos: true/false,
  contacts_skydrive: true/false,
  events_create: true/false,
  messenger: true/false,
  phone_numbers: true/false,
  photos: true/false,
  share: true/false,
  skydrive: true/false,
  skydrive_update: true/false,
  applications: true/false,
  applications_create: true/false,
  scope: []
}
```

To obtain `client_id` and `client_secret` for Microsoft Accounts, see [Microsoft Account Client ID](/ms-account-clientid).

#### Get a specific Connection

```text
GET https://${account.namespace}/api/connections/{A-CONNECTION-NAME}/?access_token=...
```

#### Delete a connection

A Delete operation on the `connections` object will eliminate the connection definition permanently. The parameter for this operation is the name of the connection to delete.

```text
DELETE https://${account.namespace}/api/connections/{A-CONNECTION-NAME}/?access_token=...
```

If successful, the response body will contain a confirmation object:
```text
{
  "removed": {id}
}
```

::: note
Batch operations are not yet supported.
:::

#### Create a new Connection

To create a new connection, POST a connection object to the `connections` resource:

```text
POST https://${account.namespace}/connections
Content-Type: application/json
```

The body of the request is formatted as a `connection` object. For example, the following will create a new connection to G Suite, initially inactive (`status=0`):

```text
{
  "name": A-NAME-FOR-THIS-CONNECTION
  "status": 0,
  "options":
  {
  "client_id": GOOG-APPS-CLIENT-ID,
  "client_secret": GOOG-APPS-CLIENT-SECRET,
  "tenant_domain": GOOG-APP-DOMAIN,
  "ext_groups":true //Optional
  },
  "strategy": "g-suite"
};
```

Once again, the `options` object is dependent on the strategy specified.

If successful, the response body will contain a complete `connection` object. This will include additional fields (such as the entity `id`, and so on).

#### Updating a Connection

For updates, use the PUT method. A PUT works on a specific `connection`, therefore the connection `name` must be specified. All object parameters must be included, not only those which have changed.

### Users
| Verb | URL | Description |
|:-----|:----|:------------|
|`GET` |https://${account.namespace}/api/users |Gets all users who have logged in through any of your connections. |
|`GET` |https://${account.namespace}/api/connections/{connection}/users|Gets all users from an enterprise directory like Office365 / Microsoft Azure Active Directory or a G Suite domain.|
|`GET` |https://${account.namespace}/api/socialconnections/users |Gets all users who have logged in through any of the enabled social connections. |

::: note
If the connection does not support querying for users (for instance: ADFS), the `GET https://${account.namespace}/api/connections/{connection}/users` will return users who have logged in through that connection.
:::

#### The User Object

```text
{
  _id: '7eb1ae32568910b0f46e981aa99b56556',
  email: 'john@fabrikam.com',
  family_name: 'Fabrikam',
  given_name: 'John',
  identities: [],
  issuer: 'https://the-adfs-server.fabrikam.com',
  lastLogin: '2013-01-15T01:54:30.578Z',
  loginsCount: 13,
  name: 'John Fabrikam',
  nickname: 'john',
  picture: 'https://secure.gravatar.com/avatar/5426f6b9d63ad92d60e6fe9fdf83aa21?s=480&r=pg&d=https%3A%2F%2Fssl.gstatic.com%2Fs2%2Fprofiles%2Fimages%2Fsilhouette80.png',
  user_id: 'adfs|john@fabrikam.com'
}
```

Most attributes in the `user` object are self-explanatory. Some comments are below:

|Parameter | Description |
|:---------|:------------|
|`issuer` | The name of the authentication server. In the example above it is the URL of Fabrikam's ADFS server used.|
|`user_id` | (for example: _the-adfs-server.domain.com/FederationMetadata/2007-06/FederationMetadata.xml_). |
|`picture` | The URL of the user's gravatar, if available. |
|`user_id` | A "friendly" unique identifier composed of the strategy plus a unique identifier from the `issuer` (for example: email, and so on). |

#### Other resources

* [Auth0 node module](/node-auth0client). A simple client library for Node.js apps.
