---
description: Describes the major differences between Auth0's Management API v1 and Management API v2, and details the reasons for each change.
section: apis
crews: crew-2
toc: true
topics:
    - management-api
    - apis
contentType: reference
useCase: invoke-api
---
# Management API v1 vs v2

This document describes the major differences between Auth0's Management API v1 and the new Management API v2, and details the reasons for each change.

## tl;dr

* v2 uses JWTs instead of opaque tokens.
* v2 includes `user_metadata` for trivial data about users and `app_metadata` for data that affects how your application functions. Unlike `metadata` in API v1, these fields are not merged into the root `user` object.
* Fewer endpoints on existing features make development easier.
* All endpoints work with ids. Strings (such as `connection_name`) are no longer used.
* New formats for `user_id` (available as `v2_id` with the "usr\_" prefix) and `clientID` (with the "cli\_" prefix) recognize the entity type based on its id.
* Improved input validation and error messages.
* Only one connection is exposed per tenant, instead of one per application. To enable/disable a connection for an application, use the `enabled_clients` property.
* When updating field values, v2 removes fields with `null` values, instead of storing them with the value `null`

### User endpoints

| v1 Endpoint | Change | v2 Endpoint |
| ----------- | ------ | ----------- |
| [GET /api/users](/api/v1#!#get--api-users) | None. | [GET /api/v2/users](/api/v2#!/Users/get_users) |
| [GET /api/users?search={criteria}](/api/v1#!#get--api-users-search--criteria-) | Changed parameter and syntax. | See the [get_users](/api/v2#!/Users/get_users) documentation. |
| [GET /api/users/{user\_id}](/api/v1#!#get--api-users--user_id-) | None. | [GET /api/v2/users/{id}](/api/v2#!/Users/get_users_by_id) also accepts `v2\_id` |
| [GET /api/connections/{connection}/users](/api/v1#!#get--api-connections--connection--users) | Changed to use search. | Available using `q=identities.connection:"{connection}"` and `search_engine=v3` in the query string. Other conditions may be added to the search. See the [get_users](/api/v2#!/Users/get_users) documentation. |
| [GET /api/connections/{connection}/users?search={criteria}](/api/v1#!#get--api-connections--connection--users-search--criteria-) | Changed to use search. | Available using `q=identities.connection:"{connection}"` and `search_engine=v3` in the query string. Other conditions and criteria may be added to the search. See the [get_users](/api/v2#!/Users/get_users) documentation. **For enterprise connections**, only supports searching users that have previously logged in; **external user search is no longer supported.** |
| [GET /api/enterpriseconnections/users?search={criteria}](/api/v1#!#get--api-enterpriseconnections-users-search--criteria-) | Changed to use search. | Available using `q=identities.isSocial:false AND NOT identities.provider:auth0` and `search_engine=v3` in the query string. Other conditions may be added to the search. See the [get_users](/api/v2#!/Users/get_users) documentation. Only supports searching users that have previously logged in; **external user search is no longer supported.** |
| [GET /api/socialconnections/users?search={criteria}](/api/v1#!#get--api-socialconnections-users-search--criteria-) |  Changed to use search. | Available using `q=identities.isSocial:true` and `search_engine=v3` in the query string. Other conditions may be added to the search. See the [get_users](/api/v2#!/Users/get_users) documentation. |
| [GET /api/clients/{client-id}/users](/api/v1#!#get--api-socialconnections-users-search--criteria-) | Not available. | Not available. |
| [POST /api/users](/api/v1#!#post--api-users) | None. | [POST /api/v2/users](/api/v2#!/Users/post_users) |
| [POST /api/users/{user\_id}/send\_verification\_email](/api/v1#!#post--api-users--user_id--send_verification_email) | Not available. | Verification emails can't be resent once they have been created, but a new one can be generated via [POST /api/v2/tickets/email-verification](/api/v2#!/tickets/post_email_verification)|
| [POST /api/users/{user\_id}/change\_password\_ticket](/api/v1#!#post--api-users--user_id--change_password_ticket) | None. | [POST /api/v2/tickets/password-change](/api/v2#!/tickets/post_password_change) |
| [POST /api/users/{user\_id}/verification\_ticket](/api/v1#!#post--api-users--user_id--verification_ticket) | None. | [POST /api/v2/tickets/email-verification](/api/v2#!/tickets/post_email_verification) |
| [POST /api/users/{user\_id}/publickey](/api/v1#!#post--api-users--user_id--publickey) | Keys are created per device, not per user. | [POST /api/v2/device-credentials](/api/v2#!/Device_Credentials/post_device_credentials) |
| [PUT /api/users/{user\_id}/email](/api/v1#!#put--api-users--user_id--email) | Removed. | [PATCH /api/v2/users/{id}](/api/v2#!/Users/patch_users_by_id) also accepts `v2_id`. |
| [PUT /api/users/{user\_id}/metadata](/api/v1#!#put--api-users--user_id--metadata) | Removed. | [PATCH /api/v2/users/{id}](/api/v2#!/Users/patch_users_by_id) also accepts `v2_id` |
| [PUT /api/users/{user\_id}/password](/api/v1#!#put--api-users--user_id--password) | Removed. | [PATCH /api/v2/users/{id}](/api/v2#!/Users/patch_users_by_id) also accepts `v2_id` |
| [PUT /api/users/{email}/password](/api/v1#!#put--api-users--email--password) | Removed. | Endpoints only accept ids, not strings. |
| [PATCH /api/users/{user\_id}/metadata](/api/v1#!#patch--api-users--user_id--metadata) | Removed. | [PATCH /api/v2/users/{id}](/api/v2#!/Users/patch_users_by_id) also accepts `v2_id` |
| [DELETE /api/users](/api/v1#!#delete--api-users) | None. | [DELETE /api/v2/users](/api/v2#!/Users/delete_users) |
| [DELETE /api/users/{user\_id}](/api/v1#!#delete--api-users--user_id-) | None. | [DELETE /api/v2/users/{id}](/api/v2#!/Users/delete_users_by_id) also accepts `v2_id` |
| [DELETE /api/users/{user\_id}/refresh_tokens/{refresh\_token}](/api/v1#!#delete--api-users--user_id--refresh_tokens--refresh_token-) | Tokens and public keys are device credentials. | [DELETE /api/v2/device-credentials/{id}](/api/v2#!/Device_Credentials/delete_device_credentials_by_id) |
| [DELETE /api/users/{user\_id}/publickey?device={device}](/api/v1#!#delete--api-users--user_id--publickey-device--device-) | Tokens and public keys are device credentials. | [DELETE /api/v2/device-credentials/{id}](/api/v2#!/Device_Credentials/delete_device_credentials_by_id) |
| [POST /api/users/{user_id}/send_verification_email](/api/v1#!#post--api-users--user_id--send_verification_email) | None. | [POST /api/v2/jobs/verification-email](/api/v2#!/Jobs/post_verification_email)


### Application endpoints

| v1 Endpoint | Change | v2 Endpoint |
| ----------- | ------ | ----------- |
| [GET /api/clients](/api/v1#!#get--api-clients) | None. | [GET /api/v2/clients](/api/v2#!/Clients/get_clients) |
| [POST /api/clients](/api/v1#!#post--api-clients) | None. | [POST /api/v2/clients](/api/v2#!/Clients/post_clients) |
| [PUT /api/clients/{client-id}](/api/v1#!#put--api-clients--client-id-) | Not available. | [PUT /api/v2/clients/{id}](/api/v2#!/Clients/patch_clients_by_id) |
| [PATCH /api/clients/{client-id}](/api/v1#!#patch--api-clients--client-id-) | None. | [PATCH /api/v2/clients/{id}](/api/v2#!/Clients/patch_clients_by_id) |
| [DELETE /api/clients/{client-id}](/api/v1#!#delete--api-clients--client-id-) | None. | [DELETE /api/v2/clients/{id}](/api/v2#!/Clients/delete_clients_by_id) |

### Connection endpoints

| v1 Endpoint | Change | v2 Endpoint |
| ----------- | ------ | ----------- |
| [GET /api/connections](/api/v1#!#get--api-connections) | None. | [GET /api/v2/connections](/api/v2#!/Connections/get_connections) |
| [GET /api/connections/{connection-name}](/api/v1#!#get--api-connections--connection-name-) | Changed `connection-name` to `id`. | [GET /api/connections/{id}](/api/v2#!/Connections/get_connections_by_id) |
| [POST /api/connections](/api/v1#!#post--api-connections) | Added `enabled_clients` property. | [POST /api/v2/connections](/api/v2#!/Connections/post_connections) |
| [PUT /api/connections/{connection-name}](/api/v1#!#put--api-connections--connection-name-) | Not available. Changed `connection-name` to `id`. | [PATCH /api/v2/connections/{id}](/api/v2#!/Connections/patch_connections_by_id) |
| [DELETE /api/connections/{connection-name}](/api/v1#!#delete--api-connections--connection-name-) | Changed `connection-name` to `id`. | [DELETE /api/v2/clients/{id}](/api/v2#!/Connections/delete_connections_by_id) |
| [GET /api/connections/{connection}/users](/api/v1) | None. | [GET /api/v2/users](/api/v2#!/Users/get_users) (see note) |
| [GET /api/connections/{connection}/socket](/api/v1) | None. | [GET /api/v2/connections/{id}/status](/api/v2#!/Connections/get_status) |

::: note
For Private Cloud (search_engine:v2), use `q=identities.connection:"connection_name"`
:::

### Rules endpoints

| v1 Endpoint | Change | v2 Endpoint |
| ----------- | ------ | ----------- |
| [GET /api/rules](/api/v1#!#get--api-rules-) | None. | [GET /api/v2/rules](/api/v2#!/Rules/get_rules) |
| [POST /api/rules](/api/v1#!#post--api-rules) | None. | [POST /api/v2/rules](/api/v2#!/Rules/post_rules-) |
| [PUT /api/rules/{rule-name}](/api/v1#!#put--api-rules--rule-name-) | Uses `{id}` instead of `rule-name`. | [PATCH /api/v2/rules/{id}](/api/v2#!/Rules/patch_rules_by_id) |
| [DELETE /api/rules/{rule-name}](/api/v1#!#delete--api-rules--rule-name-) | Uses `{id}` instead of `rule-name`. | [DELETE /api/v2/rules/{id}](/api/v2#!/Rules/delete_rules_by_id) |
| [GET /api/rules-configs](/api/v1) | None. | [GET /api/v2/rules-configs](/api/v2#!/Rules_Configs/get_rules_configs) |
| [POST /api/rules-configs](/api/v1) | Not available; perform one call per variable to update. | [PUT /api/v2/rules-configs/{key}](/api/v2#!/Rules_Configs/put_rules_configs_by_key) |

### Logs endpoints

Logs endpoints in Management API v2 are described at [Search Log Events](https://auth0.com/docs/api/management/v2#!/Logs/get_logs)

| v1 Endpoint | Change | v2 Endpoint |
| ----------- | ------ | ----------- |
| [GET /logs](/api/v1#logs) | Syntax Changes, described at [Breaking Changes](https://auth0.com/docs/logs/query-syntax#search-engine-v3-breaking-changes) | [GET /api/v2/logs](/api/v2#!/Logs/get_logs) |
| [GET /logs/{id}](/api/v1#logs) | None. | [GET /api/v2/logs/{id}](/api/v2#!/Logs/get_logs_by_id) |

### Email Templates endpoints

| v1 Endpoint | Change | v2 Endpoint |
| ----------- | ------ | ----------- |
| [GET /api/emails/{email-template-name}](/api/v1#email-templates) | `disabled` renamed to `enabled`. | [GET	/api/v2/email-templates/{templateName}](/api/v2#!/Email_Templates/get_email_templates_by_templateName) |
| [POST /api/emails](/api/v1#email-templates) | `disabled` renamed to `enabled`. | [POST	/api/v2/email-templates](https://auth0.com/docs/api/management/v2#!/Email_Templates/post_email_templates) |
| [PUT /api/emails/{email-template-name}](/api/v1#email-templates) | `disabled` renamed to `enabled`. | [PUT	/api/v2/email-templates/{templateName}](https://auth0.com/docs/api/management/v2#!/Email_Templates/put_email_templates_by_templateName) |

## Authentication mechanism

Auth0's API v1 requires sending an <dfn data-key="access-token">Access Token</dfn> obtained by performing a [`POST /oauth/token`](/api/v1#!#post--oauth-token) request along with the `clientId` and `clientSecret`. All subsequent requests must include the Access Token in the `Authorization` header: `Authorization: Bearer {access_token}`.

Auth0's API v2 requires sending an Access Token with specific <dfn data-key="scope">scope(s)</dfn>. To perform requests with API v2, use the `Authorization` header: `Authorization: Bearer YOUR_ACCESS_TOKEN`.

To use an endpoint, at least one of its available scopes (as listed in [Management API v2 explorer](/api/v2)) must be specified for the JWT. The actions available on an endpoint depend on the JWT scope. For example, if a JWT has the `update:users_app_metadata` scope, the [PATCH users `app_metadata`](/api/v2#!/Users/patch_users_by_id) action is available, but not other properties.

There is a subset of scopes that your application can use in order to perform a subset of operations on behalf of the currently logged-in user. These are:

* `read:current_user`
* `update:current_user_identities`
* `create:current_user_metadata`
* `update:current_user_metadata`
* `delete:current_user_metadata`
* `create:current_user_device_credentials`
* `delete:current_user_device_credentials`

So, for example, if the Access Token contains the scope `update:current_user_metadata` then it can be used to update the metadata of the currently logged-in user. If, on the other hand, it contains the scope `update:users_app_metadata` it can be used to update the metadata of any user.

## User metadata

In the Management API v1, [`user.metadata`](/api/v1#!#patch--api-users--user_id--metadata) provides additional user information that is not part of the default user claims. When working with rules and other API endpoints, `metadata` is merged into the root user. For example, if the following data is stored for a user with `email` "jane.doe@gmail.com":

```javascript
{
  metadata: {
    hobby: 'surf'
  }
}
```

when working with rules or retrieving the user from the API, you would get:

```javascript
console.log(user.email); // "jane.doe@gmail.com"
console.log(user.hobby); // "surf"
```

Note that `user.metadata.hobby` is not being used.

This automatic merging caused confusion for our customers. Also, having a single bucket for all metadata did not work well with our new permissions model for the following reasons:

* You may want to store information in `metadata` that was core to your application's functionality.
* You may want to allow your users to update their own metadata.

### app\_metadata and user\_metadata

In API v2 the concept of `metadata` is divided into:

* `app_metadata`: Data related to the user that affects the application's core functionality.
* `user_metadata`: Data related to the user that does not affect the application's core functionality.

Neither of these two properties are merged into the root `user` object. If you stored:

```javascript
{
  user_metadata: {
    hobby: 'surf'
  },
  app_metadata: {
    plan: 'full'
  }
}
```

when working in rules or retrieving users from the API you would get:

```javascript
console.log(user.email); // "jane.doe@gmail.com"
console.log(user.user_metadata.hobby); // "surf"
console.log(user.app_metadata.plan); // "full"
```

::: note
User data previously stored under `metadata` will be available under `app_metadata`.
:::

## Connections

For every tenant-created, named connection, Management API v1 exposes an individual connection for each of the tenant's applications.

However, given a named connection, Management API v2 exposes only one connection per tenant. Management of connection-enabled applications is performed using the `enabled_clients` property.

For example, to create a connection that is enabled for applications `AaiyAPdpYddboKnqNS8HJqRn4T5ti3BQ` and `DaM8bokEXBWrTUFZiXjWn50jei6ardyV`:

```text
curl -H "Authorization: Bearer {API_TOKEN}" -X POST -H "Content-Type: application/json"
-d '{"name":"new-connection","strategy":"auth0","enabled_clients":["AaiyAPdpYddboKnqNS8HJqRn4T5ti3BQ","DaM8bokEXBWrTUFZiXjWn50jei6ardyV"]}'
https://{YOUR_TENANT}.auth0.com/api/v2/connections
```

Connection names cannot be used to manage connections. Instead use the new `id` property. For example, to retrieve the connection with id `'con_UITxoKznrqb1oxIU'`:

```text
curl -H "Authorization: Bearer {API_TOKEN}"
https://{YOUR_TENANT}.auth0.com/api/v2/connections/con_UITxoKznrqb1oxIU
```

## Endpoints

Some of the changes to endpoints are detailed below.

### Consolidation

In Management API v1, different endpoints are used to update the various user properties. For example, changing the following user properties requires using these separate endpoints:

* [`PUT /api/users/{user_id}/email`](/api/v1#!#put--api-users--user_id--email)
* [`PUT /api/users/{user_id}/metadata`](/api/v1#!#put--api-users--user_id--metadata)
* [`PUT /api/users/{user_id}/password`](/api/v1#!#put--api-users--user_id--password)

In API v2, these are simplified into the single endpoint [`PATCH /api/v2/users/{id}`](/api/v2#!/Users/patch_users_by_id) which allows you to modify these (and other) user properties.

### All endpoints require ids

All endpoints receive an id. This change affects **Rules** and **Connections** particularly.

Some endpoints, such as [`PUT /api/users/{email}/password`](/api/v1#!#put--api-users--email--password), are no longer available.

### Improved input validation and error messages

In Management API v2, all endpoints use [JSON schemas](http://json-schema.org) to validate input. Also, descriptive error messages are returned when a schema's constraints are not met.

For an example, see the methods in our [Management API v2 explorer](/api/v2).

## PATCH with null values

In API v1, when updating field values, if the field is `null`, it will be saved as `null` in the database. In API v2, a `null` field will result in the field being deleted from the database.

Example: `{metadata: {color: null}}`

Will be stored as follows:

* When using API v1: `{metadata: {color: null}}`
* When using API v2: `{user_metadata: {}}`

So, in API v1, the field's value is stored as `null`, but in API v2, the field is simply removed.
