# Metadata in Rules

Auth0 allows you to store data related to each user that does not come from the identity provider. This is known as metadata. There are two kinds of metadata, **user_metadata** and **app_metadata**.

You can read about each of them [here](https://auth0.com/docs/apiv2Changes#8).

This article explains how you can work with metadata in [Rules](@@base_url@@/rules) code. 

Each sample rule in this article is assumed to have the following user as the `user` parameter:

The code snippets in this section assume a user that is represented by the following JSON:
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


## Reading
To read metadata from a rule all you need to do is access the correct user property.

### Reading app_metadata
To make a decision based on the user's roles you would write the following code:
```js
function(user, context, callback){
  user.app_metadata = user.app_metadata || {};
  if (user.app_metadata.roles.indexOf('writer')){
    // this code would be executed for the user
  }
  
  ...
}
```

### Reading user_metadata
Similarly, you can use the color:
```js
function(user, context, callback){
  user.user_metadata = user.user_metadata || {};
  if (user.user_metadata.preferences.color === 'black'){
    // this code would not be executed for the user
  }
  
  ...
}
```

## Updating
All rules will provide an `auth0` variable which is an instance of the [node Auth0 SDK that can use API v2](https://github.com/auth0/node-auth0/tree/v2), which will have permissions to update users.

### Updating app_metadata
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

### Updating user_metadata
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

### Updating app_metadata and user_metadata in the same rule
If you are updating both `user_metadata` and `app_metadata` in the same rule you can do it in parallel to reduce the rule's processing time (compared to doing it sequentially):
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

## Deleting
There are different ways of deleting properties. This section explains them with examples.

### Deleting all user's roles
To delete a property the value `null` must be sent for it. For example, to delete the user's roles:
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

THe resulting user is:
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

### Deleting the user's color preference
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