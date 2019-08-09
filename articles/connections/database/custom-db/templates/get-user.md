---
description: Custom database action script templates for user search.
toc: true
topics:
    - connections
    - custom-database
    - get-users
contentType: reference
useCase:
    - customize-connections
---
# Get User Script Templates

The **Get User** script implements the function executed to determine the current state of existence of a user. We recommend naming this function `getUser`. The script is optional for both legacy authentication and for automatic migration, though we recommend its implementation. 

For automatic migration the script is executed during the password reset workflow, for example, with a forgotten password in Universal Login. For legacy authentication, it is executed whenever the following out-of-box operations occur: create user, change email, change password and password reset (e.g via forgot password workflow). 

The `getUser` function should be defined as follows:

```js
function getUser(email, callback) {
  // TODO: implement your script
  return callback(null, profile);
}
```

| **Parameter** | **Description** |
| --- | --- |
| `email` | The email address for the user as the user identifying credential.  |
| `callback` | Executed with up to two parameters. The first parameter is an indication of status: a `null` first parameter with a corresponding second parameter indicates that the operation executed successfully; a `null` first parameter with no corresponding second parameter indicates that no user was found, while a non `null` first parameter value indicates that some error condition occurred. If the first parameter is `null` then the second parameter should be the profile for the user in JSON format (if a user was found). If the first parameter is `null` and no user was found, or if the first parameter is non `null`, then the second parameter can be omitted. The second parameter is the `profile` for the user. This should be supplied as a JSON object in normalized user profile form. See the [**Login**](/connections/database/custom-db/templates/login#callback-profile-example) script for details. |

<%= include('../_includes/_bp-error-object') %>

::: warning
When creating users, Auth0 calls the **Get User** script before the **Create** script. Be sure to implement both database action scripts if you are creating new users.
:::

## Language-specific script examples

Auth0 provides sample scripts for use with the following languages/technologies:

::: next-steps
* [JavaScript](/connections/database/custom-db/templates/get-user#javascript)
* [ASP.NET Membership Provider (MVC3 - Universal Providers)](/connections/database/custom-db/templates/get-user#asp-net-membership-provider-mvc3-universal-providers-)
* [ASP.NET Membership Provider (MVC4 - Simple Membership)](/connections/database/custom-db/templates/get-user#asp-net-membership-provider-mvc4-simple-membership-)
* [MongoDB](/connections/database/custom-db/templates/get-user#mongodb)
* [MySQL](/connections/database/custom-db/templates/get-user#mysql)
* [Oracle](/connections/database/custom-db/templates/get-user#oracle)
* [PostgreSQL](/connections/database/custom-db/templates/get-user#postgresql)
* [SQL Server](/connections/database/custom-db/templates/get-user#sql-server)
* [Windows Azure SQL Database](/connections/database/custom-db/templates/get-user#windows-azure-sql-database)
* [Request with Basic Auth](/connections/database/custom-db/templates/get-user#request-with-basic-auth)
* [Stormpath](/connections/database/custom-db/templates/get-user#stormpath)
:::

### JavaScript

```
function getByEmail (email, callback) {
  // This script should retrieve a user profile from your existing database,
  // without authenticating the user.
  // It is used to check if a user exists before executing flows that do not
  // require authentication (signup and password reset).
  //
  // There are three ways this script can finish:
  // 1. A user was successfully found. The profile should be in the following
  // format: https://auth0.com/docs/users/normalized.
  //     callback(null, profile);
  // 2. A user was not found
  //     callback(null);
  // 3. Something went wrong while trying to reach your database:
  //     callback(new Error("my error message"));

  var msg = "Please implement the Get User script for this database connection " +
       "at https://manage.auth0.com/#/connections/database";
  return callback(new Error(msg));
}
```

### ASP.NET Membership Provider (MVC3 - Universal Providers)

```
function getByEmail (name, callback) {
  var profile = {
    user_id:     "103547991597142817347",
    nickname:    "johnfoo",
    email:       "johnfoo@gmail.com",
    name:        "John Foo",
    given_name:  "John",
    family_name: "Foo"
  };

  callback(null, profile);
}
```

### ASP.NET Membership Provider (MVC4 - Simple Membership)

```
function getByEmail (name, callback) {
  var profile = {
    user_id:     "103547991597142817347",
    nickname:    "johnfoo",
    email:       "johnfoo@gmail.com",
    name:        "John Foo",
    given_name:  "John",
    family_name: "Foo"
  };

  callback(null, profile);
}
```

### MongoDB

```
function getByEmail (name, callback) {
  var profile = {
    user_id:     "103547991597142817347",
    nickname:    "johnfoo",
    email:       "johnfoo@gmail.com",
    name:        "John Foo",
    given_name:  "John",
    family_name: "Foo"
  };

  callback(null, profile);
}
```

### MySQL

```
function getByEmail (name, callback) {
  var profile = {
    user_id:     "103547991597142817347",
    nickname:    "johnfoo",
    email:       "johnfoo@gmail.com",
    name:        "John Foo",
    given_name:  "John",
    family_name: "Foo"
  };

  callback(null, profile);
}
```

### Oracle

```
function loginByEmail(email, callback) {
  var oracledb = require('oracledb');
  oracledb.outFormat = oracledb.OBJECT;

  oracledb.getConnection({
      user: configuration.dbUser,
      password: configuration.dbUserPassword,
      connectString: "CONNECTION_STRING" // Refer here https://github.com/oracle/node-oracledb/blob/master/doc/api.md#connectionstrings
    },
    function(err, connection) {
      if (err) {
        return callback(err);
      }
      connection.execute(
        "SELECT ID, EMAIL, PASSWORD, EMAIL_VERIFIED, NICKNAME" +
        " FROM Users " +
        " WHERE EMAIL = :email", [email],
        function(err, result) {
          if (err) {
            doRelease(connection);
            return callback(new Error(err));
          }
          doRelease(connection);
          if (result.rows.length === 0) {
            return callback(null);
          }
          var userProfile = {
            user_id: result.rows[0].ID,
            nickname: result.rows[0].NICKNAME,
            email: result.rows[0].EMAIL,
            email_verified: result.rows[0].EMAIL_VERIFIED
          };
          callback(null, userProfile);
        });
    });

  // Note: connections should always be released when not needed
  function doRelease(connection) {
    connection.close(
      function(err) {
        if (err) {
          console.error(err.message);
        }
      });
  }
}
```

### PostgreSQL

```
function getByEmail (name, callback) {
  var profile = {
    user_id:     "103547991597142817347",
    nickname:    "johnfoo",
    email:       "johnfoo@gmail.com",
    name:        "John Foo",
    given_name:  "John",
    family_name: "Foo"
  };

  callback(null, profile);
}
```

### SQL Server

```
function getByEmail (name, callback) {
  var profile = {
    user_id:     "103547991597142817347",
    nickname:    "johnfoo",
    email:       "johnfoo@gmail.com",
    name:        "John Foo",
    given_name:  "John",
    family_name: "Foo"
  };

  callback(null, profile);
}
```

### Windows Azure SQL Database

```
function getByEmail (name, callback) {
  var profile = {
    user_id:     "103547991597142817347",
    nickname:    "johnfoo",
    email:       "johnfoo@gmail.com",
    name:        "John Foo",
    given_name:  "John",
    family_name: "Foo"
  };

  callback(null, profile);
}
```

### Request with Basic Auth

```
function getByEmail (name, callback) {
  var profile = {
    user_id:     "103547991597142817347",
    nickname:    "johnfoo",
    email:       "johnfoo@gmail.com",
    name:        "John Foo",
    given_name:  "John",
    family_name: "Foo"
  };

  callback(null, profile);
}
```

### Stormpath

```
function getByEmail(email, callback) {
  // Replace the YOUR-STORMPATH-CLIENT-ID with your Stormpath ID
  var url = 'https://api.stormpath.com/v1/applications/{YOUR-STORMPATH-CLIENT-ID}/accounts';
  // Add your Stormpath API Client ID and Secret
  var apiCredentials = {
    user : 'YOUR-STORMPATH-API-ID',
    password: 'YOUR-STORMPATH-API-SECRET'
  };

  // Make a GET request to find a user by email
  request({
    url: url,
    method: 'GET',
    auth: apiCredentials,
    qs: { q: email },
    json: true
  }, function (error, response, body) {
    if (response.statusCode !== 200) return callback();

    var user = body.items[0];

    if (!user) return callback();

    var id = user.href.replace('https://api.stormpath.com/v1/accounts/', '');

    return callback(null, {
      user_id: id,
      username: user.username,
      email: user.email,
      email_verified: true
      // Add any additional fields you would like to carry over from Stormpath
    });
  });
}
```

## Keep reading

* [Change Passwords](/connections/database/custom-db/templates/change-password)
* [Create](/connections/database/custom-db/templates/create)
* [Delete](/connections/database/custom-db/templates/delete)
* [Login](/connections/database/custom-db/templates/login)
* [Verify](/connections/database/custom-db/templates/verify)
* [Change Email](/connections/database/custom-db/templates/change-email)
