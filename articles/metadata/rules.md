# Working with User Metadata in Rules

This article contains samples that demonstrate how to work with [user metadata](/metadata) in [Rules](/rules).

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

## Contents:

* [Reading Metadata](/metadata/rules#reading-metadata)
* [Updating Metadata](/metadata/rules#updating-metadata)
* [Deleting Metadata](/metadata/rules#deleting-metadata)

## Reading Metadata

To read the available metadata, you will need to access the correct user property:

### Reading `app_metadata`

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

All [rules](/rules) have available an `auth0` object (which is an instance of the [node-auth0 SDK](https://github.com/auth0/node-auth0) that is capable of calling the Auth0 Management API v2). The `auth0` object is preconfigured with the necessary permissions to update users.

### Updating `app_metadata`

Suppose you wanted to add an administrative role to the user:

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

Suppose you wanted to add the user's `fontSize` preference to their user profile:

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

### Updating `app_metadata` and `user_metadata` Simultaneously

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

### Deleting `app_metadata` Properties and Values

To delete a property, set the property's value to `null`.

For example, suppose you wanted to delete the user's roles:

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

For example, suppose you wanted to remove the `writer` role from the user profile:

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

Notice how the `roles` property still exists; it does not, however, have any values associated.

### Deleting `user_metadata` Properties and Values

Suppose you wanted to delete the user's color preference:

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
