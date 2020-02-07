---
description: Learn how to work with app metadata, user metadata, and client metadata in Rules.
toc: true
topics:
  - rules
  - extensibility
  - metadata
contentType: how-to
useCase: extensibility-rules
---

# Use Metadata in Rules

You can read, update, and delete [metadata](/metadata) using [Rules](/rules).

::: panel-warning `app_metadata` field names
Avoid using the same name for `app_metadata` fields and root profile fields. Within the rules scope, `app_metadata` is squashed into the root profile and may override root properties.

For example, if a SAML identity provider returns a `groups` field and the user has an `app_metadata.groups` field, then `user.groups` will be equal to `app_metadata.groups` and not `user.groups`.
:::

In the following sections, we will refer to this example where the user and their information is represented by the following JSON snippet:

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

## Read Metadata

To read the available metadata, you will need to access the correct user property.

### Read `app_metadata`

Using rules, you can make a decision based on the user's <dfn data-key="role">roles</dfn>:

```js
function(user, context, callback){
  user.app_metadata = user.app_metadata || {};
  if (user.app_metadata.roles.indexOf('writer')){
    // code to be executed
  }
  ...
}
```

### Read `user_metadata`

Similarly, you can base decisions on specific preferences, such as a color preference:

```js
function(user, context, callback){
  user.user_metadata = user.user_metadata || {};
  if (user.user_metadata.preferences.color === 'black'){
    // code to be executed
  }
  ...
}
```

## Update metadata

### Read `client_metadata`

`clientMetadata` is an optional, top-level property of the context object. Existing applications will have no value for this property.

```js
function(user, context, callback){
  context.clientMetadata = context.clientMetadata || {};
  if (context.clientMetadata.usersuppliedkey1 === 'black'){
    // this code would not be executed for the user
  }
  ...
}
```

#### Read `client_metadata` with the Management API

`client_metadata` is included in the response to the `GET /api/v2/clients` and `GET /api/v2/client/{id}` endpoints

#### Create applications with `client_metadata` properties

A `client_metadata` object can be included when creating a new application via the `POST /api/v2/` applications endpoint.

#### Create `client_metadata` properties in the dashboard

`client_metadata` key value pairs can also be added in [the dashboard](${manage_url}/#/applications), by going to **Applications**. Then select the settings(the gear icon) of the application you wish to edit.

Scroll down and click the link **Show Advanced Settings**. Then you will be in the **Application Metadata** section, enter the key and value then click **CREATE**.

![Create application metadata](/media/articles/rules/adv-settings-create.png)

All rules include an `auth0` object (which is an instance of the [node-auth0 SDK](https://github.com/auth0/node-auth0)) that is capable of calling the [Auth0 Management API v2](/api/management/v2). The `auth0` object is preconfigured with the necessary permissions to update users.

### Update `app_metadata`

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

### Update `user_metadata`

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

### Update `app_metadata` and `user_metadata` simultaneously

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

## Manage `client_metadata`

`client_metadata` is a multi-purpose key/value hash to store information about an application (i.e. a “client” in OIDC/OAuth2 lingo). You might store, for example, the URL for the application’s home page (a field that Auth0 doesn’t provide by default in the application settings).

You get or set `client_metadata` either using the [clients API](/api/v2/clients/{client_id}) or in the Dashboard, in the application’s advanced settings. The `client_metadata` is stored as part of the application (client) properties.

::: panel Where to store a secret to be returned in a JWT
Where to store the secret depends on the scope of the secret:

* Is it just one secret per application? Then `client_metadata` would be a good place. But if this is the case, you should consider storing the secret directly in the application instead, to avoid putting the secret in the ID token.
* Is it the same secret for the whole system (i.e. for all application, or many)? Then the rule’s configuration values might be a better choice
* Is it a different secret for each user? Then `app_metadata` might be better.
:::

`clientMetadata` is an optional, top-level property of the `context` object. Existing applications will have no value for this property.

```js
function(user, context, callback){
  context.clientMetadata = context.clientMetadata || {};
  if (context.clientMetadata.usersuppliedkey1 === 'black'){
    // this code would not be executed for the user
  }
  ...
}
```

::: warning
Claims in the ID Token are not encrypted, so depending on the flow that you use the user might be able to get the token and inspect the contents. Auth0 does **not** recommend storing a secret in that way. 
:::

You can read and add to the `client_metadata` using either the Management API or the Dashboard. 

* In the Management API, the `client_metadata` is included in the response to the `GET /api/v2/clients` and `GET /api/v2/client/{id}` endpoints. A `client_metadata` object can be included when creating a new application via the `POST /api/v2/` endpoint.

* In the Dashboard, you can add the `client_metadata` key value pairs in [Applications](${manage_url}/#/applications). 
  * Select the settings (the gear icon) of the application you wish to edit. 
  * Scroll down and click the link **Show Advanced Settings**. 
  * In the **Application Metadata** section, enter the key and value then click **CREATE**.

![Create application metadata](/media/articles/rules/adv-settings-create.png)

Application metadata can be updated using the [`PATCH /api/v2/clients/{id}`](/api/management/v2#!/Users/patch_users_by_id) endpoint, supplying an application object with the `client_metadata property`, whose value is an object containing the metadata you'd like to change.

*Application Before*

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

*Application After*

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

#### Update `client_metadata` in the dashboard

Application metadata can also be updated in [the dashboard](${manage_url}/#/applications), by going to **Applications**. Then select the settings(the gear icon) of the application you wish to edit.

Scroll down and click the link **Show Advanced Settings**. Then you will be in the **Application Metadata** section. For the key value, enter the name of the key you wish to edit. Then enter the new value that you want to update. 

Click **UPDATE**. A popup window will appear to confirm your overwrite.

![Confirm Update](/media/articles/rules/confirm-overwrite.png)

## Delete Metadata

### Delete `app_metadata` properties and values

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

### Delete `user_metadata` properties and values

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

### Delete `client_metadata` properties and values

`client_metadata` keys can be removed by issuing a PATCH, [as described above](#updating-application_metadata), but supplying a null for the key value. This behavior matches that of the `user_metadata` and `app_metadata` properties in the `PATCH` [/api/v2/users/{id}](/api/management/v2#!/Users/patch_users_by_id) endpoint.

#### Delete `client_metadata` properties and values in the dashboard

`client_metadata` keys can also be removed in [the dashboard](${manage_url}/#/applications), by going to **Applications**. Then select the settings(the gear icon) of the application you wish to edit.

Scroll down and click the link **Show Advanced Settings**. Then you will be in the **Application Metadata** section, click the **REMOVE** button for the key/value pair you wish to delete.

![Remove application metadata](/media/articles/rules/adv-settings-remove.png)

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

## Keep reading

::: next-steps
* [Use the Management API in rules](/rules/current/management-api)
* [Properties of the Context Argument](/rules/current/context)
:::
