---
description: How to customize the behavior of the Delegated Administration extension using Hooks
toc: true
---

# Delegated Administration: Hooks

If you are a user with the `Delegated Admin - Administrator` role in your User Profile, log in to the Delegated Administration Dashboard, and click on your name in the top right corner, you'll see a  *Configure* option. On the Configuration page, you can manage the different Hooks and queries that allow you to customize the behavior of the Delegated Administration extension.

![](/media/articles/extensions/delegated-admin/dashboard-configuration.png)

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

The context object will expose a few helpers and information about the current request. The following methods and properties are available in every Hook.

**1. Logging**

  To add a message to the Webtask logs (which you can view using the [Realtime Webtask Logs](/extensions/realtime-webtask-logs) extension), call the `log` method:

  ```js
  ctx.log('Hello there', someValue, otherValue);
  ```

**2. Caching**

  To cache something (such as a long list of departments), you can store it on the context's `global` object. This object will be available until the Webtask container recycles.

  ```js
  ctx.global.departments = [ 'IT', 'HR', 'Finance' ];
  ```

**3. Custom Data**

  You can store custom data within the extension. This is field is limited to 400kb of data.

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

  Each Hook exposes the current payload and/or request with specific information. The request will always contain information about the user that is logged into the Users Dashboard:

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

## The Access Hook

While the **Filter Hook** only applies filtering logic you'll need a second layer of logic to determine if the current user is allowed to access a specific user. This is what the **Access Hook** allows you to do, determine if the current user is allowed to read, delete, block, unblock, etc a specific user.

### The Hook contract:

 - `ctx`: The context object
   - `payload`: The payload object
     - `action`: The current action (eg: `delete:user`) that is being executed
     - `user`: The user on which the action is being executed
 - `callback(error)`: The callback to which you can return an error if access is denied

Example: **Kelly** manages the Finance department and she should only be able to access users within her department.

```js
function(ctx, callback) {
  if (ctx.payload.action === 'delete:user') {
    return callback(new Error('You are not allowed to delete users.'));
  }

  // Get the department from the current user's metadata.
  var department = ctx.request.user.app_metadata && ctx.request.user.app_metadata.department;
  if (!department || !department.length) {
    return callback(new Error('The current user is not part of any department.'));
  }

  // The IT department can access all users.
  if (department === 'IT') {
    return callback();
  }

  ctx.log('Verifying access:', ctx.payload.user.app_metadata.department, department);

  if (!ctx.payload.user.app_metadata.department || ctx.payload.user.app_metadata.department !== department) {
    return callback(new Error('You can only access users within your own department.'));
  }

  return callback();
}
```

If this hook is not configured all users will be accessible.

Supported action names:

 - `read:user`
 - `delete:user`
 - `reset:password`
 - `change:password`
 - `change:username`
 - `change:email`
 - `read:devices`
 - `read:logs`
 - `remove:multifactor-provider`
 - `block:user`
 - `unblock:user`
 - `send:verification-email`

#### Write Hook

Whenever new users are created you'll want these users to be assigned to the group/department/vendor/... of the current user. This is what the **Write Hook** allows you to configure.

If you are using custom fields (you have created a userFields property in the settings query).  This hook will also run anytime the user is updated (change password, change email, change profile, etc.).

Hook contract:

 - `ctx`: The context object.
   - `request.originalUser`: The current user values, payload is the new set of fields.  Only available when method is update.
   - `payload`: The payload object.
     - `memberships`: An array of memberships that were selected in the UI when creating the user.
     - `email`: The email address of the user.
     - `password`: The password of the user.
     - `connection`: The name of the user.
   - `userFields`: The user fields array, if one is specified in the settings query.
   - `method`: Either `create` or `update` depending on whether this is being called as a result of a create or an update call
 - `callback(error, user)`: The callback to which you can return an error and the user object that should be sent to the Management API.

Example: **Kelly** manages the Finance department. When she creates users, these users should be assigned to her department.

```js
function(ctx, callback) {
  var newProfile = {
    email: ctx.payload.email,
    password: ctx.payload.password,
    connection: ctx.payload.connection,
    app_metadata: {
      department: ctx.payload.memberships && ctx.payload.memberships[0],
      ...ctx.payload.app_metadata
    }
  };

  if (!ctx.payload.memberships || ctx.payload.memberships.length === 0) {
    return callback(new Error('The user must be created within a department.'));
  }

  // Get the department from the current user's metadata.
  var currentDepartment = ctx.request.user.app_metadata && ctx.request.user.app_metadata.department;
  if (!currentDepartment || !currentDepartment.length) {
    return callback(new Error('The current user is not part of any department.'));
  }

  // If you're not in the IT department, you can only create users within your own department.
  // IT can create users in all departments.
  if (currentDepartment !== 'IT' && ctx.payload.memberships[0] !== currentDepartment) {
    return callback(new Error('You can only create users within your own department.'));
  }

  if (ctx.method === 'update') {
    /* If updating, only set the fields we need to send */
    Object.keys(newProfile).forEach(function(key) {
      if (newProfile[key] === ctx.request.originalUser[key]) delete newProfile[key];
    });
  }

  // NOTE: if you are setting userFields with restricted values using the settings query, you should enforce their limits here using the ctx.userFields array

  // This is the payload that will be sent to API v2. You have full control over how the user is created in API v2.
  return callback(null, newProfile);
}
```

