# Metadata in Rules

Auth0 allows you to store data related to each user that has not come from the identity provider. This is known as metadata. There are two kinds of metadata, **user_metadata** and **app_metadata**. You can read about both of these at [app_metadata and user_metadata](/api/v2/changes#app-_metadata-and-user-_metadata).

This article explains how to work with metadata in [Rules](/rules) code. 

Each sample rule in this article assumes the user is represented by the following JSON:

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

## Reading metadata

To read metadata from a rule, you only need to access the correct user property.

### Reading app_metadata

To make a decision based on the user's roles, you would write the following code:

```js
function(user, context, callback){
  user.app_metadata = user.app_metadata || {};
  if (user.app_metadata.roles.indexOf('writer')){
    // this code would be executed for the user
  }
  callback(null, user, context);
}
```

### Reading user_metadata

Similarly, you can use the color preference:

```js
function(user, context, callback){
  user.user_metadata = user.user_metadata || {};
  if (user.user_metadata.preferences.color === 'black'){
    // this code would not be executed for the user
  }
  callback(null, user, context);
}
```

## Updating

All rules provide an `auth0` variable, which contains two properties:

* `auth0.token`: An [APIv2 token](/api/v2) with permissions to read and update users
* `auth0.domain`: Your Auth0 domain (${account.namespace})

### Updating app_metadata

To add the admin role to a user:

```js
function(user, context, callback){
  var Auth0 = require('auth0@2.0.0').ManagementClient;
  var auth0api = new Auth0({
    token: auth0.token,
    domain: auth0.domain
  });
  user.app_metadata = user.app_metadata || {};
  // update the app_metadata that will be part of the response
  user.app_metadata.roles = user.app_metadata.roles || [];
  user.app_metadata.roles.push('admin');

  // persist the app_metadata update
  auth0api.users.updateAppMetadata(user.user_id, user.app_metadata)
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

### Updating user_metadata

To add the add a `fontSize` preference:

```js
function(user, context, callback){
  var Auth0 = require('auth0@2.0.0').ManagementClient;
  var auth0api = new Auth0({
    token: auth0.token,
    domain: auth0.domain
  });
  user.user_metadata = user.user_metadata || {};
  // update the user_metadata that will be part of the response
  user.user_metadata.preferences = user.user_metadata.preferences || {};
  user.user_metadata.preferences.fontSize = 12;

  // persist the user_metadata update
  auth0api.users.updateUserMetadata(user.user_id, user.user_metadata)
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

### Updating app_metadata and user_metadata in the same rule

You can update both `user_metadata` and `app_metadata` in the same rule in parallel to reduce the rule's processing time:

```js
function(user, context, callback){
  var q = require('q');
  var Auth0 = require('auth0@2.0.0').ManagementClient;
  var auth0api = new Auth0({
    token: auth0.token,
    domain: auth0.domain
  });
  user.app_metadata = user.app_metadata || {};
  user.user_metadata = user.user_metadata || {};
  // update the user_metadata that will be part of the response
  user.user_metadata.preferences = user.user_metadata.preferences || {};
  user.user_metadata.preferences.fontSize = 12;

  // update the app_metadata that will be part of the response
  user.app_metadata.roles = user.app_metadata.roles || [];
  user.app_metadata.roles.push('admin');

  // persist the app_metadata update
  var appMetadataPromise  = auth0api.users.updateAppMetadata(user.user_id, user.app_metadata);

  // persist the user_metadata update
  var userMetadataPromise = auth0api.users.updateUserMetadata(user.user_id, user.user_metadata);

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

## Deleting

There are different ways of deleting properties. This section explains them with examples.

### Deleting all user's roles

To delete a property, set it to the `null` value. For example, to delete the user's roles:

```js
function(user, context, callback){
  var Auth0 = require('auth0@2.0.0').ManagementClient;
  var auth0api = new Auth0({
    token: auth0.token,
    domain: auth0.domain
  });
  user.app_metadata = user.app_metadata || {};
  // update the app_metadata that will be part of the response
  user.app_metadata.roles = null;

  // persist the app_metadata update
  auth0api.users.updateAppMetadata(user.user_id, user.app_metadata)
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

### Deleting a user's roles

To delete the user's writer role:

```js
function(user, context, callback){
  var Auth0 = require('auth0@2.0.0').ManagementClient;
  var auth0api = new Auth0({
    token: auth0.token,
    domain: auth0.domain
  });
  user.app_metadata = user.app_metadata || {};
  user.app_metadata.roles = user.app_metadata.roles || [];

  var index = user.app_metadata.roles.indexOf('writer');

  if (index !== -1){
    // update the app_metadata that will be part of the response
    user.app_metadata.roles.splice(index, 1);
  }

  // persist the app_metadata update
  auth0api.users.updateAppMetadata(user.user_id, user.app_metadata)
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

### Deleting the user's color preference

To delete the user's color preference:

```js
function(user, context, callback){
  var Auth0 = require('auth0@2.0.0').ManagementClient;
  var auth0api = new Auth0({
    token: auth0.token,
    domain: auth0.domain
  });
  user.user_metadata = user.user_metadata || {};
  // update the user_metadata that will be part of the response
  user.user_metadata.preferences = user.user_metadata.preferences || {};
  delete user.user_metadata.preferences.color;

  // persist the user_metadata update
  auth0api.users.updateUserMetadata(user.user_id, user.user_metadata)
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
