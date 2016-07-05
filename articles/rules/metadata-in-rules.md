---
description: This article explains how to work with metadata in Rules code. 
---

# Metadata in Rules

Auth0 allows you to store data that has not come from the identity provider. This is known as metadata. 

This article explains how to work with metadata in [Rules](/rules) code. 

* [Metadata types](#metadata-types)
* [User object metadata](#user-object-metadata)
  * [Read](#read)
  * [Update](#update)
  * [Delete](#delete)
* [Client object metadata](#client-object-metadata)
* [Considerations](#considerations)


## Metadata types

There are two types of metadata in the user object related to each user: **user_metadata** and **app_metadata**. You can read about both of these at [app\_metadata and user\_metadata](/api/management/v2/changes#app_metadata-and-user_metadata).

Also available is **client_metadata**, where you can store information that is related to your client application.

| Object | Metadata | Use |
| :--- | :--- | :--- |
| user | user_metadata | user-specific properties |
|      | app_metadata | app-specific properties |
| client | client_metadata | client-specific properties |

## User object metadata

All rules have available an `auth0` object (an instance of the [node-auth0 SDK](https://github.com/auth0/node-auth0/tree/v2) that can use API v2) which is pre-configured with permissions to update users.

Each sample rule below assumes that the user is represented by the following JSON:

```json
{
  "user_id": "google-oauth2|1234",
  "email": "john.doe@gmail.com",
  "app_metadata": {
    "roles": [ "writer" ]
  },
  "user_metadata": {
    "preferences": {
      "color": "blue"
    }
  }
}
```

### Read

To read metadata from a rule, you only need to access the correct user property.

#### app_metadata

To make a decision based on the user's roles, you would use the following code:

```js
function(user, context, callback){
  user.app_metadata = user.app_metadata || {};
  if (user.app_metadata.roles.indexOf('writer')){
    // this code would be executed for the user
  }

  ...
}
```

#### user_metadata

Similarly, to make decisions based on the user's the color preference:

```js
function(user, context, callback){
  user.user_metadata = user.user_metadata || {};
  if (user.user_metadata.preferences.color === 'black'){
    // this code would not be executed for the user
  }

  ...
}
```

### Update

To update a property, use the `push' method.

#### app_metadata

To add the admin role to a user:

```js
function(user, context, callback){
  user.app_metadata = user.app_metadata || {};
  // update the app_metadata that will be part of the response
  user.app_metadata.roles = user.app_metadata.roles || [];
  user.app_metadata.roles.push('admin');

  // persist the app_metadata update
  auth0.users.updateAppMetadata(user.user_id, user.app_metadata)
    .then(function(){
      callback(null, user, context);
    })
    .catch(function(err){
      callback(err);
    });
}
```

The resulting user is:

```json
{
  "user_id": "google-oauth2|1234",
  "email": "john.doe@gmail.com",
  "app_metadata": {
    "roles": [ "writer", "admin" ]
  },
  "user_metadata": {
    "preferences": {
      "color": "blue"
    }
  }
}
```

#### user_metadata

To add the add a `fontSize` preference:

```js
function(user, context, callback){
  user.user_metadata = user.user_metadata || {};
  // update the user_metadata that will be part of the response
  user.user_metadata.preferences = user.user_metadata.preferences || {};
  user.user_metadata.preferences.fontSize = 12;

  // persist the user_metadata update
  auth0.users.updateUserMetadata(user.user_id, user.user_metadata)
    .then(function(){
      callback(null, user, context);
    })
    .catch(function(err){
      callback(err);
    });
}
```

The resulting user is:

```json
{
  "user_id": "google-oauth2|1234",
  "email": "john.doe@gmail.com",
  "app_metadata": {
    "roles": [ "writer" ]
  },
  "user_metadata": {
    "preferences": {
      "color": "blue",
      "fontSize": 12
    }
  }
}
```

#### Update app\_metadata and user\_metadata in the same rule

You can update both `user_metadata` and `app_metadata` in the same rule in parallel to reduce the rule's processing time:

```js
function(user, context, callback){
  user.app_metadata = user.app_metadata || {};
  user.user_metadata = user.user_metadata || {};
  // update the user_metadata that will be part of the response
  user.user_metadata.preferences = user.user_metadata.preferences || {};
  user.user_metadata.preferences.fontSize = 12;

  // update the app_metadata that will be part of the response
  user.app_metadata.roles = user.app_metadata.roles || [];
  user.app_metadata.roles.push('admin');

  // persist the app_metadata update
  var appMetadataPromise  = auth0.users.updateAppMetadata(user.user_id, user.app_metadata);

  // persist the user_metadata update
  var userMetadataPromise = auth0.users.updateUserMetadata(user.user_id, user.user_metadata);

  // using q library to wait for all promises to complete
  q.all([userMetadataPromise, appMetadataPromise])
    .then(function(){
      callback(null, user, context);
    })
    .catch(function(err){
      callback(err);
    });
}
```

The resulting user is:

```json
{
  "user_id": "google-oauth2|1234",
  "email": "john.doe@gmail.com",
  "app_metadata": {
    "roles": [ "writer", "admin" ]
  },
  "user_metadata": {
    "preferences": {
      "color": "blue",
      "fontSize": 12
    }
  }
}
```

### Delete

To delete a property, set the value to `null`.

#### app_metadata

To delete all of the user's roles:

```js
function(user, context, callback){
  user.app_metadata = user.app_metadata || {};
  // update the app_metadata that will be part of the response
  user.app_metadata.roles = null;

  // persist the app_metadata update
  auth0.users.updateAppMetadata(user.user_id, user.app_metadata)
    .then(function(){
      callback(null, user, context);
    })
    .catch(function(err){
      callback(err);
    });
}
```

The resulting user is:

```json
{
  "user_id": "google-oauth2|1234",
  "email": "john.doe@gmail.com",
  "app_metadata": {
  },
  "user_metadata": {
    "preferences": {
      "color": "blue"
    }
  }
}
```

To delete the user's `writer` role:

```js
function(user, context, callback){
  user.app_metadata = user.app_metadata || {};
  user.app_metadata.roles = user.app_metadata.roles || [];

  var index = user.app_metadata.roles.indexOf('writer');

  if (index !== -1){
    // update the app_metadata that will be part of the response
    user.app_metadata.roles.splice(index, 1);
  }

  // persist the app_metadata update
  auth0.users.updateAppMetadata(user.user_id, user.app_metadata)
    .then(function(){
      callback(null, user, context);
    })
    .catch(function(err){
      callback(err);
    });
}
```

The resulting user is:

```json
{
  "user_id": "google-oauth2|1234",
  "email": "john.doe@gmail.com",
  "app_metadata": {
    "roles": [ ]
  },
  "user_metadata": {
    "preferences": {
      "color": "blue"
    }
  }
}
```

#### user_metadata

To delete the user's color preference:

```js
function(user, context, callback){
  user.user_metadata = user.user_metadata || {};
  // update the user_metadata that will be part of the response
  user.user_metadata.preferences = user.user_metadata.preferences || {};
  delete user.user_metadata.preferences.color;

  // persist the user_metadata update
  auth0.users.updateUserMetadata(user.user_id, user.user_metadata)
    .then(function(){
      callback(null, user, context);
    })
    .catch(function(err){
      callback(err);
    });
}
```

The resulting user is:

```json
{
  "user_id": "google-oauth2|1234",
  "email": "john.doe@gmail.com",
  "app_metadata": {
    "roles": [ "writer" ]
  },
  "user_metadata": {
    "preferences": { }
  }
}
```

## Client object metadata

The sample rules below assume that the client is represented by the following JSON:

```js
{
  ...
  "client_metadata": {
  "key1": "valueforkey"
  }
...
}
```

### Read

To read metadata from a rule, you only need to access the correct client property.

```js
function(client, context, callback){
  client.client_metadata = client.client_metadata || {};
  if (client.client_metadata.key1 === 'valueforkey'){
  // this code would be executed
  }
...
}
```

### Update

To update a property, use the `push' method.

```js
function(client, context, callback){
  client.client_metadata = client.client_metadata || {};
  // update the client_metadata that will be part of the response
  client.client_metadata.key1 = client.client_metadata.key1 || [];
  client.client_metadata.key1.push('admin');

  // persist the client_metadata update
  auth0.clients.updateClientMetadata(client.client_id, client.client_metadata)
    .then(function(){
      callback(null, client, context);
    })
    .catch(function(err){
      callback(err);
    });
}
```

The resulting client is:

```js
{
...
  "client_metadata": {
  "key1": "newValue"
  }
...
}
```

### Delete

To delete a property, set the value to `null`.

```js
function(client, context, callback){
  client.client_metadata = client.client_metadata || {};
  // update the client_metadata that will be part of the response
  client.client_metadata.key1 = null;

  // persist the client_metadata update
  auth0.clients.updateClientMetadata(client.client_id, client.client_metadata)
    .then(function(){
      callback(null, client, context);
    })
    .catch(function(err){
      callback(err);
    });
}
```

The resulting client is:

```js
{
...
  "client_metadata": {
  "key1": ""
  }
...
}
```

## Considerations

The metadata must be a valid JSON object and can not contain a dot in key field names in `user_metadata` or `app_metadata`.

The following is not allowed.
```js
{
  "preference.color" : "pink"
}
```

The following is accepted, however.

```js
{
  "color" : "light.blue"
}
```

If you use a key field name with a dot in it you will get an Internal Server (500) error.

A few workarounds are listed below:

1. You can convert the first example to something like this.

  ```js
{
  "preference" : {"color" : "pink" }
}
  ```

2. You could use a different delimiter character besides `.` (dot) or `$` (dollar sign).