::: warning
Auth0 only supports user creation with Database Connections.
:::

## The Memberships Query Hook

When creating a new user, the UI shows a drop-down where you can choose the membership(s) you want assigned to a user. These memberships are then defined using the **Memberships Query**.

### The Hook contract:

 - `ctx`: The context object
 - `callback(error, { createMemberships: true/false, memberships: [ ...] })`: The callback to which you can return an error and an object containing the membership configuration

Example: Users of the IT department should be able to create users in other departments. Users from other departments should only be able to create users for their own departments.

```js
function(ctx, callback) {
  var currentDepartment = ctx.payload.user.app_metadata.department;
  if (!currentDepartment || !currentDepartment.length) {
    return callback(null, [ ]);
  }

  if (currentDepartment === 'IT') {
    return callback(null, [ 'IT', 'HR', 'Finance', 'Marketing' ]);
  }

  return callback(null, [ ctx.payload.user.app_metadata.department ]);
}
```

**Notes**:

* Because you can only use this query in the UI, you'll need to assign memberships using the *Create Users* function if you need to enforce the assigning of users to specific departments.
* If there is only one membership possible, this field will not show in the UI.

You can allow the end user to enter any value `memberships` by setting `createMemberships` to true.

```js
function(ctx, callback) {
  var currentDepartment = ctx.payload.user.app_metadata.department;
  if (!currentDepartment || !currentDepartment.length) {
    return callback(null, [ ]);
  }

  return callback(null, {
    createMemberships: ctx.payload.user.app_metadata.department === 'IT' ? true : false,
    memberships: [ ctx.payload.user.app_metadata.department ]
  });
}
```

## The Settings Query Hook

The **Settings Query** allows you to customize the look and feel of the extension.

### The Hook contract

 - `ctx`: The context object
 - `callback(error, settings)`: The callback to which you can return an error and a settings object

Example:

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
      memberships: 'Departments',
      menuName: ctx.request.user.name
    },
    // The CSS option allows you to inject a custom CSS file depending on the context of the current user (eg: a different CSS for every customer)
    css: (department && department !== 'IT') && 'https://rawgit.com/auth0-extensions/auth0-delegated-administration-extension/master/docs/theme/fabrikam.css'
  });
}
```

## Custom Fields

Starting with version 3.0 of the Delegated Admin Extension you can now specify custom fields.  These custom fields can be stored anywhere in user_metadata or app_metadata when creating,
updating, or displaying users.  You can use these fields to search for users and display them in the search results.  Also, it allows you to customize existing fields, such as email, username,
name, and connection.

To utilize custom fields, you must add a list of userFields to the **Settings Query**.

Schema for a user field:
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

- **property** (**required**): This is the property name of the ctx.payload object for the write hook.
    - Example: `"property": "app_metadata.dbId"` will get set in `ctx.payload.app_metadata.dbId` in the write hook
- **label**: This is the label that will be used when adding a label for the field on the user info page, create page, edit profile page, or search page
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
        - **Array({ "value": string, "label": string })**: Allows you to set separate values for both the value and label. NOTE: This will result in the value in the write hook having the same value, but it can be trimmed down to just the value in the write hook.
    - **edit.disabled**: true if component should be read only, default is false
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
There are a set of pre-defined fields for default behavior.  You can override the default behavior by adding the field as a userField and then overriding the behavior you would like to change.  This would often be done to suppress a field by setting display to false.
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

Starting with version 3.0 of the Delegated Admin Extension you can now provide a language dictionary for localization.  The language dictionary is used for static page content.  For field level content, you must use the labels of the userFields.

NOTE: The target audience for Localization is allowing customers access to delegated admin if they have to administer some of their own users.  That being the case, localization is targeted at the non-admin functions.  Currently it does not support localization on the configuration pages.

The languageDictionary is set as part of the settings query.  With the settings query you can specify either the languageDictionary itself, or you can put a URL to fetch the languageDictionary.

Here is an example [complete Language Dictionary file](https://rawgit.com/auth0-extensions/auth0-delegated-administration-extension/master/tests/utils/en.json).

### Example Link:
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

### Example Object:
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