---
description: How to use the Filter Hook with the Delegated Administration extension
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
# Delegated Administration Hooks: The Filter Hook

By default, users with the **Delegated Admin - User** <dfn data-key="role">role</dfn> see *all* users associated with the Auth0 account. However, you can filter the data users see using the **Filter Hook**.

## The Hook Contract

 - **ctx**: The context object
 - **callback(error, query)**: The callback to which you can return an error or the [lucene query](/api/management/v2/query-string-syntax) used when filtering the users. The extension will send this query to the [**GET Users** endpoint](/api/management/v2#!/Users/get_users) of the Management API

### Sample Usage

If Kelly manages the Finance department, she should only see the users that are also part of the Finance department. We'll filter the users with respect to the department of the current user (which, in this case, is the Finance department and Kelly, respectively).

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

### Search Engine Override

You can override the default search engine by specifying your choice in the response.

```js
  // Return the lucene query.
  return callback(null, { query: 'app_metadata.department:"' + department + '"', searchEngine: 'v2' });
```

## Notes

Do not use single quotes, double quotes, or any other special characters (such as **+** or **-**) in terms on which you'll want to filter. This may cause issues with the Lucene query.

If you do not configure this Hook, the search returns **all users**.

<%= include('./_stepnav', {
 prev: ["Delegated Admin: Hooks", "/extensions/delegated-admin/hooks"]
}) %>
