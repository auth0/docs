---
description: How to customize the behavior of the Delegated Administration extension using Hooks
toc: true
---

# Delegated Administration: Hooks

If you're a user assigned the **Delegated Admin - Administrator** role, you can manage the different Hooks and queries that allow you to customize the behavior of the Delegated Administration extension. 

![](/media/articles/extensions/delegated-admin/dashboard-configuration.png)

To access the configuration area:

1. Log in to the Delegated Administration Dashboard
2. Click on your name in the top right corner. You'll see a drop-down menu; click on the **Configure** option.

The **Configuration** page to which you're redirected is where you can manage your Hooks and queries.

## Hooks Signature

Hooks always have the following signature:

```js
function(ctx, callback) {
  // First do some work
  ...

  // Done
  return callback(null, something);
}
```

The context (**ctx**) object will expose a few helpers and information about the current request. The following methods and properties are available in every Hook.

**1. Logging**

  To add a message to the Webtask logs (which you can view using the [Realtime Webtask Logs](/extensions/realtime-webtask-logs) extension), call the **log** method:

  ```js
  ctx.log('Hello there', someValue, otherValue);
  ```

**2. Caching**

  To cache something (such as a long list of departments), you can store it on the context's **global** object. This object will be available until the Webtask container recycles.

  ```js
  ctx.global.departments = [ 'IT', 'HR', 'Finance' ];
  ```

**3. Custom Data**

  You can store custom data within the extension. This field is limited to 400kb of data.

  ```js
  var data = {
    departments: [ 'IT', 'HR', 'Finance' ]
  };

  ctx.write(data)
    .then(function() {
      ...
    })
    .catch(function(err) {
      ...
    });
  ```

  To read the data:

  ```js
  ctx.read()
    .then(function(data) {
      ...
    })
    .catch(function(err) {
      ...
    });
  ```

**4. Payload and Request**

  Each Hook exposes the current payload or request with specific information. The request will always contain information about the user that is logged into the Users Dashboard:

  ```js
  var currentUser = ctx.request.user;
  ```

**5. Remote Calls**

  If you want to call an external service (such as an API) to validate data or to load memberships, you can do this using the `request` module.

  ```js
  function(ctx, callback) {
    var request = require('request');
    request('http://api.mycompany.com/departments', function (error, response, body) {
      if (error) {
        return callback(error);
      }

      ...
    });
  }
  ```

## The Filter Hook

By default, users with the **Delegated Admin - User** role see *all* users associated with the Auth0 account. However, you can filter the data users see using the **Filter Hook**.

