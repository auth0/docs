---
description: How to use the Settings Query Hook with the Delegated Administration extension
toc: true
topics:
  - extensions
  - delegated-admin
  - users
  - hooks
contentType:
  - how-to
  - concept
useCase: extensibility-extensions
---
# Delegated Administration Hooks: The Settings Query Hook

The **Settings Query Hook** allows you to customize the look and feel of the Delegated Admin extension.

## The Hook Contract

 - **ctx**: The context object
     - **request.user**: The user currently logged in
     - **locale**: The locale (as inferred from the URL) -- `https://${account.tenant}.us.webtask.io/auth0-delegated-admin/en/users` will set  **locale** to `en`.
 - **callback(error, settings)**: The callback to which you can return an error and a settings object

## Sample Usage

```js
function(ctx, callback) {
  var department = ctx.request.user.app_metadata && ctx.request.user.app_metadata.department;

  return callback(null, {
    // Only these connections should be visible in the connections picker. If only one connection is available, the connections picker will not be shown in the UI.
    connections: [ 'Username-Password-Authentication', 'My-Custom-DB' ],
    // The dictionary allows you to overwrite the title of the dashboard and the "Memberships" label in the Create User dialog.
    dict: {
      title: department ? department + ' User Management' : 'User Management Dashboard',
      memberships: 'Departments',
      menuName: ctx.request.user.name
    },
    // The CSS option allows you to inject a custom CSS file depending on the context of the current user (eg: a different CSS for every customer)
    css: (department && department !== 'IT') && 'https://rawgit.com/auth0-extensions/auth0-delegated-administration-extension/master/docs/theme/fabrikam.css',
    // This option allows you to restrict creating new users
    canCreateUser: (department === 'IT')
  });
}
```

### Properties

- **connections**: The list of the connections this admin is allowed to create and edit users within
- **dict**: The dictionary allows you to overwrite the title of the dashboard and the **Memberships** label in the Create User dialog
    - **dict.title**: The title to display at the top of the UI
    - **dict.memberships**: The label to set for memberships fields
    - **dict.menuName**: The name to set for the upper right-hand dropdown menu
    - **dict.logoutUrl**: An alternate URL for the logout menu option
