---
description: How to use metadata in rules.
---

# User Metadata in Rules

This article explains how to [read](#reading-metadata), [update](#updating-metadata) and [delete](#deleting-metadata) [metadata](/metadata) using [Rules](/rules).

Each sample rule in this article assumes that the user and their information is represented by the following JSON snippet:

```json
{
  "user_id": "jdoe",
  "email": "john.doe@example.com",
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

## Reading Metadata

To read the available metadata, you will need to access the correct user property.

### Reading `app_metadata`

Make a decision based on the user's roles:

```js
function(user, context, callback){
  user.app_metadata = user.app_metadata || {};
  if (user.app_metadata.roles.indexOf('writer')){
    // code to be executed
  }
  ...
}
```

### Reading `user_metadata`

Similarly, you can use the color preference:

```js
function(user, context, callback){
  user.user_metadata = user.user_metadata || {};
  if (user.user_metadata.preferences.color === 'black'){
    // code to be executed
  }
  ...
}
```

## Updating Metadata

All rules include an `auth0` object (which is an instance of the [node-auth0 SDK](https://github.com/auth0/node-auth0)) that is capable of calling the [Auth0 Management API v2](/api/management/v2). The `auth0` object is preconfigured with the necessary permissions to update users.

### Updating `app_metadata`

To add an administrative role to the user:

```js
function(user, context, callback){
  user.app_metadata = user.app_metadata || {};
  // update the app_metadata that will be part of the response
  user.app_metadata.roles = user.app_metadata.roles || [];
  user.app_metadata.roles.push('administrator');

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

This results in the following JSON representation of the user profile details:

```json
{
  "user_id": "jdoe",
  "email": "john.doe@example.com",
  "app_metadata": {
    "roles": [ "writer", "administrator" ]
  },
  "user_metadata": {
    "preferences": {
      "color": "blue"
    }
  }
}
```

### Updating `user_metadata`

To add the user's `fontSize` preference to the user profile:

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

This results in the following JSON representation of the user profile details:

```json
{
  "user_id": "jdoe",
  "email": "john.doe@example.com",
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

### Updating `app_metadata` and `user_metadata` simultaneously

To reduce the rule's processing time, you may update both the `app_metadata` and `user_metadata` in the same rule:

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

This results in the following JSON representation of the user profile details:

```json
{
  "user_id": "jdoe",
  "email": "john.doe@example.com",
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

## Deleting Metadata

### Deleting `app_metadata` properties and values

To delete a property, set the property's value to `null`.

For example, to delete the user's roles:

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

This results in the following JSON representation of the user profile details:

```json
{
  "user_id": "jdoe",
  "email": "john.doe@example.com",
  "app_metadata": { },
  "user_metadata": {
    "preferences": {
      "color": "blue"
    }
  }
}
```

To delete a single value of a property, remove that value specifically.

For example, to remove the `writer` role from the user profile:

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

This results in the following JSON representation of the user profile details:

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

Note that the `roles` property still exists but does not contain any value.

### Deleting `user_metadata` properties and values

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

This results in the following JSON representation of the user profile details:

```json
{
  "user_id": "jdoe",
  "email": "john.doe@example.com",
  "app_metadata": {
    "roles": [ "writer" ]
  },
  "user_metadata": {
    "preferences": { }
  }
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

The following, however, is accepted.

```js
{
  "color" : "light.blue"
}
```

If you use a key field name with a dot in it you will get an Internal Server (500) error.

As a workaround, you can convert the first example to something like this.

```js
{
  "preference" : {"color" : "pink" }
}
```

Or you could use a different delimiter character besides `.` (dot) or `$` (dollar sign).
