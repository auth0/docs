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

### Reading `client_metadata`

`client_metadata` is an optional, top-level property of the Client object. Existing clients will have no value for this property.

```js
function(client, context, callback){
  client.client_metadata = client.client_metadata || {};
  if (client.client_metadata.usersuppliedkey1 === 'black'){
    // this code would not be executed for the user
  }
  ...
}
```

**Reading via the API**

`client_metadata` is included amongst in the response to the `GET /api/v2/clients` and `GET /api/v2/client/{id}` endpoints

**Creating clients with `client_metadata` properties**

A `client_metadata` object can be included when creating a new client via the `POST /api/v2/`clients endpoint.

**Creating `client_metadata` properties in the dashboard**

`client_metadata` key value pairs can also be added in [the dashboard](${manage_url}/#/clients), by going to **Clients**. Then select the settings(the gear icon) of the client you wish to edit.

Scroll down and click the link **Show Advanced Settings**. Then you will be in the **Application Metadata** section, enter the key and value then click **CREATE**.

![Create client metadata](/media/articles/rules/adv-settings-create.png)

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

### Updating `client_metadata`

Client metadata can be updated using the [`PATCH /api/v2/clients/{id}`](/api/management/v2#!/Users/patch_users_by_id) endpoint, supplying a client object with the `client_metadata property`, whose value is an object containing the metadata you'd like to change.

*Client Before*
```
{
  ...
  "name": "myclient",
  "client_metadata": {
    "mycolor": "red",
    "myflavor": "grape"
  }
  ...
}
```

Request: `PATCH /api/v2/client/myclientid123` with body:

```
{ "client_metadata": { "mycolor": "blue" } }
```

*Client After*
```
{
  "name": "myclient",
  "client_metadata": {
    "mycolor": "blue",
    "myflavor": "grape"
  }
  ...
}
```

**Updating `client_metadata` in the dashboard**

Client metadata can also be updated in [the dashboard](${manage_url}/#/clients), by going to **Clients**. Then select the settings(the gear icon) of the client you wish to edit.

Scroll down and click the link **Show Advanced Settings**. Then you will be in the **Application Metadata** section. For the key value, enter the name of the key you wish to edit. Then enter the new value that you want to update. 

Click **UPDATE**. A popup window will appear to confirm your overwrite.

![Confirm Update](/media/articles/rules/confirm-overwrite.png)

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
### Deleting `client_metadata` properties and values

`client_metadata` keys can be removed by issuing a PATCH, [as described above](#updating-client_metadata), but supplying a null for the key value. This behavior matches that of the `user_metadata` and `app_metadata` properties in the `PATCH` [/api/v2/users/{id}](/api/management/v2#!/Users/patch_users_by_id) endpoint.

**Deleting`client_metadata` properties and values in the dashboard**

`client_metadata` keys can also be removed in [the dashboard](${manage_url}/#/clients), by going to **Clients**. Then select the settings(the gear icon) of the client you wish to edit.

Scroll down and click the link **Show Advanced Settings**. Then you will be in the **Application Metadata** section, click the **REMOVE** button for the key/value pair you wish to delete.

![Remove client metadata](/media/articles/rules/adv-settings-remove.png)

## Considerations

The metadata must be a valid JSON object and can not contain a dot in key field names in `user_metadata`, `app_metadata` or `client_metadata`.

This is not allowed:
```js
{
  "preference.color" : "pink"
}
```

This, however, is accepted:

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

`client_metadata` is an object, whose keys and values are strings, with a maximum length of 255 characters. Also `client_metadata` is restricted to having a maximum 10 keys.