- **userFields**: An array of user fields (see [Custom Fields](#custom-fields))
- **css**: A string URL to import CSS
- **altcss**: A string URL to import a second set of CSS. You can use this to specify things like accessibility CSS for larger fonts. The user will be presented with a menu item allowing them to toggle this set of CSS on/off
- **languageDictionary**: A string URL or Dictionary Object (see [Localization](#localization))
- **suppressRawData**: Set to **true** to skip pages that show raw JSON
- **errorTranslator**: A function that translates error messages based on localization. Example: `(function (error, languageDictionary) { return languageDictionary.customErrors[error] || error; }).toString()`
- **canCreateUser**: A boolean flag. If set to `false`, removes `Create User` button and forbids creating new users, `true` by default. 

## Custom Fields

Beginning with version 3.0 of the Delegated Admin Extension, you can define custom fields and specify their values. Custom fields can be stored in the **user metadata** and **app metadata** fields accessible during the user creation or update processes. 

You may also customize existing fields defined by Auth0, such as email, username, name, and connection.

To utilize custom fields, you must:

- Add your list of **userFields** to the Settings Query Hook
- Implement a [Write Hook](/extensions/delegated-admin/v3/hooks/write). Custom Fields require the use of the [Write Hook](/extensions/delegated-admin/v3/hooks/write) to properly update `user_metadata` and `app_metadata`. You must [update the user object passed to the callback function](/extensions/delegated-admin/v3/hooks/write#sample-usage) with the `user_metadata` and `app_metadata` from the context (`ctx` object) provided to the hook.

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
            "type": "text || select || password || hidden",
            "component": "InputText || Input Combo || InputMultiCombo || InputSelectCombo",
            "options": Array(string) || Array ({ "value": string, "label": string }),
            "disabled": true || false,
            "validationFunction": function.toString()
        },
        "create": false || {
            "display": true || function.toString()
            "type": "text || select || password || hidden",
            "component": "InputText || Input Combo || InputMultiCombo || InputSelectCombo",
            "options": Array(string) || Array ({ "value": string, "label": string }),
            "disabled": true || false,
            "validationFunction": function.toString()
        }
    },
    ...
]
```

- **property** (**required**): The property name of the **ctx.payload** object for the Write hook. In the Write hook, `"property": "app_metadata.dbId"` sets `ctx.payload.app_metadata.dbId`
- **label**: The label that will be used when adding a label to the field on the user info page, create page, edit profile page, or search page
- **sortProperty**: If sorting by a different field than this for the search table, use this field.  Dot notation is allowed.
- **display**: true || false || stringified => This is the default display value.  If not overridden in search, edit, or create, it will use this value.
    - if `true` will just return `user.<property>`
    - Default: if `false` this value will not be displayed on any page (unless overridden in search, edit, or create)
    - if stringified function: executes function to get the value to display. Example: `(function display(user, value, languageDictionary) { return moment(value).fromNow(); }).toString()`
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
    - **edit.required**: set to true to fail if it does not have a value.  Default is false.
    - **edit.type** **required**: text || select || password
    - **edit.component**: InputText || Input Combo || InputMultiCombo || InputSelectCombo
        - **InputText** (default): A simple text box
        - **InputCombo**: A searchable dropdown, single value only
        - **InputMultiCombo**: A searchable dropdown, with multiple values allowed
        - **InputSelectCombo**: A select dropdown of options
    - **edit.options**: if component is one of InputCombo, InputMultiCombo, InputSelectCombo, the option values need to be specified.
        - **Array(string)**: An array of values (the label and value fields will be set to the same value)
        - **Array({ "value": string, "label": string })**: Allows you to set separate values for the value and label. NOTE: This will result in the value in the write hook having the same value, but it can be trimmed down to just the value in the write hook.
        - Server-side validation will ensure that any value specified for this field appears in the options array
    - **edit.disabled**: `true` if the component should be read only; default is false
    - **edit.validateFunction**: stringified function for validation. Note that this validation function will run on both the server- and client-side. Example: `(function validate(value, values, context, languageDictionary) { if (value...) return 'something went wrong'; return false; }).toString()`
- **create**: false || object => This describes whether the field shows up on the create dialog.
    - Default: if `false` will not show up on the create page
    - **create.placeholder**: Provide placeholder text to show when input is empty.
    - **create.required**: set to true to fail if it does not have a value.  Default is false.
    - **create.type** **required**: text || select || password
    - **create.component**: InputText || Input Combo || InputMultiCombo || InputSelectCombo
        - **InputText** (default): A text box. Default for type text and password.
        - **InputCombo**: A searchable dropdown, single value only
        - **InputMultiCombo**: A searchable dropdown, with multiple values allowed
        - **InputSelectCombo**: A select dropdown of options
    - **create.options**: if component is one of InputCombo, InputMultiCombo, InputSelectCombo, the option values need to be specified.
        - **Array(string)**: A simple array of values, label and value will be set to the same
        - **Array({ "value": string, "label": string })**: Allows you to set separate values for both the value and label. NOTE: This will result in the value in the write hook having the same value, but it can be trimmed down to just the value in the write hook.
        - The server side validation will ensure that any value specified for this field is in the options array.
    - **create.disabled**: true if component should be read only, default is false
    - **create.validateFunction**: stringified function for checking the validation
        - Example: `(function validate(value, values, context, languageDictionary) { if (value...) return 'something went wrong'; return false; }).toString()`
        - This validation function will run on both the server- and client-side.

## Pre-Defined Fields

There are a set of pre-defined, searchable fields for default behavior.

You can override the default behavior by adding the field as a userField and then overriding the behavior you would like to change. This would often be done to suppress a field by setting the display to false.

### Search Fields

- **name**: A constructed field from other fields: default display function: `(function(user, value) { return (value || user.nickname || user.email || user.user_id); }).toString()`
- **email**: email address or N/A
- **last_login_relative**: The last login time
- **logins_count**: The number of logins
- **connection**: Their database connection

### User Info Fields:

- **user_id**: The user ID
- **name**: The user's name
- **username**: The user's username
- **email**: The user's email
- **identity.connection**: The connection value
- **isBlocked**: Whether or not the user is blocked
- **blocked_for**: Whether or not the user has anomaly detection blocks
- **last_ip**: What the last IP was the user used to log in
- **logins_count**: How many times the user has logged in
- **currentMemberships**: The list of memberships for this user
- **created_at**: How long ago the user was created.
- **updated_at**: How long ago the user was updated.
- **last_login**: How long ago the user last logged in.

### Create and Edit User Fields

- **connection**: The user's database
- **password**: The new password
- **repeatPassword**: A repeat of the user's password
- **email**: The user's email
- **username**: The user's username

### Sample Usage

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

Beginning with version 3.0 of the Delegated Admin Extension, you can provide a language dictionary for use with localization. The language dictionary is used only for static page content - for field level content, you must use **userFields** labels.

::: note
Localization is aimed at those working with non-administrative functions when managing users. Auth0 currently does not support localization on any of the Configuration pages.
:::

To specify the locale, you can use the path.  For example: https://${account.tenant}.us.webtask.io/auth0-delegated-admin/en/users will set context.locale to `en` in the settings query.

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

### Example: Providing a Language Dictionary Object

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

<%= include('./_stepnav', {
 prev: ["Delegated Admin: Hooks", "/extensions/delegated-admin/hooks"]
}) %>