### The Hook contract:

 - `ctx`: The context object
 - `callback(error, query)`: The callback to which you can return an error or the [lucene query](/api/management/v2/query-string-syntax) used when filtering the users. The extension will send this query to the [`GET Users` endpoint](/api/management/v2#!/Users/get_users) of the Management API

### Example

If **Kelly** manages the Finance department, she should only see the users that are also part of the Finance department. We'll filter the users with respect to the department of the current user.

```js
function(ctx, callback) {
  // Get the department from the current user's metadata.
  var department = ctx.request.user.app_metadata && ctx.request.user.app_metadata.department;
  if (!department || !department.length) {
    return callback(new Error('The current user is not part of any department.'));
  }

  // The IT department can see all users.
  if (department === 'IT') {
    return callback();
  }

  // Return the lucene query.
  return callback(null, 'app_metadata.department:"' + department + '"');
}
```

::: panel-warning Using Special Characters
Do not use single quotes, double quotes, or any other special characters (such as `+` or `-`) in any term on which you'll want to filter. This might cause issues with the Lucene query.
:::

If you do not configure this Hook, the search returns **all users**.

## Available Hooks

The following Hooks are available for use with your Delegated Administration extension:

* [/extensions/delegated-admin/hooks/access](The Access Hook)
* [/extensions/delegated-admin/hooks/filter](The Filter Hooks)
* [/extensions/delegated-admin/hooks/membership](The Memberships Query Hook)
* [/extensions/delegated-admin/hooks/settings](The Settings Query Hook)
* [/extensions/delegated-admin/hooks/write](The Write Hook)

## Custom Fields

Beginning with version 3.0 of the Delegated Admin Extension, you can define custom fields and specify their values. Custom fields can be stored in the **user metadata** and **app metadata** fields accessible during the user creation or update processes. 

You may also customize existing fields defined by Auth0, such as email, username, name, and connection.

To utilize custom fields, you must add your list of **userFields** to the **Settings Query**.

Sample schema for **userFields**:

```js
userFields: [
    {
        "property": string, // required
        "label": string,
        "sortProperty": string,
        "display": true || function.toString(),
        "search": false || {
            "display": true || function.toString()
            "listOrder": 1,
            "listSize": string(###%), // e.g. 15%
            "filter": boolean,
            "sort": boolean
        },
        "edit": false || {
            "display": true || function.toString()
            "type": "text || select || password",
            "component": "InputText || Input Combo || InputMultiCombo || InputSelectCombo",
            "options": Array(string) || Array ({ "value": string, "label": string }),
            "disabled": true,
        },
        "create": false || {
            "display": true || function.toString()
            "type": "text || select || password",
            "component": "InputText || Input Combo || InputMultiCombo || InputSelectCombo",
            "options": Array(string) || Array ({ "value": string, "label": string }),
            "disabled": true,
        }
    },
    ...
]
```

- **property** (**required**): This is the property name of the ctx.payload object for the Write hook.
    - Example: `"property": "app_metadata.dbId"` will get set in `ctx.payload.app_metadata.dbId` in the Write hook
- **label**: This is the label that will be used when adding a label to the field on the user info page, create page, edit profile page, or search page
- **sortProperty**: If sorting by a different field than this for the search table, use this field.  Dot notation is allowed.
- **display**: true || false || stringified => This is the default display value.  If not overridden in search, edit, or create, it will use this value.
    - if `true` will just return `user.<property>`
    - Default: if `false` this value will not be displayed on any page (unless overridden in search, edit, or create)
    - if stringified function, will execute that function to get the value to display
        - Example: `(function display(user, value) { return moment(value).fromNow(); }).toString()`
- **search**: false || object => This describes how this field will behave on the search page
    - Default: if `false` will not show up in the search table
    - **search.display**: This will override the default display value
    - **search.listOrder**: This will specify the column order for the search display table
    - **search.listSize**: This will specify the default width of the column
    - **search.filter**: This will specify whether to allow this field to be search in the search dropdown.  Default is false.
    - **search.sort**: This will specify whether this column is sortable.  Use sortProperty if you want to sort by a field other than property.  Default is false.
- **edit**: false || object => This describes whether the field shows up on the edit dialogs.  If not a default field and set to an object, this will show up in the `Change Profile` page on the User Actions dropdown on the user page.
    - Default: if `false` will not show up on any edit/update page
    - **edit.display**: This will override the default display value
    - **edit.required**: NOT IMPLEMENTED YET set to true to fail if it does not have a value.  Default is false.
    - **edit.type** **required**: text || select || password
    - **edit.component**: InputText || Input Combo || InputMultiCombo || InputSelectCombo
        - Default: **InputText**: A simple text box
        - **InputCombo**: A searchable dropdown, single value only
        - **InputMultiCombo**: A searchable dropdown, with multiple values allowed
        - **InputSelectCombo**: A select dropdown of options
    - **edit.options**: if component is one of InputCombo, InputMultiCombo, InputSelectCombo, the option values need to be specified.
        - **Array(string)**: A simple array of values, label and value will be set to the same
        - **Array({ "value": string, "label": string })**: Allows you to set separate values for both the value and label. NOTE: This will result in the value in the write hook having the same value, but it can be trimmed down to just the value in the Write hook.
    - **edit.disabled**: true if the component should be read only, default is false
    - **edit.validateFunction**: NOT IMPLEMENTED YET stringified function for checking the validation
        - Example: `(function validate(form, value, cb) { if (value...) return cb(new ValidationError('something went wrong')); cb(null, value); }).toString()`
- **create**: false || object => This describes whether the field shows up on the create dialog.
    - Default: if `false` will not show up on the create page
    - **create.display**: This will override the default display value
    - **create.required**: NOT IMPLEMENTED YET set to true to fail if it does not have a value.  Default is false.
    - **create.type** **required**: text || select || password
    - **create.component**: InputText || Input Combo || InputMultiCombo || InputSelectCombo
        - Default: **InputText**: A simple text box.  Default for type text and password.
        - **InputCombo**: A searchable dropdown, single value only
        - **InputMultiCombo**: A searchable dropdown, with multiple values allowed
        - **InputSelectCombo**: A select dropdown of options
    - **create.options**: if component is one of InputCombo, InputMultiCombo, InputSelectCombo, the option values need to be specified.
        - **Array(string)**: A simple array of values, label and value will be set to the same
        - **Array({ "value": string, "label": string })**: Allows you to set separate values for both the value and label. NOTE: This will result in the value in the write hook having the same value, but it can be trimmed down to just the value in the write hook.
    - **create.disabled**: true if component should be read only, default is false
    - **create.validateFunction**: NOT IMPLEMENTED YET stringified function for checking the validation
        - Example: `(function validate(form, value, cb) { if (value...) return cb(new ValidationError('something went wrong')); cb(null, value); }).toString()`

###Pre-Defined Fields
There are a set of pre-defined fields for default behavior.  You can override the default behavior by adding the field as a userField and then overriding the behavior you would like to change.  This would often be done to suppress a field by setting the display to false.
Here are the existing fields:
####Search Table Fields
- **name**: A constructed field from other fields: default display function: `(function(user, value) { return (value || user.nickname || user.email || user.user_id); }).toString()`
- **email**: email address or N/A
- **last_login_relative**: The last login time
- **logins_count**: The number of logins
- **connection**: Their database connection
####User Info Fields
- **user_id**: The user ID
- **name**: The user's name
- **username**: The user's username
- **email**: The user's email
- **identity.connection**: The connection value
- **isBlocked**: Whether or not the user is blocked
- **last_ip**: What the last IP was the user used to log in
- **logins_count**: How many times the user has logged in
- **currentMemberships**: The list of memberships for this user
- **created_at**: How long ago the user was created.
- **updated_at**: How long ago the user was updated.
- **last_login**: How long ago the user last logged in.
####Create and Edit User Fields
- **connection**: The user's database
- **password**: The new password
- **repeatPassword**: A repeat of the user's password
- **email**: The user's email
- **username**: The user's username

###Example:
```js
function(ctx, callback) {
  var department = ctx.request.user.app_metadata && ctx.request.user.app_metadata.department;

  return callback(null, {
    // Only these connections should be visible in the connections picker.
    // If only one connection is available, the connections picker will not be shown in the UI.
    connections: [ 'Username-Password-Authentication', 'My-Custom-DB' ],
    // The dictionary allows you to overwrite the title of the dashboard and the "Memberships" label in the Create User dialog.
    dict: {
      title: department ? department + ' User Management' : 'User Management Dashboard',
      memberships: 'Departments'
    },
    // User Fields are the custom fields that can be displayed in create and edit, and can also be used for searching, and can be used to customize the view user page
    userFields: [
        {
            "label": "Connection",
            "property": "connection",
            "display": false,
            "create": false,
            "edit": false,
            "search": false
        },
        {
            "label": "First Name",
            "property": "user_metadata.given_name",
            "display": true,
            "create": {
                "type": "text"
            },
            "edit": {
                "type": "text"
            },
            "search": {
                "listSize": "10%",
                "listOrder": 0
            }
        },
        {
            "label": "Last Name",
            "property": "user_metadata.family_name",
            "display": true,
            "create": {
                "type": "text"
            },
            "edit": {
                "type": "text"
            },
            "search": {
                "listSize": "10%",
                "listOrder": 1,
                "sort": true
            }
        }
    ],
    // The CSS option allows you to inject a custom CSS file depending on the context of the current user (eg: a different CSS for every customer)
    css: (department && department !== 'IT') && 'https://rawgit.com/auth0-extensions/auth0-delegated-administration-extension/master/docs/theme/fabrikam.css'
  });
}
```

## Localization

Beginning with version 3.0 of the Delegated Admin Extension, you can provide a language dictionary for use with localization. The language dictionary is used only for static page content -- for field level content, you must use **userFields** labels.

::: note
Localization is aimed at those working with non-administrative functions when managing users. Auth0 currently does not support localization on any of the Configuration pages.
:::

The **languageDictionary** is set as part of the settings query, which allows you to:

* Explicitly define **languageDictionary**
* Provide URL to fetch the contents for the **languageDictionary** parameter

Here is a sample of what a  [complete Language Dictionary file](https://rawgit.com/auth0-extensions/auth0-delegated-administration-extension/master/tests/utils/en.json) looks like.

### Example: Providing a Link to a Language Dictionary File

```js
function(ctx, callback) {
  var department = ctx.request.user.app_metadata && ctx.request.user.app_metadata.department;

  return callback(null, {
    // Only these connections should be visible in the connections picker.
    // If only one connection is available, the connections picker will not be shown in the UI.
    connections: [ 'Username-Password-Authentication', 'My-Custom-DB' ],
    // The dictionary allows you to overwrite the title of the dashboard and the "Memberships" label in the Create User dialog.
    dict: {
      title: department ? department + ' User Management' : 'User Management Dashboard',
      memberships: 'Departments'
    },
    // User Fields are the custom fields that can be displayed in create and edit, and can also be used for searching, and can be used to customize the view user page
    userFields: [
        {
            "label": "Conexión",
            "property": "connection",
        },
        {
            "label": "Correo Electrónico",
            "property": "email",
        },
        ...
    ],
    // The CSS option allows you to inject a custom CSS file depending on the context of the current user (eg: a different CSS for every customer)
    css: (department && department !== 'IT') && 'https://rawgit.com/auth0-extensions/auth0-delegated-administration-extension/master/docs/theme/fabrikam.css',
    languageDictionary: 'https://your-cdn.com/locale/es.json'
  });
}
```

### Example: Providing a Language Dictionary Object:
```js
function(ctx, callback) {
  var department = ctx.request.user.app_metadata && ctx.request.user.app_metadata.department;

  return callback(null, {
    // Only these connections should be visible in the connections picker.
    // If only one connection is available, the connections picker will not be shown in the UI.
    connections: [ 'Username-Password-Authentication', 'My-Custom-DB' ],
    // The dictionary allows you to overwrite the title of the dashboard and the "Memberships" label in the Create User dialog.
    dict: {
      title: department ? department + ' User Management' : 'User Management Dashboard',
      memberships: 'Departments'
    },
    // User Fields are the custom fields that can be displayed in create and edit, and can also be used for searching, and can be used to customize the view user page
    userFields: [
        {
            "label": "Conexión",
            "property": "connection",
        },
        {
            "label": "Correo Electrónico",
            "property": "email",
        },
        ...
    ],
    // The CSS option allows you to inject a custom CSS file depending on the context of the current user (eg: a different CSS for every customer)
    css: (department && department !== 'IT') && 'https://rawgit.com/auth0-extensions/auth0-delegated-administration-extension/master/docs/theme/fabrikam.css',
    languageDictionary: {
        loginsCountLabel: 'Cantidad de Logins:',
        searchBarPlaceholder: 'Busqueda de usuarios usando la sintaxis de Lucene',
        deviceNameColumnHeader: 'Dispositivo',
        ...
    }
  });
}
```