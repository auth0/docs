---
description: Describes the major differences between Auth0's Management API v1 and Management API v2, and details the reasons for each change.
crews: crew-2
toc: true
---
# Management API v1 Migration Guide

As of the `DATE_TO_BE_UPDATED`, Auth0 customers will no longer be able to use the [Management API v1](/api/management/v1).

Customers using any of its endpoints should move to [Management API v2](/api/management/v2).

This document describes the major differences between Auth0's Management API v1 and Management API v2, and details how to migrate your implementation to the latest API.

## Am I affected by this?

You are impacted if you are using any of the [Management API v1](/api/management/v1) endpoints.

## What should I do?

If your implementation uses any of the [Management API v1](/api/management/v1) endpoints, you have to update it in order to invoke the matching [Management API v2](/api/management/v2) endpoint. Before you make any changes refer to the [Endpoints Mapping Matrix](#endpoints-mapping-matrix) to find the suitable alternative for your case.

There are also some other more generic changes. The most prominent one is that the authentication mechanism for the API changes. This means that you have to change how you get a token in order to authenticate with the API and access any of its endpoints. For more information refer to [Update the API Authentication Mechanism](#update-the-api-authentication-mechanism).

Other generic changes include:

- [The user metadata structure](#user-metadata-structure)
- [Connections-related changes](#connections-related-changes)
- [Consolidation of endpoints](#consolidation-of-endpoints)
- [Input validation and error messages](#input-validation-and-error-messages)
- [How `null` values in `PATCH` calls are handled](#update-fields-with-null-values)
- [All endpoints require IDs](#all-endpoints-require-ids)

### Update the API Authentication Mechanism

Management API v1 requires sending an `access_token` obtained by performing a `POST /oauth/token` request along with the **Client Id** and **Client Secret**. All subsequent requests must include this `access_token` in the `Authorization` header: `Authorization: Bearer {access_token}`.

Management API v2 lets you issue a [JWT](/jwt) token with specific granted permissions (known as scopes), and is signed with a client API key and secret for the entire tenant.

For example, the [GET /api/v2/clients](/api/management/v2#!/Clients/get_clients) (which retrieves a list of all the client applications defined in the [Dashboard](${manage_url})) requires two scopes: 

- `read:clients`, and 
- `read:client_keys`

These are scopes that your `access_token` should include. If, however, you try to use the same token for the [POST /api/v2/clients](/api/management/v2#!/Clients/post_clients) (which creates a new client) you will get an authorization error. The reason is that that endpoint requires the `create:clients` scope which your `access_token` did not include.

All requests to the API v2 must include the `access_token` in the `Authorization` header: `Authorization: Bearer {access_token}`.

What you should do here is migrate your implementation to use the new tokens. For more information on how to generate and use such a token refer to [The Auth0 Management APIv2 Token](/api/management/v2/tokens).

#### The id_token and special scopes

An `id_token` is a JWT containing information about a particular user. When a user logs into an application through Auth0, an `id_token` listing their claims is returned. Here is an example of an `id_token`, although more claims may be included:
```
{
  "iss": "https://contoso.auth0.com/",
  "sub": "google-oauth2|200076635456998357447",
  "aud": "rs3sdOssVWaZlg0PzyPtIgWFCzcurlm5",
  "exp": 1418452802,
  "iat": 1418416802
}
```

When this token is sent to the API in the `Authorization` header (`Authorization: Bearer {id_token}`), the following scopes will be granted automatically:

* `read:current_user`
* `update:current_user_identities`
* `create:current_user_metadata`
* `update:current_user_metadata`
* `delete:current_user_metadata`

Therefore, with an `id_token`, all the user's information can be read and written to `user_metadata`.

### Endpoints Mapping Matrix

In this section you can find the mappings between the two versions of the Management API. At the very minimum you have to update your implementation with the new endpoint URL. 

The column **Change** describes any additional changes that you might have to do.

#### User endpoints

| v1 Endpoint | Change | v2 Endpoint |
| ----------- | ------ | ----------- |
| [GET /api/users](/api/v1#!#get--api-users) | None | [GET /api/v2/users](/api/v2#!/Users/get_users) |
| [GET /api/users?search={criteria}](/api/v1#!#get--api-users-search--criteria-) | Changed parameter and syntax | Implemented using Elastic Search, see the [get_users](/api/v2#!/Users/get_users) documentation |
| [GET /api/users/{user\_id}](/api/v1#!#get--api-users--user_id-) | None | [GET /api/v2/users/{id}](/api/v2#!/Users/get_users_by_id) also accepts `v2\_id` |
| [GET /api/connections/{connection}/users](/api/v1#!#get--api-connections--connection--users) | Not available | TBD |
| [GET /api/connections/{connection}/users?search={criteria}](/api/v1#!#get--api-connections--connection--users-search--criteria-) | Not available | TBD |
| [GET /api/enterpriseconnections/users?search={criteria}](/api/v1#!#get--api-enterpriseconnections-users-search--criteria-) | Changed to use search | Available using `q=identities.isSocial:false AND NOT identities.provider:'auth0'` and `search_engine=v2` in the query string. Other conditions may be added to the search. See the [get_users](/api/v2#!/Users/get_users) documentation. |
| [GET /api/socialconnections/users?search={criteria}](/api/v1#!#get--api-socialconnections-users-search--criteria-) |  Changed to use search | Available using `q=identities.isSocial:true` and `search_engine=v2` in the query string. Other conditions may be added to the search. See the [get_users](/api/v2#!/Users/get_users) documentation. |
| [GET /api/clients/{client-id}/users](/api/v1#!#get--api-socialconnections-users-search--criteria-) | Not available | Not available |
| [POST /api/users](/api/v1#!#post--api-users) | None | [POST /api/v2/users](/api/v2#!/Users/post_users) |
| [POST /api/users/{user\_id}/send\_verification\_email](/api/v1#!#post--api-users--user_id--send_verification_email) | Not available | TBD |
| [POST /api/users/{user\_id}/change\_password\_ticket](/api/v1#!#post--api-users--user_id--change_password_ticket) | None | [POST /api/v2/tickets/password-change](/api/v2#!/tickets/post_password_change) |
| [POST /api/users/{user\_id}/verification\_ticket](/api/v1#!#post--api-users--user_id--verification_ticket) | None | [POST /api/v2/tickets/email-verification](/api/v2#!/tickets/post_email_verification) |
| [POST /api/users/{user\_id}/publickey](/api/v1#!#post--api-users--user_id--publickey) | Keys are created per device, not per user. | [POST /api/v2/device-credentials](/api/v2#!/Device_Credentials/post_device_credentials) |
| [PUT /api/users/{user\_id}/email](/api/v1#!#put--api-users--user_id--email) | Removed | [PATCH /api/v2/users/{id}](/api/v2#!/Users/patch_users_by_id) also accepts `v2_id` |
| [PUT /api/users/{user\_id}/metadata](/api/v1#!#put--api-users--user_id--metadata) | Removed | [PATCH /api/v2/users/{id}](/api/v2#!/Users/patch_users_by_id) also accepts `v2_id` |
| [PUT /api/users/{user\_id}/password](/api/v1#!#put--api-users--user_id--password) | Removed | [PATCH /api/v2/users/{id}](/api/v2#!/Users/patch_users_by_id) also accepts `v2_id` |
| [PUT /api/users/{email}/password](/api/v1#!#put--api-users--email--password) | Removed | Endpoints only accept ids, not strings. |
| [PATCH /api/users/{user\_id}/metadata](/api/v1#!#patch--api-users--user_id--metadata) | Removed | [PATCH /api/v2/users/{id}](/api/v2#!/Users/patch_users_by_id) also accepts `v2_id` |
| [DELETE /api/users](/api/v1#!#delete--api-users) | None | [DELETE /api/v2/users](/api/v2#!/Users/delete_users) |
| [DELETE /api/users/{user\_id}](/api/v1#!#delete--api-users--user_id-) | None | [DELETE /api/v2/users/{id}](/api/v2#!/Users/delete_users_by_id) also accepts `v2_id` |
| [DELETE /api/users/{user\_id}/refresh_tokens/{refresh\_token}](/api/v1#!#delete--api-users--user_id--refresh_tokens--refresh_token-) | Tokens and public keys are device credentials | [DELETE /api/v2/device-credentials/{id}](/api/v2#!/Device_Credentials/delete_device_credentials_by_id) |
| [DELETE /api/users/{user\_id}/publickey?device={device}](/api/v1#!#delete--api-users--user_id--publickey-device--device-) | Tokens and public keys are device credentials | [DELETE /api/v2/device-credentials/{id}](/api/v2#!/Device_Credentials/delete_device_credentials_by_id) |
| [POST /api/users/{user_id}/send_verification_email](/api/v1#!#post--api-users--user_id--send_verification_email) | None | [POST /api/v2/jobs/verification-email](/api/v2#!/Jobs/post_verification_email)

#### Client endpoints

| v1 Endpoint | Change | v2 Endpoint |
| ----------- | ------ | ----------- |
| [GET /api/clients](/api/v1#!#get--api-clients) | None | [GET /api/v2/clients](/api/v2#!/Clients/get_clients) |
| [POST /api/clients](/api/v1#!#post--api-clients) | None | [POST /api/v2/clients](/api/v2#!/Clients/post_clients) |
| [PUT /api/clients/{client-id}](/api/v1#!#put--api-clients--client-id-) | Not available | [PUT /api/v2/clients/{id}](/api/v2#!/Clients/patch_clients_by_id) |
| [PATCH /api/clients/{client-id}](/api/v1#!#patch--api-clients--client-id-) | None | [PATCH /api/v2/clients/{id}](/api/v2#!/Clients/patch_clients_by_id) |
| [DELETE /api/clients/{client-id}](/api/v1#!#delete--api-clients--client-id-) | None | [DELETE /api/v2/clients/{id}](/api/v2#!/Clients/delete_clients_by_id) |

#### Connection endpoints

| v1 Endpoint | Change | v2 Endpoint |
| ----------- | ------ | ----------- |
| [GET /api/connections](/api/v1#!#get--api-connections) | None | [GET /api/v2/connections](/api/v2#!/Connections/get_connections) |
| [GET /api/connections/{connection-name}](/api/v1#!#get--api-connections--connection-name-) | Changed `connection-name` to `id`. | [GET /api/connections/{id}](/api/v2#!/Connections/get_connections_by_id) |
| [POST /api/connections](/api/v1#!#post--api-connections) | Added `enabled_clients` property | [POST /api/v2/connections](/api/v2#!/Connections/post_connections) |
| [PUT /api/connections/{connection-name}](/api/v1#!#put--api-connections--connection-name-) | Not available. Changed `connection-name` to `id`. | [PATCH /api/v2/connections/{id}](/api/v2#!/Connections/patch_connections_by_id) |
| [DELETE /api/connections/{connection-name}](/api/v1#!#delete--api-connections--connection-name-) | Changed `connection-name` to `id` | [DELETE /api/v2/clients/{id}](/api/v2#!/Connections/delete_connections_by_id) |
| [GET /api/connections/{connection}/users](/api/v1) | None | [GET  /api/v2/users](/api/v2#!/Users/get_users) (see note) |
| [GET /api/connections/{connection}/users?search={criteria}](/api/v1) | None | [GET  /api/v2/users](/api/v2#!/Users/get_users) (see note) |

::: note
For PSaaS Appliance (search_engine:v1), use `connection` field; for cloud (search_engine:v2), use `q=identities.connection:"connection_name"`.
:::

#### Rules endpoints

| v1 Endpoint | Change | v2 Endpoint |
| ----------- | ------ | ----------- |
| [GET /api/rules](/api/v1#!#get--api-rules-) | None | [GET /api/v2/rules](/api/v2#!/Rules/get_rules) |
| [POST /api/rules](/api/v1#!#post--api-rules) | None | [POST /api/v2/rules](/api/v2#!/Rules/post_rules-) |
| [PUT /api/rules/{rule-name}](/api/v1#!#put--api-rules--rule-name-) | Uses `{id}` instead of `rule-name`. | [PATCH /api/v2/rules/{id}](/api/v2#!/Rules/patch_rules_by_id) |
| [DELETE /api/rules/{rule-name}](/api/v1#!#delete--api-rules--rule-name-) | Uses `{id}` instead of `rule-name`. | [DELETE /api/v2/rules/{id}](/api/v2#!/Rules/delete_rules_by_id) |

#### Logs endpoints

Logs endpoints have not been implemented in Management API v2. Logs must first be indexed in Elastic Search.

### User Metadata Structure

In the Management API v1, [`user.metadata`](/api/v1#!#patch--api-users--user_id--metadata) provides additional information about a user which is not part of the default user claims. When working with rules and other API endpoints, `metadata` is merged into the root user. For example, if the following data is stored for a user with `email` "jane.doe@gmail.com":

```javascript
{
  metadata: {
    hobby: 'surf'
  }
}
```

when working with rules or retrieving the user from the API you would get:

```javascript
console.log(user.email); // "jane.doe@gmail.com"
console.log(user.hobby); // "surf"
```

Note that `user.metadata.hobby` is not being used.

This automatic merging caused confusion for our customers. Also, having a single bucket for all metadata did not work well with our new permissions model for the following reasons:

- You may want to store information in `metadata` that was core to your application's functionality.
- You may want to allow your users to update their own metadata.

In API v2 the concept of `metadata` is divided into:

- `app_metadata`: Data related to the user that affects the application's core functionality.
- `user_metadata`: Data related to the user that does NOT affect the application's core functionality.

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

### All endpoints require IDs

All endpoints receive an id. This change affects **Rules** and **Connections** particularly.

Some endpoints, such as [`PUT /api/users/{email}/password`](/api/v1#!#put--api-users--email--password), are no longer available.

### Connections-related changes

For every tenant-created, named connection, Management API v1 exposes an individual connection for each of the tenant's clients.

However, given a named connection, Management API v2 exposes only one connection per tenant. Management of connection-enabled clients is performed using the `enabled_clients` property.

For example, to create a connection that is enabled for clients `AaiyAPdpYddboKnqNS8HJqRn4T5ti3BQ` and `DaM8bokEXBWrTUFZiXjWn50jei6ardyV`:

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

### Consolidation of endpoints

In Management API v1, different endpoints are used to update the various user properties. For example:

- To update the user's email, you'd use [`PUT /api/users/{user_id}/email`](/api/v1#!#put--api-users--user_id--email)
- To update the user's metadata, you'd use [`PUT /api/users/{user_id}/metadata`](/api/v1#!#put--api-users--user_id--metadata)
- To update the user's password, you'd use [`PUT /api/users/{user_id}/password`](/api/v1#!#put--api-users--user_id--password)

In API v2, these are simplified into the single endpoint [`PATCH /api/v2/users/{id}`](/api/v2#!/users/patch_users_by_id) which allows you to modify these (and other) user properties.

### Input validation and error messages

In Management API v2, all endpoints use [JSON schemas](http://json-schema.org) to validate input. Also, descriptive error messages are returned when a schema's constraints are not met.

Using our [Management API v2 explorer](/api/v2) you can see the response schema and a response sample per endpoint. Go to the endpoint you want and click the **Show samples** link right next to the endpoint's title.

What you should do here is migrate your implementation to expect the proper response per endpoint.

### Update fields with null values

In API v1, when updating field values, if the field is `null`, it will be saved as `null` in the database. 

In API v2, a `null` field will result in the field being deleted from the database.

For example, `{metadata: {color: null}}` will be stored as:

* `{metadata: {color: null}}`, when using API v1
* `{user_metadata: {}}`, when using API v2

So, in API v1, the field's value is stored as `null`, but in API v2, the field is simply removed.