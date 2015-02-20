# API v1 vs v2

This document aims to describe the major differences between Auth0's API v1 and the new API v2, explaining the reason for them.

## tl;dr
* v2 uses JWTs instead of opaque tokens.
* v2 allows you to send `id_token` to perform operations on the user to which the `id_token` belongs.
* v2 has `user_metadata` for trivial data about users and `app_metadata` for data that affects how your applications work. Unlike `metadata` in API v1, those fields are not merged into the root `user` object.
* Less endpoints to make development easier since things work as developers would expect and there is less choice with the same features.
* All endpoints will work with ids, no more strings (such as connection name).
* New `user_id` (available as `v2_id` with "usr\_" prefix) and clientID ("cli\_" prefix) formats to easily recognize the type of entity based on its id.
* Improved input validation and error messages.

### User endpoints
| v1 Endpoint      | Change        | In v2  |
| ------------- |-------------| -----|
| [GET /api/users](https://docs.auth0.com/api#!#get--api-users)      | None | Available as [GET /api/v2/users](https://docs.auth0.com/apiv2#!/users/get_users) |
|  [GET /api/users?search={criteria}](https://docs.auth0.com/api#!#get--api-users-search--criteria-)  | Not available      |   Search won't be available until we implement Elastic Search |
| [GET /api/users/{user\_id}](https://docs.auth0.com/api#!#get--api-users--user_id-) | None      |  Available as   [GET /api/v2/users/{id}](https://docs.auth0.com/apiv2#!/users/get_users_by_id). Also accepts `v2\_id`. |
| [GET /api/connections/{connection}/users](https://docs.auth0.com/api#!#get--api-connections--connection--users) | Not available      |  Will be available as part of user search with `connection` parameter. |
| [GET /api/connections/{connection}/users}](https://docs.auth0.com/api#!#get--api-connections--connection--users) | Not available      |  Will be available as part of user search through `connection` criteria. |
| [GET /api/connections/{connection}/users?search={criteria}](https://docs.auth0.com/api#!#get--api-connections--connection--users-search--criteria-) | Not available      |  Will be available as part of user search through `connection` criteria. |
| [GET /api/enterpriseconnections/users?search={criteria}](https://docs.auth0.com/api#!#get--api-enterpriseconnections-users-search--criteria-) | Not available      |  Will be available as part of user search through criteria TBD. |
| [GET /api/socialconnections/users?search={criteria}](https://docs.auth0.com/api#!#get--api-socialconnections-users-search--criteria-) | Not available      |  Will be available as part of user search through criteria TBD. |
| [GET /api/clients/{client-id}/users](https://docs.auth0.com/api#!#get--api-socialconnections-users-search--criteria-) | Not available      |  Will be available as part of user search through `client` criteria. |
| [POST /api/users](https://docs.auth0.com/api#!#post--api-users) | None      |  Available as [POST /api/v2/users](https://docs.auth0.com/apiv2#!/users/post_users). |
| [POST /api/users/{user\_id}/send\_verification\_email](https://docs.auth0.com/api#!#post--api-users--user_id--send_verification_email) | Not available      |   Still to be implemented.. |
| [POST /api/users/{user\_id}/change\_password\_ticket](https://docs.auth0.com/api#!#post--api-users--user_id--change_password_ticket) | Not available      |   Still to be implemented. |
| [POST /api/users/{user\_id}/verification\_ticket](https://docs.auth0.com/api#!#post--api-users--user_id--verification_ticket) | Not available      |  Still to be implemented. |
| [POST /api/users/{user\_id}/public\_key](https://docs.auth0.com/api#!#post--api-users--user_id--publickey) | Not available      |  Still to be implemented. |
| [PUT /api/users/{user\_id}/email](https://docs.auth0.com/api#!#put--api-users--user_id--email) | Removed      |  Available as [PATCH /api/v2/users/{id}](https://docs.auth0.com/apiv2#!/users/patch_users_by_id). Also accepts `v2_id`. |
| [PUT /api/users/{user\_id}/metadata](https://docs.auth0.com/api#!#put--api-users--user_id--metadata) | Removed      |  Available as [PATCH /api/v2/users/{id}](https://docs.auth0.com/apiv2#!/users/patch_users_by_id). Also accepts `v2\_id`. |
| [PUT /api/users/{user\_id}/password](https://docs.auth0.com/api#!#put--api-users--user_id--password) | Removed      |  Available as [PATCH /api/v2/users/{id}](https://docs.auth0.com/apiv2#!/users/patch_users_by_id). Also accepts `v2_id`. |
| [PUT /api/users/{email}/password](https://docs.auth0.com/api#!#put--api-users--email--password) | Removed      | Endpoints only accept ids, not strings. |
| [PATCH /api/users/{user\_id}/metadata](https://docs.auth0.com/api#!#patch--api-users--user_id--metadata) | Removed      |  Available as [PATCH /api/v2/users/{id}](https://docs.auth0.com/apiv2#!/users/patch_users_by_id). Also accepts `v2\_id`. |
| [DELETE /api/users](https://docs.auth0.com/api#!#delete--api-users) | None      |  Available as [DELETE /api/v2/users](https://docs.auth0.com/apiv2#!/users/delete_users). |
| [DELETE /api/users](https://docs.auth0.com/api#!#delete--api-users--user_id-) | None      |  Available as [DELETE /api/v2/users/{id}](https://docs.auth0.com/apiv2#!/users/delete_users_by_id). Also accepts `v2_id`. |
| [DELETE /api/users/{user\_id}/refresh_tokens/{refresh\_token}](https://docs.auth0.com/api#!#delete--api-users--user_id--refresh_tokens--refresh_token-) | Not available      |  Still to be implemented. |
| [DELETE /api/users/{user\_id}/public_key?device={device}](https://docs.auth0.com/api#!#delete--api-users--user_id--publickey-device--device-) | Not available      |  Still to be implemented. |

### Client endpoints
| v1 Endpoint      | Change        | In v2  |
| ------------- |-------------| -----|
| [GET /api/clients](https://docs.auth0.com/api#!#get--api-clients)      | None | Available as [GET /api/v2/clients](https://docs.auth0.com/apiv2#!/clients/get_clients). |
| [POST /api/clients](https://docs.auth0.com/api#!#post--api-clients)      | None | Available as [POST /api/v2/clients](https://docs.auth0.com/apiv2#!/clients/post_clients). |
| [PUT /api/clients/{client-id}](https://docs.auth0.com/api#!#put--api-clients--client-id-)      | Not available | Available as [PUT /api/v2/clients/{id}](https://docs.auth0.com/apiv2#!/clients/patch_clients_by_id). |
| [PATCH /api/clients/{client-id}](https://docs.auth0.com/api#!#patch--api-clients--client-id-)      | None | Available as [PATCH /api/v2/clients/{id}](https://docs.auth0.com/apiv2#!/clients/patch_clients_by_id). |
| DELETE /api/clients/{client-id}     | None | Available as [DELETE /api/v2/clients/{id}](https://docs.auth0.com/apiv2#!/clients/delete_clients_by_id). |

## Authentication mechanism
Auth0's API v1 required consumers to send an `access_token` which was obtained by performing [`POST /oauth/token`](https://docs.auth0.com/api#!#post--oauth-token) request and sending the `clientId` and `clientSecret`. All subsequent request included the `access_token` using the **Authorization** header:
```
Authorization: Bearer {access_token}
```

As explained in [this blog post](https://auth0.com/blog/2014/12/02/using-json-web-tokens-as-api-keys/), API v2 allows you to issue API JWTs with specific scopes. Let's call that the `api_jwt_token`. To perform requests against API v2 you need to use the **Authorization** header: 
```
Authorization: Bearer {api_jwt_token}
```

### Scopes
To be able to use an endpoint you need at least one of the scopes it requires (specified in each endpoint in API explorer). Depending on the scopes in the JWT you might be able to perform some actions in an endpoint but not others. For example, if a JWT has the `update:users_app_metadata` scope you will be [PATCH users `app_metadata`](https://docs.auth0.com/apiv2#!/users/patch_users_by_id) but not other properties.

### `id_token` and special scopes
When application users login to an application through Auth0 an `id_token` with their claims is provided (an `id_token` is a JWT with information about a particular user). The payload of an `id_token` is similar to this (may have more claims):
```
{
  "iss": "https://contoso.auth0.com/",
  "sub": "google-oauth2|200076635456998357447",
  "aud": "rs3sdOssVWaZlg0PzyPtIgWFCzcurlm5",
  "exp": 1418452802,
  "iat": 1418416802
}
```

If one such token is sent to the API using the **Authorization** header:
```
Authorization: Bearer {id_token}
```

The following scopes are automatically granted:

* read:current\_user
* update:current\_user\_metadata
* delete:current\_user\_metadata
* create:current\_user\_metadata

Basically, with an `id_token` for a user you can read all its information an write its own `user_metadata`.

## Users metadata
In API v1, the concept of [`user.metadata`](https://docs.auth0.com/api#!#patch--api-users--user_id--metadata) exists. A user's `metadata` was used to provide additional information about a user which was not part of the default user claims. Additionally, when working with rules and other API endpoints, `metadata` would be automatically merged into the root user. For example, if you stored the following for user with `email` "jane.doe@gmail.com":
```javascript
{
  metadata: {
    hobby: 'surf'
  }
}
```

When working in rules or retrieving users from the API you would get:
```javascript
console.log(user.email); // "jane.doe@gmail.com"
console.log(user.hobby); // "surf"
```

Note that we are not using `user.metadata.hobby`.

This automatic merging caused a lot of confusion both to us and to our users. Additionally, having a single _bag_ for all metadata did not sit well with our new permissions model, as:

* Sometimes you might want to store information in `metadata` that was core to your application's functionality.
* You might want to allow your users to update their own metadata.

### app\_metadata and user\_metadata
In API v2 the concept of `metadata` is split into:

* `user_metadata`: Data related to the user that does not affect the application's core functionality.
* `app_metadata`: Data related to the user that does affect the application's core functionality.

None of those two properties are merged into the root `user` object. If you stored:
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

When working in rules or retrieving users from the API you would get:
```javascript
console.log(user.email); // "jane.doe@gmail.com"
console.log(user.user_metadata.hobby); // "surf"
console.log(user.app_metadata.plan); // "full"
```

> Note: Users that previously had `metadata` set will have it available under `app_metadata`.

## Endpoints
These are some general endpoint related changes.

### Less is more
In API v1 we had different endpoints to atomically update fields. For example, to change user's properties we had:

* [`PUT /api/users/{user_id}/email`](https://docs.auth0.com/api#!#put--api-users--user_id--email)
* [`PUT /api/users/{user_id}/metadata`](https://docs.auth0.com/api#!#put--api-users--user_id--metadata)
* [`PUT /api/users/{user_id}/password`](https://docs.auth0.com/api#!#put--api-users--user_id--password)

In API v2 we simplified this to only have [`PATCH /api/v2/users/{id}`](https://docs.auth0.com/apiv2#!/users/patch_users_by_id), which allows consumers to modify the same user properties (among others).

### All endpoints work with ids
Endpoints such as [`PUT /api/users/{email}/password`](https://docs.auth0.com/api#!#put--api-users--email--password) will no longer be available.

All endpoints will receive an identifier. This will particularly affect the **Rules** and **Connections** endpoints once implemented.

### Improved input validation and error messages
All endpoints in API v2 use [JSON schemas](http://json-schema.org) to validate their input and descriptive error messages are returned in case a schema's constraints are not met.

For an example you can check the methods in our [API v2 explorer](https://docs.auth0.com/apiv2).
